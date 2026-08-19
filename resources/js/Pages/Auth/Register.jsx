import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { route } from '@/lib/route';
import AppLayout from '@/Layouts/AppLayout';
import { COUNTRIES } from '@/lib/countries';
import { User, Building2, Store, Lock, Mail, Phone, MapPin, ArrowRight, ShieldCheck, Check, Calendar, Home } from 'lucide-react';

export default function Register() {
  const [selectedRole, setSelectedRole] = useState('retail_buyer');

  const { data, setData, post, processing, errors } = useForm({
    name: '',
    surname: '',
    email: '',
    phone: '',
    date_of_birth: '',
    street_address: '',
    city: '',
    country: 'United Kingdom',
    postal_code: '',
    password: '',
    password_confirmation: '',
    terms: false,
    role: 'retail_buyer',
    company_name: '',
    vat_number: '',
    dealership_name: '',
    license_number: '',
  });

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setData('role', role);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('register'));
  };

  return (
    <AppLayout>
      <Head title="Create Account - CarStrado (CarStrado.com)" />

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="h-12 w-12 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 font-bold mx-auto mb-3">
              <User className="h-6 w-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Create Your CarStrado Account</h1>
            <p className="text-xs text-slate-500 font-medium mt-1.5 max-w-md mx-auto">
              Direct European automotive sourcing & secure escrow settlements by BASILDON LIMITED.
            </p>
          </div>

          {/* Role Selection Tabs */}
          <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-slate-100 mb-8">
            <button
              type="button"
              onClick={() => handleRoleChange('retail_buyer')}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                selectedRole === 'retail_buyer'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200 font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="h-4 w-4 text-orange-600" />
              <span>Retail Buyer</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleChange('b2b_fleet_manager')}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                selectedRole === 'b2b_fleet_manager'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200 font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="h-4 w-4 text-purple-600" />
              <span>B2B Fleet</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleChange('dealer_partner')}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                selectedRole === 'dealer_partner'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200 font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Store className="h-4 w-4 text-emerald-600" />
              <span>Dealer Partner</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Section 1: Personal Information */}
            <div>
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="h-5 w-5 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-[10px]">1</span>
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alexander"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm font-semibold focus:ring-2 focus:ring-orange-500 bg-white"
                  />
                  {errors.name && <span className="text-xs text-red-600 font-semibold mt-1 block">{errors.name}</span>}
                </div>

                {/* Surname */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Surname
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Smith"
                    value={data.surname}
                    onChange={(e) => setData('surname', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm font-semibold focus:ring-2 focus:ring-orange-500 bg-white"
                  />
                  {errors.surname && <span className="text-xs text-red-600 font-semibold mt-1 block">{errors.surname}</span>}
                </div>
              </div>
            </div>

            {/* Email, Phone & Date of Birth */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+44 20 7946 0912"
                  value={data.phone}
                  onChange={(e) => setData('phone', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm font-semibold focus:ring-2 focus:ring-orange-500 bg-white"
                />
                {errors.phone && <span className="text-xs text-red-600 font-semibold mt-1 block">{errors.phone}</span>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  required
                  value={data.date_of_birth}
                  onChange={(e) => setData('date_of_birth', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm font-semibold focus:ring-2 focus:ring-orange-500 bg-white"
                />
                {errors.date_of_birth && <span className="text-xs text-red-600 font-semibold mt-1 block">{errors.date_of_birth}</span>}
              </div>
            </div>

            {/* Dynamic Role Fields */}
            {selectedRole === 'b2b_fleet_manager' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-purple-50 border border-purple-200">
                <div>
                  <label className="block text-xs font-bold text-purple-900 uppercase tracking-wider mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Basildon Fleet Ltd"
                    value={data.company_name}
                    onChange={(e) => setData('company_name', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-slate-900 text-xs font-semibold focus:ring-2 focus:ring-purple-500 bg-white"
                  />
                  {errors.company_name && <span className="text-xs text-red-600 font-semibold mt-1 block">{errors.company_name}</span>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-purple-900 uppercase tracking-wider mb-1">
                    VAT Tax ID (Reverse Charge)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="GB123456789"
                    value={data.vat_number}
                    onChange={(e) => setData('vat_number', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-slate-900 text-xs font-semibold focus:ring-2 focus:ring-purple-500 bg-white font-mono"
                  />
                  {errors.vat_number && <span className="text-xs text-red-600 font-semibold mt-1 block">{errors.vat_number}</span>}
                </div>
              </div>
            )}

            {selectedRole === 'dealer_partner' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <div>
                  <label className="block text-xs font-bold text-emerald-900 uppercase tracking-wider mb-1">
                    Dealership Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mayfair Prestige Motors"
                    value={data.dealership_name}
                    onChange={(e) => setData('dealership_name', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-slate-900 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 bg-white"
                  />
                  {errors.dealership_name && <span className="text-xs text-red-600 font-semibold mt-1 block">{errors.dealership_name}</span>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-900 uppercase tracking-wider mb-1">
                    Official Dealer License
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="UK-DLR-2026-99"
                    value={data.license_number}
                    onChange={(e) => setData('license_number', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-slate-900 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 bg-white font-mono"
                  />
                  {errors.license_number && <span className="text-xs text-red-600 font-semibold mt-1 block">{errors.license_number}</span>}
                </div>
              </div>
            )}

            {/* Section 2: Address (4 Sections) */}
            <div className="pt-2">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="h-5 w-5 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-[10px]">2</span>
                Residential / Registered Address
              </h3>

              {/* 1. Street, house number, apartment... */}
              <div className="mb-4">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  1. Street, House Number, Apartment...
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2 Navarre Street, Apt 4B"
                  value={data.street_address}
                  onChange={(e) => setData('street_address', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm font-semibold focus:ring-2 focus:ring-orange-500 bg-white"
                />
                {errors.street_address && <span className="text-xs text-red-600 font-semibold mt-1 block">{errors.street_address}</span>}
              </div>

              {/* 2. City, 3. Country, 4. Post Code */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    2. City
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. London"
                    value={data.city}
                    onChange={(e) => setData('city', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm font-semibold focus:ring-2 focus:ring-orange-500 bg-white"
                  />
                  {errors.city && <span className="text-xs text-red-600 font-semibold mt-1 block">{errors.city}</span>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    3. Country
                  </label>
                  <select
                    required
                    value={data.country}
                    onChange={(e) => setData('country', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm font-bold focus:ring-2 focus:ring-orange-500 bg-white"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  {errors.country && <span className="text-xs text-red-600 font-semibold mt-1 block">{errors.country}</span>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    4. Post Code
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. E2 7JH"
                    value={data.postal_code}
                    onChange={(e) => setData('postal_code', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm font-semibold focus:ring-2 focus:ring-orange-500 bg-white uppercase font-mono"
                  />
                  {errors.postal_code && <span className="text-xs text-red-600 font-semibold mt-1 block">{errors.postal_code}</span>}
                </div>
              </div>
            </div>

            {/* Section 3: Passwords */}
            <div className="pt-2">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="h-5 w-5 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-[10px]">3</span>
                Security
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm font-semibold focus:ring-2 focus:ring-orange-500 bg-white"
                  />
                  {errors.password && <span className="text-xs text-red-600 font-semibold mt-1 block">{errors.password}</span>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm font-semibold focus:ring-2 focus:ring-orange-500 bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Terms & Conditions Checkbox */}
            <div className="pt-3 border-t border-slate-100">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  required
                  checked={data.terms}
                  onChange={(e) => setData('terms', e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-orange-600 focus:ring-orange-500 cursor-pointer"
                />
                <span className="text-xs text-slate-600 leading-relaxed font-medium">
                  I agree to the{' '}
                  <Link href={route('pages.terms')} target="_blank" className="font-bold text-orange-600 hover:underline">
                    Terms & Conditions
                  </Link>
                  {' '}and{' '}
                  <Link href={route('pages.privacy')} target="_blank" className="font-bold text-orange-600 hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
              {errors.terms && <span className="text-xs text-red-600 font-semibold mt-1 block">{errors.terms}</span>}
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full py-3.5 rounded-2xl font-black text-white bg-orange-600 hover:bg-orange-500 shadow-xl shadow-orange-600/30 text-sm transition-all flex items-center justify-center gap-2 mt-4 active:scale-[0.98]"
            >
              <span>Create CarStrado Account</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Already have an account */}
          <div className="mt-6 text-center text-xs text-slate-500 font-medium">
            Already have an account?{' '}
            <Link href={route('login')} className="text-orange-600 font-bold hover:underline">
              Sign In Here
            </Link>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
