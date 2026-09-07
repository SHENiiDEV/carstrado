<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\File;

class GenerateExternalPlatformInvoices extends Command
{
    protected $signature = 'invoices:generate-external';
    protected $description = 'Generates 2 minimalist external wholesale platform invoices where supplier originally bought the cars';

    public function handle()
    {
        $this->info("Generating 2 Minimalist External Platform Invoices for Suppliers...");

        $outDir = storage_path('app/public/invoices');
        File::ensureDirectoryExists($outDir);

        // 1. External Invoice for Porsche Cayenne (Purchased from European Auto Remarketing Network B.V. - Netherlands)
        $invoice1Data = [
            'platform_name' => 'AUTO1 REMARKETING BV',
            'platform_tagline' => 'European Wholesale Vehicle Remarketing & B2B Trading Network',
            'invoice_number' => 'AR-EU-2026-90412',
            'date' => '02 Sep 2026',
            'payment_ref' => 'SEPA-TRX-894102-NL',
            'seller' => [
                'name' => 'Auto1 European Remarketing B.V.',
                'address' => 'Keizersgracht 421, 1016 EK Amsterdam, Netherlands',
                'vat_id' => 'NL857492018B01',
                'reg_no' => 'KVK 68491023',
                'email' => 'invoicing@auto1-remarketing.eu',
            ],
            'buyer' => [
                'name' => 'Porsche Center Stuttgart GmbH',
                'address' => 'Porscheplatz 1, 70435 Stuttgart, Germany',
                'vat_id' => 'DE-BW-STG-994102',
                'account_id' => 'DE-DEALER-40918',
                'email' => 'sourcing@porsche-stuttgart.de',
            ],
            'vehicle' => [
                'title' => '2021 Porsche Cayenne S 3.0 V6 Platinum Edition',
                'vin' => 'WP1ZZZ92ZMLA48190',
                'mileage' => '58,200 km',
                'color' => 'Jet Black Metallic',
                'base_price' => 25800.00,
            ],
            'fees' => [
                [
                    'title' => 'Wholesale Platform Buyer Transaction Fee',
                    'desc' => 'Dealer wholesale processing, title transfer & digital documentation',
                    'amount' => 450.00,
                ],
                [
                    'title' => 'DEKRA Pre-Purchase Technical Condition Report',
                    'desc' => '150-Point digital condition protocol and battery diagnostic check',
                    'amount' => 250.00,
                ],
            ],
            'subtotal' => 26500.00,
            'total' => 26500.00, // Wholesale purchase price by the supplier
        ];

        $pdf1 = Pdf::loadView('pdf.external_platform_invoice', ['invoiceData' => $invoice1Data]);
        $path1 = "{$outDir}/EXTERNAL_PLATFORM_INVOICE_Porsche_Cayenne_Auto1.pdf";
        File::put($path1, $pdf1->output());

        // 2. External Invoice for BMW 530 (Purchased from BCA European Vehicle Auctions - Germany)
        $invoice2Data = [
            'platform_name' => 'BCA EUROPEAN AUCTIONS',
            'platform_tagline' => 'BCA Auto Auktionen GmbH &bull; European Fleet & Dealer Exchange',
            'invoice_number' => 'BCA-DE-2026-44182',
            'date' => '03 Sep 2026',
            'payment_ref' => 'SEPA-BCA-551029-DE',
            'seller' => [
                'name' => 'BCA Auto Auktionen GmbH',
                'address' => 'Floßhafenstraße 5, 41460 Neuss, Germany',
                'vat_id' => 'DE120689401',
                'reg_no' => 'HRB 10492 Neuss',
                'email' => 'accounts@bca-europe.com',
            ],
            'buyer' => [
                'name' => 'Bavaria Motors Munich GmbH',
                'address' => 'Frankfurter Ring 35, 80807 Munich, Germany',
                'vat_id' => 'DE-BY-MUC-882019',
                'account_id' => 'BCA-BUYER-8849',
                'email' => 'purchasing@bavaria-motors.de',
            ],
            'vehicle' => [
                'title' => '2016 BMW 530d xDrive M Sport Luxury Package (F10)',
                'vin' => 'WBA5A71020G194821',
                'mileage' => '114,000 km',
                'color' => 'Sophisto Grey Brilliant Effect',
                'base_price' => 15200.00,
            ],
            'fees' => [
                [
                    'title' => 'Auction Buyer Premium & Platform Handling',
                    'desc' => 'BCA commercial vehicle auction fee & digital title management',
                    'amount' => 380.00,
                ],
                [
                    'title' => 'TÜV Rheinland Technical Audit & Export Dossier',
                    'desc' => 'Full inspection report, COC certificate check & vehicle dossier',
                    'amount' => 220.00,
                ],
            ],
            'subtotal' => 15800.00,
            'total' => 15800.00, // Wholesale purchase price by the supplier
        ];

        $pdf2 = Pdf::loadView('pdf.external_platform_invoice', ['invoiceData' => $invoice2Data]);
        $path2 = "{$outDir}/EXTERNAL_PLATFORM_INVOICE_BMW_530_BCA_Auctions.pdf";
        File::put($path2, $pdf2->output());

        $this->info("============================================================");
        $this->info(" 2 MINIMALIST EXTERNAL PLATFORM INVOICES GENERATED ");
        $this->info("============================================================");
        $this->info(" [1] Platform: {$invoice1Data['platform_name']}");
        $this->info("     Buyer (Supplier): {$invoice1Data['buyer']['name']}");
        $this->info("     Vehicle: {$invoice1Data['vehicle']['title']}");
        $this->info("     Total Wholesale Paid: €" . number_format($invoice1Data['total'], 2) . " EUR");
        $this->info("     File: {$path1}");
        $this->info("------------------------------------------------------------");
        $this->info(" [2] Platform: {$invoice2Data['platform_name']}");
        $this->info("     Buyer (Supplier): {$invoice2Data['buyer']['name']}");
        $this->info("     Vehicle: {$invoice2Data['vehicle']['title']}");
        $this->info("     Total Wholesale Paid: €" . number_format($invoice2Data['total'], 2) . " EUR");
        $this->info("     File: {$path2}");
        $this->info("============================================================");

        return Command::SUCCESS;
    }
}
