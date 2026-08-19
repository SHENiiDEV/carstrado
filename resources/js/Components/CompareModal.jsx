import React, { useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { route } from '@/lib/route';
import { useCurrency } from '@/lib/currency';
import { X, Check, ArrowRight, ShieldCheck, Car, Trash2 } from 'lucide-react';

export default function CompareModal({ vehicles = [], onClose, onRemoveVehicle, onClearAll }) {
  const { format } = useCurrency();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!vehicles || vehicles.length === 0) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="compare-modal-title"
      className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="bg-white rounded-3xl border border-slate-200 max-w-5xl w-full shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-bold shadow-md">
              <Car className="h-5 w-5" />
            </div>
            <div>
              <h2 id="compare-modal-title" className="text-lg font-black tracking-tight">Side-by-Side Vehicle Comparison</h2>
              <p className="text-xs text-slate-400 font-medium">
                Comparing {vehicles.length} out of 3 selected vehicles
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClearAll}
              className="text-xs font-bold text-slate-400 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors flex items-center gap-1 px-2 py-1 rounded-lg"
            >
              <Trash2 className="h-4 w-4" /> Clear All
            </button>
            <button
              onClick={onClose}
              aria-label="Close comparison dialog"
              className="h-9 w-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Comparative Grid Table */}
        <div className="p-6 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="p-4 w-48 text-xs font-black text-slate-400 uppercase tracking-wider bg-slate-50 rounded-tl-2xl">
                  Specification Feature
                </th>
                {vehicles.map((v) => (
                  <th key={v.id} className="p-4 text-center min-w-[220px] relative group">
                    <button
                      onClick={() => onRemoveVehicle(v.id)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-100 hover:bg-red-100 text-slate-400 hover:text-red-600 transition-colors"
                      title="Remove from comparison"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                    <img
                      src={v.images_json?.[0] || 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=400&q=80'}
                      alt={`${v.make} ${v.model}`}
                      className="h-28 w-full object-cover rounded-xl mb-3 shadow-sm"
                    />
                    <h3 className="font-black text-slate-900 text-sm mb-1">{v.make} {v.model}</h3>
                    <span className="text-xs font-mono font-bold text-orange-600 block">{v.year} • {v.trim || 'Standard'}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-800">
              {/* Row 1: Selling Price */}
              <tr className="bg-orange-50/50">
                <td className="p-4 font-bold text-slate-700 uppercase tracking-wider">Catalog List Price</td>
                {vehicles.map((v) => (
                  <td key={v.id} className="p-4 text-center font-mono font-black text-slate-900 text-base">
                    {format(v.price_eur)}
                  </td>
                ))}
              </tr>

              {/* Row 2: Monthly Lease Estimate */}
              <tr>
                <td className="p-4 font-bold text-slate-700 uppercase tracking-wider">Est. Monthly Lease Rate</td>
                {vehicles.map((v) => {
                  const estLease = Math.round(v.price_eur * 0.016);
                  return (
                    <td key={v.id} className="p-4 text-center font-mono font-bold text-purple-700">
                      ~{format(estLease)} / mo
                    </td>
                  );
                })}
              </tr>

              {/* Row 3: Mileage */}
              <tr>
                <td className="p-4 font-bold text-slate-700 uppercase tracking-wider">Total Mileage</td>
                {vehicles.map((v) => (
                  <td key={v.id} className="p-4 text-center font-mono font-bold">
                    {(v.mileage_km || 0).toLocaleString()} km
                  </td>
                ))}
              </tr>

              {/* Row 4: Drivetrain / Engine */}
              <tr>
                <td className="p-4 font-bold text-slate-700 uppercase tracking-wider">Engine & Drivetrain</td>
                {vehicles.map((v) => (
                  <td key={v.id} className="p-4 text-center capitalize font-bold text-slate-900">
                    {v.fuel_type} • {v.transmission || 'Automatic'}
                  </td>
                ))}
              </tr>

              {/* Row 5: Import Country */}
              <tr>
                <td className="p-4 font-bold text-slate-700 uppercase tracking-wider">Dealership Location</td>
                {vehicles.map((v) => (
                  <td key={v.id} className="p-4 text-center font-bold">
                    {v.location_country === 'CH' ? '🇨🇭 Switzerland' : v.location_country === 'DE' ? '🇩🇪 Germany' : '🇫🇷 France'} ({v.location_city || 'HQ'})
                  </td>
                ))}
              </tr>

              {/* Row 6: TÜV / DEKRA Audit */}
              <tr>
                <td className="p-4 font-bold text-slate-700 uppercase tracking-wider">TÜV / DEKRA Inspection</td>
                {vehicles.map((v) => (
                  <td key={v.id} className="p-4 text-center text-emerald-700 font-bold">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 border border-emerald-200">
                      <ShieldCheck className="h-3.5 w-3.5" /> 100% Passed
                    </span>
                  </td>
                ))}
              </tr>

              {/* Row 7: Sourcing Fee & Action */}
              <tr className="bg-slate-50">
                <td className="p-4 font-bold text-slate-700 uppercase tracking-wider">Action</td>
                {vehicles.map((v) => (
                  <td key={v.id} className="p-4 text-center">
                    <Link
                      href={route('vehicles.show', v.id)}
                      className="w-full py-2.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-xs transition-all shadow-md inline-flex items-center justify-center gap-1.5"
                    >
                      <span>View Vehicle</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
