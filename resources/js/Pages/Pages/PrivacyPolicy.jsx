import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <AppLayout>
      <Head title="Privacy Policy - CarStrado (CarStrado.com)" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-6">
            <span className="text-xs font-bold text-orange-600 uppercase tracking-widest block mb-1">
              Legal & Compliance
            </span>
            <h1 className="text-3xl font-black text-slate-900">Privacy Policy</h1>
            <p className="text-xs text-slate-500 font-medium mt-1">Effective Date: August 2026 &bull; Compliant with UK GDPR, EU GDPR (2016/679) & Data Protection Act 2018</p>
          </div>

          <div className="space-y-6 text-xs text-slate-600 leading-relaxed font-medium">
            <section>
              <h3 className="text-base font-bold text-slate-900 mb-2">1. Data Controller Overview</h3>
              <p>
                <strong>BASILDON LIMITED</strong> (Company No. 16290553, registered office: 2 Navarre Street, London, England, E2 7JH, operating as <strong>CarStrado.com</strong>) is the data controller responsible for your personal data collected through this digital automotive brokerage platform.
              </p>
            </section>

            <section>
              <h3 className="text-base font-bold text-slate-900 mb-2">2. Information We Collect</h3>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Personal & Identity Data:</strong> Full name, surname, date of birth, residential address, email address, phone number, and identity verification documents required for vehicle registration and compliance checks.</li>
                <li><strong>Corporate B2B Data:</strong> Company name, VAT Reverse Charge ID, corporate registration documents, and authorized fleet manager credentials.</li>
                <li><strong>Financial & Escrow Transaction Data:</strong> Bank account IBAN, escrow deposit logs, and payment references via regulated payment gateways.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-base font-bold text-slate-900 mb-2">3. Purpose of Processing</h3>
              <p>
                We process your personal information strictly to facilitate vehicle procurement, price negotiation, compliance background checks, cross-border customs declarations, escrow payment protection, and 48-72h transport delivery.
              </p>
            </section>

            <section>
              <h3 className="text-base font-bold text-slate-900 mb-2">4. Data Sharing & Third Parties</h3>
              <p>
                Your data is shared only with verified dealership partners (for contract execution), licensed logistics carriers (for vehicle transport), and federal registration authorities. We do not sell or monetize personal data to third-party ad networks.
              </p>
            </section>

            <section>
              <h3 className="text-base font-bold text-slate-900 mb-2">5. Your Legal Rights</h3>
              <p>
                Under UK GDPR and EU GDPR, you have the right to access, rectify, request erasure, or restrict processing of your personal data by contacting our Data Protection Desk at <a href="mailto:privacy@carstrado.com" className="text-orange-600 font-bold font-mono">privacy@carstrado.com</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
