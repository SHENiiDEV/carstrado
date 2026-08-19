import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { FileText, ShieldCheck, Landmark } from 'lucide-react';

export default function TermsAndConditionsPage() {
  return (
    <AppLayout>
      <Head title="Terms and Conditions - CarStrado (CarStrado.com)" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-6">
            <span className="text-xs font-bold text-orange-600 uppercase tracking-widest block mb-1">
              Legal Framework
            </span>
            <h1 className="text-3xl font-black text-slate-900">Terms and Conditions of Service</h1>
            <p className="text-xs text-slate-500 font-medium mt-1">CarStrado.com &bull; Operated by BASILDON LIMITED (Company No. 16290553) &bull; Registered in England & Wales</p>
          </div>

          <div className="space-y-6 text-xs text-slate-600 leading-relaxed font-medium">
            <section>
              <h3 className="text-base font-bold text-slate-900 mb-2">1. Scope of Brokerage Services</h3>
              <p>
                CarStrado (operated by BASILDON LIMITED, 2 Navarre Street, London, England, E2 7JH) acts as an independent automotive sourcing broker. We facilitate vehicle sourcing, price negotiation, inspection audit verification, cross-border customs declarations, and escrow payment protection.
              </p>
            </section>

            <section>
              <h3 className="text-base font-bold text-slate-900 mb-2">2. Brokerage Fees & Take Rates</h3>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Retail B2C Purchases:</strong> Fixed 4.5% commission based on negotiated vehicle net sales price.</li>
                <li><strong>Corporate B2B Fleet Orders:</strong> Discounted 3.5% commission rate for multi-unit orders.</li>
                <li>All fees are transparently disclosed prior to contract signature and escrow deposit.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-base font-bold text-slate-900 mb-2">3. Institutional Escrow Float Rules</h3>
              <p>
                Buyer deposits are held in segregated, audited escrow accounts. Escrow funds are only released to the selling dealer upon buyer receipt and inspection clearance of the vehicle.
              </p>
            </section>

            <section>
              <h3 className="text-base font-bold text-slate-900 mb-2">4. 150-Point TÜV Inspection Guarantee</h3>
              <p>
                If a vehicle fails independent TÜV/DEKRA inspection or exhibits undisclosed major structural defects prior to transport, the buyer retains the right to immediate 100% escrow refund.
              </p>
            </section>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
