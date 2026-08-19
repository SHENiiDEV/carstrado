<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\VehicleImporterService;

class ImportVehiclesCommand extends Command
{
    protected $signature = 'import:vehicles {--source=sample : Source type (sample, json, api)} {--url= : Feed or API URL}';

    protected $description = 'Import or parse vehicles from external feeds, JSON data, or scrapers';

    public function handle(VehicleImporterService $importer)
    {
        $this->info('Starting vehicle inventory import process...');

        $source = $this->option('source');
        $url = $this->option('url');

        $sampleData = [
            [
                'vin' => 'WBA31EF090CL' . rand(10000, 99999),
                'make' => 'BMW',
                'model' => 'i4 eDrive40',
                'trim' => 'M Sport Package 83.9kWh',
                'year' => 2024,
                'price_eur' => 64500,
                'mileage_km' => 6200,
                'fuel_type' => 'electric',
                'transmission' => 'Automatic',
                'body_style' => 'Gran Coupe',
                'color' => 'Portimao Blue',
                'location_country' => 'DE',
                'location_city' => 'Frankfurt',
                'images' => [
                    'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=80',
                ],
                'features' => ['BMW Curved Display', 'Parking Assistant Plus', 'M Sport Brakes', 'Harman Kardon Surround'],
                'is_fleet_eligible' => true,
            ],
            [
                'vin' => 'WAUZZZF20PN' . rand(10000, 99999),
                'make' => 'Audi',
                'model' => 'Q4 e-tron 45',
                'trim' => 'S line 82kWh Quattro',
                'year' => 2024,
                'price_eur' => 58900,
                'mileage_km' => 4500,
                'fuel_type' => 'electric',
                'transmission' => 'Automatic',
                'body_style' => 'SUV',
                'color' => 'Pebble Gray',
                'location_country' => 'CH',
                'location_city' => 'Basel',
                'images' => [
                    'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1000&q=80',
                ],
                'features' => ['SONOS Premium Sound', 'Augmented Reality Head-Up Display', 'Matrix LED', 'Adaptive Cruise Control'],
                'is_fleet_eligible' => true,
            ],
            [
                'vin' => 'WP0ZZZ91ZPS' . rand(10000, 99999),
                'make' => 'Porsche',
                'model' => 'Macan Electric Turbo',
                'trim' => '100kWh 639hp Performance',
                'year' => 2024,
                'price_eur' => 118000,
                'mileage_km' => 1200,
                'fuel_type' => 'electric',
                'transmission' => 'Automatic',
                'body_style' => 'SUV',
                'color' => 'Oak Green Metallic',
                'location_country' => 'CH',
                'location_city' => 'Zurich',
                'images' => [
                    'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1000&q=80',
                ],
                'features' => ['Rear-Axle Steering', 'Porsche Active Suspension Management', 'Passenger Display', 'Sport Chrono'],
                'is_fleet_eligible' => false,
            ],
        ];

        $items = $sampleData;

        if ($url) {
            $this->info("Fetching feed from: {$url}");
            $fetched = $importer->fetchFromUrl($url);
            if (!empty($fetched)) {
                $items = $fetched;
            }
        }

        $result = $importer->importVehicles($items);

        $this->table(
            ['Metric', 'Count'],
            [
                ['New Vehicles Created', $result['imported']],
                ['Existing Vehicles Updated', $result['updated']],
                ['Total Processed', $result['total_processed']],
            ]
        );

        $this->info('Vehicle import completed successfully!');
    }
}
