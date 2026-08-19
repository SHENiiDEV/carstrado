import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { route } from '@/lib/route';
import { 
  Cookie, Check, ShieldCheck, Settings, RefreshCw, 
  HelpCircle, Eye, Lock, Sparkles, CheckCircle2, Mail, Trash2 
} from 'lucide-react';

export default function CookiePolicyPage() {
  const [essential] = useState(true); // Always on
  const [functional, setFunctional] = useState(true);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load existing preferences if present
    const stored = localStorage.getItem('carstrado_cookie_consent');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.functional !== undefined) setFunctional(parsed.functional);
        if (parsed.analytics !== undefined) setAnalytics(parsed.analytics);
        if (parsed.marketing !== undefined) setMarketing(parsed.marketing);
      } catch (e) {}
    }
  }, []);

  const handleSavePreferences = () => {
    const preferences = {
      essential: true,
      functional,
      analytics,
      marketing,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('carstrado_cookie_consent', JSON.stringify(preferences));
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
  };

  const handleAcceptAll = () => {
    setFunctional(true);
    setAnalytics(true);
    setMarketing(true);
    const preferences = {
      essential: true,
      functional: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('carstrado_cookie_consent', JSON.stringify(preferences));
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
  };

  const handleResetCookies = () => {
    localStorage.removeItem('carstrado_cookie_consent');
    setFunctional(true);
    setAnalytics(false);
    setMarketing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
  };

  return (
    <AppLayout>
      <Head title="Cookie Policy & Consent Manager - CarStrado (CarStrado.com)" />

      {/* Header Banner */}
      <div className="bg-slate-950 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-orange-500/30 text-orange-400 text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <Cookie className="h-3.5 w-3.5" /> Cookie Compliance & Consent Desk
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Cookie Policy & Consent Center
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-3xl font-medium">
            Granular control over how CarStrado uses cookies, local storage tokens, and browser tracking to deliver fast vehicle searches, currency conversions, and secure escrow workflows.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
            <span>Operated by: <strong>BASILDON LIMITED</strong> (No. 16290553)</span>
            <span>&bull;</span>
            <span>Compliance: <strong>PECR (UK) & ePrivacy Directive (EU)</strong></span>
            <span>&bull;</span>
            <span>Version: <strong>2026.2</strong></span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">

        {/* Section 1: Introduction */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            What Are Cookies & Local Storage?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            Cookies are small text files placed on your device by websites that you visit. At <strong>CarStrado.com</strong>, we use cookies and modern HTML5 local browser storage to keep you securely signed in, preserve your currency choices (EUR, GBP, CHF, USD), maintain active search filters across vehicle catalogs, and monitor platform performance.
          </p>
        </div>

        {/* Interactive Consent Control Box */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-black text-slate-900">Interactive Cookie Preference Center</h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Toggle and customize your consent permissions below.</p>
            </div>
            <button
              onClick={handleAcceptAll}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
            >
              Accept All
            </button>
          </div>

          <div className="space-y-4">

            {/* Category 1: Strictly Necessary (Always Active) */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <strong className="text-slate-900 text-sm">1. Strictly Necessary & Security Cookies</strong>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase font-mono">Always Active</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Essential for core platform functionality, Inertia.js CSRF token protection, user authentication sessions, and secure escrow transaction states. Cannot be disabled.
                </p>
                <div className="text-[10px] font-mono text-slate-400 pt-1">
                  Examples: <code>XSRF-TOKEN</code>, <code>carstrado_session</code>, <code>remember_web_*</code>
                </div>
              </div>
              <div className="shrink-0">
                <input
                  type="checkbox"
                  checked={essential}
                  disabled
                  className="h-5 w-5 rounded border-slate-300 text-orange-600 focus:ring-orange-500 cursor-not-allowed opacity-75"
                />
              </div>
            </div>

            {/* Category 2: Functional & Preferences */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <strong className="text-slate-900 text-sm">2. Functional & Preference Cookies</strong>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Stores your customized browsing preferences such as selected currency (EUR, GBP, CHF, USD), language preference, and vehicle comparison lists.
                </p>
                <div className="text-[10px] font-mono text-slate-400 pt-1">
                  Examples: <code>carstrado_currency</code>, <code>carstrado_lang</code>, <code>compared_vehicles</code>
                </div>
              </div>
              <div className="shrink-0">
                <input
                  type="checkbox"
                  checked={functional}
                  onChange={(e) => setFunctional(e.target.checked)}
                  className="h-5 w-5 rounded border-slate-300 text-orange-600 focus:ring-orange-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Category 3: Performance & Analytics */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <strong className="text-slate-900 text-sm">3. Performance & Diagnostic Analytics</strong>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Anonymously aggregates latency, search engine performance, and error logs across our London, Zurich, and Munich CDN edges to improve platform responsiveness.
                </p>
                <div className="text-[10px] font-mono text-slate-400 pt-1">
                  Examples: <code>_pk_id</code>, <code>_pk_ses</code>, <code>plausible_event</code>
                </div>
              </div>
              <div className="shrink-0">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="h-5 w-5 rounded border-slate-300 text-orange-600 focus:ring-orange-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Category 4: Marketing & Personalization */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <strong className="text-slate-900 text-sm">4. Marketing & Targeted Recommendations</strong>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Allows us to display personalized vehicle recommendations based on your sourcing history and tailor dealer partner notifications.
                </p>
                <div className="text-[10px] font-mono text-slate-400 pt-1">
                  Examples: <code>_fbp</code>, <code>ads_user_id</code>
                </div>
              </div>
              <div className="shrink-0">
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className="h-5 w-5 rounded border-slate-300 text-orange-600 focus:ring-orange-500 cursor-pointer"
                />
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={handleSavePreferences}
                className="px-6 py-3 rounded-2xl bg-orange-600 hover:bg-orange-500 font-extrabold text-white text-xs shadow-lg shadow-orange-600/30 transition-all flex items-center gap-2"
              >
                <Check className="h-4 w-4" /> Save Preferences
              </button>

              <button
                onClick={handleResetCookies}
                className="px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 text-xs transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="h-3.5 w-3.5" /> Reset to Default
              </button>
            </div>

            {saved && (
              <span className="text-emerald-700 font-bold text-xs flex items-center gap-1.5 animate-pulse">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Preferences saved and applied!
              </span>
            )}
          </div>
        </div>

        {/* Section 3: Browser Control Guide */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-4">
          <h3 className="text-lg font-black text-slate-900">How to Control Cookies in Your Browser</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            You can also block or delete cookies directly in your web browser settings (Chrome, Safari, Firefox, Edge). Please note that disabling essential cookies may impact your ability to log in or complete escrow verification processes.
          </p>
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-4">
            <span>Questions? Contact <a href="mailto:privacy@carstrado.com" className="text-orange-600 font-bold">privacy@carstrado.com</a></span>
            <div className="flex gap-4">
              <Link href={route('pages.terms')} className="text-orange-600 font-bold hover:underline">Terms & Conditions</Link>
              <Link href={route('pages.privacy')} className="text-orange-600 font-bold hover:underline">Privacy Policy</Link>
            </div>
          </div>
        </div>

      </div>
    </AppLayout>
  );
}
