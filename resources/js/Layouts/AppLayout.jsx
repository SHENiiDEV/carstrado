import React, { useState, useRef, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { route } from '@/lib/route';
import { Car, FileText, ShieldCheck, Check, Building2, User, Phone, Mail, MapPin, Search, Shield, Store, Compass, ChevronDown, LogOut, Info, MessageSquare } from 'lucide-react';

export default function AppLayout({ children }) {
  const { auth, flash, topBrands, companyInfo } = usePage().props;
  const currentUser = auth?.user;
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const company = companyInfo || {
    name: 'BASILDON LIMITED',
    number: '16290553',
    address: '2 Navarre Street, London, England, E2 7JH',
    email: 'support@carstrado.com',
    phone: '+44 20 7946 0912',
    desk: 'London HQ',
  };

  const brands = Array.isArray(topBrands) ? topBrands : [];

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [cookieConsentOpen, setCookieConsentOpen] = useState(false);

  // Check cookie consent
  useEffect(() => {
    const hasConsent = localStorage.getItem('carstrado_cookie_consent');
    if (!hasConsent) {
      setCookieConsentOpen(true);
    }
  }, []);

  const acceptAllCookies = () => {
    localStorage.setItem('carstrado_cookie_consent', JSON.stringify({
      essential: true,
      functional: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    }));
    setCookieConsentOpen(false);
  };

  const acceptEssentialOnly = () => {
    localStorage.setItem('carstrado_cookie_consent', JSON.stringify({
      essential: true,
      functional: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    }));
    setCookieConsentOpen(false);
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-orange-500 selection:text-white">
      {/* Top Announcement & Trust Bar */}
      <div className="relative z-50 bg-slate-900 text-slate-200 border-b border-slate-800 px-4 py-2 text-xs font-semibold">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-slate-300">
            <Shield className="h-3.5 w-3.5 text-orange-500" />
            <span className="text-white">Official CarStrado European Automotive Sourcing & Escrow Platform</span>
            <span className="hidden md:inline text-slate-400">&bull; BASILDON LIMITED (No. 16290553) &bull; London HQ &bull; 48-72h Enclosed Delivery</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-300 ml-auto">
            <Link href={route('pages.contact')} className="hidden sm:inline-flex items-center gap-1 hover:text-orange-400 transition-colors">
              <Mail className="h-3 w-3 text-orange-500" /> {company.email}
            </Link>
            <select
              defaultValue={localStorage.getItem('carstrado_lang') || 'en'}
              onChange={(e) => {
                localStorage.setItem('carstrado_lang', e.target.value);
                window.location.reload();
              }}
              className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-[11px] font-bold border border-slate-700 cursor-pointer focus:ring-1 focus:ring-orange-500"
            >
              <option value="en">🇬🇧 EN</option>
              <option value="de">🇩🇪 DE</option>
              <option value="fr">🇫🇷 FR</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Top Navigation Header */}
      <header className="relative z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Logo CarStrado Accent */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-orange-600 via-amber-500 to-orange-400 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-orange-500/25 group-hover:scale-105 transition-transform">
                <Car className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span className="font-extrabold text-2xl tracking-tight text-slate-900">
                    Car<span className="text-orange-600 font-black">Strado</span>
                  </span>
                  <span className="text-[11px] font-bold text-slate-400 font-mono">.com</span>
                </div>
                <span className="text-[11px] font-medium text-slate-500 -mt-1">
                  European Automotive Sourcing & Escrow.
                </span>
              </div>
            </Link>

            {/* Clean Minimal Nav Links: Find Vehicles & About Us */}
            <nav className="hidden md:flex items-center gap-2">
              <Link
                href={route('vehicles.index')}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 ${
                  route().current('vehicles.*') || route().current('') 
                    ? 'bg-orange-50 text-orange-600 border border-orange-200 font-bold' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Search className="h-4 w-4" />
                Find Vehicles
              </Link>

              <Link
                href={route('pages.about')}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 ${
                  route().current('pages.about') 
                    ? 'bg-orange-50 text-orange-600 border border-orange-200 font-bold' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Info className="h-4 w-4" />
                About Us
              </Link>

              <Link
                href={route('pages.contact')}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 ${
                  route().current('pages.contact*') 
                    ? 'bg-orange-50 text-orange-600 border border-orange-200 font-bold' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Mail className="h-4 w-4" />
                Contact
              </Link>
            </nav>
          </div>

          {/* Active User Dropdown & Auth Links */}
          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className="relative" ref={menuRef}>
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-3 p-1.5 pr-3 rounded-2xl border border-slate-200 hover:border-orange-300 bg-white hover:bg-slate-50 transition-all shadow-sm group"
                >
                  <div className="h-9 w-9 rounded-xl bg-orange-600 text-white flex items-center justify-center font-black text-sm shadow-sm">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div className="hidden sm:flex flex-col text-left">
                    <span className="text-xs font-bold text-slate-900 leading-none">{currentUser.name}</span>
                    <span className="text-[10px] text-orange-600 font-bold capitalize mt-0.5">
                      {currentUser.role === 'b2b_fleet_manager' ? (currentUser.company_name || 'B2B Fleet') : currentUser.role.replace('_', ' ')}
                    </span>
                  </div>
                  <ChevronDown className={`h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Sleek Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-slate-200 shadow-2xl py-2 z-50 text-xs animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2.5 border-b border-slate-100 mb-1">
                      <div className="font-bold text-slate-900">{currentUser.name}</div>
                      <div className="text-[11px] text-slate-500 font-mono truncate">{currentUser.email}</div>
                    </div>

                    <Link
                      href={route('deals.index')}
                      onClick={() => setUserMenuOpen(false)}
                      className="px-4 py-2.5 text-slate-700 hover:bg-orange-50 hover:text-orange-600 font-semibold flex items-center gap-2.5 transition-colors"
                    >
                      <FileText className="h-4 w-4 text-orange-600" />
                      <span>My Deals & Orders</span>
                    </Link>

                    {(currentUser.role === 'dealer_partner' || currentUser.role === 'broker_admin') && (
                      <Link
                        href={route('dealer.dashboard')}
                        onClick={() => setUserMenuOpen(false)}
                        className="px-4 py-2.5 text-slate-700 hover:bg-orange-50 hover:text-orange-600 font-semibold flex items-center gap-2.5 transition-colors"
                      >
                        <Store className="h-4 w-4 text-orange-600" />
                        <span>Dealer Partner Portal</span>
                      </Link>
                    )}

                    {currentUser.role === 'broker_admin' && (
                      <Link
                        href={route('admin.dashboard')}
                        onClick={() => setUserMenuOpen(false)}
                        className="px-4 py-2.5 text-slate-700 hover:bg-slate-100 hover:text-slate-900 font-semibold flex items-center gap-2.5 transition-colors"
                      >
                        <ShieldCheck className="h-4 w-4 text-orange-500" />
                        <span>Broker Control Center</span>
                      </Link>
                    )}

                    <div className="border-t border-slate-100 my-1 pt-1">
                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          router.post(route('logout'));
                        }}
                        className="w-full text-left px-4 py-2.5 text-red-600 hover:bg-red-50 font-bold flex items-center gap-2.5 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href={route('login')}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href={route('register')}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-orange-600 hover:bg-orange-500 transition-all shadow-sm"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Flash Alert Banner */}
      {flash?.success && (
        <div className="relative z-30 bg-emerald-50 border-b border-emerald-200 text-emerald-800 px-4 py-3 text-center text-sm font-semibold flex items-center justify-center gap-2">
          <Check className="h-4 w-4 text-emerald-600" />
          {flash.success}
        </div>
      )}

      {/* Main Content View */}
      <main className="relative z-10 flex-1">{children}</main>

      {/* CarStrado Light Dynamic Footer */}
      <footer className="relative z-10 border-t border-slate-200 bg-white py-12 text-slate-600 text-sm mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-8 w-8 rounded-xl bg-orange-600 text-white flex items-center justify-center font-black text-sm shadow-md">
                <Car className="h-4 w-4" />
              </div>
              <span className="font-extrabold text-xl text-slate-900">
                Car<span className="text-orange-600 font-black">Strado</span>
                <span className="text-xs text-slate-400 font-mono font-normal ml-1">.com</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              {company.name} is Europe's leading digital automotive brokerage platform connecting verified buyers, dealers, and corporate fleets with full escrow protection and compliance.
            </p>
          </div>

          {/* Column 2: Dynamic Top Brands from Database */}
          <div>
            <h4 className="font-bold text-slate-900 mb-3 text-xs uppercase tracking-wider">Top Brands</h4>
            {brands.length > 0 ? (
              <ul className="space-y-2 text-xs text-slate-600">
                {brands.map((b) => (
                  <li key={b.make}>
                    <Link
                      href={route('vehicles.index', { make: b.make })}
                      className="hover:text-orange-600 transition-colors flex items-center justify-between font-medium"
                    >
                      <span>{b.make}</span>
                      <span className="text-[10px] font-mono text-slate-400">({b.count})</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400">
                Direct access to OEM verified inventory from official UK, German, and Swiss dealerships.
              </p>
            )}
          </div>

          {/* Column 3: Legal & Brokerage Pages */}
          <div>
            <h4 className="font-bold text-slate-900 mb-3 text-xs uppercase tracking-wider">Legal & Services</h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li>
                <Link href={route('pages.faq')} className="hover:text-orange-600 transition-colors">
                  Help & FAQ Knowledge Center
                </Link>
              </li>
              <li>
                <Link href={route('pages.about')} className="hover:text-orange-600 transition-colors">
                  About {company.name}
                </Link>
              </li>
              <li>
                <Link href={route('pages.terms')} className="hover:text-orange-600 transition-colors">
                  Terms & Conditions (VQF Escrow)
                </Link>
              </li>
              <li>
                <Link href={route('pages.privacy')} className="hover:text-orange-600 transition-colors">
                  Privacy Policy (GDPR / FADP)
                </Link>
              </li>
              <li>
                <Link href={route('pages.cookies')} className="hover:text-orange-600 transition-colors">
                  Cookie Policy & Consent
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Support from .env */}
          <div>
            <h4 className="font-bold text-slate-900 mb-3 text-xs uppercase tracking-wider">Contact & Support</h4>
            <p className="text-xs text-slate-600 mb-2 flex items-start gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-orange-600 flex-shrink-0 mt-0.5" />
              <span>{company.address}</span>
            </p>
            <p className="text-xs text-slate-600 mb-2 flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-orange-600 flex-shrink-0" />
              <a href={`mailto:${company.email}`} className="hover:text-orange-600 transition-colors font-mono">
                {company.email}
              </a>
            </p>
            <p className="text-xs text-slate-600 flex items-center gap-1.5">
              <Link href={route('pages.contact')} className="hover:text-orange-600 transition-colors font-bold text-orange-600 flex items-center gap-1">
                <MessageSquare className="h-3.5 w-3.5" />
                <span>Online Contact Desk &rarr;</span>
              </Link>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>BASILDON LIMITED (Company No. 16290553) &bull; CarStrado.com &copy; 2026. All rights reserved. Registered Office: 2 Navarre Street, London, England, E2 7JH.</div>
          <div className="flex gap-4">
            <Link href={route('pages.contact')} className="hover:text-slate-600">Contact Us</Link>
            <Link href={route('pages.privacy')} className="hover:text-slate-600">Privacy Policy</Link>
            <Link href={route('pages.terms')} className="hover:text-slate-600">Terms of Service</Link>
            <Link href={route('pages.cookies')} className="hover:text-slate-600">Cookie Preferences</Link>
          </div>
        </div>
      </footer>

      {/* Modern Fixed Cookie Consent Toast Banner */}
      {cookieConsentOpen && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-xl z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="bg-slate-900/95 backdrop-blur-xl text-white rounded-3xl p-6 shadow-2xl border border-white/10 shadow-black/50 space-y-4">
            <div className="flex items-start gap-3">
              <div className="h-9 w-9 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0 mt-0.5">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-black text-white">We Value Your Privacy & Security</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  CarStrado uses essential cookies to secure escrow transactions, manage sessions, and remember your currency and vehicle search filters.
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800">
              <Link
                href={route('pages.cookies')}
                className="text-xs font-bold text-slate-400 hover:text-white underline"
              >
                Customize Preferences
              </Link>
              <div className="flex items-center gap-2">
                <button
                  onClick={acceptEssentialOnly}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
                >
                  Essential Only
                </button>
                <button
                  onClick={acceptAllCookies}
                  className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-black shadow-lg shadow-orange-600/30 transition-all active:scale-95"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
