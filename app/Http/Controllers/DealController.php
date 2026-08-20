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

use App\Mail\EscrowDepositReceiptMail;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

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

        $deals = $query->orderBy('created_at', 'desc')->get();

        return Inertia::render('Deals/Index', [
            'deals' => $deals,
            'userRole' => $user->role,
        ]);
    }

    public function create(Request $request)
    {
        $vehicleId = $request->query('vehicle_id');
        $vehicle = Vehicle::with('dealer')->findOrFail($vehicleId);

        return Inertia::render('Deals/Create', [
            'vehicle' => $vehicle,
            'user' => Auth::user(),
        ]);
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return redirect()->route('login')->with('error', 'Please register or login to request an escrow deal.');
        }

        $request->validate([
            'vehicle_id' => 'required|exists:vehicles,id',
            'type' => 'required|in:retail,b2b_fleet',
            'quantity' => 'required|integer|min:1',
            'buyer_notes' => 'nullable|string|max:1000',
        ]);

        $vehicle = Vehicle::with('dealer')->findOrFail($request->vehicle_id);

        $quantity = $request->quantity;
        $agreedPrice = $vehicle->price_eur * $quantity;
        
        $commissionRate = ($request->type === 'b2b_fleet' || $user->role === 'b2b_fleet_manager') ? 3.50 : 4.50;
        $commissionAmount = round(($agreedPrice * $commissionRate) / 100, 2);
        
        $vat = $vehicle->location_country === 'CH' ? round($agreedPrice * 0.081, 2) : 0.00;
        $deliveryFee = 450.00;
        $totalAmount = $agreedPrice + $commissionAmount + $vat + $deliveryFee;

        $referenceCode = 'CB-' . strtoupper(Str::random(6));

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
            return redirect()->route('login')->with('error', 'Please sign in to view deal tracker.');
        }

        $deal = Deal::with(['buyer', 'dealer', 'vehicle', 'complianceRecords', 'shipment', 'transactions'])->findOrFail($id);

        if ($user->role !== 'broker_admin' && $deal->buyer_id !== $user->id && (!$user->dealer || $deal->dealer_id !== $user->dealer->id)) {
            abort(403, 'Unauthorized access to this escrow deal.');
        }

        return Inertia::render('Deals/Show', [
            'deal' => $deal,
            'userRole' => $user->role,
            'companyInfo' => config('app.company'),
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $user = Auth::user();

        if (!$user) {
            return redirect()->route('login')->with('error', 'Please sign in to update deal status.');
        }

        $deal = Deal::with(['buyer', 'dealer', 'vehicle'])->findOrFail($id);
        $newStatus = $request->input('status');

        $validStatuses = [
            'quote_requested', 'quote_approved', 'compliance_pending',
            'escrow_funded', 'logistics_in_transit', 'delivered', 'completed', 'cancelled'
        ];

        if (in_array($newStatus, $validStatuses)) {
            $oldStatus = $deal->status;
            $deal->status = $newStatus;

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

                try {
                    if ($deal->buyer && !empty($deal->buyer->email)) {
                        Mail::to($deal->buyer->email)->send(new EscrowDepositReceiptMail($deal));
                    }
                } catch (\Exception $e) {
                    Log::error('Failed to send EscrowDepositReceiptMail: ' . $e->getMessage());
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
                    'provider' => 'CarStrado Ledger',
                    'status' => 'completed',
                    'reference_id' => 'FEE-' . rand(100000, 999999),
                ]);
            }

            if ($newStatus === 'logistics_in_transit' && !$deal->shipment) {
                LogisticsShipment::create([
                    'deal_id' => $deal->id,
                    'carrier_name' => 'CarStrado Express Logistics',
                    'tracking_code' => 'CS-TRK-' . rand(100000, 999999),
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

    public function downloadInvoice($id)
    {
        $user = Auth::user();

        if (!$user) {
            return redirect()->route('login')->with('error', 'Please sign in to download your invoice.');
        }

        $deal = Deal::with(['buyer', 'dealer', 'vehicle'])->findOrFail($id);

        if ($user->role !== 'broker_admin' && $deal->buyer_id !== $user->id && (!$user->dealer || $deal->dealer_id !== $user->dealer->id)) {
            abort(403, 'Unauthorized access to this invoice.');
        }

        $invoiceRef = 'INV-' . strtoupper(substr(md5($deal->reference_code . '-' . $deal->id), 0, 8));

        $pdf = Pdf::loadView('pdf.deal_invoice', [
            'deal' => $deal,
            'invoiceRef' => $invoiceRef,
            'company' => config('app.company'),
        ]);

        return $pdf->download("Invoice_{$invoiceRef}_{$deal->reference_code}.pdf");
    }
}
