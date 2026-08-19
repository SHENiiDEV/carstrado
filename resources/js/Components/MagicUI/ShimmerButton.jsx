import React from 'react';
import { cn } from '@/lib/utils';

export function ShimmerButton({
  shimmerColor = '#ffffff',
  shimmerSize = '0.05em',
  shimmerDuration = '3s',
  borderRadius = '100px',
  background = 'rgba(15, 23, 42, 1)',
  className,
  children,
  ...props
}) {
  return (
    <button
      style={{
        '--shimmer-color': shimmerColor,
        '--shimmer-size': shimmerSize,
        '--shimmer-duration': shimmerDuration,
        '--border-radius': borderRadius,
        '--background': background,
      }}
      className={cn(
        'group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap px-6 py-3 text-white [background:var(--background)] [border-radius:var(--border-radius)] transition-all duration-300 active:scale-95 border border-slate-700/50 hover:border-slate-500/80 shadow-lg shadow-indigo-500/10',
        className
      )}
      {...props}
    >
      {/* spark container */}
      <div
        className={cn(
          '-z-30 blur-[2px]',
          'absolute inset-0 overflow-visible [container-type:size]'
        )}
      >
        {/* spark */}
        <div className="absolute inset-0 h-[100cqh] animate-shimmer-slide [aspect-ratio:1] [background:radial-gradient(ellipse_at_center,var(--shimmer-color)_0%,transparent_60%)] [slide-distance:100%]" />
      </div>

      {/* highlight backdrop */}
      <div className="absolute inset-0 z-[-1] rounded-[inherit] bg-gradient-to-r from-indigo-500/20 via-sky-500/20 to-emerald-500/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* content */}
      <span className="relative z-10 flex items-center gap-2 text-sm font-semibold tracking-wide text-slate-100">
        {children}
      </span>
    </button>
  );
}
