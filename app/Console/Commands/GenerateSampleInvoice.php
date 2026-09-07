<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Deal;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\File;

class GenerateSampleInvoice extends Command
{
    protected $signature = 'invoice:generate {deal_id? : Optional Deal ID}';
    protected $description = 'Generates an official sample CarStrado PDF invoice to storage/app/public and artifact folder';

    public function handle()
    {
        $dealId = $this->argument('deal_id');
        $deal = $dealId 
            ? Deal::with(['buyer', 'dealer', 'vehicle'])->findOrFail($dealId)
            : Deal::with(['buyer', 'dealer', 'vehicle'])->first();

        if (!$deal) {
            $this->error("No deal found in database. Please seed the database first.");
            return Command::FAILURE;
        }

        $invoiceRef = 'INV-' . strtoupper(substr(md5($deal->reference_code . '-' . $deal->id), 0, 8));

        $this->info("Rendering PDF Invoice for Deal: {$deal->reference_code} (Ref: {$invoiceRef})...");

        $pdf = Pdf::loadView('pdf.deal_invoice', [
            'deal' => $deal,
            'invoiceRef' => $invoiceRef,
            'company' => config('app.company'),
        ]);

        $fileName = "Invoice_{$invoiceRef}_{$deal->reference_code}.pdf";
        $storagePath = storage_path("app/public/{$fileName}");
        
        File::ensureDirectoryExists(storage_path('app/public'));
        File::put($storagePath, $pdf->output());

        $this->info("===============================================");
        $this->info(" CARSTRADO OFFICIAL INVOICE GENERATED ");
        $this->info("===============================================");
        $this->info(" - Client: " . ($deal->buyer->name ?? 'N/A') . " (" . ($deal->buyer->email ?? '') . ")");
        $this->info(" - Vehicle: {$deal->vehicle->year} {$deal->vehicle->make} {$deal->vehicle->model} (VIN: {$deal->vehicle->vin})");
        $this->info(" - Total Escrow Amount: €" . number_format($deal->total_amount, 2));
        $this->info(" - File Saved: {$storagePath}");
        $this->info("===============================================");

        return Command::SUCCESS;
    }
}
