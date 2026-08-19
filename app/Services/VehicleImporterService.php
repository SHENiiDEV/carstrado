<?php

namespace App\Services;

use App\Models\Vehicle;
use App\Models\Dealer;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class VehicleImporterService
{
    /**
     * Import or update vehicle records from an array of scraped/API vehicle data.
     */
    public function importVehicles(array $items, int $dealerId = null): array
    {
        $importedCount = 0;
        $updatedCount = 0;

        foreach ($items as $item) {
            $vin = $item['vin'] ?? ('VIN-' . strtoupper(Str::random(10)));
            $targetDealerId = $dealerId ?? $item['dealer_id'] ?? 1;

            $data = [
                'dealer_id' => $targetDealerId,
                'make' => $item['make'] ?? 'Unknown',
                'model' => $item['model'] ?? 'Unknown',
                'trim' => $item['trim'] ?? null,
                'year' => (int) ($item['year'] ?? date('Y')),
                'price_eur' => (float) ($item['price_eur'] ?? $item['price'] ?? 0),
                'mileage_km' => (int) ($item['mileage_km'] ?? $item['mileage'] ?? 0),
                'fuel_type' => strtolower($item['fuel_type'] ?? 'petrol'),
                'transmission' => $item['transmission'] ?? 'Automatic',
                'body_style' => $item['body_style'] ?? 'Sedan',
                'color' => $item['color'] ?? 'Standard',
                'location_country' => strtoupper($item['location_country'] ?? 'DE'),
                'location_city' => $item['location_city'] ?? 'Munich',
                'images_json' => $item['images'] ?? $item['images_json'] ?? ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80'],
                'features_json' => $item['features'] ?? $item['features_json'] ?? ['Leather Seats', 'Navigation System', 'Parking Sensors'],
                'is_fleet_eligible' => filter_var($item['is_fleet_eligible'] ?? true, FILTER_VALIDATE_BOOLEAN),
                'status' => 'available',
            ];

            $vehicle = Vehicle::updateOrCreate(['vin' => $vin], $data);

            if ($vehicle->wasRecentlyCreated) {
                $importedCount++;
            } else {
                $updatedCount++;
            }
        }

        return [
            'imported' => $importedCount,
            'updated' => $updatedCount,
            'total_processed' => count($items),
        ];
    }

    /**
     * Helper to scrape/fetch a public JSON feed or API endpoint.
     */
    public function fetchFromUrl(string $url): array
    {
        $response = Http::timeout(15)->get($url);

        if ($response->successful()) {
            return $response->json();
        }

        return [];
    }
}
