import React, { useState, useEffect } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { route } from '@/lib/route';
import AppLayout from '@/Layouts/AppLayout';
import { useCurrency } from '@/lib/currency';
import { CheckCircle2, ShieldCheck, Truck, Calculator, ArrowLeft, Star, Building2, User, FileText, Lock, ChevronRight, Check, Zap, Gauge, Fuel, Award, Sparkles, MapPin, Phone, HelpCircle, Eye, Maximize2, X, ChevronLeft, ArrowRight, Shield } from 'lucide-react';

export default function VehicleShow({ vehicle, similarVehicles = [], pricingBreakdown = {} }) {
  const { auth } = usePage().props;
  const currentUser = auth?.user;
  const isB2B = currentUser?.role === 'b2b_fleet_manager';
  const { currency, toggleCurrency, format } = useCurrency();

  const [quantity, setQuantity] = useState(1);
  const [buyerNotes, setBuyerNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('specs');
  const [fullscreenIdx, setFullscreenIdx] = useState(null);

  // Calculator states
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanTermMonths, setLoanTermMonths] = useState(48);

  const images = vehicle.images_json || [
    'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=80',
  ];
  const [activeImg, setActiveImg] = useState(images[0]);

  // Keyboard Navigation for Fullscreen Modal
  useEffect(() => {
    function handleKeyDown(e) {
      if (fullscreenIdx === null) return;
      if (e.key === 'ArrowRight') {
        setFullscreenIdx((prev) => (prev + 1) % images.length);
      } else if (e.key === 'ArrowLeft') {
        setFullscreenIdx((prev) => (prev - 1 + images.length) % images.length);
      } else if (e.key === 'Escape') {
        setFullscreenIdx(null);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullscreenIdx, images.length]);

  // Pricing calculations
  const basePrice = vehicle.price_eur || 0;
  const commissionRate = vehicle.is_fleet_eligible ? 3.5 : 4.5;
  const commissionAmount = Math.round((basePrice * commissionRate) / 100);
  const estimatedVat = vehicle.location_country === 'CH' ? Math.round(basePrice * 0.081) : 0;
  const deliveryFee = 450;
  const totalEstimatedPrice = basePrice + commissionAmount + estimatedVat + deliveryFee;

  // Monthly financing calculation
  const downPaymentAmount = Math.round((totalEstimatedPrice * downPaymentPercent) / 100);
  const loanPrincipal = totalEstimatedPrice - downPaymentAmount;
  const monthlyInterestRate = 0.039 / 12; // 3.9% APR
  const monthlyPayment = Math.round(
    (loanPrincipal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermMonths)) /
    (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1)
  );

  const handleProcurementSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    router.post(route('deals.store'), {
      vehicle_id: vehicle.id,
      type: isB2B ? 'b2b_fleet' : 'retail',
      quantity,
      buyer_notes: buyerNotes,
    });
  };

  const getCountryFlag = (code) => {
    switch (code) {
      case 'CH': return '🇨🇭 Switzerland';
      case 'DE': return '🇩🇪 Germany';
      case 'FR': return '🇫🇷 France';
      default: return code;
    }
  };

  const nextFullscreenImg = (e) => {
    e?.stopPropagation();
    setFullscreenIdx((prev) => (prev + 1) % images.length);
  };

  const prevFullscreenImg = (e) => {
    e?.stopPropagation();
    setFullscreenIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <AppLayout>
      <Head title={`${vehicle.make} ${vehicle.model} (${vehicle.year}) - CarStrado Sourcing`} />

      {/* Floating Sticky Quick Action Header Bar */}
      <div className="sticky top-20 z-30 bg-slate-900/95 text-white backdrop-blur-md border-b border-slate-800 py-3 px-4 sm:px-6 lg:px-8 shadow-xl hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="px-2.5 py-0.5 rounded bg-orange-500 text-white text-xs font-black uppercase font-mono">
              {vehicle.make}
            </span>
            <div className="font-extrabold text-sm tracking-tight text-white">
              {vehicle.make} {vehicle.model} <span className="text-slate-400 font-normal">({vehicle.year})</span>
            </div>
            <span className="text-xs text-slate-300 font-mono">VIN: {vehicle.vin}</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Total Investment</span>
              <span className="text-lg font-black text-orange-400 font-mono">{format(totalEstimatedPrice)}</span>
            </div>
            <a
              href="#procurement-form"
              className="px-5 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-md shadow-orange-600/30 transition-all flex items-center gap-1.5"
            >
              <FileText className="h-4 w-4" />
              <span>Reserve & Request Escrow</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation & Currency Selector */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 text-xs text-slate-500">
          <div className="flex items-center gap-2 font-semibold">
            <Link href={route('vehicles.index')} className="hover:text-orange-600 transition-colors">Catalog</Link>
            <span>/</span>
            <span className="text-slate-700">{vehicle.make}</span>
            <span>/</span>
            <span className="text-slate-900 font-bold">{vehicle.model}</span>
          </div>

          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-[11px] font-bold text-slate-500">Currency:</span>
            <button
              onClick={() => toggleCurrency('EUR')}
              className={`px-2 py-0.5 rounded text-[11px] font-black ${currency === 'EUR' ? 'bg-orange-600 text-white' : 'text-slate-600'}`}
            >
              EUR (€)
            </button>
            <button
              onClick={() => toggleCurrency('CHF')}
              className={`px-2 py-0.5 rounded text-[11px] font-black ${currency === 'CHF' ? 'bg-orange-600 text-white' : 'text-slate-600'}`}
            >
              CHF (Fr)
            </button>
          </div>
        </div>

        {/* Title Header Bar */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-lg text-xs font-black bg-orange-100 text-orange-900 uppercase tracking-wider">
                {vehicle.make} &bull; {vehicle.year}
              </span>
              <span className="px-3 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-800">
                {getCountryFlag(vehicle.location_country)}
              </span>
              {vehicle.is_fleet_eligible && (
                <span className="px-3 py-1 rounded-lg text-xs font-bold bg-purple-100 text-purple-900 flex items-center gap-1">
                  <Building2 className="h-3.5 w-3.5" /> Corporate Fleet Sourcing
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              {vehicle.make} {vehicle.model}
            </h1>
            <p className="text-sm text-slate-500 font-medium mt-1">{vehicle.trim || vehicle.body_style}</p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="text-left md:text-right bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-lg min-w-[240px]">
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Asking Price</div>
              <div className="text-3xl font-black text-white font-mono">{format(basePrice)}</div>
              <div className="text-xs text-slate-300 font-semibold mt-1">
                Est. Total: <strong className="text-orange-400">{format(totalEstimatedPrice)}</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column: Media Gallery, Specs Bento, Financing Calculator */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery Section with Direct Click Zoom */}
            <div className="space-y-4">
              <div
                onClick={() => {
                  const currentIdx = images.indexOf(activeImg);
                  setFullscreenIdx(currentIdx !== -1 ? currentIdx : 0);
                }}
                className="relative rounded-3xl bg-slate-100 border border-slate-200 overflow-hidden shadow-md group cursor-pointer"
                title="Click to view full-screen high-res photo"
              >
                <img
                  src={activeImg}
                  alt={`${vehicle.make} ${vehicle.model}`}
                  className="w-full h-[480px] object-cover object-center transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/0 to-slate-950/0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-4 py-2.5 rounded-2xl bg-slate-900/90 text-white text-xs font-bold backdrop-blur-md border border-slate-700 flex items-center gap-2 shadow-2xl scale-95 group-hover:scale-100 transition-transform">
                    <Maximize2 className="h-4 w-4 text-orange-400" />
                    Click to Open Fullscreen Gallery ({images.length} Photos)
                  </span>
                </div>

                <div className="absolute bottom-4 right-4 bg-slate-900/80 text-white text-xs font-bold px-3 py-1.5 rounded-xl backdrop-blur-md flex items-center gap-1.5 shadow-md">
                  <Eye className="h-3.5 w-3.5 text-orange-400" />
                  <span>Click photo to enlarge</span>
                </div>
              </div>

              {/* Gallery Thumbnails Grid */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImg(img)}
                      className={`relative rounded-2xl overflow-hidden h-24 w-36 flex-shrink-0 border-2 transition-all cursor-pointer ${
                        activeImg === img ? 'border-orange-500 scale-105 shadow-md' : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Key Performance Indicators Bento Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
                <Gauge className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">Mileage</span>
                <span className="text-base font-black text-slate-900">{(vehicle.mileage_km || 0).toLocaleString()} km</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
                <Zap className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">Powertrain</span>
                <span className="text-base font-black text-slate-900 capitalize">{vehicle.fuel_type}</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
                <Award className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">TÜV / DEKRA</span>
                <span className="text-base font-black text-emerald-600">Passed (150-Pt)</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
                <ShieldCheck className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">VIN Audit</span>
                <span className="text-xs font-mono font-bold text-slate-800">{vehicle.vin?.substring(0, 10)}...</span>
              </div>
            </div>

            {/* Detailed Specs & Features Tabs */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
              {/* Tab Selection */}
              <div className="flex items-center gap-6 border-b border-slate-200 pb-4 mb-6 overflow-x-auto">
                {[
                  { id: 'specs', label: 'Technical Specifications' },
                  { id: 'features', label: 'Equipped Options' },
                  { id: 'calculator', label: 'Lease & Financing Calculator' },
                  { id: 'inspection', label: 'TÜV Inspection Certificate' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-3 text-xs font-extrabold transition-all whitespace-nowrap relative ${
                      activeTab === tab.id
                        ? 'text-orange-600 border-b-2 border-orange-600'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab 1: Technical Specs */}
              {activeTab === 'specs' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                  <div className="flex justify-between py-2.5 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Manufacturer:</span>
                    <strong className="text-slate-900">{vehicle.make}</strong>
                  </div>
                  <div className="flex justify-between py-2.5 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Model & Trim:</span>
                    <strong className="text-slate-900">{vehicle.model}</strong>
                  </div>
                  <div className="flex justify-between py-2.5 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">First Registration Year:</span>
                    <strong className="text-slate-900">{vehicle.year}</strong>
                  </div>
                  <div className="flex justify-between py-2.5 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Transmission:</span>
                    <strong className="text-slate-900">{vehicle.transmission}</strong>
                  </div>
                  <div className="flex justify-between py-2.5 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Body Style & Color:</span>
                    <strong className="text-slate-900">{vehicle.body_style} ({vehicle.color || 'Factory Finish'})</strong>
                  </div>
                  <div className="flex justify-between py-2.5 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Full Chassis VIN:</span>
                    <strong className="font-mono text-xs text-orange-600 font-bold">{vehicle.vin}</strong>
                  </div>
                </div>
              )}

              {/* Tab 2: Equipped Features */}
              {activeTab === 'features' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {vehicle.features_json?.map((feat, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 flex items-center gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 3: Interactive Lease & Loan Calculator */}
              {activeTab === 'calculator' && (
                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-orange-50 border border-orange-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold text-slate-600 block uppercase tracking-wider">Estimated Monthly Rate ({currency})</span>
                      <div className="text-4xl font-black text-orange-600 font-mono mt-1">
                        {format(monthlyPayment)}<span className="text-sm text-slate-500 font-normal"> / month</span>
                      </div>
                    </div>
                    <div className="text-right text-xs text-slate-500 font-medium">
                      <span className="font-bold text-slate-900">3.9% Fixed APR</span>
                      <span className="block text-[11px] text-slate-400">Subject to bank credit approval</span>
                    </div>
                  </div>

                  <div className="space-y-5 text-xs font-semibold">
                    <div>
                      <div className="flex justify-between mb-2 text-slate-700">
                        <span>Down Payment ({downPaymentPercent}%):</span>
                        <span className="font-mono font-bold text-slate-900 text-sm">{format(downPaymentAmount)}</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="50"
                        step="5"
                        value={downPaymentPercent}
                        onChange={(e) => setDownPaymentPercent(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2 text-slate-700">
                        <span>Loan / Lease Duration:</span>
                        <span className="font-mono font-bold text-slate-900 text-sm">{loanTermMonths} Months ({loanTermMonths / 12} Years)</span>
                      </div>
                      <div className="flex gap-3">
                        {[24, 36, 48, 60].map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setLoanTermMonths(m)}
                            className={`flex-1 py-2.5 rounded-xl font-bold border transition-all ${
                              loanTermMonths === m
                                ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {m} Mo
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: TÜV Audit */}
              {activeTab === 'inspection' && (
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 text-xs">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>Independent 150-Point TÜV / DEKRA Audit Passed</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    This vehicle has been inspected at {vehicle.dealer?.name}. Battery state of health (SoH), chassis alignment, brakes, and electrical systems are 100% compliant with EU road safety standards.
                  </p>
                </div>
              )}
            </div>

            {/* Dealer Partner Trust Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 font-black text-2xl">
                  {vehicle.dealer?.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-slate-900 text-lg">{vehicle.dealer?.name}</h4>
                    <span className="px-2.5 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-bold">Verified Partner</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Official License: <span className="font-mono font-bold text-slate-700">{vehicle.dealer?.license_number}</span> &bull; {vehicle.dealer?.city}, {vehicle.dealer?.country}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-amber-500 font-black text-lg">
                  <Star className="h-5 w-5 fill-amber-500" />
                  <span>{vehicle.dealer?.rating} / 5.0</span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">100+ Verified Transactions</span>
              </div>
            </div>
          </div>

          {/* Right Column: Fee Breakdown & Order Form */}
          <div className="space-y-6" id="procurement-form">
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xl sticky top-36">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div className="flex items-center gap-2 text-slate-900 font-black">
                  <Calculator className="h-5 w-5 text-orange-600" />
                  <h3>Brokerage Price Breakdown</h3>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-slate-100 text-slate-700">
                  {isB2B ? 'B2B Terms' : 'B2C Terms'}
                </span>
              </div>

              {/* Fee Breakdown Stack */}
              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between text-slate-600 font-medium">
                  <span>Asking Price:</span>
                  <span className="font-mono font-bold text-slate-900">{format(basePrice)}</span>
                </div>

                <div className="flex justify-between text-slate-600 font-medium">
                  <span>MiaVia Fee ({commissionRate}%):</span>
                  <span className="font-mono font-bold text-orange-600">
                    +{format(commissionAmount)}
                  </span>
                </div>

                <div className="flex justify-between text-slate-600 font-medium">
                  <span>Estimated Taxes / VAT:</span>
                  <span className="font-mono font-bold text-slate-900">
                    {estimatedVat > 0 ? `+${format(estimatedVat)}` : '€0.00 (VAT Reverse Charge)'}
                  </span>
                </div>

                <div className="flex justify-between text-slate-600 font-medium">
                  <span>Transport Logistics:</span>
                  <span className="font-mono font-bold text-slate-900">+{format(deliveryFee)}</span>
                </div>

                <div className="pt-4 border-t border-slate-200 flex justify-between items-baseline">
                  <span className="font-extrabold text-slate-900">Total Investment:</span>
                  <span className="text-2xl font-black text-slate-900 font-mono">
                    {format(totalEstimatedPrice)}
                  </span>
                </div>
              </div>

              {/* Procurement Form */}
              <form onSubmit={handleProcurementSubmit} className="space-y-4">
                {isB2B && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Fleet Order Quantity
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm font-bold focus:ring-2 focus:ring-orange-500 bg-white"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Delivery Request & Notes
                  </label>
                  <textarea
                    rows="3"
                    placeholder="e.g. Request Swiss registration plates, target delivery by end of month..."
                    value={buyerNotes}
                    onChange={(e) => setBuyerNotes(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm placeholder-slate-400 focus:ring-2 focus:ring-orange-500 bg-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl font-extrabold text-white bg-orange-600 hover:bg-orange-500 shadow-lg shadow-orange-500/30 text-sm transition-all flex items-center justify-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  <span>{isB2B ? 'Submit B2B Fleet Order' : 'Request Retail Purchase & Escrow'}</span>
                </button>
              </form>

              {/* Escrow Guarantee Callout */}
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-2">
                <div className="flex items-center gap-2 text-emerald-600 font-bold">
                  <ShieldCheck className="h-4 w-4" />
                  <span>100% Swiss & EU Escrow Protection</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                  Funds are held in Wise/Swiss regulated escrow float under VQF AML regulations until vehicle delivery and inspection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Interactive Carousel Modal */}
      {fullscreenIdx !== null && (
        <div
          onClick={() => setFullscreenIdx(null)}
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-lg flex flex-col justify-between p-4 sm:p-8 cursor-pointer animate-in fade-in duration-200 select-none"
        >
          {/* Top Bar: Counter & Close */}
          <div className="flex items-center justify-between text-white z-20">
            <div className="bg-slate-900/80 px-4 py-1.5 rounded-full border border-slate-700 text-xs font-mono font-bold">
              Photo {fullscreenIdx + 1} of {images.length} &bull; {vehicle.make} {vehicle.model}
            </div>

            <button
              type="button"
              onClick={() => setFullscreenIdx(null)}
              className="p-3 rounded-full bg-slate-900/80 hover:bg-orange-600 text-white border border-slate-700 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Main Image View with Side Navigation Buttons */}
          <div className="relative flex-1 flex items-center justify-center my-4">
            {/* Previous Photo Button */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={prevFullscreenImg}
                className="absolute left-2 sm:left-6 p-4 rounded-full bg-slate-900/80 hover:bg-orange-600 text-white border border-slate-700 shadow-2xl transition-all hover:scale-110 z-20"
                title="Previous Photo (Left Arrow Key)"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
            )}

            <img
              src={images[fullscreenIdx]}
              alt={`Full screen view ${fullscreenIdx + 1}`}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[75vh] max-w-[90vw] object-contain rounded-3xl shadow-2xl cursor-default transition-all duration-300"
            />

            {/* Next Photo Button */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={nextFullscreenImg}
                className="absolute right-2 sm:right-6 p-4 rounded-full bg-slate-900/80 hover:bg-orange-600 text-white border border-slate-700 shadow-2xl transition-all hover:scale-110 z-20"
                title="Next Photo (Right Arrow Key)"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            )}
          </div>

          {/* Bottom Thumbnails Strip Bar */}
          {images.length > 1 && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex justify-center gap-3 overflow-x-auto py-2 z-20 max-w-4xl mx-auto"
            >
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setFullscreenIdx(idx);
                  }}
                  className={`relative rounded-xl overflow-hidden h-16 w-24 flex-shrink-0 border-2 transition-all cursor-pointer ${
                    fullscreenIdx === idx ? 'border-orange-500 scale-105 shadow-xl ring-2 ring-orange-500/50' : 'border-slate-800 opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </AppLayout>
  );
}
