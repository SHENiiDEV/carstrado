<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\File;

class GenerateDesignersUpNorthInvoices extends Command
{
    protected $signature = 'invoices:generate-agency';
    protected $description = 'Generates 2 Milestone Invoices from DESIGNERS UP NORTH LTD (Milestone 1: Design €17,500 & Milestone 2: Development €22,799)';

    public function handle()
    {
        $this->info("Generating 2 Milestone Invoices from DESIGNERS UP NORTH LTD to BASILDON LIMITED...");

        $outDir = storage_path('app/public/invoices');
        File::ensureDirectoryExists($outDir);

        $seller = [
            'name' => 'DESIGNERS UP NORTH LTD',
            'address' => "Primrose House\n6 Blackboy Road\nExeter, Devon\nEX4 6SG, United Kingdom",
            'company_no' => '08364555',
            'vat_no' => 'GB 479 9722 18',
            'email' => 'studio@designersupnorth.com',
        ];

        $buyer = [
            'name' => 'BASILDON LIMITED',
            'address' => "2 Navarre Street\nLondon, England\nE2 7JH, United Kingdom",
            'company_no' => '16290553',
            'project' => 'CarStrado.com (European Automotive Sourcing & Escrow Vault)',
            'email' => 'support@carstrado.com',
        ];

        // 1. Milestone 1: Design & Brand Engineering - €17,500.00 EUR
        $invoice1Data = [
            'invoice_title' => 'Milestone Invoice 01',
            'invoice_number' => 'DUN-2026-MS01',
            'milestone_ref' => 'MS-01: UX/UI & Brand Architecture',
            'date' => '14 Aug 2026',
            'payment_ref' => 'BACS-DUN-991048-MS1',
            'seller' => $seller,
            'buyer' => $buyer,
            'items' => [
                [
                    'title' => 'CarStrado Institutional Brand Identity & Visual System',
                    'desc' => 'High-ticket automotive visual language, typography scales, logo suites, vector assets, and brand design guidelines.',
                    'qty' => 1,
                    'rate' => 6500.00,
                    'amount' => 6500.00,
                ],
                [
                    'title' => 'End-to-End Product UX/UI Design & Responsive Layouts (Figma Master)',
                    'desc' => 'Interactive high-fidelity prototypes for Vehicle Catalog, Deal Tracker, 7-Step Escrow Pipeline, Compliance Vault, and Mobile Right Drawer.',
                    'qty' => 1,
                    'rate' => 7800.00,
                    'amount' => 7800.00,
                ],
                [
                    'title' => 'B2B Document & Email Template Systems',
                    'desc' => 'Custom typography vector layouts for B2B PDF Invoices, Certificate templates, Transactional dark-mode emails, and SLA portals.',
                    'qty' => 1,
                    'rate' => 3200.00,
                    'amount' => 3200.00,
                ],
            ],
            'net_amount' => 17500.00,
            'total_amount' => 17500.00,
        ];

        $pdf1 = Pdf::loadView('pdf.b2b_service_invoice', ['invoiceData' => $invoice1Data]);
        $path1 = "{$outDir}/01_DESIGNERS_UP_NORTH_Milestone1_Design_17500_EUR.pdf";
        File::put($path1, $pdf1->output());

        // 2. Milestone 2: Full-Stack Platform Development - €22,799.00 EUR
        $invoice2Data = [
            'invoice_title' => 'Milestone Invoice 02',
            'invoice_number' => 'DUN-2026-MS02',
            'milestone_ref' => 'MS-02: Platform Engineering & Integration',
            'date' => '04 Sep 2026',
            'payment_ref' => 'BACS-DUN-992147-MS2',
            'seller' => $seller,
            'buyer' => $buyer,
            'items' => [
                [
                    'title' => 'Full-Stack Architecture Implementation (Laravel 12 + Inertia.js + React 18)',
                    'desc' => 'Core application architecture, multi-role authentication (B2C, B2B Fleet, Dealer, Broker Admin), and live state management.',
                    'qty' => 1,
                    'rate' => 9500.00,
                    'amount' => 9500.00,
                ],
                [
                    'title' => 'Escrow Pipeline, Deal State Machine & Security Integrations',
                    'desc' => 'Automated compliance checklist engine (KYC, VQF AML, DEKRA 150-Point Audit), Cloudflare Turnstile anti-bot protection, and logistics tracking.',
                    'qty' => 1,
                    'rate' => 7800.00,
                    'amount' => 7800.00,
                ],
                [
                    'title' => 'B2B PDF Rendering Engine, Automated Mail Transport & API Services',
                    'desc' => 'Server-side DomPDF vector generation engine, SMTP transactional mailers with memory attachments, and Playwright vehicle scraper automation.',
                    'qty' => 1,
                    'rate' => 5499.00,
                    'amount' => 5499.00,
                ],
            ],
            'net_amount' => 22799.00,
            'total_amount' => 22799.00,
        ];

        $pdf2 = Pdf::loadView('pdf.b2b_service_invoice', ['invoiceData' => $invoice2Data]);
        $path2 = "{$outDir}/02_DESIGNERS_UP_NORTH_Milestone2_Development_22799_EUR.pdf";
        File::put($path2, $pdf2->output());

        $this->info("============================================================");
        $this->info(" 2 MILESTONE INVOICES GENERATED SUCCESSFULLY ");
        $this->info("============================================================");
        $this->info(" Provider: {$seller['name']} (Exeter, UK)");
        $this->info(" Client:   {$buyer['name']} (CarStrado.com)");
        $this->info("------------------------------------------------------------");
        $this->info(" [1] Milestone 1 (Design):      €" . number_format($invoice1Data['total_amount'], 2) . " EUR");
        $this->info("     File: {$path1}");
        $this->info("------------------------------------------------------------");
        $this->info(" [2] Milestone 2 (Development): €" . number_format($invoice2Data['total_amount'], 2) . " EUR");
        $this->info("     File: {$path2}");
        $this->info("============================================================");

        return Command::SUCCESS;
    }
}
