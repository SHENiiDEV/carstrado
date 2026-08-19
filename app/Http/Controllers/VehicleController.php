<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vehicle;
use App\Models\Dealer;
use Inertia\Inertia;

class VehicleController extends Controller
{
    public function index(Request $request)
    {
        $query = Vehicle::with('dealer')->where('status', 'available');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('make', 'like', "%{$search}%")
                  ->orWhere('model', 'like', "%{$search}%")
                  ->orWhere('trim', 'like', "%{$search}%");
            });
        }

        if ($request->filled('make') && $request->make !== 'all') {
            $query->where('make', $request->make);
        }

        if ($request->filled('model') && $request->model !== 'all') {
            $query->where('model', $request->model);
        }

        if ($request->filled('fuel_type') && $request->fuel_type !== 'all') {
            $query->where('fuel_type', $request->fuel_type);
        }

        if ($request->filled('body_style') && $request->body_style !== 'all') {
            $query->where('body_style', $request->body_style);
        }

        if ($request->filled('country') && $request->country !== 'all') {
            $query->where('location_country', $request->country);
        }

        if ($request->filled('fleet_only') && $request->fleet_only === 'true') {
            $query->where('is_fleet_eligible', true);
        }

        if ($request->filled('max_price') && is_numeric($request->max_price)) {
            $query->where('price_eur', '<=', (float) $request->max_price);
        }

        if ($request->filled('max_mileage') && is_numeric($request->max_mileage)) {
            $query->where('mileage_km', '<=', (int) $request->max_mileage);
        }

        if ($request->filled('min_year') && is_numeric($request->min_year)) {
            $query->where('year', '>=', (int) $request->min_year);
        }

        // Sorting Logic
        $sort = $request->input('sort', 'created_at_desc');
        switch ($sort) {
            case 'price_asc':
                $query->orderBy('price_eur', 'asc');
                break;
            case 'price_desc':
                $query->orderBy('price_eur', 'desc');
                break;
            case 'mileage_asc':
                $query->orderBy('mileage_km', 'asc');
                break;
            case 'year_desc':
                $query->orderBy('year', 'desc');
                break;
            default:
                $query->orderBy('created_at', 'desc');
                break;
        }

        $vehicles = $query->get();

        $makes = Vehicle::whereNotNull('make')->select('make')->distinct()->pluck('make')->filter()->values();
        $bodyStyles = Vehicle::whereNotNull('body_style')->select('body_style')->distinct()->pluck('body_style')->filter()->values();
        $countries = Vehicle::whereNotNull('location_country')->select('location_country')->distinct()->pluck('location_country')->filter()->values();

        // Calculate dynamic brand counts from database
        $brandCounts = Vehicle::where('status', 'available')
            ->whereNotNull('make')
            ->selectRaw('make, count(*) as count')
            ->groupBy('make')
            ->orderByDesc('count')
            ->get()
            ->map(function ($item) {
                $codeMap = [
                    'Porsche' => 'POR',
                    'BMW' => 'BMW',
                    'Mercedes-Benz' => 'MB',
                    'Mercedes' => 'MB',
                    'Audi' => 'AUDI',
                    'Tesla' => 'TSLA',
                    'Volvo' => 'VOLVO',
                    'Ferrari' => 'FER',
                    'Lamborghini' => 'LAMBO',
                    'Aston Martin' => 'AM',
                    'Land Rover' => 'LR',
                    'Range Rover' => 'RR',
                    'Bentley' => 'BENT',
                    'Rolls-Royce' => 'RR',
                    'Maserati' => 'MAS',
                    'McLaren' => 'MCL',
                ];

                return [
                    'make' => $item->make,
                    'count' => $item->count,
                    'code' => $codeMap[$item->make] ?? strtoupper(substr($item->make, 0, 3)),
                ];
            });

        // Build modelsMap grouped by make
        $modelsMap = [];
        foreach ($makes as $m) {
            $modelsMap[$m] = Vehicle::where('make', $m)->whereNotNull('model')->distinct()->pluck('model')->filter()->values();
        }

        return Inertia::render('Vehicles/Index', [
            'vehicles' => $vehicles,
            'filters' => $request->only(['search', 'make', 'model', 'fuel_type', 'body_style', 'country', 'max_price', 'max_mileage', 'min_year', 'fleet_only', 'sort']) ?: (object)[],
            'makes' => $makes,
            'brandCounts' => $brandCounts,
            'modelsMap' => $modelsMap,
            'bodyStyles' => $bodyStyles,
            'countries' => $countries,
            'stats' => [
                'totalAvailable' => Vehicle::where('status', 'available')->count(),
                'evCount' => Vehicle::where('fuel_type', 'electric')->count(),
                'fleetCount' => Vehicle::where('is_fleet_eligible', true)->count(),
            ],
        ]);
    }

    public function show($id)
    {
        $vehicle = Vehicle::with('dealer')->findOrFail($id);

        $similarVehicles = Vehicle::where('id', '!=', $vehicle->id)
            ->where('make', $vehicle->make)
            ->limit(3)
            ->get();

        // Calculate commission & estimated logistics/tax
        $commissionRate = $vehicle->is_fleet_eligible ? 3.5 : 4.5;
        $commissionAmount = round(($vehicle->price_eur * $commissionRate) / 100, 2);
        $estimatedVat = $vehicle->location_country === 'CH' ? round($vehicle->price_eur * 0.081, 2) : 0; // CH VAT 8.1%
        $deliveryFee = 450.00;
        $totalEstimated = $vehicle->price_eur + $commissionAmount + $estimatedVat + $deliveryFee;

        return Inertia::render('Vehicles/Show', [
            'vehicle' => $vehicle,
            'similarVehicles' => $similarVehicles,
            'pricingBreakdown' => [
                'basePrice' => $vehicle->price_eur,
                'commissionRate' => $commissionRate,
                'commissionAmount' => $commissionAmount,
                'estimatedVat' => $estimatedVat,
                'deliveryFee' => $deliveryFee,
                'totalEstimated' => $totalEstimated,
            ],
        ]);
    }
}
