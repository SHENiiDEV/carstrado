import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { route } from '@/lib/route';
import AppLayout from '@/Layouts/AppLayout';
import { Lock, ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function ResetPassword({ token, email }) {
  const { data, setData, post, processing, errors } = useForm({
    token: token || '',
    email: email || '',
    password: '',
    password_confirmation: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('password.update'));
  };

  return (
    <AppLayout>
      <Head title="Set New Password - AutoBrokers" />

      <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
          <div className="text-center">
            <div className="mx-auto h-14 w-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-4 shadow-sm">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Set New Password</h2>
            <p className="mt-2 text-xs font-medium text-slate-500 max-w-sm mx-auto">
              Please enter your new strong password for your AutoBrokers account below.
            </p>
          </div>

          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Account Email
              </label>
              <input
                type="email"
                required
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm font-bold bg-slate-100"
              />
              {errors.email && <p className="mt-1 text-xs text-red-600 font-semibold">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type="password"
                  required
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm font-bold focus:ring-2 focus:ring-orange-500 bg-white"
                  placeholder="At least 8 characters"
                />
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-600 font-semibold">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type="password"
                  required
                  value={data.password_confirmation}
                  onChange={(e) => setData('password_confirmation', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm font-bold focus:ring-2 focus:ring-orange-500 bg-white"
                  placeholder="Repeat new password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full py-3.5 px-4 rounded-xl font-extrabold text-white bg-emerald-600 hover:bg-emerald-500 text-xs shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Update Password & Sign In</span>
            </button>
          </form>

          <div className="text-center pt-4 border-t border-slate-100">
            <Link
              href={route('login')}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-orange-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Sign In</span>
            </Link>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
