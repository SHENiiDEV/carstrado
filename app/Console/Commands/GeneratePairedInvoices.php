<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Deal;
use App\Models\Vehicle;
use App\Models\User;
use App\Models\Dealer;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\File;

class GeneratePairedInvoices extends Command
{
    protected $signature = 'invoices:generate-paired';
    protected $description = 'Generates 2 Client Invoices and 2 Supplier Payout Invoices for 2 distinct luxury vehicles';

    public function handle()
    {
        $this->info("Initializing generation of 4 Invoices (2 Client Invoices + 2 Supplier Invoices)...");

        $buyer = User::where('email', 'buyer@carstrado.com')->first();
        $fleetBuyer = User::where('email', 'fleet@carstrado.com')->first();
        
        $vehicles = Vehicle::with('dealer')->limit(2)->get();

        if ($vehicles->count() < 2) {
            $this->error("Not enough vehicles in database. Please seed first.");
            return Command::FAILURE;
        }

        $v1 = $vehicles[0]; // e.g. Porsche Taycan Turbo S
        $v2 = $vehicles[1]; // e.g. BMW i7 xDrive60

        // Ensure 2 Deals exist for these 2 vehicles
        $deal1 = Deal::updateOrCreate(
            ['reference_code' => 'CB-LON-90412'],
            [
                'buyer_id' => $buyer->id,
                'dealer_id' => $v1->dealer_id,
                'vehicle_id' => $v1->id,
                'type' => 'retail',
                'quantity' => 1,
                'agreed_price' => $v1->price_eur,
                'commission_rate' => 4.50,
                'commission_amount' => round(($v1->price_eur * 4.5) / 100, 2),
                'estimated_tax_vat' => round($v1->price_eur * 0.081, 2),
                'delivery_fee' => 450.00,
                'total_amount' => $v1->price_eur + round(($v1->price_eur * 4.5) / 100, 2) + round($v1->price_eur * 0.081, 2) + 450.00,
                'status' => 'escrow_funded',
                'escrow_status' => 'holding',
                'buyer_notes' => 'White-glove transporter delivery requested to London Mayfair residence.',
                'broker_notes' => '150-Point TÜV inspection passed. Escrow funds secured in Wise Tier-1 segregated vault.',
            ]
        );

        $deal2 = Deal::updateOrCreate(
            ['reference_code' => 'CB-FLT-88219'],
            [
                'buyer_id' => $fleetBuyer->id,
                'dealer_id' => $v2->dealer_id,
                'vehicle_id' => $v2->id,
                'type' => 'b2b_fleet',
                'quantity' => 1,
                'agreed_price' => $v2->price_eur,
                'commission_rate' => 3.50,
                'commission_amount' => round(($v2->price_eur * 3.5) / 100, 2),
                'estimated_tax_vat' => 0.00, // B2B Reverse Charge
                'delivery_fee' => 650.00,
                'total_amount' => $v2->price_eur + round(($v2->price_eur * 3.5) / 100, 2) + 650.00,
                'status' => 'logistics_in_transit',
                'escrow_status' => 'holding',
                'buyer_notes' => 'Corporate B2B Fleet Procurement. VIES VAT Reverse Charge validated.',
                'broker_notes' => 'En-route via CarStrado Alpine Express Logistics transporter.',
            ]
        );

        $outDir = storage_path('app/public/invoices');
        File::ensureDirectoryExists($outDir);

        $company = config('app.company');

        // 1. Client Invoice 1 (Porsche Taycan)
        $ref1_client = 'INV-' . strtoupper(substr(md5($deal1->reference_code . '-client'), 0, 8));
        $pdf1_client = Pdf::loadView('pdf.deal_invoice', [
            'deal' => $deal1,
            'invoiceRef' => $ref1_client,
            'company' => $company,
        ]);
        $path1_c = "{$outDir}/01_CLIENT_INVOICE_{$ref1_client}_Porsche_Taycan.pdf";
        File::put($path1_c, $pdf1_client->output());

        // 2. Supplier Payout Invoice 1 (Porsche Taycan - Vendor: Porsche Center Zurich)
        $ref1_supp = 'PO-' . strtoupper(substr(md5($deal1->reference_code . '-supplier'), 0, 8));
        $pdf1_supp = Pdf::loadView('pdf.supplier_payout_invoice', [
            'deal' => $deal1,
            'invoiceRef' => $ref1_supp,
            'company' => $company,
        ]);
        $path1_s = "{$outDir}/02_SUPPLIER_PAYOUT_{$ref1_supp}_Porsche_Taycan.pdf";
        File::put($path1_s, $pdf1_supp->output());

        // 3. Client Invoice 2 (BMW i7 xDrive60)
        $ref2_client = 'INV-' . strtoupper(substr(md5($deal2->reference_code . '-client'), 0, 8));
        $pdf2_client = Pdf::loadView('pdf.deal_invoice', [
            'deal' => $deal2,
            'invoiceRef' => $ref2_client,
            'company' => $company,
        ]);
        $path2_c = "{$outDir}/03_CLIENT_INVOICE_{$ref2_client}_BMW_i7.pdf";
        File::put($path2_c, $pdf2_client->output());

        // 4. Supplier Payout Invoice 2 (BMW i7 xDrive60 - Vendor: AutoHaus Munich)
        $ref2_supp = 'PO-' . strtoupper(substr(md5($deal2->reference_code . '-supplier'), 0, 8));
        $pdf2_supp = Pdf::loadView('pdf.supplier_payout_invoice', [
            'deal' => $deal2,
            'invoiceRef' => $ref2_supp,
            'company' => $company,
        ]);
        $path2_s = "{$outDir}/04_SUPPLIER_PAYOUT_{$ref2_supp}_BMW_i7.pdf";
        File::put($path2_s, $pdf2_supp->output());

        $this->info("============================================================");
        $this->info(" 4 INVOICES GENERATED SUCCESSFULLY ");
        $this->info("============================================================");
        $this->info(" CAR 1: {$v1->year} {$v1->make} {$v1->model}");
        $this->info("  [1] Client Invoice:   {$path1_c} (€" . number_format($deal1->total_amount, 2) . ")");
        $this->info("  [2] Supplier Payout:  {$path1_s} (€" . number_format($deal1->agreed_price, 2) . ")");
        $this->info("------------------------------------------------------------");
        $this->info(" CAR 2: {$v2->year} {$v2->make} {$v2->model}");
        $this->info("  [3] Client Invoice:   {$path2_c} (€" . number_format($deal2->total_amount, 2) . ")");
        $this->info("  [4] Supplier Payout:  {$path2_s} (€" . number_format($deal2->agreed_price, 2) . ")");
        $this->info("============================================================");

        return Command::SUCCESS;
    }
}
