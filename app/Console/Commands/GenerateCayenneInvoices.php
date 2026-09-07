<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Deal;
use App\Models\Vehicle;
use App\Models\User;
use App\Models\Dealer;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\File;

class GenerateCayenneInvoices extends Command
{
    protected $signature = 'invoices:generate-cayenne';
    protected $description = 'Generates Client and Supplier Invoices for Porsche Cayenne capped at 30k EUR';

    public function handle()
    {
        $this->info("Creating Porsche Cayenne (<= 30k EUR) and generating Paired Invoices...");

        $buyer = User::where('email', 'buyer@carstrado.com')->first();
        $dealer = Dealer::first();

        if (!$buyer || !$dealer) {
            $this->error("Buyer or Dealer not found.");
            return Command::FAILURE;
        }

        // Vehicle: Porsche Cayenne S Platinum Edition
        // Base Price: €26,500.00
        // Commission (4.5%): €1,192.50
        // Customs/VAT (8.1% CH/EU Sourcing): €2,146.50
        // Delivery: €161.00
        // Total: €30,000.00 Max
        $vehicle = Vehicle::updateOrCreate(
            ['vin' => 'WP1ZZZ92ZELA39102'],
            [
                'dealer_id' => $dealer->id,
                'make' => 'Porsche',
                'model' => 'Cayenne',
                'trim' => 'S 3.0 V6 Platinum Edition Panoramic',
                'year' => 2021,
                'price_eur' => 26500.00,
                'mileage_km' => 64500,
                'fuel_type' => 'petrol',
                'transmission' => 'Tiptronic S 8-Speed',
                'body_style' => 'SUV',
                'color' => 'Moonlight Blue Metallic',
                'location_country' => 'DE',
                'location_city' => 'Stuttgart',
                'is_fleet_eligible' => true,
                'status' => 'available',
                'images_json' => [
                    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80',
                ],
                'features_json' => [
                    'Panoramic Roof System',
                    'PASM Adaptive Air Suspension',
                    'BOSE Surround Sound',
                    'ParkAssist Front and Rear with Surround View',
                    '14-Way Power Seats with Memory',
                    'LED Matrix Headlights (PDLS+)'
                ]
            ]
        );

        $agreedPrice = 26500.00;
        $commissionRate = 4.50;
        $commissionAmount = 1192.50;
        $estimatedVat = 1857.50;
        $deliveryFee = 450.00;
        $totalAmount = 30000.00; // Exactly 30,000 EUR maximum cap

        $deal = Deal::updateOrCreate(
            ['reference_code' => 'CB-CAY-30000'],
            [
                'buyer_id' => $buyer->id,
                'dealer_id' => $dealer->id,
                'vehicle_id' => $vehicle->id,
                'type' => 'retail',
                'quantity' => 1,
                'agreed_price' => $agreedPrice,
                'commission_rate' => $commissionRate,
                'commission_amount' => $commissionAmount,
                'estimated_tax_vat' => $estimatedVat,
                'delivery_fee' => $deliveryFee,
                'total_amount' => $totalAmount,
                'status' => 'escrow_funded',
                'escrow_status' => 'holding',
                'buyer_notes' => 'Escrow procurement for Porsche Cayenne with total all-inclusive cap of 30,000 EUR.',
                'broker_notes' => '150-Point DEKRA inspection passed. Clean vehicle title verified. Funds in segregated Escrow Vault.',
            ]
        );

        $outDir = storage_path('app/public/invoices');
        File::ensureDirectoryExists($outDir);
        $company = config('app.company');

        // 1. Client Invoice (Total Max: 30,000 EUR)
        $refClient = 'INV-CAY30K-' . strtoupper(substr(md5($deal->reference_code . '-client'), 0, 4));
        $pdfClient = Pdf::loadView('pdf.deal_invoice', [
            'deal' => $deal,
            'invoiceRef' => $refClient,
            'company' => $company,
        ]);
        $pathClient = "{$outDir}/01_CLIENT_INVOICE_Porsche_Cayenne_30k.pdf";
        File::put($pathClient, $pdfClient->output());

        // 2. Supplier Payout Invoice (Dealer Payout: 26,500 EUR)
        $refSupp = 'PO-CAY30K-' . strtoupper(substr(md5($deal->reference_code . '-supplier'), 0, 4));
        $pdfSupp = Pdf::loadView('pdf.supplier_payout_invoice', [
            'deal' => $deal,
            'invoiceRef' => $refSupp,
            'company' => $company,
        ]);
        $pathSupp = "{$outDir}/02_SUPPLIER_PAYOUT_Porsche_Cayenne_30k.pdf";
        File::put($pathSupp, $pdfSupp->output());

        $this->info("============================================================");
        $this->info(" PORSCHE CAYENNE 30,000 EUR INVOICES GENERATED ");
        $this->info("============================================================");
        $this->info(" Vehicle: 2021 Porsche Cayenne S (VIN: WP1ZZZ92ZELA39102)");
        $this->info(" Client Invoice:  {$pathClient} (TOTAL: €30,000.00 EUR)");
        $this->info(" Supplier Payout: {$pathSupp} (DEALER NET: €26,500.00 EUR)");
        $this->info("============================================================");

        return Command::SUCCESS;
    }
}
