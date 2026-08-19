import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { route } from '@/lib/route';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { ShieldCheck, Landmark, FileText, CheckCircle2, TrendingUp, AlertCircle, Building2, Car, Users, ArrowRight, Check, Search, Filter, RefreshCw, Eye, Edit3, Store } from 'lucide-react';

export default function AdminDashboard({ deals = [], dealers = [], pendingCompliance = [], kpis = {} }) {
  const [activeTab, setActiveTab] = useState('table'); // 'table', 'kanban', 'compliance', 'analytics', 'dealers'
  const [dealSearch, setDealSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const pipelineColumns = [
    { id: 'quote_requested', title: 'Quote Requested', color: 'bg-amber-100 text-amber-900 border-amber-200' },
    { id: 'compliance_pending', title: 'Compliance Review', color: 'bg-purple-100 text-purple-900 border-purple-200' },
    { id: 'escrow_funded', title: 'Escrow Funded', color: 'bg-emerald-100 text-emerald-900 border-emerald-200' },
    { id: 'logistics_in_transit', title: 'In Logistics', color: 'bg-sky-100 text-sky-900 border-sky-200' },
    { id: 'delivered', title: 'Delivered / Done', color: 'bg-teal-100 text-teal-900 border-teal-200' },
  ];

  const handleVerifyDoc = (recordId) => {
    router.post(route('compliance.verify', recordId), { status: 'verified' });
  };

  const handleStatusChange = (dealId, newStatus) => {
    router.post(route('deals.updateStatus', dealId), { status: newStatus });
  };

  // Filter deals for master table
  const filteredDealsTable = deals.filter((d) => {
    const matchesSearch =
      d.reference_code.toLowerCase().includes(dealSearch.toLowerCase()) ||
      d.buyer?.name?.toLowerCase().includes(dealSearch.toLowerCase()) ||
      d.vehicle?.model?.toLowerCase().includes(dealSearch.toLowerCase());

    const matchesStatus = statusFilter === 'all' || d.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      title="Broker Control Center & Operations Desk"
    >
      <Head title="Broker Admin Control Center - CarStrado" />

      {/* Global Financial & Operations KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block mb-1">Total Platform GMV</span>
          <div className="text-3xl font-black text-slate-900 font-mono">€{(kpis.totalGmv || 0).toLocaleString()}</div>
          <span className="text-[11px] text-slate-500 mt-1 block font-medium">Gross Transaction Volume</span>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block mb-1">Earned Commission</span>
          <div className="text-3xl font-black text-orange-600 font-mono">€{(kpis.earnedCommission || 0).toLocaleString()}</div>
          <span className="text-[11px] text-slate-500 mt-1 block font-medium">3.5% - 4.5% Broker Take Rate</span>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block mb-1">Secured Escrow Float</span>
          <div className="text-3xl font-black text-emerald-600 font-mono">€{(kpis.escrowFloat || 0).toLocaleString()}</div>
          <span className="text-[11px] text-slate-500 mt-1 block font-medium">Swiss/EU Bank Float Holding</span>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block mb-1">Active Pipeline</span>
          <div className="text-3xl font-black text-slate-900 font-mono">
            {kpis.activeDealsCount || 0} Deals / {kpis.totalVehiclesCount || 0} Cars
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block font-medium">{kpis.verifiedDealersCount || 0} Verified Dealer Partners</span>
        </div>
      </div>

      {/* Tab 1: Master Deals Table */}
      {activeTab === 'table' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Table Filters Header */}
          <div className="p-5 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by Deal Ref, Buyer, or Vehicle Model..."
                value={dealSearch}
                onChange={(e) => setDealSearch(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 bg-white focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 bg-white"
            >
              <option value="all">All Pipeline Statuses</option>
              <option value="quote_requested">Quote Requested</option>
              <option value="quote_approved">Quote Approved</option>
              <option value="compliance_pending">Compliance Pending</option>
              <option value="escrow_funded">Escrow Funded</option>
              <option value="logistics_in_transit">In Logistics</option>
              <option value="delivered">Delivered</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-500 uppercase tracking-wider font-extrabold border-b border-slate-200">
                <tr>
                  <th className="p-4">Ref Code</th>
                  <th className="p-4">Buyer & Type</th>
                  <th className="p-4">Vehicle Sourced</th>
                  <th className="p-4">Agreed Value</th>
                  <th className="p-4">Broker Fee</th>
                  <th className="p-4">Pipeline Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {filteredDealsTable.map((deal) => (
                  <tr key={deal.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-mono font-bold text-orange-600">{deal.reference_code}</td>
                    <td className="p-4">
                      <div className="font-bold text-slate-900">{deal.buyer?.name}</div>
                      <div className="text-[10px] text-slate-500 uppercase font-mono">{deal.type} &bull; {deal.buyer?.country}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-slate-900">{deal.vehicle?.make} {deal.vehicle?.model}</div>
                      <div className="text-[10px] text-slate-500">Dealer: {deal.dealer?.name}</div>
                    </td>
                    <td className="p-4 font-mono font-bold text-slate-900">€{deal.agreed_price.toLocaleString()}</td>
                    <td className="p-4 font-mono font-bold text-orange-600">+€{deal.commission_amount.toLocaleString()}</td>
                    <td className="p-4">
                      <select
                        value={deal.status}
                        onChange={(e) => handleStatusChange(deal.id, e.target.value)}
                        className="px-2.5 py-1.5 rounded-lg border border-slate-300 text-[11px] font-bold bg-white focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="quote_requested">Quote Requested</option>
                        <option value="quote_approved">Quote Approved</option>
                        <option value="compliance_pending">Compliance Pending</option>
                        <option value="escrow_funded">Escrow Funded</option>
                        <option value="logistics_in_transit">In Logistics</option>
                        <option value="delivered">Delivered</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        href={route('deals.show', deal.id)}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white text-[11px] font-bold hover:bg-orange-600 transition-colors inline-flex items-center gap-1 shadow-sm"
                      >
                        <Eye className="h-3.5 w-3.5" /> Tracker
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Kanban Board */}
      {activeTab === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
          {pipelineColumns.map((col) => {
            const columnDeals = deals.filter((d) => d.status === col.id);
            return (
              <div key={col.id} className="bg-slate-200/60 rounded-3xl border border-slate-300/80 p-4 min-w-[240px] flex flex-col">
                <div className="flex items-center justify-between pb-3 border-b border-slate-300 mb-3">
                  <h3 className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${col.color}`}>{col.title}</h3>
                  <span className="px-2 py-0.5 rounded-full bg-white text-slate-800 font-mono text-[10px] font-bold border border-slate-300">
                    {columnDeals.length}
                  </span>
                </div>

                <div className="space-y-3 flex-1">
                  {columnDeals.length === 0 ? (
                    <div className="p-4 text-center text-xs text-slate-400 border border-dashed border-slate-300 rounded-2xl font-medium">
                      No deals in stage
                    </div>
                  ) : (
                    columnDeals.map((deal) => (
                      <Link
                        key={deal.id}
                        href={route('deals.show', deal.id)}
                        className="block p-4 rounded-2xl bg-white border border-slate-200 hover:border-orange-500 shadow-sm transition-all group"
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                          <span className="text-orange-600 font-bold">{deal.reference_code}</span>
                          <span className="text-slate-500 font-bold uppercase">{deal.type}</span>
                        </div>
                        <h4 className="font-bold text-xs text-slate-900 group-hover:text-orange-600 transition-colors">
                          {deal.vehicle?.make} {deal.vehicle?.model}
                        </h4>
                        <div className="text-[11px] text-slate-500 mt-2 flex justify-between items-baseline font-mono border-t border-slate-100 pt-2">
                          <span>Total:</span>
                          <strong className="text-slate-900 font-black">€{deal.total_amount.toLocaleString()}</strong>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 3: Compliance Queue */}
      {activeTab === 'compliance' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-4 text-lg">Pending VQF AML & Cross-Border Compliance Audits</h3>

          {pendingCompliance.length === 0 ? (
            <p className="text-xs text-slate-500 font-medium">All regulatory documents are verified and up to date.</p>
          ) : (
            <div className="space-y-3">
              {pendingCompliance.map((rec) => (
                <div key={rec.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{rec.title}</span>
                      <span className="px-2.5 py-0.5 rounded text-[10px] bg-amber-100 text-amber-800 font-mono font-bold uppercase">
                        {rec.document_type}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 font-medium">
                      Deal: <span className="font-mono text-orange-600 font-bold">{rec.deal?.reference_code}</span> &bull; Client: {rec.deal?.buyer?.name} ({rec.deal?.buyer?.country})
                    </p>
                  </div>

                  <button
                    onClick={() => handleVerifyDoc(rec.id)}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md"
                  >
                    <Check className="h-4 w-4" /> Verify Document
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Financial Performance */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 text-base mb-4">Country Sourcing Breakdown</h3>
            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>🇨🇭 Switzerland (CH)</span>
                  <span className="font-mono">55% (€615,000)</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-orange-500 h-full w-[55%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>🇩🇪 Germany (DE)</span>
                  <span className="font-mono">30% (€335,000)</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full w-[30%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>🇫🇷 France (FR)</span>
                  <span className="font-mono">15% (€168,000)</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-purple-600 h-full w-[15%]" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 text-base mb-4">Retail (B2C) vs Corporate Fleet (B2B) Split</h3>
            <div className="space-y-4 text-xs font-semibold">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                <div>
                  <span className="text-slate-500 block">Retail (B2C) Take Rate</span>
                  <strong className="text-slate-900 text-sm">4.50% Average Commission</strong>
                </div>
                <span className="text-2xl font-black text-orange-600 font-mono">70%</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                <div>
                  <span className="text-slate-500 block">Corporate Fleet (B2B) Take Rate</span>
                  <strong className="text-slate-900 text-sm">3.50% Fleet Discount Rate</strong>
                </div>
                <span className="text-2xl font-black text-purple-600 font-mono">30%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Dealers Directory */}
      {activeTab === 'dealers' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dealers.map((dealer) => (
            <div key={dealer.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-slate-900 text-lg">{dealer.name}</h3>
                <span className="px-2.5 py-0.5 rounded text-xs bg-emerald-100 text-emerald-800 font-bold">Verified</span>
              </div>
              <p className="text-xs text-slate-500 font-medium mb-4">
                License: <span className="font-mono">{dealer.license_number}</span> &bull; {dealer.city}, {dealer.country}
              </p>
              <div className="flex justify-between items-center text-xs text-slate-700 border-t border-slate-100 pt-3">
                <span className="font-medium">Sourced Vehicles:</span>
                <strong className="text-orange-600 font-mono font-bold">{dealer.vehicles_count} units</strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
