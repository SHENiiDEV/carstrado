<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Artisan;
use App\Models\Vehicle;

class ImportVehiclesJson extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'vehicles:import-json {path : Path to vehicles_dataset.json file}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Imports luxury vehicle listings from JSON dataset into CarStrado vehicles table';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $filePath = $this->argument('path');

        if (!File::exists($filePath)) {
            $this->error("Error: File not found at '{$filePath}'");
            return Command::FAILURE;
        }

        $this->info("Reading JSON dataset from '{$filePath}'...");
        $jsonContent = File::get($filePath);
        $vehicles = json_decode($jsonContent, true);

        if (!is_array($vehicles)) {
            $this->error("Error: Invalid JSON structure in dataset file.");
            return Command::FAILURE;
        }

        $this->info("Found " . count($vehicles) . " vehicle records. Processing import...");
        $this->output->progressStart(count($vehicles));

        $imported = 0;
        $updated = 0;
        $failed = 0;

        foreach ($vehicles as $data) {
            // Validate incoming record schema
            $validator = Validator::make($data, [
                'dealer_id'        => 'required|integer',
                'vin'              => 'required|string|size:17',
                'make'             => 'required|string|max:100',
                'model'            => 'required|string|max:100',
                'trim'             => 'required|string|max:150',
                'year'             => 'required|integer|between:2021,2026',
                'price_eur'        => 'required|numeric|min:0',
                'mileage_km'       => 'required|integer|min:0',
                'fuel_type'        => 'required|string|in:petrol,diesel,electric,hybrid,plug_in_hybrid',
                'transmission'     => 'required|string|in:Automatic,Manual,Dual-Clutch PDK,Sequential',
                'body_style'       => 'required|string|in:Coupe,Sedan,SUV,Convertible,Wagon',
                'color'            => 'required|string|max:100',
                'location_country' => 'required|string|size:2',
                'location_city'    => 'required|string|max:100',
                'images_json'      => 'required|array|min:1',
                'features_json'    => 'present|array',
                'is_fleet_eligible'=> 'required|boolean',
                'status'           => 'required|string|max:30',
            ]);

            if ($validator->fails()) {
                $this->warn("Skipping record VIN {$data['vin']}: " . implode(', ', $validator->errors()->all()));
                $failed++;
                $this->output->progressAdvance();
                continue;
            }

            // Update or Create vehicle record by unique VIN
            $vehicle = Vehicle::updateOrCreate(
                ['vin' => $data['vin']],
                [
                    'dealer_id'        => $data['dealer_id'],
                    'make'             => $data['make'],
                    'model'            => $data['model'],
                    'trim'             => $data['trim'],
                    'year'             => $data['year'],
                    'price_eur'        => $data['price_eur'],
                    'mileage_km'       => $data['mileage_km'],
                    'fuel_type'        => $data['fuel_type'],
                    'transmission'     => $data['transmission'],
                    'body_style'       => $data['body_style'],
                    'color'            => $data['color'],
                    'location_country' => $data['location_country'],
                    'location_city'    => $data['location_city'],
                    'images_json'      => $data['images_json'],
                    'features_json'    => $data['features_json'],
                    'is_fleet_eligible'=> $data['is_fleet_eligible'],
                    'status'           => $data['status'],
                ]
            );

            if ($vehicle->wasRecentlyCreated) {
                $imported++;
            } else {
                $updated++;
            }

            $this->output->progressAdvance();
        }

        $this->output->progressFinish();

        // Clear CarStrado catalog cache
        $this->info("Clearing application cache...");
        try {
            Artisan::call('cache:clear');
        } catch (\Exception $e) {
            $this->warn("Cache clear warning: " . $e->getMessage());
        }

        $this->info("===============================================");
        $this->info(" CARSTRADO VEHICLE IMPORT COMPLETED ");
        $this->info("===============================================");
        $this->info(" - New Vehicles Inserted: {$imported}");
        $this->info(" - Existing Vehicles Updated: {$updated}");
        $this->info(" - Invalid Records Skipped: {$failed}");
        $this->info("===============================================");

        return Command::SUCCESS;
    }
}
