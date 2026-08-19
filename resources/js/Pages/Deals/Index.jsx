import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { route } from '@/lib/route';
import AppLayout from '@/Layouts/AppLayout';
import { FileText, ShieldCheck, Truck, CheckCircle2, Clock, Landmark, AlertCircle, ArrowRight, Building2, User, ChevronRight } from 'lucide-react';

export default function DealsIndex({ deals, userRole, summaryStats }) {
  const [filterTab, setFilterTab] = useState('all');

  const filteredDeals = deals.filter((d) => {
    if (filterTab === 'active') return !['completed', 'cancelled'].includes(d.status);
    if (filterTab === 'completed') return d.status === 'completed';
    return true;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'quote_requested':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">Quote Requested</span>;
      case 'quote_approved':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">Broker Approved</span>;
      case 'compliance_pending':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">Compliance Review</span>;
      case 'escrow_funded':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">Escrow Secured</span>;
      case 'logistics_in_transit':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 border border-sky-200">In Transit 🚚</span>;
      case 'delivered':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800 border border-teal-200">Delivered</span>;
      case 'completed':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-sm">Deal Completed</span>;
      default:
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">{status}</span>;
    }
  };

  const getEscrowBadge = (status) => {
    switch (status) {
      case 'holding':
        return <span className="text-xs font-mono font-bold text-emerald-600 flex items-center gap-1"><Landmark className="h-3.5 w-3.5" /> Escrow Holding</span>;
      case 'released':
        return <span className="text-xs font-mono font-bold text-indigo-600 flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5" /> Released</span>;
      default:
        return <span className="text-xs font-mono text-slate-400">Unfunded</span>;
    }
  };

  return (
    <AppLayout>
      <Head title="Procurement Deals Dashboard - mobile.broker" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Procurement Deals Pipeline</h1>
            <p className="text-slate-600 text-sm mt-1 font-medium">
              Active brokerage orders, compliance status, escrow float, and delivery tracking.
            </p>
          </div>
          <Link href={route('vehicles.index')}>
            <button className="py-3 px-5 rounded-xl font-bold text-white bg-orange-600 hover:bg-orange-500 shadow-md text-xs transition-all">
              + Source New Vehicle
            </button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
            <div className="text-xs text-slate-500 font-bold mb-1 uppercase tracking-wider">Total Deals</div>
            <div className="text-3xl font-black text-slate-900">{summaryStats.totalDeals}</div>
          </div>
          <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
            <div className="text-xs text-slate-500 font-bold mb-1 uppercase tracking-wider">Transaction Volume</div>
            <div className="text-3xl font-black text-orange-600 font-mono">€{summaryStats.totalVolumeEur.toLocaleString()}</div>
          </div>
          <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
            <div className="text-xs text-slate-500 font-bold mb-1 uppercase tracking-wider">Active Pipeline</div>
            <div className="text-3xl font-black text-indigo-600">{summaryStats.activePipeline}</div>
          </div>
          <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
            <div className="text-xs text-slate-500 font-bold mb-1 uppercase tracking-wider">Escrow Float</div>
            <div className="text-3xl font-black text-emerald-600 font-mono">€{summaryStats.escrowHoldingEur.toLocaleString()}</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-3">
          {[
            { key: 'all', label: 'All Deals' },
            { key: 'active', label: 'Active Pipeline' },
            { key: 'completed', label: 'Completed Deals' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilterTab(tab.key)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filterTab === tab.key
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Deals Cards List */}
        <div className="space-y-4">
          {filteredDeals.length === 0 ? (
            <div className="rounded-2xl bg-white border border-slate-200 p-12 text-center text-slate-500 shadow-sm">
              <FileText className="h-10 w-10 text-slate-300 mx-auto mb-3" />
              <p className="font-semibold">No procurement deals found for this view filter.</p>
            </div>
          ) : (
            filteredDeals.map((deal) => {
              const vehicleImg = deal.vehicle?.images_json?.[0] || 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1000&q=80';
              return (
                <div
                  key={deal.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  {/* Left: Thumbnail & Details */}
                  <div className="flex items-center gap-5">
                    <img
                      src={vehicleImg}
                      alt={deal.vehicle?.model}
                      className="h-20 w-32 rounded-xl object-cover border border-slate-200 flex-shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-mono text-xs text-orange-600 font-bold">{deal.reference_code}</span>
                        {getStatusBadge(deal.status)}
                        <span className="text-xs text-slate-400 font-bold uppercase">{deal.type}</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {deal.vehicle?.make} {deal.vehicle?.model} {deal.quantity > 1 && `(x${deal.quantity} Fleet)`}
                      </h3>
                      <div className="text-xs text-slate-500 mt-1 flex flex-wrap gap-x-4 gap-y-1">
                        <span>Buyer: <strong className="text-slate-800">{deal.buyer?.name}</strong></span>
                        <span>Dealer: <strong className="text-slate-800">{deal.dealer?.name}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Amounts & Action Button */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-6 border-t md:border-t-0 border-slate-100 pt-4 md:pt-0">
                    <div className="text-left md:text-right">
                      <div className="text-xs text-slate-400 font-semibold mb-0.5">Total Deal Value</div>
                      <div className="text-2xl font-black text-slate-900 font-mono">
                        €{deal.total_amount.toLocaleString()}
                      </div>
                      <div className="mt-1">{getEscrowBadge(deal.escrow_status)}</div>
                    </div>

                    <Link href={route('deals.show', deal.id)}>
                      <button className="py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-orange-600 text-white text-xs font-bold transition-colors flex items-center gap-2 shadow-sm">
                        <span>Open Interactive Tracker</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </AppLayout>
  );
}
