<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use App\Models\Vehicle;
use App\Models\Deal;

class ClearVehicles extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'vehicles:clear {--force : Force deletion without confirmation prompt}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Safely removes all vehicles and their related data from CarStrado database';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $force = $this->option('force');
        $count = Vehicle::count();

        if ($count === 0) {
            $this->info("Vehicles table is already empty. Nothing to clear.");
            return Command::SUCCESS;
        }

        if (!$force && !$this->confirm("Are you sure you want to delete ALL {$count} vehicles and related deals? This cannot be undone!")) {
            $this->warn("Operation cancelled by user.");
            return Command::SUCCESS;
        }

        $this->info("Purging vehicles and associated records...");

        DB::transaction(function () {
            // Optional: delete associated deals or disassociate
            Deal::query()->delete();
            
            // Delete vehicles
            Vehicle::query()->delete();
        });

        // Reset auto increment counter if on MySQL
        try {
            DB::statement('ALTER TABLE vehicles AUTO_INCREMENT = 1;');
        } catch (\Exception $e) {
            // Ignore for non-MySQL or restricted environments
        }

        // Clear application and route cache
        try {
            Artisan::call('cache:clear');
        } catch (\Exception $e) {
            $this->warn("Cache clear warning: " . $e->getMessage());
        }

        $this->info("===============================================");
        $this->info(" CARSTRADO VEHICLES CLEARED SUCCESSFULLY ");
        $this->info("===============================================");
        $this->info(" - Deleted Vehicles: {$count}");
        $this->info(" - Application Cache Purged");
        $this->info("===============================================");

        return Command::SUCCESS;
    }
}
