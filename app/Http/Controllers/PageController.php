<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    public function faq()
    {
        $faqCategories = [
            [
                'category' => 'Buying & Brokerage Process',
                'items' => [
                    [
                        'q' => 'How does the AutoBrokers brokerage model work?',
                        'a' => 'AutoBrokers acts as an independent intermediary between vehicle buyers and verified dealership networks across Switzerland, Germany, and France. We manage sourcing, price negotiation, inspection, compliance, escrow payment, and door-to-door delivery.',
                    ],
                    [
                        'q' => 'What are the brokerage commission rates?',
                        'a' => 'Our pricing is 100% transparent: 4.5% commission for retail B2C purchases and 3.5% for corporate B2B fleet orders. There are zero hidden dealer markups.',
                    ],
                    [
                        'q' => 'How fast is the turnaround from order to delivery?',
                        'a' => 'Our standard white-glove delivery takes between 48 and 72 hours from the moment escrow funds are verified and customs clearance documentation is finalized.',
                    ],
                ],
            ],
            [
                'category' => 'Escrow Payment & Protection',
                'items' => [
                    [
                        'q' => 'How does escrow protection work?',
                        'a' => 'Your funds are deposited into a Swiss/EU regulated bank escrow account (Wise Bank CH / Escrowfy). Funds remain 100% protected and are only released to the seller after you receive and inspect the vehicle.',
                    ],
                    [
                        'q' => 'What happens if the vehicle does not pass inspection?',
                        'a' => 'Every vehicle undergoes a 150-Point TÜV/DEKRA inspection prior to transport. If any material defect is discovered that was not disclosed, you receive a 100% instant escrow refund.',
                    ],
                ],
            ],
            [
                'category' => 'B2B Corporate Fleet Sourcing',
                'items' => [
                    [
                        'q' => 'Do you support EU VAT Reverse Charge for cross-border B2B purchases?',
                        'a' => 'Yes. For corporate fleet acquisitions between Germany/France and Switzerland (or cross-border EU), we generate automated VAT Reverse Charge declarations, eliminating VAT double taxation.',
                    ],
                    [
                        'q' => 'Can we order multiple fleet vehicles in one contract?',
                        'a' => 'Absolutely. B2B Fleet Managers can place multi-unit orders (up to 20 vehicles per procurement deal) with consolidated invoicing and dedicated account management.',
                    ],
                ],
            ],
            [
                'category' => 'Regulatory & Swiss VQF Compliance',
                'items' => [
                    [
                        'q' => 'What compliance standards does AutoBrokers adhere to?',
                        'a' => 'AutoBrokers is registered under Swiss VQF (Anti-Money Laundering Regulations, CH-8005 Zurich), DE IHK Motor Brokerage standards, and French ORIAS registration.',
                    ],
                ],
            ],
        ];

        return Inertia::render('Pages/Faq', [
            'faqCategories' => $faqCategories,
        ]);
    }

    public function privacyPolicy()
    {
        return Inertia::render('Pages/PrivacyPolicy');
    }

    public function termsAndConditions()
    {
        return Inertia::render('Pages/TermsAndConditions');
    }

    public function cookiePolicy()
    {
        return Inertia::render('Pages/CookiePolicy');
    }

    public function about()
    {
        return Inertia::render('Pages/About');
    }
}
