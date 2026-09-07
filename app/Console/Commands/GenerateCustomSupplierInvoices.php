<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Deal;
use App\Models\Vehicle;
use App\Models\Dealer;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\File;

class GenerateCustomSupplierInvoices extends Command
{
    protected $signature = 'invoices:generate-custom-supplier';
    protected $description = 'Generates 2 Supplier Payout Invoices corresponding to Porsche Cayenne (30,800 EUR deal -> 27,250 EUR payout) and BMW 530 (18,230 EUR deal -> 16,100 EUR payout)';

    public function handle()
    {
        $this->info("Generating 2 Supplier Payout Invoices for Porsche Cayenne & BMW 530...");

        $deal1 = Deal::with(['dealer', 'vehicle'])->where('reference_code', 'CB-CAY-30800')->first();
        $deal2 = Deal::with(['dealer', 'vehicle'])->where('reference_code', 'CB-BMW-18230')->first();

        if (!$deal1 || !$deal2) {
            $this->error("Deals not found. Please run invoices:generate-custom first.");
            return Command::FAILURE;
        }

        $outDir = storage_path('app/public/invoices');
        File::ensureDirectoryExists($outDir);
        $company = config('app.company');

        // 1. Supplier Payout 1: Porsche Center Stuttgart (Porsche Cayenne)
        $ref1_supp = 'PO-CAY308-' . strtoupper(substr(md5($deal1->reference_code . '-supplier-stuttgart'), 0, 4));
        $pdf1_supp = Pdf::loadView('pdf.supplier_payout_invoice', [
            'deal' => $deal1,
            'invoiceRef' => $ref1_supp,
            'company' => $company,
        ]);
        $path1_supp = "{$outDir}/SUPPLIER_PAYOUT_Porsche_Cayenne_27250_Porsche_Stuttgart.pdf";
        File::put($path1_supp, $pdf1_supp->output());

        // 2. Supplier Payout 2: Bavaria Motors Munich (BMW 530 2016)
        $ref2_supp = 'PO-BMW182-' . strtoupper(substr(md5($deal2->reference_code . '-supplier-munich'), 0, 4));
        $pdf2_supp = Pdf::loadView('pdf.supplier_payout_invoice', [
            'deal' => $deal2,
            'invoiceRef' => $ref2_supp,
            'company' => $company,
        ]);
        $path2_supp = "{$outDir}/SUPPLIER_PAYOUT_BMW_530_2016_16100_Bavaria_Motors.pdf";
        File::put($path2_supp, $pdf2_supp->output());

        $this->info("============================================================");
        $this->info(" 2 SUPPLIER PAYOUT INVOICES GENERATED ");
        $this->info("============================================================");
        $this->info(" [1] Vendor: {$deal1->dealer->name} ({$deal1->dealer->city}, {$deal1->dealer->country})");
        $this->info("     Vehicle: {$deal1->vehicle->year} {$deal1->vehicle->make} {$deal1->vehicle->model} (VIN: {$deal1->vehicle->vin})");
        $this->info("     Dealer Payout: €" . number_format($deal1->agreed_price, 2) . " EUR");
        $this->info("     File: {$path1_supp}");
        $this->info("------------------------------------------------------------");
        $this->info(" [2] Vendor: {$deal2->dealer->name} ({$deal2->dealer->city}, {$deal2->dealer->country})");
        $this->info("     Vehicle: {$deal2->vehicle->year} {$deal2->vehicle->make} {$deal2->vehicle->model} (VIN: {$deal2->vehicle->vin})");
        $this->info("     Dealer Payout: €" . number_format($deal2->agreed_price, 2) . " EUR");
        $this->info("     File: {$path2_supp}");
        $this->info("============================================================");

        return Command::SUCCESS;
    }
}
