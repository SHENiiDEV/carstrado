import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { route } from '@/lib/route';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { useCurrency } from '@/lib/currency';
import { ShieldCheck, Zap, Landmark, Truck, Sparkles, Plus, Check, Search, Shield, ArrowRight, CheckCircle2, X, PackagePlus } from 'lucide-react';

export default function DealerServices({ dealer, vehicles = [], servicesCatalog = [] }) {
  const { format } = useCurrency();
  const [catalogList, setCatalogList] = useState(servicesCatalog);
  const [selectedCategory, setSelectedCategory] = useState('all'); // 'all', 'Extended Warranties', 'Commercial Insurance', 'Detailing & Protection'
  const [attachedServices, setAttachedServices] = useState({});
  const [selectedVehicleForAttach, setSelectedVehicleForAttach] = useState(vehicles[0]?.id || '');
  const [activeModalService, setActiveModalService] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New Custom Product Form
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Extended Warranties');
  const [newProvider, setNewProvider] = useState(dealer?.name || 'Dealer Direct Protection');
  const [newPrice, setNewPrice] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newBadge, setNewBadge] = useState('Dealer Preferred');

  const categories = ['all', 'Extended Warranties', 'Commercial Insurance', 'Detailing & Protection'];

  const filteredCatalog = selectedCategory === 'all'
    ? catalogList
    : catalogList.filter((s) => s.category === selectedCategory);

  const handleAttachService = (serviceId) => {
    if (!selectedVehicleForAttach) return;
    setAttachedServices((prev) => ({
      ...prev,
      [serviceId]: selectedVehicleForAttach,
    }));
    setActiveModalService(null);
  };

  const handleCreateCustomProduct = (e) => {
    e.preventDefault();
    if (!newTitle || !newPrice) return;

    const newProduct = {
      id: `custom_${Date.now()}`,
      category: newCategory,
      title: newTitle,
      provider: newProvider,
      price_eur: parseFloat(newPrice) || 950,
      description: newDescription || 'Custom protection package provided directly by dealer partner.',
      badge: newBadge || 'Dealer Option',
    };

    setCatalogList([newProduct, ...catalogList]);
    setShowCreateModal(false);
    setNewTitle('');
    setNewPrice('');
    setNewDescription('');
  };

  return (
    <DashboardLayout
      activeTab="services"
      title="Warranties, Insurance & Protection Products Catalog"
    >
      <Head title="Warranties & Insurance Products - Dealer Portal" />

      {/* Category Pills & Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all capitalize ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat === 'all' ? 'All Catalog Products' : cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-xs transition-all shadow-md flex items-center gap-1.5"
          >
            <PackagePlus className="h-4 w-4" /> + Add Custom Product
          </button>

          <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm text-xs font-semibold">
            <span className="text-slate-500 pl-2">Target Listing:</span>
            <select
              value={selectedVehicleForAttach}
              onChange={(e) => setSelectedVehicleForAttach(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-300 text-slate-900 font-bold bg-slate-50"
            >
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.make} {v.model} ({v.vin})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCatalog.map((service) => {
          const isAttached = attachedServices[service.id] === selectedVehicleForAttach;
          return (
            <div
              key={service.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between hover:border-orange-500 hover:shadow-md transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-orange-100 text-orange-800 uppercase border border-orange-200">
                    {service.badge}
                  </span>
                  <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                    {service.category}
                  </span>
                </div>

                <h3 className="font-extrabold text-slate-900 text-base mb-2 group-hover:text-orange-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed mb-4">
                  {service.description}
                </p>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium space-y-1 mb-6">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Certified Issuer & Provider</span>
                  <strong className="text-slate-900 font-bold block">{service.provider}</strong>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">Package Fee</span>
                  <strong className="text-xl font-black text-slate-900 font-mono">{format(service.price_eur)}</strong>
                </div>

                {isAttached ? (
                  <span className="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-800 font-extrabold text-xs flex items-center gap-1.5 border border-emerald-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Attached
                  </span>
                ) : (
                  <button
                    onClick={() => setActiveModalService(service)}
                    className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-xs transition-all shadow-md flex items-center gap-1.5"
                  >
                    <Plus className="h-4 w-4" /> Attach to Vehicle
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Dialog for Attaching Service */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 max-w-md w-full shadow-2xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="h-10 w-10 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 font-bold">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">Attach Protection Product</h3>
                <p className="text-xs text-slate-500 font-medium">Include in Vehicle Buyer Sourcing Quote</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <strong className="text-slate-900 text-sm block font-black">{activeModalService.title}</strong>
              <p className="text-slate-600 font-medium leading-relaxed">{activeModalService.description}</p>
              <div className="pt-2 border-t border-slate-200 flex justify-between font-mono font-bold">
                <span>Issuer: {activeModalService.provider}</span>
                <span className="text-orange-600">{format(activeModalService.price_eur)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Select Vehicle Listing
              </label>
              <select
                value={selectedVehicleForAttach}
                onChange={(e) => setSelectedVehicleForAttach(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 font-bold text-slate-900 bg-white text-xs"
              >
                {vehicles.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.make} {v.model} ({v.vin}) — {format(v.price_eur)}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActiveModalService(null)}
                className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 font-extrabold text-slate-700 text-xs transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleAttachService(activeModalService.id)}
                className="flex-1 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 font-extrabold text-white text-xs shadow-md transition-colors flex items-center justify-center gap-1.5"
              >
                <Check className="h-4 w-4" /> Confirm & Attach
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Dialog for Adding Custom Product */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 max-w-lg w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 font-bold">
                  <PackagePlus className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">Add Custom Warranty or Insurance</h3>
                  <p className="text-xs text-slate-500 font-medium">Publish a new add-on protection product to your dealership catalog</p>
                </div>
              </div>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-700 p-2">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomProduct} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 uppercase tracking-wider mb-1">
                  Product Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 3-Year Interior & Ceramic Protection Plan"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 focus:ring-2 focus:ring-orange-500 bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 focus:ring-2 focus:ring-orange-500 bg-white"
                  >
                    <option value="Extended Warranties">Extended Warranties</option>
                    <option value="Commercial Insurance">Commercial Insurance</option>
                    <option value="Detailing & Protection">Detailing & Protection</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 uppercase tracking-wider mb-1">
                    Package Price (€ EUR)
                  </label>
                  <input
                    type="number"
                    required
                    min="10"
                    placeholder="950"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 font-mono font-bold text-slate-900 focus:ring-2 focus:ring-orange-500 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 uppercase tracking-wider mb-1">
                    Provider / Insurer Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Zurich Direct Insurance / Dealer Care"
                    value={newProvider}
                    onChange={(e) => setNewProvider(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-orange-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 uppercase tracking-wider mb-1">
                    Badge Tag
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Dealer Preferred"
                    value={newBadge}
                    onChange={(e) => setNewBadge(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-orange-500 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 uppercase tracking-wider mb-1">
                  Product Description & Coverage Details
                </label>
                <textarea
                  rows="3"
                  placeholder="Describe coverage terms, zero-deductible policy, or repair limits..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-orange-500 bg-white font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-orange-600 hover:bg-orange-500 font-extrabold text-white text-xs shadow-xl shadow-orange-600/30 transition-all flex items-center justify-center gap-1.5"
              >
                <PackagePlus className="h-4 w-4" /> Publish Product to Catalog
              </button>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
