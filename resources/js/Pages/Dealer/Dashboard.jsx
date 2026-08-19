import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { route } from '@/lib/route';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { useCurrency } from '@/lib/currency';
import { Store, Plus, Car, FileText, Star, ShieldCheck, Eye, Edit3, Landmark, Building2, Check, RefreshCw, FileCheck, ArrowRight, DollarSign, X } from 'lucide-react';

export default function DealerDashboard({ dealer, vehicles = [], deals = [], stats = {}, defaultTab = 'inventory' }) {
  const { auth } = usePage().props;
  const currentUser = auth?.user;
  const { format } = useCurrency();

  const [activeTab, setActiveTab] = useState(defaultTab || 'inventory');
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [newPrice, setNewPrice] = useState('');
  const [newMileage, setNewMileage] = useState('');
  const [isFleet, setIsFleet] = useState(false);

  const handleToggleStatus = (vehicleId, newStatus) => {
    router.post(route('dealer.vehicles.toggleStatus', vehicleId), { status: newStatus });
  };

  const openPriceModal = (v) => {
    setEditingVehicle(v);
    setNewPrice(v.price_eur);
    setNewMileage(v.mileage_km);
    setIsFleet(v.is_fleet_eligible || false);
  };

  const handleUpdatePriceSubmit = (e) => {
    e.preventDefault();
    if (!editingVehicle) return;
    router.post(route('dealer.vehicles.updatePrice', editingVehicle.id), {
      price_eur: newPrice,
      mileage_km: newMileage,
      is_fleet_eligible: isFleet,
    }, {
      onSuccess: () => setEditingVehicle(null)
    });
  };

  return (
    <DashboardLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      title={`${dealer?.name || 'Dealer Partner'} Portal`}
    >
      <Head title={`${dealer?.name || 'Dealer Partner'} Portal - CarStrado`} />

      {/* Dealer Performance KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block mb-1">Listed Inventory</span>
          <div className="text-3xl font-black text-slate-900 font-mono">{stats.totalListed || 0} Cars</div>
          <span className="text-[11px] text-slate-500 mt-1 block font-medium">{stats.availableCount || 0} Active Available</span>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block mb-1">Active Sourced Deals</span>
          <div className="text-3xl font-black text-orange-600 font-mono">{stats.activeDealsCount || 0} Deals</div>
          <span className="text-[11px] text-slate-500 mt-1 block font-medium">In Pipeline Tracker</span>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block mb-1">Escrow Holding Payouts</span>
          <div className="text-3xl font-black text-emerald-600 font-mono">{format(stats.escrowHoldingVolume || 0)}</div>
          <span className="text-[11px] text-slate-500 mt-1 block font-medium">Secured Float Holding</span>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block mb-1">Total Sales Volume</span>
          <div className="text-3xl font-black text-slate-900 font-mono">{format(stats.totalSalesVolume || 0)}</div>
          <span className="text-[11px] text-slate-500 mt-1 block font-medium">Completed Payouts</span>
        </div>
      </div>

      {/* Tab 1: Listed Inventory Table */}
      {activeTab === 'inventory' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-sm">Listed Vehicles Inventory ({vehicles.length})</h3>
            <Link
              href={route('dealer.vehicles.create')}
              className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              <Plus className="h-4 w-4" />
              <span>List New Vehicle</span>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-500 uppercase tracking-wider font-extrabold border-b border-slate-200">
                <tr>
                  <th className="p-4">Vehicle</th>
                  <th className="p-4">VIN Code</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Mileage</th>
                  <th className="p-4">Fleet Eligible</th>
                  <th className="p-4">Listing Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {vehicles.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <img
                        src={v.images_json?.[0] || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80'}
                        alt={v.model}
                        className="h-12 w-20 rounded-xl object-cover border border-slate-200"
                      />
                      <div>
                        <div className="font-bold text-slate-900">{v.make} {v.model} ({v.year})</div>
                        <div className="text-[10px] text-slate-500">{v.fuel_type} &bull; {v.body_style}</div>
                      </div>
                    </td>
                    <td className="p-4 font-mono font-bold text-orange-600">{v.vin}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-900">{format(v.price_eur)}</span>
                        <button
                          onClick={() => openPriceModal(v)}
                          className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                          title="Quick edit price or mileage"
                        >
                          <Edit3 className="h-3 w-3" />
                        </button>
                      </div>
                    </td>
                    <td className="p-4">{v.mileage_km.toLocaleString()} km</td>
                    <td className="p-4">
                      {v.is_fleet_eligible ? (
                        <span className="px-2 py-0.5 rounded text-[10px] bg-purple-100 text-purple-800 font-bold">Yes</span>
                      ) : (
                        <span className="text-slate-400">No</span>
                      )}
                    </td>
                    <td className="p-4">
                      <select
                        value={v.status}
                        onChange={(e) => handleToggleStatus(v.id, e.target.value)}
                        className="px-2.5 py-1.5 rounded-lg border border-slate-300 text-[11px] font-bold bg-white focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="available">Available</option>
                        <option value="reserved">Reserved</option>
                        <option value="sold">Sold</option>
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={route('dealer.vehicles.edit', v.id)}
                          className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-orange-600 text-white font-bold text-[11px] inline-flex items-center gap-1 transition-colors shadow-sm"
                        >
                          <Edit3 className="h-3.5 w-3.5" /> Edit Full
                        </Link>
                        <button
                          onClick={() => openPriceModal(v)}
                          className="px-2.5 py-1.5 rounded-xl bg-orange-50 text-orange-800 border border-orange-200 hover:bg-orange-100 font-bold text-[11px] inline-flex items-center gap-1"
                        >
                          <DollarSign className="h-3.5 w-3.5 text-orange-600" /> Quick Price
                        </button>
                        <Link
                          href={route('vehicles.show', v.id)}
                          className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] inline-flex items-center gap-1"
                        >
                          <Eye className="h-3.5 w-3.5" /> View
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Sourced Deals & Compliance Documents Table */}
      {activeTab === 'deals' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-sm">Sourced Procurement Deals ({deals.length})</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-500 uppercase tracking-wider font-extrabold border-b border-slate-200">
                <tr>
                  <th className="p-4">Ref Code</th>
                  <th className="p-4">Vehicle</th>
                  <th className="p-4">Buyer</th>
                  <th className="p-4">Payout Amount</th>
                  <th className="p-4">Escrow Status</th>
                  <th className="p-4">Compliance Docs</th>
                  <th className="p-4 text-right">Audit & Inspect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {deals.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-mono font-bold text-orange-600">{d.reference_code}</td>
                    <td className="p-4 font-bold text-slate-900">{d.vehicle?.make} {d.vehicle?.model}</td>
                    <td className="p-4">{d.buyer?.name} ({d.buyer?.country})</td>
                    <td className="p-4 font-mono font-bold text-emerald-600">{format(d.agreed_price)}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded text-[11px] font-bold uppercase ${
                        d.escrow_status === 'holding' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {d.escrow_status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-purple-700 font-bold text-[11px]">
                        <ShieldCheck className="h-3.5 w-3.5 text-purple-600" />
                        <span>{d.compliance_records?.length || 3} Audit Records Attached</span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        href={route('deals.show', d.id)}
                        className="px-3.5 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-[11px] inline-flex items-center gap-1 shadow-sm transition-all"
                      >
                        <FileCheck className="h-3.5 w-3.5" />
                        <span>Inspect Deal & Docs</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Quick Price & Mileage Edit Modal */}
      {editingVehicle && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">Quick Price & Details Editor</h3>
                <p className="text-xs text-slate-500 font-mono">{editingVehicle.make} {editingVehicle.model} ({editingVehicle.vin})</p>
              </div>
              <button onClick={() => setEditingVehicle(null)} className="text-slate-400 hover:text-slate-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleUpdatePriceSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Asking Price (EUR)
                </label>
                <input
                  type="number"
                  min="1000"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono font-bold text-slate-900 text-sm focus:ring-2 focus:ring-orange-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Updated Mileage (KM)
                </label>
                <input
                  type="number"
                  min="0"
                  value={newMileage}
                  onChange={(e) => setNewMileage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono text-slate-900 text-sm focus:ring-2 focus:ring-orange-500 bg-white"
                />
              </div>

              <label className="flex items-center gap-2 font-bold text-xs text-slate-700 cursor-pointer bg-slate-50 p-3 rounded-xl border border-slate-200">
                <input
                  type="checkbox"
                  checked={isFleet}
                  onChange={(e) => setIsFleet(e.target.checked)}
                  className="rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                />
                <Building2 className="h-4 w-4 text-purple-600" />
                <span>Eligible for B2B Corporate Fleet Sourcing</span>
              </label>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-500 font-extrabold text-white text-xs shadow-md transition-colors"
              >
                Save Vehicle Updates
              </button>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
