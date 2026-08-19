import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { route } from '@/lib/route';
import { 
  ShieldCheck, Lock, Eye, Database, Globe, UserCheck, 
  FileText, CheckCircle2, AlertCircle, Mail, Phone, MapPin 
} from 'lucide-react';

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState('controller');

  const navigationSections = [
    { id: 'controller', label: '1. Data Controller Overview' },
    { id: 'data-collected', label: '2. Information We Collect' },
    { id: 'legal-basis', label: '3. Legal Bases for Processing' },
    { id: 'purpose', label: '4. How We Use Your Data' },
    { id: 'sharing', label: '5. Third-Party Data Sharing' },
    { id: 'retention', label: '6. Retention & Security Controls' },
    { id: 'international', label: '7. Cross-Border Transfers' },
    { id: 'user-rights', label: '8. Your Statutory Rights (GDPR / DPA)' },
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
      <Head title="Privacy Policy - CarStrado (CarStrado.com)" />

      {/* Header Banner */}
      <div className="bg-slate-950 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-orange-500/30 text-orange-400 text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <Lock className="h-3.5 w-3.5" /> Privacy & Data Governance
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Privacy Policy
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-3xl font-medium">
            Transparent information on how BASILDON LIMITED collects, processes, and protects your personal data in accordance with the UK GDPR, EU GDPR (Regulation 2016/679), and Data Protection Act 2018.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
            <span>Data Controller: <strong>BASILDON LIMITED</strong> (No. 16290553)</span>
            <span>&bull;</span>
            <span>Last Updated: <strong>August 19, 2026</strong></span>
            <span>&bull;</span>
            <span>DPO Contact: <strong>privacy@carstrado.com</strong></span>
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
                Privacy Index
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
                  <span className="text-[11px] font-bold text-slate-900 block">Data Protection Officer (DPO)</span>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Contact our dedicated DPO desk for Subject Access Requests (SAR) or data erasure petitions.
                  </p>
                  <a
                    href="mailto:privacy@carstrado.com"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:underline pt-1"
                  >
                    <Mail className="h-3.5 w-3.5" /> privacy@carstrado.com
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Privacy Articles */}
          <main className="lg:col-span-8 space-y-10 text-slate-700 leading-relaxed text-sm">

            {/* Section 1 */}
            <section id="controller" className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-4 scroll-mt-28">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-orange-100 text-orange-600 font-black flex items-center justify-center text-sm">
                  01
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Data Controller Overview
                </h2>
              </div>
              <p>
                This Privacy Notice applies to all personal data collected through the <strong>CarStrado.com</strong> website, client procurement portals, dealer workspaces, and related escrow communication channels.
              </p>
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 font-mono text-xs space-y-1.5 text-slate-800">
                <div><strong>Data Controller:</strong> BASILDON LIMITED</div>
                <div><strong>Company Registration:</strong> 16290553 (England & Wales)</div>
                <div><strong>Registered Office:</strong> 2 Navarre Street, London, England, E2 7JH</div>
                <div><strong>Supervisory Authority:</strong> Information Commissioner's Office (ICO), UK</div>
                <div><strong>Privacy Team Email:</strong> privacy@carstrado.com</div>
              </div>
            </section>

            {/* Section 2 */}
            <section id="data-collected" className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-4 scroll-mt-28">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-orange-100 text-orange-600 font-black flex items-center justify-center text-sm">
                  02
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Information We Collect
                </h2>
              </div>
              <p>
                We collect personal information directly from you when you register, request a car sourcing quote, enter an escrow deal, or communicate with our operations desk:
              </p>
              <div className="space-y-3 pt-1">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <strong className="text-slate-900 text-xs uppercase tracking-wider block mb-1">A. Identity & Contact Details</strong>
                  <p className="text-xs text-slate-600">First name, surname, date of birth, residential address (street, city, country, postcode), email address, and telephone number.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <strong className="text-slate-900 text-xs uppercase tracking-wider block mb-1">B. Compliance & AML Verification Records</strong>
                  <p className="text-xs text-slate-600">Government-issued photo identification (passport, national ID card, driving licence), proof of address utility bills, and company ownership documentation for corporate B2B fleet transactions.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <strong className="text-slate-900 text-xs uppercase tracking-wider block mb-1">C. Financial & Transaction Data</strong>
                  <p className="text-xs text-slate-600">Bank account IBAN/BIC codes for escrow settlements, vehicle purchase contracts, payment confirmation vouchers, and brokerage fee invoices.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <strong className="text-slate-900 text-xs uppercase tracking-wider block mb-1">D. Technical & Log Data</strong>
                  <p className="text-xs text-slate-600">IP addresses, browser type, device identifiers, session cookies, and vehicle filter query history.</p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="legal-basis" className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-4 scroll-mt-28">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-orange-100 text-orange-600 font-black flex items-center justify-center text-sm">
                  03
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Legal Bases for Processing
                </h2>
              </div>
              <p>
                Under Article 6 of the UK GDPR and EU GDPR, we process personal data under the following recognized legal grounds:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-600">
                <li><strong>Contractual Performance (Art. 6(1)(b)):</strong> Necessary to execute vehicle procurement, prepare sales agreements, manage escrow holding, and coordinate logistics delivery.</li>
                <li><strong>Legal Obligation (Art. 6(1)(c)):</strong> Compliance with statutory Anti-Money Laundering (AML) regulations, tax reporting, and motor vehicle export/import documentation.</li>
                <li><strong>Legitimate Interests (Art. 6(1)(f)):</strong> Maintaining platform security, fraud prevention, IT system optimization, and managing dealer quality controls.</li>
                <li><strong>Consent (Art. 6(1)(a)):</strong> For non-essential cookies, personalized inventory newsletters, and direct marketing communications.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section id="purpose" className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-4 scroll-mt-28">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-orange-100 text-orange-600 font-black flex items-center justify-center text-sm">
                  04
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  How We Use Your Data
                </h2>
              </div>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
                <li>Authenticating user access to deal pipelines, digital vaults, and dealer portals.</li>
                <li>Negotiating vehicle purchases and registering vehicles with regional motor transport authorities (DVLA UK, Strassenverkehrsamt CH, Kraftfahrt-Bundesamt DE).</li>
                <li>Executing escrow releases following buyer physical handover inspection.</li>
                <li>Preparing EUR.1 customs documentation and applying EU VAT Reverse Charge exemptions.</li>
                <li>Sending operational deal stage updates, delivery tracking links, and inspection reports.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section id="sharing" className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-4 scroll-mt-28">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-orange-100 text-orange-600 font-black flex items-center justify-center text-sm">
                  05
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Third-Party Data Sharing
                </h2>
              </div>
              <p>
                CarStrado operates a strict no-sale policy: <strong>we never sell or rent your personal data</strong> to advertising networks. We share data only with necessary operational partners:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-slate-900 text-xs block">Certified Dealership Partners</strong>
                  <p className="text-xs text-slate-600">Supplying dealer partners receive necessary buyer details solely to issue the vehicle sales contract and transfer documentation.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-slate-900 text-xs block">Licensed Logistics Carriers</strong>
                  <p className="text-xs text-slate-600">Carrier drivers receive delivery address and phone numbers to coordinate enclosed vehicle doorstep handovers.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-slate-900 text-xs block">Escrow Banking Institutions</strong>
                  <p className="text-xs text-slate-600">Regulated payment and escrow institutions (e.g. Wise Bank, Stripe) for secure client deposit segregation.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-slate-900 text-xs block">Inspection Engineers (TÜV/DEKRA)</strong>
                  <p className="text-xs text-slate-600">Independent vehicle certifiers who inspect chassis and generate condition reports.</p>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section id="retention" className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-4 scroll-mt-28">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-orange-100 text-orange-600 font-black flex items-center justify-center text-sm">
                  06
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Data Retention & Security Architecture
                </h2>
              </div>
              <p>
                All personal data is encrypted at rest using AES-256 and in transit via TLS 1.3 encryption. Transaction records and AML compliance files are retained for <strong>5 to 7 years</strong> in compliance with the UK Money Laundering Regulations 2017 and Companies Act 2006, after which they are securely expunged.
              </p>
            </section>

            {/* Section 7 */}
            <section id="international" className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-4 scroll-mt-28">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-orange-100 text-orange-600 font-black flex items-center justify-center text-sm">
                  07
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  International Cross-Border Transfers
                </h2>
              </div>
              <p>
                Where data is transferred between the UK, European Economic Area (EEA), and Switzerland, transfers are conducted under the UK International Data Transfer Agreement (IDTA) or European Commission Standard Contractual Clauses (SCCs), ensuring an equivalent standard of protection.
              </p>
            </section>

            {/* Section 8 */}
            <section id="user-rights" className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-4 scroll-mt-28">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-orange-100 text-orange-600 font-black flex items-center justify-center text-sm">
                  08
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Your Statutory Privacy Rights
                </h2>
              </div>
              <p>
                Under the UK GDPR and EU GDPR, you are entitled to exercise the following rights at any time free of charge:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <strong>Right of Access (SAR):</strong> Request a copy of all personal records we hold about you.
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <strong>Right to Rectification:</strong> Correct inaccurate or incomplete personal contact details.
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <strong>Right to Erasure:</strong> Request deletion of your data when retention is no longer legally mandated.
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <strong>Right to Restrict Processing:</strong> Limit how we process your data in specific dispute cases.
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-slate-500">
                  Data Protection Desk: <a href="mailto:privacy@carstrado.com" className="text-orange-600 font-bold font-mono">privacy@carstrado.com</a>
                </span>
                <div className="flex items-center gap-3">
                  <Link
                    href={route('pages.terms')}
                    className="text-xs font-bold text-orange-600 hover:underline"
                  >
                    Terms & Conditions &rarr;
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
