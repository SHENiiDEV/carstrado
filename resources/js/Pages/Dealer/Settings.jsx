import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { route } from '@/lib/route';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Store, Save, Building2, MapPin, Award, CreditCard, ShieldCheck, Check, Plus, Trash2, Bell, Lock } from 'lucide-react';

export default function DealerSettings({ dealer }) {
  const brandPresets = ['Porsche', 'BMW', 'Mercedes-Benz', 'Audi', 'Tesla', 'Volvo', 'Volkswagen'];

  const [brands, setBrands] = useState(dealer.brands_json || ['Porsche', 'BMW', 'Audi']);

  const { data, setData, post, processing, errors } = useForm({
    name: dealer.name || 'Boutique Sportwagen Zurich',
    license_number: dealer.license_number || 'CH-DEALER-8849',
    country: dealer.country || 'CH',
    city: dealer.city || 'Zurich',
    address: dealer.address || 'Bahnhofstrasse 102, 8001 Zurich',
    brands: brands,
  });

  const toggleBrandTag = (brand) => {
    let updated;
    if (brands.includes(brand)) {
      updated = brands.filter((b) => b !== brand);
    } else {
      updated = [...brands, brand];
    }
    setBrands(updated);
    setData('brands', updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('dealer.settings.update'));
  };

  return (
    <DashboardLayout
      activeTab="settings"
      title="Dealership Preferences & Storefront Settings"
    >
      <Head title="Dealership Settings - Dealer Portal" />

      <div className="max-w-4xl mx-auto py-4 space-y-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xl space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 font-bold shadow-sm">
                <Store className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-slate-900">Dealership Settings & Storefront Bio</h1>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Manage your dealership public details, verified license codes, and escrow payout preferences.
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" /> Verified Partner
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 text-xs font-semibold">
            {/* Section 1: Dealership Profile */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
                <Building2 className="h-4 w-4 text-orange-600" />
                Storefront Profile & Commercial Registration
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 uppercase tracking-wider mb-1">
                    Official Dealership Name
                  </label>
                  <input
                    type="text"
                    required
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 focus:ring-2 focus:ring-orange-500 bg-white"
                  />
                  {errors.name && <span className="text-red-600 font-semibold mt-1 block">{errors.name}</span>}
                </div>

                <div>
                  <label className="block text-slate-700 uppercase tracking-wider mb-1">
                    Commercial License Code
                  </label>
                  <input
                    type="text"
                    required
                    value={data.license_number}
                    onChange={(e) => setData('license_number', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 font-mono font-bold text-slate-900 focus:ring-2 focus:ring-orange-500 bg-white"
                  />
                  {errors.license_number && <span className="text-red-600 font-semibold mt-1 block">{errors.license_number}</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-700 uppercase tracking-wider mb-1">
                    Country
                  </label>
                  <select
                    value={data.country}
                    onChange={(e) => setData('country', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-bold focus:ring-2 focus:ring-orange-500 bg-white"
                  >
                    <option value="CH">🇨🇭 Switzerland</option>
                    <option value="DE">🇩🇪 Germany</option>
                    <option value="FR">🇫🇷 France</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 uppercase tracking-wider mb-1">
                    City / Canton
                  </label>
                  <input
                    type="text"
                    required
                    value={data.city}
                    onChange={(e) => setData('city', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-orange-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 uppercase tracking-wider mb-1">
                    Showroom Street Address
                  </label>
                  <input
                    type="text"
                    value={data.address}
                    onChange={(e) => setData('address', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-orange-500 bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Represented Brands */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
                <Award className="h-4 w-4 text-orange-600" />
                Represented Automotive Brands
              </h3>

              <div className="flex flex-wrap gap-2">
                {brandPresets.map((brand) => {
                  const isSelected = brands.includes(brand);
                  return (
                    <button
                      key={brand}
                      type="button"
                      onClick={() => toggleBrandTag(brand)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 border ${
                        isSelected
                          ? 'bg-slate-900 text-white border-slate-800 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {isSelected ? <Check className="h-3.5 w-3.5 text-orange-500" /> : <Plus className="h-3.5 w-3.5 text-slate-400" />}
                      <span>{brand}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 3: Escrow Settlement Account */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-emerald-600" />
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Swiss VQF Bank Escrow Payout IBAN</h4>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Sales proceeds and vehicle payouts will be transferred automatically to this IBAN upon escrow clearance.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-slate-500 text-[10px] uppercase tracking-wider mb-1 font-bold">IBAN Account Number</label>
                  <input
                    type="text"
                    readOnly
                    value="CH93 0000 0000 0000 0000 0"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-mono font-bold text-slate-700 bg-slate-100 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 text-[10px] uppercase tracking-wider mb-1 font-bold">Bank Name & BIC</label>
                  <input
                    type="text"
                    readOnly
                    value="UBS AG Zurich (UBSWCHZH80A)"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-mono text-slate-700 bg-slate-100 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              disabled={processing}
              className="w-full py-4 rounded-2xl font-extrabold text-white bg-orange-600 hover:bg-orange-500 shadow-xl shadow-orange-500/30 text-sm transition-all flex items-center justify-center gap-2"
            >
              <Save className="h-5 w-5" />
              <span>Save Dealership Preferences</span>
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
