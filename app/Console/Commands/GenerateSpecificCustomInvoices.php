<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Deal;
use App\Models\Vehicle;
use App\Models\User;
use App\Models\Dealer;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;

class GenerateSpecificCustomInvoices extends Command
{
    protected $signature = 'invoices:generate-custom';
    protected $description = 'Generates 2 custom client invoices on different names: Porsche Cayenne (30,800 EUR) & BMW 530 2016 (18,230 EUR)';

    public function handle()
    {
        $this->info("Creating users and generating 2 custom client invoices...");

        // 1. Client 1: Marcus Vance (Porsche Cayenne)
        $client1 = User::updateOrCreate(
            ['email' => 'marcus.vance@vanceholdings.co.uk'],
            [
                'name' => 'Marcus Vance',
                'password' => Hash::make('password'),
                'role' => 'retail_buyer',
                'company_name' => 'Vance Capital Partners Ltd',
                'vat_number' => 'GB394810294',
                'phone' => '+44 20 7946 8812',
                'country' => 'GB',
            ]
        );

        // 2. Client 2: Elena Rostova (BMW 530)
        $client2 = User::updateOrCreate(
            ['email' => 'elena.rostova@nordictransit.com'],
            [
                'name' => 'Elena Rostova',
                'password' => Hash::make('password'),
                'role' => 'retail_buyer',
                'company_name' => 'Nordic Luxury Mobility GmbH',
                'vat_number' => 'DE318492014',
                'phone' => '+49 89 4410 9283',
                'country' => 'DE',
            ]
        );

        $dealerPorsche = Dealer::firstOrCreate(
            ['name' => 'Porsche Center Stuttgart'],
            [
                'license_number' => 'DE-BW-STG-994102',
                'country' => 'DE',
                'city' => 'Stuttgart',
                'address' => 'Porscheplatz 1, 70435 Stuttgart',
                'rating' => 4.95,
                'is_verified' => true,
                'brands_json' => ['Porsche'],
            ]
        );

        $dealerBMW = Dealer::firstOrCreate(
            ['name' => 'Bavaria Motors Munich'],
            [
                'license_number' => 'DE-BY-MUC-882019',
                'country' => 'DE',
                'city' => 'Munich',
                'address' => 'Frankfurter Ring 35, 80807 Munich',
                'rating' => 4.92,
                'is_verified' => true,
                'brands_json' => ['BMW'],
            ]
        );

        // Vehicle 1: Porsche Cayenne (Base vehicle price + fees = €30,800.00 Total)
        // Vehicle Price: €27,250.00
        // Broker Commission (4.5%): €1,226.25
        // Customs Clearance & VAT: €1,873.75
        // Enclosed Transport: €450.00
        // Total: €30,800.00
        $cayenne = Vehicle::updateOrCreate(
            ['vin' => 'WP1ZZZ92ZMLA48190'],
            [
                'dealer_id' => $dealerPorsche->id,
                'make' => 'Porsche',
                'model' => 'Cayenne',
                'trim' => 'S 3.0 V6 Platinum Edition Panoramic',
                'year' => 2021,
                'price_eur' => 27250.00,
                'mileage_km' => 58200,
                'fuel_type' => 'petrol',
                'transmission' => 'Tiptronic S 8-Speed',
                'body_style' => 'SUV',
                'color' => 'Jet Black Metallic',
                'location_country' => 'DE',
                'location_city' => 'Stuttgart',
                'is_fleet_eligible' => true,
                'status' => 'available',
                'images_json' => [
                    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80',
                ],
                'features_json' => ['PASM Air Suspension', 'Panoramic Roof', 'BOSE Surround Sound', 'PDLS+ Matrix LED']
            ]
        );

        $deal1 = Deal::updateOrCreate(
            ['reference_code' => 'CB-CAY-30800'],
            [
                'buyer_id' => $client1->id,
                'dealer_id' => $dealerPorsche->id,
                'vehicle_id' => $cayenne->id,
                'type' => 'retail',
                'quantity' => 1,
                'agreed_price' => 27250.00,
                'commission_rate' => 4.50,
                'commission_amount' => 1226.25,
                'estimated_tax_vat' => 1873.75,
                'delivery_fee' => 450.00,
                'total_amount' => 30800.00,
                'status' => 'escrow_funded',
                'escrow_status' => 'holding',
                'buyer_notes' => 'White-glove transporter delivery to London Kensington office.',
                'broker_notes' => '150-Point DEKRA technical audit verified. Title cleared.',
            ]
        );

        // Vehicle 2: BMW 530 2016 (Base vehicle price + fees = €18,230.00 Total)
        // Vehicle Price: €16,100.00
        // Broker Commission (4.5%): €724.50
        // Customs Clearance & VAT: €955.50
        // Transport Delivery: €450.00
        // Total: €18,230.00
        $bmw = Vehicle::updateOrCreate(
            ['vin' => 'WBA5A71020G194821'],
            [
                'dealer_id' => $dealerBMW->id,
                'make' => 'BMW',
                'model' => '530',
                'trim' => 'd xDrive M Sport Luxury Package (F10)',
                'year' => 2016,
                'price_eur' => 16100.00,
                'mileage_km' => 114000,
                'fuel_type' => 'diesel',
                'transmission' => 'Steptronic Sport 8-Speed',
                'body_style' => 'Sedan',
                'color' => 'Sophisto Grey Brilliant Effect',
                'location_country' => 'DE',
                'location_city' => 'Munich',
                'is_fleet_eligible' => true,
                'status' => 'available',
                'images_json' => [
                    'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=80',
                ],
                'features_json' => ['M Aerodynamics Package', 'Harman Kardon Surround', 'Head-Up Display', 'Comfort Seats Nappa Leather']
            ]
        );

        $deal2 = Deal::updateOrCreate(
            ['reference_code' => 'CB-BMW-18230'],
            [
                'buyer_id' => $client2->id,
                'dealer_id' => $dealerBMW->id,
                'vehicle_id' => $bmw->id,
                'type' => 'retail',
                'quantity' => 1,
                'agreed_price' => 16100.00,
                'commission_rate' => 4.50,
                'commission_amount' => 724.50,
                'estimated_tax_vat' => 955.50,
                'delivery_fee' => 450.00,
                'total_amount' => 18230.00,
                'status' => 'escrow_funded',
                'escrow_status' => 'holding',
                'buyer_notes' => 'Direct logistics shipment to Munich Bavaria depot.',
                'broker_notes' => 'TÜV SÜD Hauptuntersuchung report attached. Clean service book history.',
            ]
        );

        $outDir = storage_path('app/public/invoices');
        File::ensureDirectoryExists($outDir);
        $company = config('app.company');

        // Render Invoice 1: Marcus Vance - Porsche Cayenne (€30,800.00)
        $ref1 = 'INV-CAY308-' . strtoupper(substr(md5($deal1->reference_code . '-vance'), 0, 4));
        $pdf1 = Pdf::loadView('pdf.deal_invoice', [
            'deal' => $deal1,
            'invoiceRef' => $ref1,
            'company' => $company,
        ]);
        $path1 = "{$outDir}/INVOICE_Porsche_Cayenne_30800_Marcus_Vance.pdf";
        File::put($path1, $pdf1->output());

        // Render Invoice 2: Elena Rostova - BMW 530 2016 (€18,230.00)
        $ref2 = 'INV-BMW182-' . strtoupper(substr(md5($deal2->reference_code . '-rostova'), 0, 4));
        $pdf2 = Pdf::loadView('pdf.deal_invoice', [
            'deal' => $deal2,
            'invoiceRef' => $ref2,
            'company' => $company,
        ]);
        $path2 = "{$outDir}/INVOICE_BMW_530_2016_18230_Elena_Rostova.pdf";
        File::put($path2, $pdf2->output());

        $this->info("============================================================");
        $this->info(" 2 CUSTOM CLIENT INVOICES GENERATED ");
        $this->info("============================================================");
        $this->info(" [1] Client: {$client1->name} ({$client1->email})");
        $this->info("     Vehicle: {$cayenne->year} {$cayenne->make} {$cayenne->model}");
        $this->info("     Total Amount: €" . number_format($deal1->total_amount, 2) . " EUR");
        $this->info("     File: {$path1}");
        $this->info("------------------------------------------------------------");
        $this->info(" [2] Client: {$client2->name} ({$client2->email})");
        $this->info("     Vehicle: {$bmw->year} {$bmw->make} {$bmw->model}");
        $this->info("     Total Amount: €" . number_format($deal2->total_amount, 2) . " EUR");
        $this->info("     File: {$path2}");
        $this->info("============================================================");

        return Command::SUCCESS;
    }
}
