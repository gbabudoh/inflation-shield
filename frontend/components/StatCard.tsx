'use client';

import { LucideIcon } from 'lucide-react';
import { formatCurrency, formatNumber } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  iconColor?: string;
  isCurrency?: boolean;
  isPercentage?: boolean;
}

export default function StatCard({
  title,
  value,
  change,
  icon: Icon,
  iconColor = 'text-primary',
  isCurrency = false,
  isPercentage = false,
}: StatCardProps) {
  const formattedValue = isCurrency && typeof value === 'number'
    ? formatCurrency(value)
    : isPercentage && typeof value === 'number'
    ? `${value}%`
    : typeof value === 'number'
    ? formatNumber(value)
    : value;

  const isPositive = change && change > 0;

  return (
    <div className="glass-card group p-8 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 border-white/40 bg-white/40">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-[10px] font-black text-secondary/40 uppercase tracking-[0.2em] mb-4">
            {title}
          </p>
          <div className="flex items-baseline space-x-2">
            <p className="text-4xl font-black text-secondary tracking-tighter group-hover:scale-105 transition-transform origin-left duration-300">
              {formattedValue}
            </p>
          </div>
          {change !== undefined && (
            <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black mt-4 ${
              isPositive ? 'bg-success-50 text-success-600' : 'bg-danger-50 text-danger-600'
            }`}>
              {isPositive ? '↑' : '↓'} {Math.abs(change)}%
              <span className="ml-1 opacity-60 font-bold uppercase">vs target</span>
            </div>
          )}
        </div>
        <div className={`p-4 rounded-[1.25rem] bg-white shadow-sm border border-neutral-100 group-hover:bg-primary group-hover:text-secondary transition-all duration-300 ${iconColor}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      
      {/* Decorative background element for dynamic feel */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-3xl rounded-full -mr-12 -mt-12 group-hover:bg-primary/10 transition-colors"></div>
    </div>
  );
}