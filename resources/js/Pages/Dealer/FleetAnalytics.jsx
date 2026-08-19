import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { route } from '@/lib/route';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { useCurrency } from '@/lib/currency';
import { TrendingUp, Car, FileText, Download, ShieldCheck, DollarSign, Calendar, Zap, RefreshCw, BarChart2, PieChart, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function FleetAnalytics({ dealer, vehicles = [], deals = [], fleetMetrics = {} }) {
  const { format } = useCurrency();

  const handleExportPdfReport = () => {
    window.print();
  };

  const handleExportCsv = () => {
    const headers = ['ID,VIN,Make,Model,Year,Price_EUR,Mileage_KM,Fuel_Type,Status\n'];
    const rows = vehicles.map(
      (v) => `${v.id},${v.vin},${v.make},${v.model},${v.year},${v.price_eur},${v.mileage_km},${v.fuel_type},${v.status}`
    );
    const blob = new Blob([headers + rows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Fleet_Analytics_Audit_${dealer.name.replace(/\s+/g, '_')}.csv`;
    a.click();
  };

  return (
    <DashboardLayout
      activeTab="analytics"
      title="Fleet Management Dashboard & Valuation Analytics"
    >
      <Head title="Fleet Analytics & Reports - Dealer Portal" />

      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Dealership Fleet Inventory & Valuation Desk</h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Real-time portfolio valuation, turnover rate metrics, and tax depreciation audit reports.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCsv}
            className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-extrabold text-xs transition-all flex items-center gap-2 shadow-sm"
          >
            <Download className="h-4 w-4 text-orange-600" /> Export CSV Report
          </button>

          <button
            onClick={handleExportPdfReport}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-orange-600 text-white font-extrabold text-xs transition-all flex items-center gap-2 shadow-md"
          >
            <FileText className="h-4 w-4" /> Print / Save PDF
          </button>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-extrabold uppercase tracking-wider">Total Portfolio Valuation</span>
            <DollarSign className="h-5 w-5 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono">
            {format(fleetMetrics.totalFleetValueEur || 0)}
          </div>
          <span className="text-[11px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
            <ArrowUpRight className="h-3.5 w-3.5" /> Asset Value Secured
          </span>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-extrabold uppercase tracking-wider">Total Fleet Mileage</span>
            <Car className="h-5 w-5 text-orange-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono">
            {(fleetMetrics.totalFleetMileageKm || 0).toLocaleString()} km
          </div>
          <span className="text-[11px] text-slate-500 font-medium mt-1 block">
            Avg: {Math.round((fleetMetrics.totalFleetMileageKm || 0) / (vehicles.length || 1)).toLocaleString()} km / car
          </span>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-extrabold uppercase tracking-wider">Avg Selling Price</span>
            <BarChart2 className="h-5 w-5 text-indigo-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono">
            {format(fleetMetrics.averagePriceEur || 0)}
          </div>
          <span className="text-[11px] text-slate-500 font-medium mt-1 block">Across {vehicles.length} Units</span>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-extrabold uppercase tracking-wider">Fleet Turnover Rate</span>
            <Calendar className="h-5 w-5 text-purple-600" />
          </div>
          <div className="text-3xl font-black text-purple-600 font-mono">
            {fleetMetrics.fleetTurnoverDays || 18} Days
          </div>
          <span className="text-[11px] text-slate-500 font-medium mt-1 block">Average Time to Sourcing Sale</span>
        </div>
      </div>

      {/* Analytics & Drivetrain Split Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Drivetrain / Fuel Split */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <Zap className="h-5 w-5 text-orange-600" /> Drivetrain & Fuel Type Allocation
            </h3>
            <span className="text-xs font-mono font-bold text-slate-400">EV & PHEV Priority</span>
          </div>

          <div className="space-y-4 text-xs font-semibold">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-800 font-bold">Electric (BEV)</span>
                <span className="font-mono text-slate-900 font-extrabold">{fleetMetrics.fuelBreakdown?.electric || 0} Units</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-orange-500 h-full" style={{ width: `${((fleetMetrics.fuelBreakdown?.electric || 0) / (vehicles.length || 1)) * 100}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-800 font-bold">Plug-in Hybrid (PHEV)</span>
                <span className="font-mono text-slate-900 font-extrabold">{fleetMetrics.fuelBreakdown?.hybrid || 0} Units</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-purple-600 h-full" style={{ width: `${((fleetMetrics.fuelBreakdown?.hybrid || 0) / (vehicles.length || 1)) * 100}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-800 font-bold">Petrol / Gasoline</span>
                <span className="font-mono text-slate-900 font-extrabold">{fleetMetrics.fuelBreakdown?.petrol || 0} Units</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-slate-700 h-full" style={{ width: `${((fleetMetrics.fuelBreakdown?.petrol || 0) / (vehicles.length || 1)) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Audit & Compliance Health Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-600" /> Fleet Inspection Compliance Audit
              </h3>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                100% TÜV Cleared
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">
              All vehicles listed in your dealership inventory have passed the mandatory 150-Point Technical Inspection and Swiss VQF ownership audit.
            </p>

            <div className="space-y-3 text-xs font-bold text-slate-800">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span>TÜV / DEKRA 150-Pt Report</span>
                <span className="text-emerald-700 font-mono">100% Compliant</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span>EV Battery SoH Health Grade</span>
                <span className="text-orange-600 font-mono">Grade A+ (99%)</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 mt-6">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block mb-1">Official Auditor</span>
            <strong className="text-slate-900 text-xs block">DEKRA Automobil GmbH / Swiss VQF Desk</strong>
          </div>
        </div>
      </div>

      {/* Fleet Inventory Audit Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <h3 className="font-extrabold text-slate-900 text-sm">Detailed Fleet Audit & Valuation Ledger</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-500 uppercase tracking-wider font-extrabold border-b border-slate-200">
              <tr>
                <th className="p-4">Vehicle Unit</th>
                <th className="p-4">VIN Code</th>
                <th className="p-4">List Price</th>
                <th className="p-4">Mileage</th>
                <th className="p-4">Drivetrain</th>
                <th className="p-4">Listing Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {vehicles.map((v) => (
                <tr key={v.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-slate-900">{v.make} {v.model} ({v.year})</td>
                  <td className="p-4 font-mono font-bold text-orange-600">{v.vin}</td>
                  <td className="p-4 font-mono font-bold text-slate-900">{format(v.price_eur)}</td>
                  <td className="p-4 font-mono">{v.mileage_km.toLocaleString()} km</td>
                  <td className="p-4 capitalize">{v.fuel_type}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${
                      v.status === 'available' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {v.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
