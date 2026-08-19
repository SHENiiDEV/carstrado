import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { route } from '@/lib/route';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { useCurrency } from '@/lib/currency';
import { Car, Plus, ArrowLeft, Building2, Upload, Trash2, Image, CheckCircle2, Sparkles, Check, X, ShieldCheck } from 'lucide-react';

export default function CreateVehicle() {
  const { format } = useCurrency();

  const samplePhotoPresets = [
    { label: 'Porsche Taycan / Sports Sedan', url: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1000&q=80' },
    { label: 'Porsche 911 / Coupe', url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80' },
    { label: 'BMW Luxury / Executive', url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=80' },
    { label: 'Audi e-tron GT / Sportback', url: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1000&q=80' },
    { label: 'Mercedes EQS / Premium', url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1000&q=80' },
  ];

  const defaultFeatureTags = [
    '150-Point TÜV / DEKRA Certificate',
    'Adaptive Air Suspension',
    'Burmester / Bowers & Wilkins 3D Sound',
    'Panoramic Glass Roof',
    'Matrix LED Headlights',
    'Carbon Ceramic Brakes',
    'Battery State of Health 99%',
    'Head-Up Display with AR',
  ];

  const [images, setImages] = useState([
    'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80',
  ]);

  const [features, setFeatures] = useState([
    '150-Point TÜV / DEKRA Certificate',
    'Adaptive Air Suspension',
    'Panoramic Glass Roof',
  ]);

  const [isDragging, setIsDragging] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [customFeature, setCustomFeature] = useState('');

  const { data, setData, post, processing, errors } = useForm({
    vin: '',
    make: 'Porsche',
    model: '',
    trim: '',
    year: 2024,
    price_eur: '',
    mileage_km: '',
    fuel_type: 'electric',
    transmission: 'Automatic',
    body_style: 'Sedan',
    color: 'Gentian Blue Metallic',
    location_country: 'CH',
    location_city: 'Zurich',
    is_fleet_eligible: false,
    images: images,
    features: features,
  });

  const handleAddImage = (urlToAdd) => {
    const targetUrl = urlToAdd || newImageUrl;
    if (targetUrl && !images.includes(targetUrl)) {
      const updated = [...images, targetUrl];
      setImages(updated);
      setData('images', updated);
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (index) => {
    const updated = images.filter((_, idx) => idx !== index);
    setImages(updated);
    setData('images', updated);
  };

  const toggleFeatureTag = (tag) => {
    let updated;
    if (features.includes(tag)) {
      updated = features.filter((f) => f !== tag);
    } else {
      updated = [...features, tag];
    }
    setFeatures(updated);
    setData('features', updated);
  };

  const handleAddCustomFeature = (e) => {
    e.preventDefault();
    if (customFeature && !features.includes(customFeature)) {
      const updated = [...features, customFeature];
      setFeatures(updated);
      setData('features', updated);
      setCustomFeature('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('dealer.vehicles.store'));
  };

  return (
    <DashboardLayout
      activeTab="inventory"
      title="List New Vehicle in Catalog"
    >
      <Head title="Publish New Listing - Dealer Partner Portal" />

      <div className="max-w-4xl mx-auto py-4">
        <Link
          href={route('dealer.dashboard')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-6 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Dealer Dashboard
        </Link>

        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xl space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 font-bold shadow-sm">
                <Car className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-slate-900">List New Vehicle in Sourcing Catalog</h1>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Publish a verified vehicle with photo gallery, TÜV inspection tags, and price breakdown.
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              ● Live Sourcing Sync
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 text-xs font-semibold">
            {/* Section 1: Identification & Specs */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
                <span className="h-5 w-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">1</span>
                Vehicle Identification & Technical Specs
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* VIN */}
                <div>
                  <label className="block text-slate-700 uppercase tracking-wider mb-1">
                    Full VIN Chassis Code
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. WP0ZZZ91ZPSA09182"
                    value={data.vin}
                    onChange={(e) => setData('vin', e.target.value.toUpperCase())}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 font-mono text-slate-900 focus:ring-2 focus:ring-orange-500 uppercase bg-white"
                  />
                  {errors.vin && <span className="text-red-600 font-semibold mt-1 block">{errors.vin}</span>}
                </div>

                {/* Make */}
                <div>
                  <label className="block text-slate-700 uppercase tracking-wider mb-1">
                    Brand / Manufacturer
                  </label>
                  <select
                    value={data.make}
                    onChange={(e) => setData('make', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-orange-500 bg-white"
                  >
                    <option value="Porsche">Porsche</option>
                    <option value="BMW">BMW</option>
                    <option value="Mercedes-Benz">Mercedes-Benz</option>
                    <option value="Audi">Audi</option>
                    <option value="Tesla">Tesla</option>
                    <option value="Volvo">Volvo</option>
                    <option value="Volkswagen">Volkswagen</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 uppercase tracking-wider mb-1">
                    Model Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Taycan Turbo S"
                    value={data.model}
                    onChange={(e) => setData('model', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-orange-500 bg-white"
                  />
                  {errors.model && <span className="text-red-600 font-semibold mt-1 block">{errors.model}</span>}
                </div>

                <div>
                  <label className="block text-slate-700 uppercase tracking-wider mb-1">
                    Trim & Package Details
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Performance Battery Plus 93.4kWh"
                    value={data.trim}
                    onChange={(e) => setData('trim', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-orange-500 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-700 uppercase tracking-wider mb-1">
                    Selling Price (€ EUR)
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="145000"
                    value={data.price_eur}
                    onChange={(e) => setData('price_eur', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 font-mono text-slate-900 focus:ring-2 focus:ring-orange-500 bg-white"
                  />
                  {data.price_eur && (
                    <span className="text-[11px] text-slate-500 mt-1 block">Est: {format(parseFloat(data.price_eur))}</span>
                  )}
                </div>

                <div>
                  <label className="block text-slate-700 uppercase tracking-wider mb-1">
                    Mileage (KM)
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="12000"
                    value={data.mileage_km}
                    onChange={(e) => setData('mileage_km', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 font-mono text-slate-900 focus:ring-2 focus:ring-orange-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 uppercase tracking-wider mb-1">
                    Registration Year
                  </label>
                  <input
                    type="number"
                    required
                    min="2010"
                    max="2027"
                    value={data.year}
                    onChange={(e) => setData('year', parseInt(e.target.value) || 2024)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-orange-500 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-700 uppercase tracking-wider mb-1">
                    Engine / Drivetrain
                  </label>
                  <select
                    value={data.fuel_type}
                    onChange={(e) => setData('fuel_type', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-orange-500 bg-white"
                  >
                    <option value="electric">Electric (BEV)</option>
                    <option value="hybrid">Plug-in Hybrid (PHEV)</option>
                    <option value="petrol">Petrol / Gasoline</option>
                    <option value="diesel">Diesel</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 uppercase tracking-wider mb-1">
                    Body Style
                  </label>
                  <select
                    value={data.body_style}
                    onChange={(e) => setData('body_style', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-orange-500 bg-white"
                  >
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV / Crossover</option>
                    <option value="Coupe">Coupe</option>
                    <option value="Convertible">Convertible</option>
                    <option value="Hatchback">Hatchback / Gran Coupe</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 uppercase tracking-wider mb-1">
                    Location Country
                  </label>
                  <select
                    value={data.location_country}
                    onChange={(e) => setData('location_country', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-orange-500 bg-white"
                  >
                    <option value="CH">🇨🇭 Switzerland</option>
                    <option value="DE">🇩🇪 Germany</option>
                    <option value="FR">🇫🇷 France</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Photo Gallery Dropzone */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
                <span className="h-5 w-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">2</span>
                Vehicle Photo Gallery & Image Dropzone ({images.length} Photos)
              </h3>

              {/* Upload Dropzone Container */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  const files = Array.from(e.dataTransfer.files);
                  files.forEach((file) => {
                    if (file.type.startsWith('image/')) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        handleAddImage(event.target.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  });
                }}
                className={`relative border-2 border-dashed rounded-3xl p-8 text-center space-y-4 transition-all group cursor-pointer ${
                  isDragging
                    ? 'border-orange-500 bg-orange-50 scale-[1.01] shadow-lg'
                    : 'border-slate-300 bg-slate-50 hover:border-orange-500 hover:bg-orange-50/30'
                }`}
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    files.forEach((file) => {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        handleAddImage(event.target.result);
                      };
                      reader.readAsDataURL(file);
                    });
                  }}
                />

                <div className="h-14 w-14 rounded-2xl bg-white border border-orange-200 shadow-md flex items-center justify-center text-orange-600 mx-auto group-hover:scale-110 transition-transform">
                  <Upload className="h-7 w-7 text-orange-600" />
                </div>

                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    {isDragging ? 'Drop Photos Here Now!' : 'Drag & Drop Vehicle Photos Here'}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 font-medium">or click anywhere to browse local image files from your computer</p>
                </div>

                <div className="relative z-20 flex gap-2 max-w-xl mx-auto pt-2" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="url"
                    placeholder="or paste image URL (e.g. https://images.unsplash.com/...)"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-mono text-slate-900 bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddImage()}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-orange-600 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shrink-0"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add URL
                  </button>
                </div>

                {/* Preset Photo Pickers */}
                <div className="relative z-20 pt-3 border-t border-slate-200" onClick={(e) => e.stopPropagation()}>
                  <span className="text-[11px] font-bold text-slate-500 block mb-2">Or Choose Quick 1-Click Stock Presets:</span>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {samplePhotoPresets.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleAddImage(preset.url)}
                        className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:border-orange-500 text-[11px] font-semibold transition-colors shadow-sm"
                      >
                        + {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Gallery Thumbnails Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {images.map((img, idx) => (
                  <div key={idx} className="relative group rounded-2xl overflow-hidden border border-slate-200 h-28 bg-slate-100 shadow-sm">
                    <img src={img} alt={`Photo ${idx + 1}`} className="w-full h-full object-cover" />
                    {idx === 0 && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-orange-600 text-white text-[9px] font-black uppercase">
                        Primary Hero
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-900/80 text-white hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: Equipped Options & Features Tag Checklist */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
                <span className="h-5 w-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">3</span>
                Equipped Options & Inspection Badges
              </h3>

              <div className="flex flex-wrap gap-2">
                {defaultFeatureTags.map((tag) => {
                  const isSelected = features.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleFeatureTag(tag)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                        isSelected
                          ? 'bg-orange-500 text-white border-orange-400 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {isSelected ? <Check className="h-3.5 w-3.5 text-white" /> : <Plus className="h-3.5 w-3.5 text-slate-400" />}
                      <span>{tag}</span>
                    </button>
                  );
                })}
              </div>

              {/* Add Custom Tag */}
              <div className="flex gap-2 max-w-md pt-2">
                <input
                  type="text"
                  placeholder="Add custom option (e.g. Sport Chrono)..."
                  value={customFeature}
                  onChange={(e) => setCustomFeature(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white"
                />
                <button
                  type="button"
                  onClick={handleAddCustomFeature}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-orange-600 transition-colors"
                >
                  Add Option
                </button>
              </div>
            </div>

            {/* Section 4: Fleet & Commercial Terms */}
            <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-purple-900 block text-xs">Eligible for B2B Corporate Fleet Procurement</span>
                <span className="text-[11px] text-slate-600 font-medium">Offers 3.5% brokerage take rate and multi-unit bulk ordering for corporate fleets.</span>
              </div>
              <input
                type="checkbox"
                checked={data.is_fleet_eligible}
                onChange={(e) => setData('is_fleet_eligible', e.target.checked)}
                className="rounded border-slate-300 text-purple-600 focus:ring-purple-500 h-5 w-5 cursor-pointer"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={processing}
              className="w-full py-4 rounded-2xl font-extrabold text-white bg-orange-600 hover:bg-orange-500 shadow-xl shadow-orange-500/30 text-sm transition-all flex items-center justify-center gap-2"
            >
              <Car className="h-5 w-5" />
              <span>Publish Vehicle to CarStrado Catalog</span>
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
