<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Deal;
use App\Models\Vehicle;
use App\Models\Dealer;
use App\Models\ComplianceRecord;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if (!$user) {
            return redirect()->route('login')->with('error', 'Please sign in to access the Broker Control Center.');
        }

        if ($user->role !== 'broker_admin') {
            return redirect()->route('vehicles.index')->with('error', 'Access restricted to Broker Administrator accounts.');
        }

        $deals = Deal::with(['buyer', 'dealer', 'vehicle', 'complianceRecords', 'shipment'])->orderBy('updated_at', 'desc')->get();
        $dealers = Dealer::withCount('vehicles')->get();
        $pendingCompliance = ComplianceRecord::with('deal.buyer')->where('status', 'pending')->get();

        $totalGmv = Deal::sum('total_amount');
        $earnedCommission = Deal::where('status', 'completed')->sum('commission_amount');
        $escrowFloat = Deal::where('escrow_status', 'holding')->sum('total_amount');
        $activeDealsCount = Deal::whereNotIn('status', ['completed', 'cancelled'])->count();

        return Inertia::render('Admin/Dashboard', [
            'deals' => $deals,
            'dealers' => $dealers,
            'pendingCompliance' => $pendingCompliance,
            'kpis' => [
                'totalGmv' => $totalGmv,
                'earnedCommission' => $earnedCommission,
                'escrowFloat' => $escrowFloat,
                'activeDealsCount' => $activeDealsCount,
                'totalVehiclesCount' => Vehicle::count(),
                'verifiedDealersCount' => Dealer::where('is_verified', true)->count(),
            ],
        ]);
    }
}
