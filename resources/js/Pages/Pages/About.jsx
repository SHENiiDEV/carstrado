import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { route } from '@/lib/route';
import AppLayout from '@/Layouts/AppLayout';
import { Sparkles, ShieldCheck, Landmark, Building2, CheckCircle2, Award, ArrowRight, Compass, Truck, Globe, FileCheck, Check, Users, Lock, ChevronRight } from 'lucide-react';

export default function AboutPage() {
  const [activeStep, setActiveStep] = useState(1);

  const stats = [
    { label: 'Sourced Vehicle GMV', value: '€45.2M+', sub: 'Cross-border transactions' },
    { label: 'Verified Deliveries', value: '1,280+', sub: 'CH, DE, FR & UK' },
    { label: 'VQF Escrow Security', value: '100%', sub: 'Zero fraud record' },
    { label: 'Average Transit Time', value: '48-72h', sub: 'Enclosed white-glove transport' },
  ];

  const steps = [
    {
      num: '01',
      title: 'Vehicle Sourcing & TÜV Audit',
      desc: 'Client selects verified inventory from certified OEM dealerships in Switzerland, Germany, or France. An independent 150-point TÜV inspection is conducted immediately.'
    },
    {
      num: '02',
      title: 'Swiss VQF Escrow Deposit',
      desc: 'Buyer deposits agreed funds into MiaVia regulated Swiss VQF Escrow account (Wise Bank CH). Funds remain 100% protected until final delivery.'
    },
    {
      num: '03',
      title: 'Cross-Border Customs & Transport',
      desc: 'Our compliance desk handles EU VAT Reverse Charge declarations (19% DE -> 8.1% CH) and dispatches enclosed white-glove carrier transport.'
    },
    {
      num: '04',
      title: 'Doorstep Delivery & Payout',
      desc: 'Client inspects the vehicle at their doorstep. Upon physical clearance, funds are safely released to the sourcing dealership.'
    }
  ];

  const executiveTeam = [
    {
      name: 'Dr. Beat Oberholzer',
      role: 'Head of Swiss VQF Compliance',
      city: 'Zurich, Switzerland',
      bio: 'Former FINMA senior auditor with 18+ years in Swiss money-laundering prevention and escrow governance.'
    },
    {
      name: 'Marc Blanc',
      role: 'Director of European Automotive Sourcing',
      city: 'Munich, Germany',
      bio: 'Ex-Porsche & BMW fleet director overseeing direct OEM dealership inventory integration across DACH.'
    },
    {
      name: 'Elena Rostova',
      role: 'Head of Alpine Logistics & Customs',
      city: 'Geneva, Switzerland',
      bio: 'Specialist in cross-border customs declarations, VAT reverse charge optimization, and white-glove transport.'
    }
  ];

  return (
    <AppLayout>
      <Head title="About CarStrado - European Automotive Sourcing & Escrow Platform" />

      {/* Magic UI Ambient Hero Banner */}
      <section className="relative overflow-hidden bg-slate-950 text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-orange-500/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[250px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-orange-500/30 text-orange-400 text-xs font-mono font-extrabold uppercase tracking-widest backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
            <Sparkles className="h-3.5 w-3.5 text-orange-500" /> Operated by BASILDON LIMITED (No. 16290553) &bull; London, UK
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tighter text-white leading-tight">
            The Premier Digital Automotive <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent">
              Brokerage & Escrow Platform
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            Eliminating friction, opaque dealer markups, and cross-border regulatory delays across European retail car buyers and corporate fleet managers.
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((st, idx) => (
              <div key={idx} className="bg-slate-900/80 border border-white/10 p-5 rounded-2xl backdrop-blur-xl text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                <div className="text-2xl sm:text-3xl font-black text-orange-400 font-mono">{st.value}</div>
                <div className="text-xs font-bold text-white mt-1">{st.label}</div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">{st.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Magic UI Bento Grid: 4 Core Platform Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest block mb-2">Platform Foundations</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Why Buyers & Dealers Trust CarStrado</h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-2 font-medium">Built on UK & Swiss regulatory precision, institutional escrow security, and white-glove transport logistics.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Bento Card 1: Swiss VQF Escrow */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-orange-300 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="h-12 w-12 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 font-black mb-6 group-hover:scale-110 transition-transform">
                <Landmark className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-mono font-bold text-orange-600 uppercase">Institutional Escrow</span>
              <h3 className="text-xl font-black text-slate-900 mt-1 mb-3">Institutional Escrow Protection</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Operated by BASILDON LIMITED. Buyer funds remain safely held in regulated escrow accounts until physical vehicle delivery and clearance.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-emerald-700">
              <CheckCircle2 className="h-4 w-4" /> 100% Money-Back Security Guarantee
            </div>
          </div>

          {/* Bento Card 2: 150-Point TÜV Inspection */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-orange-300 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="h-12 w-12 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 font-black mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-mono font-bold text-orange-600 uppercase">TÜV / DEKRA Audit</span>
              <h3 className="text-xl font-black text-slate-900 mt-1 mb-3">150-Point Mechanical & EV Battery Test</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Every vehicle is inspected by certified engineers before dispatch, verifying chassis integrity, paint thickness, computer diagnostic history, and EV battery State of Health (SoH).
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-emerald-700">
              <CheckCircle2 className="h-4 w-4" /> Zero-Defect Inspection Certificate
            </div>
          </div>

          {/* Bento Card 3: Cross-Border VAT Refund */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-orange-300 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="h-12 w-12 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 font-black mb-6 group-hover:scale-110 transition-transform">
                <Globe className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-mono font-bold text-orange-600 uppercase">Customs & Sourcing</span>
              <h3 className="text-xl font-black text-slate-900 mt-1 mb-3">Cross-Border VAT Tax Refunds</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Automated EU VAT Reverse Charge declarations. Reclaim 19% German VAT and optimize import duties for significant direct savings on cross-border transactions.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-purple-700">
              <CheckCircle2 className="h-4 w-4" /> Up to 10.9% Tax Optimization
            </div>
          </div>
        </div>
      </section>

      {/* Interactive 4-Step How CarStrado Works */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-extrabold text-orange-400 uppercase tracking-widest block mb-2">Transparent Workflow</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">How Car Sourcing Works</h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2 font-medium">From initial dealership inspection to white-glove doorstep delivery.</p>
          </div>

          {/* Interactive Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st, idx) => (
              <div
                key={idx}
                onClick={() => setActiveStep(idx + 1)}
                className={`cursor-pointer rounded-2xl p-6 border transition-all text-left flex flex-col justify-between ${
                  activeStep === idx + 1
                    ? 'bg-slate-800 border-orange-500 shadow-xl ring-2 ring-orange-500/50'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <span className="font-mono text-2xl font-black text-orange-400 block mb-4">{st.num}</span>
                  <h4 className="font-bold text-white text-base mb-2">{st.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">{st.desc}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-orange-400 font-bold">
                  <span>Step {idx + 1} of 4</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Leadership & Board */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest block mb-2">Leadership Desk</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Governance & Executive Board</h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-2 font-medium">Led by European financial compliance auditors and automotive sourcing veterans.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {executiveTeam.map((mem, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-16 w-16 rounded-2xl bg-slate-100 border border-slate-300 flex items-center justify-center text-orange-600 font-black text-xl mb-4">
                {mem.name.charAt(0)}
              </div>
              <h3 className="text-lg font-black text-slate-900">{mem.name}</h3>
              <div className="text-xs text-orange-600 font-bold mt-0.5">{mem.role}</div>
              <div className="text-[11px] text-slate-400 font-mono mb-3">{mem.city}</div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">{mem.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Magic CTA Card */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="relative overflow-hidden bg-slate-900 rounded-3xl p-10 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800">
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 space-y-2 max-w-xl">
            <span className="px-3 py-1 rounded-full text-[10px] font-mono font-extrabold uppercase bg-orange-500/20 text-orange-400 border border-orange-500/30">
              BASILDON LIMITED &bull; CarStrado.com
            </span>
            <h3 className="text-3xl font-black tracking-tight">Ready to Source Your Next Vehicle?</h3>
            <p className="text-xs text-slate-300 font-medium leading-relaxed">
              Explore thousands of verified vehicles from certified European dealerships with full escrow safety.
            </p>
          </div>

          <div className="relative z-10">
            <Link href={route('vehicles.index')}>
              <button className="px-8 py-4 rounded-2xl bg-orange-600 hover:bg-orange-500 font-extrabold text-white text-xs shadow-xl shadow-orange-600/30 transition-all flex items-center gap-2">
                <span>Browse CarStrado Sourcing Catalog</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
