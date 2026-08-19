<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Deal;
use App\Models\Vehicle;
use App\Models\ComplianceRecord;
use App\Models\LogisticsShipment;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class DealController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if (!$user) {
            return redirect()->route('login')->with('error', 'Please sign in to view your deals.');
        }

        $query = Deal::with(['buyer', 'dealer', 'vehicle', 'complianceRecords', 'shipment', 'transactions']);

        if ($user->role === 'retail_buyer' || $user->role === 'b2b_fleet_manager') {
            $query->where('buyer_id', $user->id);
        } elseif ($user->role === 'dealer_partner' && $user->dealer) {
            $query->where('dealer_id', $user->dealer->id);
        }
        // Admin sees all deals

        $deals = $query->orderBy('created_at', 'desc')->get();

        return Inertia::render('Deals/Index', [
            'deals' => $deals,
            'userRole' => $user->role,
            'summaryStats' => [
                'totalDeals' => $deals->count(),
                'totalVolumeEur' => $deals->sum('total_amount'),
                'activePipeline' => $deals->whereNotIn('status', ['completed', 'cancelled'])->count(),
                'escrowHoldingEur' => $deals->where('escrow_status', 'holding')->sum('total_amount'),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return redirect()->route('login')->with('error', 'Please sign in to place a procurement request.');
        }

        $request->validate([
            'vehicle_id' => 'required|exists:vehicles,id',
            'type' => 'required|in:retail,b2b_fleet',
            'quantity' => 'nullable|integer|min:1',
            'buyer_notes' => 'nullable|string',
        ]);

        $vehicle = Vehicle::findOrFail($request->vehicle_id);

        $quantity = $request->input('quantity', 1);
        $agreedPrice = $vehicle->price_eur * $quantity;
        
        $commissionRate = ($request->type === 'b2b_fleet' || $user->role === 'b2b_fleet_manager') ? 3.50 : 4.50;
        $commissionAmount = round(($agreedPrice * $commissionRate) / 100, 2);
        
        // Estimated VAT (0 for B2B Reverse Charge, 8.1% for CH retail)
        $vat = ($request->type === 'b2b_fleet' || $user->role === 'b2b_fleet_manager') 
            ? 0.00 
            : round($agreedPrice * 0.081, 2);
            
        $deliveryFee = $request->type === 'b2b_fleet' ? 1800.00 : 450.00;
        $totalAmount = $agreedPrice + $commissionAmount + $vat + $deliveryFee;

        $referenceCode = 'AB-' . date('Y') . '-' . strtoupper(Str::random(5));

        $deal = Deal::create([
            'reference_code' => $referenceCode,
            'buyer_id' => $user->id,
            'dealer_id' => $vehicle->dealer_id,
            'vehicle_id' => $vehicle->id,
            'type' => $request->type,
            'quantity' => $quantity,
            'agreed_price' => $agreedPrice,
            'commission_rate' => $commissionRate,
            'commission_amount' => $commissionAmount,
            'estimated_tax_vat' => $vat,
            'delivery_fee' => $deliveryFee,
            'total_amount' => $totalAmount,
            'status' => 'quote_requested',
            'escrow_status' => 'unfunded',
            'buyer_notes' => $request->buyer_notes,
            'broker_notes' => 'Brokerage request received. Initial compliance checklist generated.',
        ]);

        // Generate initial compliance requirements
        if ($request->type === 'b2b_fleet' || $user->role === 'b2b_fleet_manager') {
            ComplianceRecord::create([
                'deal_id' => $deal->id,
                'document_type' => 'vat_reverse_charge_form',
                'title' => 'EU Cross-Border VAT Reverse Charge Declaration',
                'status' => 'pending',
                'notes' => 'Provide Corporate Tax ID and VIES validation',
            ]);
        } else {
            ComplianceRecord::create([
                'deal_id' => $deal->id,
                'document_type' => 'kyc_identity',
                'title' => 'Government ID / Passport (KYC Verification)',
                'status' => 'pending',
                'notes' => 'Required for Swiss/EU vehicle registration',
            ]);

            ComplianceRecord::create([
                'deal_id' => $deal->id,
                'document_type' => 'vqf_aml_declaration',
                'title' => 'VQF CH Money Laundering Act Declaration',
                'status' => 'pending',
                'notes' => 'Declaration of beneficial ownership for escrow deposit',
            ]);
        }

        ComplianceRecord::create([
            'deal_id' => $deal->id,
            'document_type' => 'vehicle_inspection_cert',
            'title' => '150-Point Technical Inspection & Battery State Certificate',
            'status' => 'pending',
            'notes' => 'Independent TÜV/DEKRA inspection report from dealer',
        ]);

        return redirect()->route('deals.show', $deal->id)->with('success', "Procurement request {$referenceCode} created successfully.");
    }

    public function show($id)
    {
        $user = Auth::user();

        if (!$user) {
            return redirect()->route('login')->with('error', 'Please sign in to view deal details.');
        }

        $deal = Deal::with(['buyer', 'dealer', 'vehicle', 'complianceRecords', 'shipment', 'transactions'])->findOrFail($id);

        $pipelineSteps = [
            ['id' => 'quote_requested', 'label' => 'Quote Requested', 'desc' => 'Request submitted & under review'],
            ['id' => 'quote_approved', 'label' => 'Broker Approved', 'desc' => 'Price & terms verified by broker desk'],
            ['id' => 'compliance_pending', 'label' => 'Compliance Review', 'desc' => 'VQF AML & VAT docs verification'],
            ['id' => 'escrow_funded', 'label' => 'Escrow Funded', 'desc' => 'Payment secured in escrow float'],
            ['id' => 'logistics_in_transit', 'label' => 'In Logistics', 'desc' => 'White-glove transport in transit'],
            ['id' => 'delivered', 'label' => 'Delivered', 'desc' => 'Vehicle handed over & inspected'],
            ['id' => 'completed', 'label' => 'Deal Completed', 'desc' => 'Escrow released & closed'],
        ];

        return Inertia::render('Deals/Show', [
            'deal' => $deal,
            'pipelineSteps' => $pipelineSteps,
            'currentStepIndex' => array_search($deal->status, array_column($pipelineSteps, 'id')),
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $user = Auth::user();

        if (!$user) {
            return redirect()->route('login')->with('error', 'Please sign in to update deal status.');
        }

        $deal = Deal::findOrFail($id);
        $newStatus = $request->input('status');

        $validStatuses = [
            'quote_requested', 'quote_approved', 'compliance_pending',
            'escrow_funded', 'logistics_in_transit', 'delivered', 'completed', 'cancelled'
        ];

        if (in_array($newStatus, $validStatuses)) {
            $oldStatus = $deal->status;
            $deal->status = $newStatus;

            // Trigger E-mail & SMS alert dispatch
            \App\Services\NotificationService::sendDealStatusAlert($deal, $oldStatus, $newStatus);

            // Automatically manage escrow status based on pipeline
            if ($newStatus === 'escrow_funded') {
                $deal->escrow_status = 'holding';
                if ($deal->transactions()->count() === 0) {
                    Transaction::create([
                        'deal_id' => $deal->id,
                        'type' => 'buyer_deposit',
                        'amount' => $deal->total_amount,
                        'currency' => 'EUR',
                        'provider' => 'Stripe Escrow / Wise CH',
                        'status' => 'completed',
                        'reference_id' => 'TXN-' . rand(100000, 999999),
                    ]);
                }
            } elseif ($newStatus === 'completed') {
                $deal->escrow_status = 'released';
                Transaction::create([
                    'deal_id' => $deal->id,
                    'type' => 'dealer_payout',
                    'amount' => $deal->agreed_price,
                    'currency' => 'EUR',
                    'provider' => 'Wise Bank Transfer',
                    'status' => 'completed',
                    'reference_id' => 'PAYOUT-' . rand(100000, 999999),
                ]);

                Transaction::create([
                    'deal_id' => $deal->id,
                    'type' => 'broker_commission',
                    'amount' => $deal->commission_amount,
                    'currency' => 'EUR',
                    'provider' => 'AutoBrokers Ledger',
                    'status' => 'completed',
                    'reference_id' => 'FEE-' . rand(100000, 999999),
                ]);
            }

            if ($newStatus === 'logistics_in_transit' && !$deal->shipment) {
                LogisticsShipment::create([
                    'deal_id' => $deal->id,
                    'carrier_name' => 'AutoBrokers Alpine Express Logistics',
                    'tracking_code' => 'AB-TRK-' . rand(100000, 999999),
                    'origin_address' => $deal->dealer->city . ', ' . $deal->dealer->country,
                    'origin_country' => $deal->dealer->country,
                    'destination_address' => $deal->buyer->company_name ?? $deal->buyer->name,
                    'destination_country' => $deal->buyer->country,
                    'estimated_delivery_at' => now()->addDays(3),
                    'status' => 'picked_up',
                ]);
            }

            $deal->save();
        }

        return redirect()->back()->with('success', "Deal status updated to " . str_replace('_', ' ', $newStatus));
    }
}
