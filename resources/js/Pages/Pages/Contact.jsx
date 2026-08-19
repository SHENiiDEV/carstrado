import React, { useState, useEffect, useRef } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { route } from '@/lib/route';
import { 
  Mail, MessageSquare, ShieldCheck, CheckCircle2, 
  Send, ArrowRight, Building2, User, HelpCircle, Lock, AlertCircle, Clock, MapPin 
} from 'lucide-react';

export default function ContactPage({ turnstileSiteKey }) {
  const { flash, companyInfo } = usePage().props;
  const turnstileContainerRef = useRef(null);
  const [turnstileLoaded, setTurnstileLoaded] = useState(false);

  const company = companyInfo || {
    name: 'BASILDON LIMITED',
    number: '16290553',
    address: '2 Navarre Street, London, England, E2 7JH',
    email: 'support@carstrado.com',
    legal_email: 'legal@carstrado.com',
  };

  const supportEmail = company.email || 'support@carstrado.com';
  const legalEmail = company.legal_email || 'legal@carstrado.com';

  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    subject: '',
    category: 'vehicle_sourcing',
    message: '',
    cf_turnstile_response: '',
  });

  // Load Cloudflare Turnstile API script
  useEffect(() => {
    const scriptId = 'cf-turnstile-script';
    let script = document.getElementById(scriptId);

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.onload = () => setTurnstileLoaded(true);
      document.head.appendChild(script);
    } else {
      setTurnstileLoaded(true);
    }
  }, []);

  // Render Turnstile widget once loaded
  useEffect(() => {
    if (turnstileLoaded && window.turnstile && turnstileContainerRef.current) {
      turnstileContainerRef.current.innerHTML = '';
      try {
        window.turnstile.render(turnstileContainerRef.current, {
          sitekey: turnstileSiteKey || '0x4AAAAAAEVS_u9KaF0cusgl',
          theme: 'dark',
          callback: (token) => {
            setData('cf_turnstile_response', token);
          },
          'error-callback': () => {
            console.error('Turnstile verification encountered an error.');
          },
        });
      } catch (e) {
        console.error('Error rendering Turnstile:', e);
      }
    }
  }, [turnstileLoaded, turnstileSiteKey]);

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('pages.contact.submit'), {
      onSuccess: () => {
        reset();
        if (window.turnstile && turnstileContainerRef.current) {
          window.turnstile.reset(turnstileContainerRef.current);
        }
      },
    });
  };

  return (
    <AppLayout>
      <Head title="Contact Support & Operations Desk - CarStrado (CarStrado.com)" />

      {/* Header Banner */}
      <div className="bg-slate-950 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-orange-500/30 text-orange-400 text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <Mail className="h-3.5 w-3.5" /> Digital Communication Desk
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Get in Touch with CarStrado
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-3xl font-medium">
            Direct European automotive sourcing, escrow settlement inquiries, dealer partnerships, and compliance assistance.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
            <span>Corporate Entity: <strong>{company.name}</strong> (No. {company.number})</span>
            <span>&bull;</span>
            <span>Dedicated Email: <strong>{supportEmail}</strong></span>
            <span>&bull;</span>
            <span>Response Time: <strong>24–48 Hours</strong></span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Left Column: Contact Channels & Trust Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
              <h2 className="text-xl font-black text-slate-900">Communication Channels</h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                To guarantee audit trail integrity, secure escrow verification, and immediate documentation archival, all client inquiries and deal contracts are managed exclusively via digital channels.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="h-10 w-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 text-xs uppercase tracking-wider block">Official Support Email</strong>
                    <a href={`mailto:${supportEmail}`} className="text-sm font-bold text-orange-600 hover:underline font-mono">
                      {supportEmail}
                    </a>
                    <span className="text-[11px] text-slate-400 block mt-0.5">General sourcing, quotes, and customer care</span>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="h-10 w-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 text-xs uppercase tracking-wider block">Compliance & Legal Desk</strong>
                    <a href={`mailto:${legalEmail}`} className="text-sm font-bold text-purple-600 hover:underline font-mono">
                      {legalEmail}
                    </a>
                    <span className="text-[11px] text-slate-400 block mt-0.5">AML/KYC verifications, SAR & Privacy requests</span>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="h-10 w-10 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 text-xs uppercase tracking-wider block">Registered Corporate Office</strong>
                    <p className="text-xs font-semibold text-slate-700 mt-0.5">
                      {company.name}<br />
                      {company.address}
                    </p>
                    <span className="text-[10px] text-slate-400 font-mono block mt-1">Company No. {company.number}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Sourcing SLA Card */}
            <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
                <Clock className="h-4 w-4" /> Service Level Agreement (SLA)
              </div>
              <h3 className="text-lg font-black">Fast Dedicated Broker Response</h3>
              <ul className="space-y-2 text-xs text-slate-300 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-orange-500 shrink-0" />
                  <span>Sourcing quotes generated within 24–48 hours</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-orange-500 shrink-0" />
                  <span>150-Point TÜV inspection booking within 24 hours</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-orange-500 shrink-0" />
                  <span>Doorstep enclosed vehicle transport in 48–72 hours</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Protected Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-2xl space-y-6">
              <div>
                <h2 className="text-2xl font-black text-slate-900">Send an Inquiry</h2>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Fill out the form below. Messages are dispatched directly to our operations desk via encrypted channels.
                </p>
              </div>

              {flash?.success && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{flash.success}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Your Name / Representative
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alexander Smith"
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm font-semibold focus:ring-2 focus:ring-orange-500 bg-white"
                    />
                    {errors.name && <span className="text-xs text-red-600 font-semibold mt-1 block">{errors.name}</span>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@domain.com"
                      value={data.email}
                      onChange={(e) => setData('email', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm font-semibold focus:ring-2 focus:ring-orange-500 bg-white"
                    />
                    {errors.email && <span className="text-xs text-red-600 font-semibold mt-1 block">{errors.email}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Inquiry Category */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Inquiry Category
                    </label>
                    <select
                      value={data.category}
                      onChange={(e) => setData('category', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm font-bold focus:ring-2 focus:ring-orange-500 bg-white"
                    >
                      <option value="vehicle_sourcing">Vehicle Sourcing & Purchase</option>
                      <option value="escrow_inquiry">Escrow Settlement & Payouts</option>
                      <option value="b2b_fleet">B2B Fleet / Corporate Procurement</option>
                      <option value="dealer_partnership">Dealer Partner Network Listing</option>
                      <option value="compliance_legal">AML Compliance & Legal</option>
                      <option value="general">General Support</option>
                    </select>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sourcing quote for Porsche 911 GT3"
                      value={data.subject}
                      onChange={(e) => setData('subject', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm font-semibold focus:ring-2 focus:ring-orange-500 bg-white"
                    />
                    {errors.subject && <span className="text-xs text-red-600 font-semibold mt-1 block">{errors.subject}</span>}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Message Details
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Provide details regarding the vehicle make/model, target year/mileage, country of delivery, or your specific questions..."
                    value={data.message}
                    onChange={(e) => setData('message', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm font-medium focus:ring-2 focus:ring-orange-500 bg-white"
                  />
                  {errors.message && <span className="text-xs text-red-600 font-semibold mt-1 block">{errors.message}</span>}
                </div>

                {/* Cloudflare Turnstile Container */}
                <div className="pt-2">
                  <div ref={turnstileContainerRef} className="my-2 min-h-[65px]" />
                  {errors.cf_turnstile_response && (
                    <span className="text-xs text-red-600 font-bold block">{errors.cf_turnstile_response}</span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={processing}
                  className="w-full py-4 rounded-2xl font-black text-white bg-orange-600 hover:bg-orange-500 shadow-xl shadow-orange-600/30 text-sm transition-all flex items-center justify-center gap-2 mt-4 active:scale-[0.98]"
                >
                  <Send className="h-4 w-4" />
                  <span>{processing ? 'Submitting Secure Message...' : 'Send Secure Message to Operations Desk'}</span>
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </AppLayout>
  );
}
