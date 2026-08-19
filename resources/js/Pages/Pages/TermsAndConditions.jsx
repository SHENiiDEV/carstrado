import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { route } from '@/lib/route';
import { 
  FileText, ShieldCheck, Landmark, Scale, Truck, AlertTriangle, 
  CheckCircle2, DollarSign, ArrowRight, Clock, HelpCircle, Mail, Phone, MapPin 
} from 'lucide-react';

import { usePage } from '@inertiajs/react';

export default function TermsAndConditionsPage() {
  const { companyInfo } = usePage().props;
  const [activeSection, setActiveSection] = useState('overview');

  const company = companyInfo || {
    name: 'BASILDON LIMITED',
    number: '16290553',
    address: '2 Navarre Street, London, England, E2 7JH',
    email: 'support@carstrado.com',
    legal_email: 'legal@carstrado.com',
  };

  const supportEmail = company.email || 'support@carstrado.com';
  const legalEmail = company.legal_email || 'legal@carstrado.com';

  const navigationSections = [
    { id: 'overview', label: '1. Platform & Corporate Structure' },
    { id: 'brokerage-scope', label: '2. Sourcing & Brokerage Scope' },
    { id: 'escrow-rules', label: '3. Escrow Vault & Financial Settlements' },
    { id: 'inspection-warranty', label: '4. TÜV Audit & Condition Guarantee' },
    { id: 'pricing-vat', label: '5. Pricing, Fees & Cross-Border VAT' },
    { id: 'logistics-delivery', label: '6. Logistics, Insurance & Delivery' },
    { id: 'cancellations-refunds', label: '7. Cancellations, Rights & Refunds' },
    { id: 'liability-governance', label: '8. Limitation of Liability & Law' },
  ];

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <AppLayout>
      <Head title="Terms & Conditions - CarStrado (CarStrado.com)" />

      {/* Header Banner */}
      <div className="bg-slate-950 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-orange-500/30 text-orange-400 text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <Scale className="h-3.5 w-3.5" /> Legal Governance Framework
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Terms & Conditions of Service
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-3xl font-medium">
            Governing automotive brokerage, institutional escrow float, 150-point technical inspections, cross-border customs optimization, and white-glove transport logistics.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
            <span>Operated by: <strong>BASILDON LIMITED</strong> (Co. No. 16290553)</span>
            <span>&bull;</span>
            <span>Effective Date: <strong>August 19, 2026</strong></span>
            <span>&bull;</span>
            <span>Jurisdiction: <strong>England & Wales / Cross-Border EU</strong></span>
          </div>
        </div>
      </div>

      {/* Content Layout with Sticky Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Sticky Navigation Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <FileText className="h-4 w-4 text-orange-600" />
                Table of Contents
              </h3>
              <nav className="space-y-1">
                {navigationSections.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                      activeSection === item.id
                        ? 'bg-orange-50 text-orange-600 border border-orange-200 shadow-sm'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>

              <div className="pt-4 border-t border-slate-100">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-[11px] font-bold text-slate-900 block">Legal or Compliance Inquiries?</span>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Our compliance desk is available for buyer verifications, AML audit trail requests, and contract queries.
                  </p>
                  <a
                    href={`mailto:${legalEmail}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:underline pt-1"
                  >
                    <Mail className="h-3.5 w-3.5" /> {legalEmail}
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Legal Clauses */}
          <main className="lg:col-span-8 space-y-10 text-slate-700 leading-relaxed text-sm">

            {/* Section 1 */}
            <section id="overview" className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-4 scroll-mt-28">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-orange-100 text-orange-600 font-black flex items-center justify-center text-sm">
                  01
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Platform & Corporate Structure
                </h2>
              </div>
              <p>
                <strong>CarStrado</strong> (accessible via <a href="https://carstrado.com" className="text-orange-600 font-bold hover:underline">CarStrado.com</a>) is an online digital automotive sourcing and escrow brokerage platform wholly owned and operated by:
              </p>
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 font-mono text-xs space-y-1.5 text-slate-800">
                <div><strong>Company Name:</strong> {company.name}</div>
                <div><strong>Registered in England and Wales:</strong> Company Number {company.number}</div>
                <div><strong>Registered Office:</strong> {company.address}</div>
                <div><strong>Contact Support Desk:</strong> {supportEmail}</div>
                <div><strong>Legal & Compliance Desk:</strong> {legalEmail}</div>
                <div><strong>Operations Hub:</strong> London (HQ), Zurich & Munich Dealership Desks</div>
              </div>
              <p>
                By registering an account, requesting a vehicle procurement quote, entering into an escrow transaction, or listing inventory as an authorized partner dealership, you expressly agree to be bound by these Terms and Conditions.
              </p>
            </section>

            {/* Section 2 */}
            <section id="brokerage-scope" className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-4 scroll-mt-28">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-orange-100 text-orange-600 font-black flex items-center justify-center text-sm">
                  02
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Sourcing & Brokerage Scope
                </h2>
              </div>
              <p>
                CarStrado operates strictly as an <strong>independent automotive broker (Makler)</strong> and digital escrow infrastructure provider. Our service includes:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-600">
                <li>Direct inventory aggregation from vetted OEM franchised dealers across the United Kingdom, Germany, Switzerland, France, and other approved jurisdictions.</li>
                <li>Conducting independent technical audits (150-point inspection certificates) prior to purchase.</li>
                <li>Managing cross-border VAT exemptions and Reverse Charge filings (e.g. German 19% MwSt. export recovery).</li>
                <li>Holding client funds in segregated, multi-currency escrow vaults until physical vehicle delivery and buyer inspection sign-off.</li>
                <li>Coordinating enclosed or specialized multi-car logistics transport with full CMR marine cargo insurance.</li>
              </ul>
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Title Transfer Notice:</strong> Unless specifically executed under a designated B2B white-label fleet contract, legal title to the motor vehicle passes directly from the supplying dealership to the buyer upon escrow release.
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="escrow-rules" className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-4 scroll-mt-28">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-orange-100 text-orange-600 font-black flex items-center justify-center text-sm">
                  03
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Escrow Vault & Financial Settlements
                </h2>
              </div>
              <p>
                To eliminate counterparty default, fraudulent mileage rollbacks, and non-delivery risks, all payments on CarStrado are conducted via institutional segregated escrow:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-wider">
                    <Landmark className="h-4 w-4" /> Segregated Client Vaults
                  </div>
                  <p className="text-xs text-slate-600">
                    Buyer funds are held in ring-fenced bank escrow accounts at top-tier European banking partners (Wise Bank / Tier-1 UK & Swiss institutions). Funds never mix with CarStrado corporate operational capital.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider">
                    <ShieldCheck className="h-4 w-4" /> Milestone Release
                  </div>
                  <p className="text-xs text-slate-600">
                    Funds are only disbursed to the supplying dealer after: (1) Successful 150-point audit approval, (2) Doorstep vehicle handover, and (3) Explicit buyer digital sign-off.
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-500">
                Transactions are subjected to automated Anti-Money Laundering (AML) and Know Your Customer (KYC) screening in compliance with UK MLR 2017 and European 6AMLD directives.
              </p>
            </section>

            {/* Section 4 */}
            <section id="inspection-warranty" className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-4 scroll-mt-28">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-orange-100 text-orange-600 font-black flex items-center justify-center text-sm">
                  04
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  TÜV Audit & Technical Condition Guarantee
                </h2>
              </div>
              <p>
                Every vehicle brokered via CarStrado undergoes a rigorous <strong>150-Point Technical & Electronic Diagnostic Examination</strong> (conducted by certified TÜV, DEKRA, or equivalent independent inspectors) before transport is authorized.
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
                <li><strong>Chassis & Accident Verification:</strong> Ultrasonic paint thickness audit to guarantee no unrecorded structural or collision repairs.</li>
                <li><strong>Electronic & ECU Audit:</strong> Full ECU memory readout to verify genuine odometer mileage and check for cleared fault codes.</li>
                <li><strong>EV / Hybrid Battery State-of-Health (SoH):</strong> Complete battery health and degradation reporting for all electrified vehicles.</li>
                <li><strong>Brakes, Suspension & Tires:</strong> Wear measurements certifying roadworthiness compliant with EU/UK safety regulations.</li>
              </ul>
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Zero-Defect Guarantee:</strong> If the physical audit reveals undisclosed structural damage, salvage history, or mileage discrepancies, the buyer is entitled to cancel the deal with a <strong>100% immediate escrow refund</strong>.
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section id="pricing-vat" className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-4 scroll-mt-28">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-orange-100 text-orange-600 font-black flex items-center justify-center text-sm">
                  05
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Pricing, Brokerage Fees & Cross-Border VAT
                </h2>
              </div>
              <p>
                CarStrado maintains full transparency with zero hidden dealer markups:
              </p>
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <strong className="text-slate-900 text-sm block">Retail Buyer Sourcing Fee</strong>
                    <span className="text-xs text-slate-500">Includes complete negotiation, 150-pt inspection coordination, customs clearance, and escrow protection.</span>
                  </div>
                  <span className="text-base font-black text-orange-600 font-mono">4.50%</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <strong className="text-slate-900 text-sm block">B2B Fleet / Commercial Fleet Manager Fee</strong>
                    <span className="text-xs text-slate-500">Applicable to corporate fleet acquisitions and volume multi-unit vehicle contracts.</span>
                  </div>
                  <span className="text-base font-black text-purple-600 font-mono">3.50%</span>
                </div>
              </div>
              <p className="text-xs text-slate-600">
                <strong>Cross-Border VAT Optimization:</strong> For commercial buyers eligible for EU VAT Reverse Charge (Article 138 EU VAT Directive) or vehicles destined for export outside the EU (e.g. Switzerland or UK), CarStrado prepares and files compliant EUR.1 export documentation to ensure proper tax relief.
              </p>
            </section>

            {/* Section 6 */}
            <section id="logistics-delivery" className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-4 scroll-mt-28">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-orange-100 text-orange-600 font-black flex items-center justify-center text-sm">
                  06
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Logistics, Marine Cargo Insurance & Handover
                </h2>
              </div>
              <p>
                Vehicle transport is executed via licensed, fully bonded logistics carriers utilizing modern enclosed or open multi-car transporters.
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
                <li><strong>48 to 72 Hour Express Delivery:</strong> Standard transit window across mainland Western and Central Europe once escrow is fully funded.</li>
                <li><strong>All-Risk Transit Insurance:</strong> All vehicles are covered under comprehensive CMR all-risk cargo insurance up to €500,000 per chassis during transit.</li>
                <li><strong>Handover & Protocol:</strong> Upon delivery, an electronic Handover Protocol is signed with photo documentation of the odometer and physical condition.</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section id="cancellations-refunds" className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-4 scroll-mt-28">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-orange-100 text-orange-600 font-black flex items-center justify-center text-sm">
                  07
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Cancellations, Statutory Rights & Refunds
                </h2>
              </div>
              <p>
                We believe in straightforward consumer and business protections:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-600">
                <li><strong>Inspection Discrepancy:</strong> If the vehicle fails inspection or differs materially from its listed description, the buyer receives a 100% escrow refund within 2 business days.</li>
                <li><strong>Distance Selling Regulations:</strong> Qualifying retail consumers in the UK and EU retain applicable statutory cancellation rights in accordance with the Consumer Rights Act 2015 and EU Directive 2011/83/EU.</li>
                <li><strong>Pre-Dispatch Cancellation:</strong> If a buyer cancels without cause after transport has been dispatched, incurred third-party logistics costs will be deducted from the escrow balance.</li>
              </ul>
            </section>

            {/* Section 8 */}
            <section id="liability-governance" className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-4 scroll-mt-28">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-orange-100 text-orange-600 font-black flex items-center justify-center text-sm">
                  08
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Limitation of Liability & Governing Law
                </h2>
              </div>
              <p>
                These Terms and Conditions and any dispute or claim arising out of or in connection with them shall be governed by and construed in accordance with the laws of <strong>England and Wales</strong>.
              </p>
              <p className="text-xs text-slate-600">
                The courts of London, England shall have exclusive jurisdiction to settle any dispute. Nothing in these terms excludes or limits liability for fraud, fraudulent misrepresentation, or death/personal injury caused by gross negligence.
              </p>
              <div className="pt-6 mt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-slate-500">
                  Last updated: August 19, 2026 &bull; BASILDON LIMITED
                </span>
                <div className="flex items-center gap-3">
                  <Link
                    href={route('pages.privacy')}
                    className="text-xs font-bold text-orange-600 hover:underline"
                  >
                    Privacy Policy &rarr;
                  </Link>
                  <Link
                    href={route('pages.cookies')}
                    className="text-xs font-bold text-orange-600 hover:underline"
                  >
                    Cookie Preferences &rarr;
                  </Link>
                </div>
              </div>
            </section>

          </main>
        </div>
      </div>
    </AppLayout>
  );
}
