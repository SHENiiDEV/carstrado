import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { route } from '@/lib/route';
import AppLayout from '@/Layouts/AppLayout';
import { Mail, ArrowLeft, Send, CheckCircle2, KeyRound } from 'lucide-react';

export default function ForgotPassword({ status }) {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('password.email'));
  };

  return (
    <AppLayout>
      <Head title="Forgot Password - AutoBrokers" />

      <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
          <div className="text-center">
            <div className="mx-auto h-14 w-14 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 mb-4 shadow-sm">
              <KeyRound className="h-7 w-7" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Reset Your Password</h2>
            <p className="mt-2 text-xs font-medium text-slate-500 max-w-sm mx-auto">
              Enter your registered email address below and we will dispatch password recovery instructions.
            </p>
          </div>

          {status && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
              <span>{status}</span>
            </div>
          )}

          <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm font-bold focus:ring-2 focus:ring-orange-500 bg-white"
                  placeholder="name@company.com"
                />
              </div>
              {errors.email && <p className="mt-1.5 text-xs text-red-600 font-semibold">{errors.email}</p>}
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full py-3.5 px-4 rounded-xl font-extrabold text-white bg-orange-600 hover:bg-orange-500 text-xs shadow-lg shadow-orange-600/30 transition-all flex items-center justify-center gap-2"
            >
              <Send className="h-4 w-4" />
              <span>Send Recovery Link</span>
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
