import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { route } from '@/lib/route';
import { Car, FileText, ShieldCheck, Landmark, Building2, Store, Search, Shield, ChevronRight, LogOut, LayoutDashboard, Plus, ArrowLeft, CheckCircle2, User, HelpCircle, Settings, Bell, ExternalLink, RefreshCw, TrendingUp } from 'lucide-react';

export default function DashboardLayout({ children, activeTab = 'overview', onTabChange, title = 'Workspace Dashboard' }) {
  const { auth, flash, companyInfo } = usePage().props;
  const currentUser = auth?.user;
  const isAdmin = currentUser?.role === 'broker_admin';
  const isDealer = currentUser?.role === 'dealer_partner' || isAdmin;

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const company = companyInfo || {
    name: 'BASILDON LIMITED',
    number: '16290553',
    address: '2 Navarre Street, London, England, E2 7JH',
    email: 'support@carstrado.com',
    phone: '+44 20 7946 0912',
  };

  const navItems = isAdmin ? [
    { id: 'table', label: 'Master Deals Pipeline', icon: FileText, badge: null, href: null },
    { id: 'kanban', label: 'Pipeline Kanban Board', icon: LayoutDashboard, badge: null, href: null },
    { id: 'compliance', label: 'Compliance Audit Queue', icon: ShieldCheck, badge: 'VQF', href: null },
    { id: 'analytics', label: 'Financial Performance', icon: Landmark, badge: null, href: null },
    { id: 'dealers', label: 'Dealer Network', icon: Store, badge: null, href: null },
  ] : [
    { id: 'inventory', label: 'Manage Inventory', icon: Car, badge: null, href: route('dealer.dashboard', { tab: 'inventory' }) },
    { id: 'deals', label: 'Sourced Deals & Payouts', icon: FileText, badge: null, href: route('dealer.dashboard', { tab: 'deals' }) },
    { id: 'analytics', label: 'Fleet Analytics & Reports', icon: TrendingUp, badge: 'Analytics', href: route('dealer.fleetAnalytics') },
    { id: 'services', label: 'Warranties & Insurance', icon: ShieldCheck, badge: 'Catalog', href: route('dealer.services') },
    { id: 'settings', label: 'Dealership Preferences', icon: Settings, badge: null, href: route('dealer.settings') },
  ];

  return (
    <div className="min-h-screen flex bg-slate-100 text-slate-900 font-sans antialiased selection:bg-orange-500 selection:text-white">
      {/* Sidebar Navigation */}
      <aside className="w-72 bg-slate-900 text-slate-200 border-r border-slate-800 flex flex-col justify-between hidden md:flex shrink-0">
        <div>
          {/* Workspace Brand Logo Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-orange-600 via-amber-500 to-orange-400 text-white flex items-center justify-center font-black text-lg shadow-md">
                <Car className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span className="font-extrabold text-xl tracking-tight text-white">
                    Car<span className="text-orange-500 font-black">Strado</span>
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 font-mono">.com</span>
                </div>
                <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest -mt-1 font-mono">
                  {isAdmin ? 'Admin Control Desk' : 'Dealer Portal'}
                </span>
              </div>
            </Link>
          </div>

          {/* Active User Card */}
          {currentUser && (
            <div className="p-4 mx-4 my-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-orange-600 text-white font-black text-sm flex items-center justify-center shadow-md">
                {currentUser.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-white truncate">{currentUser.name}</div>
                <div className="text-[10px] text-orange-400 font-mono font-bold capitalize truncate">
                  {currentUser.role.replace('_', ' ')}
                </div>
              </div>
            </div>
          )}

          {/* Sidebar Nav Links */}
          <nav className="px-4 space-y-1.5 mt-2">
            <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">
              Management Desk
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const content = (
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-orange-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      isActive ? 'bg-white text-orange-600' : 'bg-slate-800 text-orange-400 border border-slate-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </div>
              );

              const className = `w-full px-3.5 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between group block ${
                isActive
                  ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`;

              if (item.href) {
                return (
                  <Link key={item.id} href={item.href} className={className}>
                    {content}
                  </Link>
                );
              }

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onTabChange && onTabChange(item.id)}
                  className={className}
                >
                  {content}
                </button>
              );
            })}

            {/* List New Vehicle Shortcut */}
            {isDealer && (
              <div className="pt-4 mt-4 border-t border-slate-800">
                <Link
                  href={route('dealer.vehicles.create')}
                  className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-orange-600 text-slate-200 hover:text-white font-extrabold text-xs transition-all flex items-center justify-center gap-2 border border-slate-700 hover:border-orange-500 shadow-md group"
                >
                  <Plus className="h-4 w-4 text-orange-500 group-hover:text-white" />
                  <span>List New Vehicle</span>
                </Link>
              </div>
            )}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            href={route('vehicles.index')}
            className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-2"
          >
            <ExternalLink className="h-4 w-4 text-slate-500" />
            <span>Public Catalog</span>
          </Link>

          <button
            onClick={() => router.post(route('logout'))}
            className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-red-400 hover:text-white hover:bg-red-950/50 transition-colors flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Workspace Right Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Workspace Top Header Bar */}
        <header className="bg-white border-b border-slate-200 h-20 px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-black text-slate-900 tracking-tight">{title}</h1>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Swiss VQF AML & EU Regulated
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Quick Link back to Catalog */}
            <Link
              href={route('vehicles.index')}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Back to Public Site</span>
            </Link>

            {isDealer && (
              <Link
                href={route('dealer.vehicles.create')}
                className="px-4 py-2 rounded-xl text-xs font-extrabold text-white bg-orange-600 hover:bg-orange-500 transition-all shadow-md flex items-center gap-1.5"
              >
                <Plus className="h-4 w-4" />
                <span>Add Vehicle</span>
              </Link>
            )}
          </div>
        </header>

        {/* Flash Notifications */}
        {flash?.success && (
          <div className="bg-emerald-50 border-b border-emerald-200 text-emerald-900 px-6 py-3 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            {flash.success}
          </div>
        )}

        {/* Main Workspace Body Content */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
