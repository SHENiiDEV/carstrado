<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vehicle;
use App\Models\Dealer;
use App\Models\Deal;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DealerDashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return redirect()->route('login')->with('error', 'Please sign in as a Dealer Partner.');
        }

        if ($user->role !== 'dealer_partner' && $user->role !== 'broker_admin') {
            return redirect()->route('vehicles.index')->with('error', 'Access restricted to Dealer Partner accounts.');
        }

        // Get dealer record tied to user, or fallback to first dealer for demo
        $dealer = $user->dealer ?? Dealer::first();

        $vehicles = Vehicle::where('dealer_id', $dealer->id)->orderBy('created_at', 'desc')->get();
        $deals = Deal::with(['buyer', 'vehicle', 'complianceRecords', 'transactions'])->where('dealer_id', $dealer->id)->orderBy('created_at', 'desc')->get();

        $totalSalesVolume = $deals->where('status', 'completed')->sum('agreed_price');
        $escrowHoldingVolume = $deals->where('escrow_status', 'holding')->sum('agreed_price');

        return Inertia::render('Dealer/Dashboard', [
            'dealer' => $dealer,
            'vehicles' => $vehicles,
            'deals' => $deals,
            'defaultTab' => $request->input('tab', 'inventory'),
            'stats' => [
                'totalListed' => $vehicles->count(),
                'availableCount' => $vehicles->where('status', 'available')->count(),
                'activeDealsCount' => $deals->whereNotIn('status', ['completed', 'cancelled'])->count(),
                'totalSalesVolume' => $totalSalesVolume,
                'escrowHoldingVolume' => $escrowHoldingVolume,
            ],
        ]);
    }

    public function createVehicle()
    {
        $user = Auth::user();

        if (!$user) {
            return redirect()->route('login')->with('error', 'Please sign in to list a vehicle.');
        }

        if ($user->role !== 'dealer_partner' && $user->role !== 'broker_admin') {
            return redirect()->route('vehicles.index')->with('error', 'Access restricted to Dealer Partner accounts.');
        }

        return Inertia::render('Dealer/CreateVehicle');
    }

    public function storeVehicle(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return redirect()->route('login')->with('error', 'Please sign in to list a vehicle.');
        }

        if ($user->role !== 'dealer_partner' && $user->role !== 'broker_admin') {
            return redirect()->route('vehicles.index')->with('error', 'Access restricted to Dealer Partner accounts.');
        }

        $dealer = $user->dealer ?? Dealer::first();

        $validated = $request->validate([
            'vin' => 'required|string|max:50|unique:vehicles,vin',
            'make' => 'required|string|max:100',
            'model' => 'required|string|max:100',
            'trim' => 'nullable|string|max:255',
            'year' => 'required|integer|min:1990|max:2027',
            'price_eur' => 'required|numeric|min:1000',
            'mileage_km' => 'required|integer|min:0',
            'fuel_type' => 'required|in:electric,hybrid,petrol,diesel',
            'transmission' => 'required|string',
            'body_style' => 'required|string',
            'color' => 'nullable|string',
            'location_country' => 'required|string|max:10',
            'location_city' => 'required|string|max:100',
            'is_fleet_eligible' => 'nullable|boolean',
            'images' => 'nullable|array',
            'images.*' => 'nullable|string',
            'features' => 'nullable|array',
            'features.*' => 'nullable|string',
        ]);

        $images = !empty($validated['images']) ? array_values(array_filter($validated['images'])) : [
            'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80',
        ];

        $features = !empty($validated['features']) ? array_values(array_filter($validated['features'])) : [
            '150-Point TÜV Certificate',
            'Leather Interior',
            'Navigation & Parking Assistant',
            'Warranty Included',
        ];

        Vehicle::create([
            'dealer_id' => $dealer->id,
            'vin' => strtoupper($validated['vin']),
            'make' => $validated['make'],
            'model' => $validated['model'],
            'trim' => $validated['trim'] ?? null,
            'year' => $validated['year'],
            'price_eur' => $validated['price_eur'],
            'mileage_km' => $validated['mileage_km'],
            'fuel_type' => $validated['fuel_type'],
            'transmission' => $validated['transmission'],
            'body_style' => $validated['body_style'],
            'color' => $validated['color'] ?? 'Factory Finish',
            'location_country' => $validated['location_country'],
            'location_city' => $validated['location_city'],
            'images_json' => $images,
            'features_json' => $features,
            'is_fleet_eligible' => $request->boolean('is_fleet_eligible'),
            'status' => 'available',
        ]);

        return redirect()->route('dealer.dashboard')->with('success', "Vehicle {$validated['make']} {$validated['model']} listed successfully in catalog.");
    }

    public function editVehicle($id)
    {
        $user = Auth::user();

        if (!$user || ($user->role !== 'dealer_partner' && $user->role !== 'broker_admin')) {
            return redirect()->route('vehicles.index')->with('error', 'Unauthorized action.');
        }

        $vehicle = Vehicle::findOrFail($id);

        return Inertia::render('Dealer/EditVehicle', [
            'vehicle' => $vehicle,
        ]);
    }

    public function updateVehicle(Request $request, $id)
    {
        $user = Auth::user();

        if (!$user || ($user->role !== 'dealer_partner' && $user->role !== 'broker_admin')) {
            return redirect()->route('vehicles.index')->with('error', 'Unauthorized action.');
        }

        $vehicle = Vehicle::findOrFail($id);

        $validated = $request->validate([
            'vin' => 'required|string|max:50|unique:vehicles,vin,' . $vehicle->id,
            'make' => 'required|string|max:100',
            'model' => 'required|string|max:100',
            'trim' => 'nullable|string|max:255',
            'year' => 'required|integer|min:1990|max:2027',
            'price_eur' => 'required|numeric|min:1000',
            'mileage_km' => 'required|integer|min:0',
            'fuel_type' => 'required|in:electric,hybrid,petrol,diesel',
            'transmission' => 'required|string',
            'body_style' => 'required|string',
            'color' => 'nullable|string',
            'location_country' => 'required|string|max:10',
            'location_city' => 'required|string|max:100',
            'is_fleet_eligible' => 'nullable|boolean',
            'status' => 'required|in:available,reserved,sold',
            'images' => 'nullable|array',
            'images.*' => 'nullable|string',
            'features' => 'nullable|array',
            'features.*' => 'nullable|string',
        ]);

        $images = !empty($validated['images']) ? array_values(array_filter($validated['images'])) : $vehicle->images_json;
        $features = !empty($validated['features']) ? array_values(array_filter($validated['features'])) : $vehicle->features_json;

        $vehicle->update([
            'vin' => strtoupper($validated['vin']),
            'make' => $validated['make'],
            'model' => $validated['model'],
            'trim' => $validated['trim'] ?? null,
            'year' => $validated['year'],
            'price_eur' => $validated['price_eur'],
            'mileage_km' => $validated['mileage_km'],
            'fuel_type' => $validated['fuel_type'],
            'transmission' => $validated['transmission'],
            'body_style' => $validated['body_style'],
            'color' => $validated['color'] ?? 'Factory Finish',
            'location_country' => $validated['location_country'],
            'location_city' => $validated['location_city'],
            'images_json' => $images,
            'features_json' => $features,
            'is_fleet_eligible' => $request->boolean('is_fleet_eligible'),
            'status' => $validated['status'],
        ]);

        return redirect()->route('dealer.dashboard')->with('success', "Vehicle {$vehicle->make} {$vehicle->model} updated successfully.");
    }

    public function settings()
    {
        $user = Auth::user();

        if (!$user || ($user->role !== 'dealer_partner' && $user->role !== 'broker_admin')) {
            return redirect()->route('vehicles.index')->with('error', 'Unauthorized action.');
        }

        $dealer = $user->dealer ?? Dealer::first();

        return Inertia::render('Dealer/Settings', [
            'dealer' => $dealer,
        ]);
    }

    public function updateSettings(Request $request)
    {
        $user = Auth::user();

        if (!$user || ($user->role !== 'dealer_partner' && $user->role !== 'broker_admin')) {
            return redirect()->route('vehicles.index')->with('error', 'Unauthorized action.');
        }

        $dealer = $user->dealer ?? Dealer::first();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'license_number' => 'required|string|max:100',
            'city' => 'required|string|max:100',
            'country' => 'required|string|max:10',
            'address' => 'nullable|string|max:255',
            'brands' => 'nullable|array',
            'brands.*' => 'nullable|string',
        ]);

        $dealer->update([
            'name' => $validated['name'],
            'license_number' => $validated['license_number'],
            'city' => $validated['city'],
            'country' => $validated['country'],
            'address' => $validated['address'] ?? $dealer->address,
            'brands_json' => $validated['brands'] ?? $dealer->brands_json,
        ]);

        return redirect()->back()->with('success', 'Dealership preferences & profile settings updated successfully.');
    }

    public function services()
    {
        $user = Auth::user();

        if (!$user || ($user->role !== 'dealer_partner' && $user->role !== 'broker_admin')) {
            return redirect()->route('vehicles.index')->with('error', 'Unauthorized action.');
        }

        $dealer = $user->dealer ?? Dealer::first();
        $vehicles = Vehicle::where('dealer_id', $dealer->id)->get();

        $servicesCatalog = [
            [
                'id' => 'gold_warranty',
                'category' => 'Extended Warranties',
                'title' => 'Swiss Gold Extended Mechanical Warranty (36 Mo / 100k km)',
                'provider' => 'DEKRA / Quality1 CH',
                'price_eur' => 1850.00,
                'description' => 'Comprehensive coverage for drivetrain, electrical, air suspension, and battery pack with zero deductible across EU & CH.',
                'badge' => 'Recommended',
            ],
            [
                'id' => 'battery_soh_guard',
                'category' => 'Extended Warranties',
                'title' => 'EV Battery SoH Guarantee & Power Electronics Guard (24 Mo)',
                'provider' => 'TÜV Süd EV Desk',
                'price_eur' => 1200.00,
                'description' => 'Guarantees battery state of health stays above 80%. Full module replacement coverage for Taycan, e-tron, and EQS models.',
                'badge' => 'EV Certified',
            ],
            [
                'id' => 'vollkasko_insurance',
                'category' => 'Commercial Insurance',
                'title' => 'Swiss Vollkasko Commercial Fleet Insurance (Annual)',
                'provider' => 'Helvetia / Zurich Insurance',
                'price_eur' => 2400.00,
                'description' => 'All-risk zero deductible commercial coverage including theft, vandalism, hail, and transport damage during cross-border transit.',
                'badge' => 'All-Risk',
            ],
            [
                'id' => 'crossborder_transit',
                'category' => 'Commercial Insurance',
                'title' => 'EU Cross-Border Transit & Customs Protection',
                'provider' => 'Alpine Express Logistics',
                'price_eur' => 450.00,
                'description' => 'Covers import duty bonds, T1 customs transit clearance, and instant vehicle release at CH/DE border control.',
                'badge' => 'Customs Cleared',
            ],
            [
                'id' => 'graphene_ppf',
                'category' => 'Detailing & Protection',
                'title' => '9H Graphene Ceramic Coating & Front-Bumper PPF Film',
                'provider' => 'Boutique Detailing Studio Zurich',
                'price_eur' => 1500.00,
                'description' => 'Self-healing Paint Protection Film (PPF) on front end and hydrophobic 9H ceramic coating applied to full body.',
                'badge' => '9H Protection',
            ],
        ];

        return Inertia::render('Dealer/Services', [
            'dealer' => $dealer,
            'vehicles' => $vehicles,
            'servicesCatalog' => $servicesCatalog,
        ]);
    }

    public function fleetAnalytics()
    {
        $user = Auth::user();

        if (!$user || ($user->role !== 'dealer_partner' && $user->role !== 'broker_admin')) {
            return redirect()->route('vehicles.index')->with('error', 'Unauthorized action.');
        }

        $dealer = $user->dealer ?? Dealer::first();
        $vehicles = Vehicle::where('dealer_id', $dealer->id)->get();
        $deals = Deal::with(['buyer', 'vehicle', 'transactions'])->where('dealer_id', $dealer->id)->get();

        $totalFleetValue = $vehicles->sum('price_eur');
        $averagePrice = $vehicles->avg('price_eur');
        $totalMileage = $vehicles->sum('mileage_km');

        $fuelBreakdown = [
            'electric' => $vehicles->where('fuel_type', 'electric')->count(),
            'hybrid' => $vehicles->where('fuel_type', 'hybrid')->count(),
            'petrol' => $vehicles->where('fuel_type', 'petrol')->count(),
            'diesel' => $vehicles->where('fuel_type', 'diesel')->count(),
        ];

        return Inertia::render('Dealer/FleetAnalytics', [
            'dealer' => $dealer,
            'vehicles' => $vehicles,
            'deals' => $deals,
            'fleetMetrics' => [
                'totalListedUnits' => $vehicles->count(),
                'totalFleetValueEur' => $totalFleetValue,
                'averagePriceEur' => round($averagePrice, 2),
                'totalFleetMileageKm' => $totalMileage,
                'fleetTurnoverDays' => 18,
                'fuelBreakdown' => $fuelBreakdown,
            ],
        ]);
    }

    public function toggleVehicleStatus(Request $request, $id)
    {
        $user = Auth::user();

        if (!$user || ($user->role !== 'dealer_partner' && $user->role !== 'broker_admin')) {
            return redirect()->route('vehicles.index')->with('error', 'Unauthorized action.');
        }

        $vehicle = Vehicle::findOrFail($id);
        $newStatus = $request->input('status', 'available');

        if (in_array($newStatus, ['available', 'reserved', 'sold'])) {
            $vehicle->status = $newStatus;
            $vehicle->save();
        }

        return redirect()->back()->with('success', "Vehicle status updated to {$newStatus}.");
    }

    public function updateVehiclePrice(Request $request, $id)
    {
        $user = Auth::user();

        if (!$user || ($user->role !== 'dealer_partner' && $user->role !== 'broker_admin')) {
            return redirect()->route('vehicles.index')->with('error', 'Unauthorized action.');
        }

        $vehicle = Vehicle::findOrFail($id);

        if ($request->filled('price_eur')) {
            $vehicle->price_eur = (float) $request->price_eur;
        }

        if ($request->filled('mileage_km')) {
            $vehicle->mileage_km = (int) $request->mileage_km;
        }

        if ($request->has('is_fleet_eligible')) {
            $vehicle->is_fleet_eligible = $request->boolean('is_fleet_eligible');
        }

        $vehicle->save();

        return redirect()->back()->with('success', "Vehicle details for {$vehicle->make} {$vehicle->model} updated.");
    }
}
