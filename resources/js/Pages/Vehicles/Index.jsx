import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { route } from '@/lib/route';
import AppLayout from '@/Layouts/AppLayout';
import { useCurrency } from '@/lib/currency';
import { Search, Filter, SlidersHorizontal, MapPin, Gauge, Fuel, ShieldCheck, Star, ArrowRight, Building2, Car, RefreshCw, CheckCircle2, ChevronRight, ArrowUpDown, Shield, Truck, Landmark, HelpCircle, ChevronDown, Award, Grid, List, X, Sparkles, Plus } from 'lucide-react';

import CompareModal from '@/Components/CompareModal';

export default function VehiclesIndex({
  vehicles = [],
  filters = {},
  makes = [],
  brandCounts = [],
  modelsMap = {},
  bodyStyles = [],
  countries = [],
  stats = {}
}) {
  const { currency, toggleCurrency, format } = useCurrency();

  const safeVehicles = Array.isArray(vehicles) ? vehicles : [];
  const safeFilters = filters || {};
  const safeMakes = Array.isArray(makes) ? makes.filter(Boolean) : [];
  const safeBodyStyles = Array.isArray(bodyStyles) ? bodyStyles.filter(Boolean) : [];
  const safeBrandCounts = Array.isArray(brandCounts) ? brandCounts : [];

  const [search, setSearch] = useState(safeFilters.search || '');
  const [selectedMake, setSelectedMake] = useState(safeFilters.make || 'all');
  const [selectedModel, setSelectedModel] = useState(safeFilters.model || 'all');
  const [selectedFuel, setSelectedFuel] = useState(safeFilters.fuel_type || 'all');
  const [selectedBodyStyle, setSelectedBodyStyle] = useState(safeFilters.body_style || 'all');
  const [selectedCountry, setSelectedCountry] = useState(safeFilters.country || 'all');
  const [maxPrice, setMaxPrice] = useState(safeFilters.max_price || '250000');
  const [maxMileage, setMaxMileage] = useState(safeFilters.max_mileage || 'all');
  const [minYear, setMinYear] = useState(safeFilters.min_year || 'all');
  const [sortOrder, setSortOrder] = useState(safeFilters.sort || 'created_at_desc');
  const [viewMode, setViewMode] = useState('grid');
  const [fleetOnly, setFleetOnly] = useState(safeFilters.fleet_only === 'true');
  const [openFaq, setOpenFaq] = useState(null);

  // Comparison State
  const [compareList, setCompareList] = useState([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const toggleCompareVehicle = (vehicle) => {
    if (compareList.some((v) => v.id === vehicle.id)) {
      setCompareList(compareList.filter((v) => v.id !== vehicle.id));
    } else {
      if (compareList.length >= 3) {
        alert('You can compare up to 3 vehicles side-by-side.');
        return;
      }
      setCompareList([...compareList, vehicle]);
    }
  };

  const brandLogos = safeBrandCounts;

  // Available models for currently selected make
  const availableModels = selectedMake !== 'all' && modelsMap[selectedMake]
    ? modelsMap[selectedMake]
    : Object.values(modelsMap).flat().filter(Boolean);

  const applyFilters = (override = {}) => {
    const raw = {
      search,
      make: selectedMake,
      model: selectedModel,
      fuel_type: selectedFuel,
      body_style: selectedBodyStyle,
      country: selectedCountry,
      max_price: maxPrice === '250000' ? '' : maxPrice,
      max_mileage: maxMileage,
      min_year: minYear,
      sort: sortOrder,
      fleet_only: fleetOnly ? 'true' : 'false',
      ...override,
    };

    const cleanParams = {};
    Object.keys(raw).forEach((key) => {
      const val = raw[key];
      if (val && val !== 'all' && val !== 'false' && val !== '') {
        cleanParams[key] = val;
      }
    });

    router.get(route('vehicles.index'), cleanParams, { preserveState: true, replace: true });
  };

  const handleReset = () => {
    setSearch('');
    setSelectedMake('all');
    setSelectedModel('all');
    setSelectedFuel('all');
    setSelectedBodyStyle('all');
    setSelectedCountry('all');
    setMaxPrice('250000');
    setMaxMileage('all');
    setMinYear('all');
    setSortOrder('created_at_desc');
    setFleetOnly(false);
    router.get(route('vehicles.index'), {}, { replace: true });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    applyFilters();
  };

  const handleMakeChange = (newMake) => {
    setSelectedMake(newMake);
    setSelectedModel('all'); // Reset model selection on make change
    applyFilters({ make: newMake, model: 'all' });
  };

  const handleSortChange = (newSort) => {
    setSortOrder(newSort);
    applyFilters({ sort: newSort });
  };

  const removeSingleFilter = (filterKey) => {
    if (filterKey === 'make') {
      setSelectedMake('all');
      setSelectedModel('all');
    }
    if (filterKey === 'model') setSelectedModel('all');
    if (filterKey === 'fuel_type') setSelectedFuel('all');
    if (filterKey === 'body_style') setSelectedBodyStyle('all');
    if (filterKey === 'country') setSelectedCountry('all');
    if (filterKey === 'max_price') setMaxPrice('250000');
    if (filterKey === 'max_mileage') setMaxMileage('all');
    if (filterKey === 'min_year') setMinYear('all');
    if (filterKey === 'search') setSearch('');
    if (filterKey === 'fleet_only') setFleetOnly(false);

    applyFilters({ [filterKey]: filterKey === 'max_price' ? '' : 'all' });
  };

  const getCountryFlag = (code) => {
    switch (code) {
      case 'CH': return '🇨🇭 Switzerland';
      case 'DE': return '🇩🇪 Germany';
      case 'FR': return '🇫🇷 France';
      default: return code;
    }
  };

  const hasActiveFilters = selectedMake !== 'all' || selectedModel !== 'all' || selectedFuel !== 'all' || selectedBodyStyle !== 'all' || selectedCountry !== 'all' || maxPrice !== '250000' || maxMileage !== 'all' || minYear !== 'all' || search !== '' || fleetOnly;

  const faqs = [
    {
      q: 'How does CarStrado guarantee vehicle condition?',
      a: 'Every car undergoes an independent 150-point TÜV / DEKRA technical inspection prior to dispatch, covering battery state of health, chassis integrity, and mechanical history.'
    },
    {
      q: 'How is my payment protected during cross-border purchase?',
      a: 'Funds are deposited directly into a Swiss VQF-licensed Escrow account. Funds are released to the dealership only after you inspect and accept the vehicle.'
    },
    {
      q: 'How does EU to Switzerland VAT refund (Reverse Charge) work?',
      a: 'For vehicles sourced from Germany or France, we process 19% EU VAT refunds and apply local Swiss 8.1% VAT, saving you up to 10.9% on total price.'
    }
  ];

  return (
    <AppLayout>
      <Head title={`${selectedMake !== 'all' ? `${selectedMake} ${selectedModel !== 'all' ? selectedModel : ''} Cars for Sale` : 'Vehicle Catalog'} - CarStrado (CarStrado.com)`} />

      {/* Swiss Precision Architectural Hero & Sourcing Engine Header */}
      <section className="relative bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-slate-800">
        {/* Cinematic Automotive Video Background Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80"
            className="w-full h-full object-cover opacity-30 scale-105 filter contrast-125 brightness-90"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-sports-car-driving-on-a-road-at-night-41584-large.mp4" type="video/mp4" />
          </video>
          {/* Dark Gradient Overlay for Perfect Contrast & Legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/75 to-slate-950" />
        </div>

        {/* Subtle Ambient Radial Light Refraction */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-tr from-orange-600/15 via-amber-500/10 to-emerald-500/10 blur-[140px] rounded-full z-0" />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Asymmetric Header Layout */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-orange-500/30 text-orange-400 text-[11px] font-mono font-bold uppercase tracking-widest mb-4 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                <ShieldCheck className="h-3.5 w-3.5 text-orange-500" /> Swiss VQF AML Regulated Brokerage &bull; EU Sourcing
              </div>
              <h1 className="text-4xl sm:text-6xl font-black tracking-tighter leading-tight text-slate-50">
                {selectedMake !== 'all' ? (
                  <>Sourcing <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent">{selectedMake} {selectedModel !== 'all' && selectedModel}</span></>
                ) : (
                  <>Verified EU Automotive Sourcing. <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent">Swiss VQF Escrow.</span></>
                )}
              </h1>
              <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-2xl font-normal leading-relaxed">
                {selectedMake !== 'all' 
                  ? `Direct cross-border sourcing for verified ${selectedMake} ${selectedModel !== 'all' ? selectedModel : 'inventory'} with zero risk escrow protection and white-glove enclosed transporter delivery.`
                  : 'Direct sourcing from certified boutique dealerships in Switzerland, Germany, and France with 150-Point DEKRA inspection & transparent broker fee.'
                }
              </p>
            </div>

            {/* Currency Selector & Live Portfolio Metric */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="bg-slate-900/90 p-2 rounded-2xl border border-white/10 backdrop-blur-xl flex items-center gap-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest px-2">Currency:</span>
                <button
                  type="button"
                  onClick={() => toggleCurrency('EUR')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all active:scale-[0.97] ${
                    currency === 'EUR'
                      ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  € EUR
                </button>
                <button
                  type="button"
                  onClick={() => toggleCurrency('CHF')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all active:scale-[0.97] ${
                    currency === 'CHF'
                      ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  CHF (Fr)
                </button>
              </div>
            </div>
          </div>

          {/* Clean Brand Badges Bar */}
          <div className="mb-8 overflow-x-auto pb-2">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-2.5">Explore Sourced Brands:</span>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => handleMakeChange('all')}
                className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all active:scale-[0.97] flex items-center gap-1.5 ${
                  selectedMake === 'all'
                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30 ring-2 ring-orange-400'
                    : 'bg-slate-900/80 text-slate-300 border border-white/10 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span>All Makes ({safeVehicles.length})</span>
              </button>

              {brandLogos.map((b) => (
                <button
                  type="button"
                  key={b.make}
                  onClick={() => handleMakeChange(b.make)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all active:scale-[0.97] flex items-center gap-2.5 whitespace-nowrap border ${
                    selectedMake === b.make
                      ? 'bg-orange-600 text-white border-orange-400 shadow-lg shadow-orange-600/30 font-black ring-2 ring-orange-400'
                      : 'bg-slate-900/80 text-slate-300 border-white/10 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span className="px-1.5 py-0.5 rounded-md bg-slate-950/80 text-[9px] font-mono text-orange-400 font-extrabold border border-white/10">
                    {b.code}
                  </span>
                  <span>{b.make}</span>
                  <span className="text-[10px] opacity-70 font-mono">({b.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Professional Expanded Mobile.de Search Form */}
          <form onSubmit={handleSearchSubmit} className="bg-white rounded-2xl p-6 shadow-2xl text-slate-900 border border-slate-200 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Brand Select */}
              <div>
                <label htmlFor="make-select" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  1. Brand / Make
                </label>
                <select
                  id="make-select"
                  value={selectedMake}
                  onChange={(e) => handleMakeChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm font-bold focus:ring-2 focus:ring-orange-500 bg-white"
                >
                  <option value="all">Any Make (All)</option>
                  {safeMakes.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              {/* Dynamic Model Select */}
              <div>
                <label htmlFor="model-select" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  2. Specific Model
                </label>
                <select
                  id="model-select"
                  value={selectedModel}
                  onChange={(e) => {
                    setSelectedModel(e.target.value);
                    applyFilters({ model: e.target.value });
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm font-bold focus:ring-2 focus:ring-orange-500 bg-white"
                >
                  <option value="all">
                    {selectedMake !== 'all' ? `All ${selectedMake} Models` : 'Any Model'}
                  </option>
                  {availableModels.map((mod) => (
                    <option key={mod} value={mod}>{mod}</option>
                  ))}
                </select>
              </div>

              {/* Body Style */}
              <div>
                <label htmlFor="body-select" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  3. Body Style
                </label>
                <select
                  id="body-select"
                  value={selectedBodyStyle}
                  onChange={(e) => {
                    setSelectedBodyStyle(e.target.value);
                    applyFilters({ body_style: e.target.value });
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-orange-500 bg-white"
                >
                  <option value="all">All Body Styles</option>
                  {safeBodyStyles.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              {/* Country Location */}
              <div>
                <label htmlFor="country-select" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  4. Country Location
                </label>
                <select
                  id="country-select"
                  value={selectedCountry}
                  onChange={(e) => {
                    setSelectedCountry(e.target.value);
                    applyFilters({ country: e.target.value });
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-orange-500 bg-white"
                >
                  <option value="all">Any Country (EU)</option>
                  <option value="CH">🇨🇭 Switzerland</option>
                  <option value="DE">🇩🇪 Germany</option>
                  <option value="FR">🇫🇷 France</option>
                </select>
              </div>
            </div>

            {/* Interactive Price Range Slider & Mileage / Year Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
              {/* Smooth Interactive Price Slider */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Max Budget Price
                  </label>
                  <span className="font-mono font-black text-orange-600 text-sm">
                    {maxPrice === '250000' ? 'No Limit' : format(parseFloat(maxPrice))}
                  </span>
                </div>
                <input
                  type="range"
                  min="20000"
                  max="250000"
                  step="5000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  onMouseUp={() => applyFilters()}
                  onTouchEnd={() => applyFilters()}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                  <span>{format(20000)}</span>
                  <span>{format(135000)}</span>
                  <span>{format(250000)}+</span>
                </div>
              </div>

              {/* Max Mileage Dropdown */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Max Mileage (KM)
                </label>
                <select
                  value={maxMileage}
                  onChange={(e) => {
                    setMaxMileage(e.target.value);
                    applyFilters({ max_mileage: e.target.value });
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-900 bg-white"
                >
                  <option value="all">Any Mileage</option>
                  <option value="10000">Up to 10,000 km</option>
                  <option value="25000">Up to 25,000 km</option>
                  <option value="50000">Up to 50,000 km</option>
                  <option value="100000">Up to 100,000 km</option>
                </select>
              </div>

              {/* Min Year Dropdown */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Minimum Year
                </label>
                <select
                  value={minYear}
                  onChange={(e) => {
                    setMinYear(e.target.value);
                    applyFilters({ min_year: e.target.value });
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-900 bg-white"
                >
                  <option value="all">Any Year</option>
                  <option value="2024">2024 (Brand New)</option>
                  <option value="2023">2023 or newer</option>
                  <option value="2022">2022 or newer</option>
                  <option value="2020">2020 or newer</option>
                </select>
              </div>
            </div>

            {/* Bottom Filter Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 text-xs">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-500">Engine:</span>
                  {['all', 'electric', 'hybrid', 'petrol'].map((f) => (
                    <button
                      type="button"
                      key={f}
                      onClick={() => {
                        setSelectedFuel(f);
                        applyFilters({ fuel_type: f });
                      }}
                      className={`px-3 py-1.5 rounded-lg font-bold capitalize transition-all ${
                        selectedFuel === f
                          ? 'bg-orange-500 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>

                <label className="flex items-center gap-2 font-bold text-slate-700 cursor-pointer bg-slate-100 px-3 py-1.5 rounded-lg hover:bg-slate-200 transition-colors">
                  <input
                    type="checkbox"
                    checked={fleetOnly}
                    onChange={(e) => setFleetOnly(e.target.checked)}
                    className="rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                  />
                  <Building2 className="h-3.5 w-3.5 text-orange-600" />
                  <span>Corporate Fleet Only</span>
                </label>
              </div>

              <div className="flex items-center gap-3 ml-auto">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2.5 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1.5"
                >
                  <RefreshCw className="h-3.5 w-3.5" /> Reset Filters
                </button>

                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl font-bold text-white bg-orange-600 hover:bg-orange-500 shadow-lg shadow-orange-500/30 text-sm transition-all flex items-center gap-2"
                >
                  <Search className="h-4 w-4" />
                  <span>Show {safeVehicles.length} Vehicles</span>
                </button>
              </div>
            </div>
          </form>

          {/* 4-Step Sourcing Journey Showcase */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 backdrop-blur-md flex items-start gap-3">
              <div className="h-9 w-9 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center justify-center font-bold font-mono text-sm shrink-0">
                01
              </div>
              <div>
                <strong className="text-white text-sm block font-black mb-0.5">Verified EU Inventory</strong>
                <p className="text-slate-400 text-[11px] font-medium leading-normal">
                  Sourced directly from certified partner dealerships in Switzerland, Germany, and France.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 backdrop-blur-md flex items-start gap-3">
              <div className="h-9 w-9 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center justify-center font-bold font-mono text-sm shrink-0">
                02
              </div>
              <div>
                <strong className="text-white text-sm block font-black mb-0.5">Transparent Quote</strong>
                <p className="text-slate-400 text-[11px] font-medium leading-normal">
                  Clear breakdown: vehicle price + 4.5% broker fee + VAT (8.1% CH / 0% B2B) + transport.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 backdrop-blur-md flex items-start gap-3">
              <div className="h-9 w-9 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center justify-center font-bold font-mono text-sm shrink-0">
                03
              </div>
              <div>
                <strong className="text-white text-sm block font-black mb-0.5">Swiss VQF Escrow</strong>
                <p className="text-slate-400 text-[11px] font-medium leading-normal">
                  Funds held securely in regulated Swiss Escrow until you inspect and accept handover.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 backdrop-blur-md flex items-start gap-3">
              <div className="h-9 w-9 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center justify-center font-bold font-mono text-sm shrink-0">
                04
              </div>
              <div>
                <strong className="text-white text-sm block font-black mb-0.5">48-72h Door Delivery</strong>
                <p className="text-slate-400 text-[11px] font-medium leading-normal">
                  Enclosed white-glove transporter delivery with 150-Point DEKRA certificate included.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Active Filter Pills Bar */}
      {hasActiveFilters && (
        <section className="bg-orange-50 border-b border-orange-200 py-3 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-orange-900 flex items-center gap-1.5">
                <Filter className="h-3.5 w-3.5 text-orange-600" /> Active Filters:
              </span>

              {selectedMake !== 'all' && (
                <span className="px-3 py-1 rounded-full bg-white border border-orange-300 text-orange-900 font-bold flex items-center gap-1.5 shadow-sm">
                  Make: {selectedMake}
                  <button onClick={() => removeSingleFilter('make')} className="hover:text-red-600"><X className="h-3 w-3" /></button>
                </span>
              )}

              {selectedModel !== 'all' && (
                <span className="px-3 py-1 rounded-full bg-white border border-orange-300 text-orange-900 font-bold flex items-center gap-1.5 shadow-sm">
                  Model: {selectedModel}
                  <button onClick={() => removeSingleFilter('model')} className="hover:text-red-600"><X className="h-3 w-3" /></button>
                </span>
              )}

              {selectedFuel !== 'all' && (
                <span className="px-3 py-1 rounded-full bg-white border border-orange-300 text-orange-900 font-bold flex items-center gap-1.5 shadow-sm capitalize">
                  Fuel: {selectedFuel}
                  <button onClick={() => removeSingleFilter('fuel_type')} className="hover:text-red-600"><X className="h-3 w-3" /></button>
                </span>
              )}

              {selectedBodyStyle !== 'all' && (
                <span className="px-3 py-1 rounded-full bg-white border border-orange-300 text-orange-900 font-bold flex items-center gap-1.5 shadow-sm">
                  Body: {selectedBodyStyle}
                  <button onClick={() => removeSingleFilter('body_style')} className="hover:text-red-600"><X className="h-3 w-3" /></button>
                </span>
              )}

              {selectedCountry !== 'all' && (
                <span className="px-3 py-1 rounded-full bg-white border border-orange-300 text-orange-900 font-bold flex items-center gap-1.5 shadow-sm">
                  Country: {selectedCountry}
                  <button onClick={() => removeSingleFilter('country')} className="hover:text-red-600"><X className="h-3 w-3" /></button>
                </span>
              )}

              {maxPrice !== '250000' && (
                <span className="px-3 py-1 rounded-full bg-white border border-orange-300 text-orange-900 font-bold flex items-center gap-1.5 shadow-sm">
                  Max: {format(parseFloat(maxPrice))}
                  <button onClick={() => removeSingleFilter('max_price')} className="hover:text-red-600"><X className="h-3 w-3" /></button>
                </span>
              )}

              {maxMileage !== 'all' && (
                <span className="px-3 py-1 rounded-full bg-white border border-orange-300 text-orange-900 font-bold flex items-center gap-1.5 shadow-sm">
                  Max KM: {parseInt(maxMileage).toLocaleString()} km
                  <button onClick={() => removeSingleFilter('max_mileage')} className="hover:text-red-600"><X className="h-3 w-3" /></button>
                </span>
              )}

              {minYear !== 'all' && (
                <span className="px-3 py-1 rounded-full bg-white border border-orange-300 text-orange-900 font-bold flex items-center gap-1.5 shadow-sm">
                  Year: {minYear}+
                  <button onClick={() => removeSingleFilter('min_year')} className="hover:text-red-600"><X className="h-3 w-3" /></button>
                </span>
              )}

              {search !== '' && (
                <span className="px-3 py-1 rounded-full bg-white border border-orange-300 text-orange-900 font-bold flex items-center gap-1.5 shadow-sm">
                  Keyword: "{search}"
                  <button onClick={() => removeSingleFilter('search')} className="hover:text-red-600"><X className="h-3 w-3" /></button>
                </span>
              )}
            </div>

            <button
              onClick={handleReset}
              className="text-xs font-bold text-orange-800 hover:text-orange-900 underline"
            >
              Clear All Filters
            </button>
          </div>
        </section>
      )}

      {/* Main Catalog Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Results Header & Layout Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-black text-slate-900">
              {safeVehicles.length} Verified Offers Available
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Showing verified vehicle listings with transparent broker fee estimates in {currency}.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === 'grid' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Grid View"
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="List View"
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4 text-slate-400" />
              <select
                value={sortOrder}
                onChange={(e) => handleSortChange(e.target.value)}
                className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 bg-white"
              >
                <option value="created_at_desc">Sorted by: Newest Listed</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="mileage_asc">Mileage: Lowest First</option>
                <option value="year_desc">Year: Newest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Vehicles Layout Render */}
        {viewMode === 'grid' ? (
          /* GRID VIEW */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {safeVehicles.map((vehicle) => {
              const mainImg = vehicle.images_json?.[0] || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80';
              const brokerFee = Math.round((vehicle.price_eur || 0) * (vehicle.is_fleet_eligible ? 0.035 : 0.045));
              const estLeaseRate = Math.round((vehicle.price_eur || 0) * 0.009);

              return (
                <div
                  key={vehicle.id}
                  className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-orange-300 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                      <img
                        src={mainImg}
                        alt={`${vehicle.make} ${vehicle.model}`}
                        className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60" />

                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-white/90 text-slate-900 backdrop-blur-md shadow-sm">
                          {getCountryFlag(vehicle.location_country)}
                        </span>
                        {vehicle.is_fleet_eligible && (
                          <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-orange-600 text-white shadow-sm flex items-center gap-1">
                            <Building2 className="h-3 w-3" /> Fleet
                          </span>
                        )}
                      </div>

                      <div className="absolute top-3 right-3">
                        <span className="px-2.5 py-1 rounded-md text-xs font-extrabold uppercase bg-slate-900/80 text-white backdrop-blur-md">
                          {vehicle.fuel_type}
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 flex items-baseline justify-between">
                        <div>
                          <div className="text-2xl font-black text-white drop-shadow-md font-mono">
                            {format(vehicle.price_eur || 0)}
                          </div>
                          <div className="text-[11px] text-slate-200 font-medium">
                            Broker fee: +{format(brokerFee)}
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] text-slate-300 font-medium block">Or Lease:</span>
                          <span className="text-xs font-bold text-white font-mono">{format(estLeaseRate)} / mo</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="text-xs font-extrabold text-orange-600 uppercase tracking-wider mb-1">
                        {vehicle.make} &bull; {vehicle.year}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-orange-600 transition-colors">
                        {vehicle.model}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-1 mb-4">
                        {vehicle.trim || vehicle.body_style}
                      </p>

                      <div className="grid grid-cols-2 gap-2 py-3 border-y border-slate-100 text-xs text-slate-700 mb-4 font-semibold">
                        <div className="flex items-center gap-1.5">
                          <Gauge className="h-3.5 w-3.5 text-slate-400" />
                          <span>{(vehicle.mileage_km || 0).toLocaleString()} km</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Fuel className="h-3.5 w-3.5 text-slate-400" />
                          <span className="capitalize">{vehicle.transmission}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span className="truncate font-medium">{vehicle.dealer?.name}</span>
                        <div className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="h-3.5 w-3.5 fill-amber-500" />
                          <span>{vehicle.dealer?.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 flex gap-2">
                    <button
                      type="button"
                      onClick={() => toggleCompareVehicle(vehicle)}
                      className={`px-3.5 py-3 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 border ${
                        compareList.some((v) => v.id === vehicle.id)
                          ? 'bg-orange-100 text-orange-800 border-orange-300'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {compareList.some((v) => v.id === vehicle.id) ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-orange-600" />
                          <span>In Compare</span>
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4 text-slate-400" />
                          <span>Compare</span>
                        </>
                      )}
                    </button>

                    <Link
                      href={route('vehicles.show', vehicle.id)}
                      className="flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-orange-600 text-white font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
                    >
                      <span>Inspect & Request Quote</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* LIST VIEW */
          <div className="space-y-4">
            {safeVehicles.map((vehicle) => {
              const mainImg = vehicle.images_json?.[0] || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80';
              const brokerFee = Math.round((vehicle.price_eur || 0) * (vehicle.is_fleet_eligible ? 0.035 : 0.045));
              const estLeaseRate = Math.round((vehicle.price_eur || 0) * 0.009);

              return (
                <div
                  key={vehicle.id}
                  className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-lg hover:border-orange-300 transition-all flex flex-col sm:flex-row items-center justify-between gap-6"
                >
                  <div className="flex items-center gap-5 w-full sm:w-auto">
                    <img
                      src={mainImg}
                      alt={vehicle.model}
                      className="h-28 w-44 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-orange-600 uppercase font-mono">{vehicle.make} &bull; {vehicle.year}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                          {getCountryFlag(vehicle.location_country)}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">{vehicle.model}</h3>
                      <p className="text-xs text-slate-500 line-clamp-1">{vehicle.trim || vehicle.body_style}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-600 font-semibold pt-1">
                        <span>{(vehicle.mileage_km || 0).toLocaleString()} km</span>
                        <span>&bull;</span>
                        <span className="capitalize">{vehicle.fuel_type}</span>
                        <span>&bull;</span>
                        <span>{vehicle.dealer?.name} ({vehicle.dealer?.city})</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 gap-3">
                    <div className="text-right">
                      <div className="text-2xl font-black text-slate-900 font-mono">{format(vehicle.price_eur || 0)}</div>
                      <div className="text-[11px] text-slate-500 font-medium">Fee: +{format(brokerFee)} &bull; Lease: {format(estLeaseRate)}/mo</div>
                    </div>

                    <Link
                      href={route('vehicles.show', vehicle.id)}
                      className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-orange-600 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-md"
                    >
                      <span>Inspect & Quote</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Embedded FAQ Accordion Section */}
      <section className="max-w-4xl mx-auto px-4 py-12 border-t border-slate-200">
        <div className="text-center mb-8">
          <HelpCircle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
          <h2 className="text-2xl font-black text-slate-900">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-500">Everything you need to know about purchasing or leasing a vehicle via CarStrado.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left font-bold text-xs text-slate-900 flex justify-between items-center hover:bg-slate-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs text-slate-600 border-t border-slate-100 bg-slate-50 leading-relaxed font-medium">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Floating Compare Action Bar */}
      {compareList.length > 0 && (
        <div className="fixed bottom-6 right-6 z-40 bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-slate-800 flex items-center gap-4 animate-bounce-short">
          <div className="flex items-center gap-2">
            <Car className="h-5 w-5 text-orange-500" />
            <span className="text-xs font-bold font-mono">{compareList.length} / 3 Vehicles Selected</span>
          </div>
          <button
            onClick={() => setShowCompareModal(true)}
            className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 font-extrabold text-xs shadow-md flex items-center gap-1.5 transition-all"
          >
            <span>Compare Side-by-Side</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Side-by-Side Compare Modal */}
      {showCompareModal && (
        <CompareModal
          vehicles={compareList}
          onClose={() => setShowCompareModal(false)}
          onRemoveVehicle={(id) => setCompareList(compareList.filter((v) => v.id !== id))}
          onClearAll={() => {
            setCompareList([]);
            setShowCompareModal(false);
          }}
        />
      )}
    </AppLayout>
  );
}
