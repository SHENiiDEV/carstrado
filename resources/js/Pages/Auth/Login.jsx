import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { route } from '@/lib/route';
import AppLayout from '@/Layouts/AppLayout';
import { Lock, Mail, ArrowRight } from 'lucide-react';

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('login'));
  };

  return (
    <AppLayout>
      <Head title="Sign In - CarStrado (CarStrado.com)" />

      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="h-12 w-12 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 font-bold mx-auto mb-3">
              <Lock className="h-6 w-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Sign In to CarStrado</h1>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Access your vehicle procurement deals, escrow settlements, and compliance certificates.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm font-semibold focus:ring-2 focus:ring-orange-500 bg-white"
                />
              </div>
              {errors.email && <span className="text-xs text-red-600 font-semibold mt-1 block">{errors.email}</span>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <Link
                  href={route('password.request')}
                  className="text-xs font-bold text-orange-600 hover:text-orange-500 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm font-semibold focus:ring-2 focus:ring-orange-500 bg-white"
                />
              </div>
              {errors.password && <span className="text-xs text-red-600 font-semibold mt-1 block">{errors.password}</span>}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.remember}
                  onChange={(e) => setData('remember', e.target.checked)}
                  className="rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                />
                <span>Remember me</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full py-3.5 rounded-xl font-extrabold text-white bg-orange-600 hover:bg-orange-500 shadow-md text-sm transition-all flex items-center justify-center gap-2"
            >
              <span>Sign In to MiaVia</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Registration Prompt */}
          <div className="mt-6 text-center text-xs text-slate-500 font-medium">
            Don't have an account?{' '}
            <Link href={route('register')} className="text-orange-600 font-bold hover:underline">
              Create an Account
            </Link>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
