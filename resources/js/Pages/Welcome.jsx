import React from 'react';
import { Head } from '@inertiajs/react';
import { BorderBeam } from '@/Components/MagicUI/BorderBeam';
import { ShimmerButton } from '@/Components/MagicUI/ShimmerButton';
import { Particles } from '@/Components/MagicUI/Particles';
import { Database, Server, Cpu, Sparkles, CheckCircle2, ShieldCheck, Zap, ArrowRight, Code } from 'lucide-react';

export default function Welcome({ laravelVersion, phpVersion, dbConnected, dbName }) {
  return (
    <>
      <Head title="AutoBrokers - Laravel 13 + Inertia + React + Magic UI" />
      
      <div className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
        {/* Background Magic Particles */}
        <Particles quantity={45} ease={80} color="#818cf8" className="z-0" />
        
        {/* Glowing Background Gradients */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-sky-500/10 blur-[120px] rounded-full z-0" />
        
        {/* Header Navigation */}
        <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-slate-800/60 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-sky-400 p-[1px] shadow-lg shadow-indigo-500/20">
              <div className="h-full w-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-indigo-400" />
              </div>
            </div>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              AutoBrokers
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-slate-900/90 border border-slate-800 text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Docker Active
            </span>
          </div>
        </header>

        {/* Hero Section */}
        <main className="relative z-10 flex-1 max-w-5xl mx-auto px-6 flex flex-col items-center justify-center text-center py-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-8 backdrop-blur-sm shadow-inner shadow-indigo-500/20">
            <Zap className="h-3.5 w-3.5 text-indigo-400" />
            Modern Full-Stack Environment Ready
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-50 leading-[1.15] mb-6">
            Laravel <span className="bg-gradient-to-r from-red-500 via-indigo-400 to-sky-400 bg-clip-text text-transparent">{laravelVersion}</span> + Inertia React
            <br className="hidden sm:inline" /> & <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">Magic UI</span>
          </h1>

          <p className="max-w-2xl text-slate-400 text-base sm:text-lg mb-10 leading-relaxed">
            Чистая архитектура внутри Docker контейнера: React, Inertia.js v2, Tailwind CSS v4, MySQL 8 и готовые интерактивные компоненты Magic UI.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <ShimmerButton onClick={() => alert('Laravel 13 + Docker + Inertia JS Stack is active!')}>
              <span>Запустить проект</span>
              <ArrowRight className="h-4 w-4" />
            </ShimmerButton>
          </div>

          {/* Feature Tech Cards Grid with Magic UI BorderBeam */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {/* Card 1: Laravel & PHP */}
            <div className="relative rounded-2xl bg-slate-900/60 border border-slate-800/80 p-6 backdrop-blur-sm overflow-hidden group hover:border-slate-700/80 transition-all">
              <BorderBeam size={160} duration={12} delay={0} colorFrom="#6366f1" colorTo="#a855f7" />
              <div className="h-12 w-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4 text-indigo-400">
                <Server className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg text-slate-100 mb-2">Laravel Framework</h3>
              <p className="text-sm text-slate-400 mb-4">
                Версия Laravel {laravelVersion} с PHP {phpVersion} запущены в изолированном контейнере.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-indigo-400">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                PHP {phpVersion.split('-')[0]}
              </div>
            </div>

            {/* Card 2: MySQL Database */}
            <div className="relative rounded-2xl bg-slate-900/60 border border-slate-800/80 p-6 backdrop-blur-sm overflow-hidden group hover:border-slate-700/80 transition-all">
              <BorderBeam size={160} duration={12} delay={4} colorFrom="#38bdf8" colorTo="#6366f1" />
              <div className="h-12 w-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-4 text-sky-400">
                <Database className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg text-slate-100 mb-2">MySQL 8.0 Database</h3>
              <p className="text-sm text-slate-400 mb-4">
                Подключение к бд <code className="text-sky-300 font-mono">{dbName || 'autobrokers'}</code> через внутреннюю сеть Docker.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono">
                {dbConnected ? (
                  <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                    <CheckCircle2 className="h-4 w-4" /> Connected
                  </span>
                ) : (
                  <span className="text-amber-400">Connecting...</span>
                )}
              </div>
            </div>

            {/* Card 3: Inertia + React + Magic UI */}
            <div className="relative rounded-2xl bg-slate-900/60 border border-slate-800/80 p-6 backdrop-blur-sm overflow-hidden group hover:border-slate-700/80 transition-all">
              <BorderBeam size={160} duration={12} delay={8} colorFrom="#ec4899" colorTo="#8b5cf6" />
              <div className="h-12 w-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4 text-purple-400">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg text-slate-100 mb-2">Inertia React & Magic UI</h3>
              <p className="text-sm text-slate-400 mb-4">
                Клиентская часть на React 19 с Tailwind CSS v4, Framer Motion и компонентами Magic UI.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-purple-400">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Vite HMR Active
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="relative z-10 w-full border-t border-slate-800/60 py-6 text-center text-xs text-slate-500">
          AutoBrokers &copy; 2026 &bull; Powered by Laravel 13, Inertia.js, React & Docker
        </footer>
      </div>
    </>
  );
}
