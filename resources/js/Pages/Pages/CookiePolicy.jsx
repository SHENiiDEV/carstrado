import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Cookie, Check, ShieldCheck } from 'lucide-react';

export default function CookiePolicyPage() {
  const [essential, setEssential] = useState(true);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSavePreferences = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <AppLayout>
      <Head title="Cookie Policy & Preferences - CarStrado (CarStrado.com)" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-6">
            <span className="text-xs font-bold text-orange-600 uppercase tracking-widest block mb-1">
              Privacy & Consent
            </span>
            <h1 className="text-3xl font-black text-slate-900">Cookie Policy & Consent Manager</h1>
            <p className="text-xs text-slate-500 font-medium mt-1">Manage your cookie preferences for browsing CarStrado.com (BASILDON LIMITED)</p>
          </div>

          <div className="space-y-6 text-xs text-slate-600 leading-relaxed font-medium">
            <p>
              We use cookies and local browser storage to optimize user sessions, remember vehicle search filters, secure authentication, and evaluate anonymous platform metrics.
            </p>

            {/* Interactive Preference Controls */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4">
              <h3 className="font-bold text-slate-900 text-sm mb-2">Cookie Preferences Control</h3>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200">
                <div>
                  <strong className="text-slate-900 block">Essential & Security Cookies</strong>
                  <span className="text-[11px] text-slate-500">Required for Inertia sessions, CSRF protection, and escrow authentication. Cannot be disabled.</span>
                </div>
                <input type="checkbox" checked disabled className="rounded text-orange-600" />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200">
                <div>
                  <strong className="text-slate-900 block">Performance & Analytics Cookies</strong>
                  <span className="text-[11px] text-slate-500">Helps us evaluate search performance and speed across CH/DE/FR servers.</span>
                </div>
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="rounded text-orange-600 focus:ring-orange-500"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200">
                <div>
                  <strong className="text-slate-900 block">Marketing & Personalization Cookies</strong>
                  <span className="text-[11px] text-slate-500">Used for personalized vehicle recommendations and partner dealer updates.</span>
                </div>
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className="rounded text-orange-600 focus:ring-orange-500"
                />
              </div>

              <button
                onClick={handleSavePreferences}
                className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 font-bold text-white text-xs transition-colors flex items-center gap-2"
              >
                <Check className="h-4 w-4" /> Save Cookie Preferences
              </button>

              {saved && (
                <span className="text-emerald-600 font-bold text-xs block">Preferences saved successfully!</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
