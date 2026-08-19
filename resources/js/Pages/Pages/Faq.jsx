import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { route } from '@/lib/route';
import AppLayout from '@/Layouts/AppLayout';
import { Search, ChevronDown, HelpCircle, ShieldCheck, Landmark, FileText, Phone, Mail, ArrowRight } from 'lucide-react';

export default function FaqPage({ faqCategories }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (catIdx, itemIdx) => {
    const key = `${catIdx}-${itemIdx}`;
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <AppLayout>
      <Head title="Frequently Asked Questions (FAQ) - mobile.broker" />

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-slate-100 to-slate-50 border-b border-slate-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 uppercase tracking-wider mb-3 inline-block">
            Help & Knowledge Center
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-600 text-base sm:text-lg mt-3 font-medium">
            Everything you need to know about vehicle sourcing, Swiss & EU escrow security, VQF compliance, and B2B fleet procurement.
          </p>

          {/* Search Box */}
          <div className="relative max-w-xl mx-auto mt-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search FAQ by keyword (e.g. escrow, VAT, delivery, VQF)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-300 text-slate-900 text-sm font-semibold placeholder-slate-400 focus:ring-2 focus:ring-orange-500 bg-white shadow-md"
            />
          </div>
        </div>
      </section>

      {/* FAQ Accordion List */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {faqCategories.map((cat, catIdx) => {
          const filteredItems = cat.items.filter(
            (item) =>
              item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.a.toLowerCase().includes(searchQuery.toLowerCase())
          );

          if (filteredItems.length === 0) return null;

          return (
            <div key={catIdx} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2 pb-3 border-b border-slate-100">
                <HelpCircle className="h-5 w-5 text-orange-600" />
                {cat.category}
              </h2>

              <div className="space-y-4">
                {filteredItems.map((item, itemIdx) => {
                  const isOpen = openItems[`${catIdx}-${itemIdx}`] || searchQuery.length > 0;
                  return (
                    <div
                      key={itemIdx}
                      className="rounded-xl border border-slate-200 overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => toggleItem(catIdx, itemIdx)}
                        className="w-full px-5 py-4 text-left font-bold text-slate-900 text-sm flex items-center justify-between gap-4 bg-slate-50 hover:bg-slate-100 transition-colors"
                      >
                        <span>{item.q}</span>
                        <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {isOpen && (
                        <div className="px-5 py-4 bg-white text-xs text-slate-600 leading-relaxed font-medium border-t border-slate-100">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Still Need Help Box */}
        <div className="bg-slate-900 rounded-2xl p-8 text-white text-center shadow-xl">
          <h3 className="text-2xl font-black mb-2">Still Have Questions?</h3>
          <p className="text-slate-300 text-xs max-w-lg mx-auto mb-6 font-medium">
            Our Swiss & EU automotive brokerage team is available Monday to Friday, 08:00 - 18:00 CET.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:support@mobile.broker"
              className="px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 font-bold text-xs transition-colors flex items-center gap-2"
            >
              <Mail className="h-4 w-4" /> Email Support Desk
            </a>
            <a
              href="tel:+41449990011"
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold text-xs transition-colors flex items-center gap-2 text-slate-200"
            >
              <Phone className="h-4 w-4" /> Call Zurich Desk: +41 44 999 00 11
            </a>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
