'use client';

import { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Activity,
  BarChart3,
  Globe,
  Zap
} from 'lucide-react';

export default function PriceTrends() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated delay for premium feel
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const trends = [
    { item: 'Domestic Rice', base: 450, current: 780, change: 73.3, status: 'critical' },
    { item: 'Industrial Sugar', base: 1200, current: 850, change: -29.1, status: 'optimal' },
    { item: 'Logistics Index', base: 100, current: 145, change: 45.0, status: 'warning' },
    { item: 'Imported Flour', base: 800, current: 1200, change: 50.0, status: 'critical' },
  ];

  if (loading) {
    return (
      <div className="p-12 flex items-center justify-center min-h-[60vh]">
        <Activity className="h-8 w-8 text-primary animate-pulse" />
      </div>
    );
  }

  return (
    <div className="p-8 lg:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-12 space-y-2">
          <h1 className="text-4xl font-black text-secondary tracking-tighter uppercase">Price Trends</h1>
          <p className="text-[10px] font-black uppercase tracking-widest text-secondary/40">Real-time inflation monitoring & arbitrage detection</p>
        </div>

        {/* Major Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
           {[
             { label: 'Global Inflation Index', val: '12.4%', sub: '+0.2% Month-over-Month', color: 'text-danger-500', icon: Globe },
             { label: 'Shield Savings Alpha', val: 'Nigeria: 28%', sub: 'Avg. Group-Buy Efficiency', color: 'text-primary', icon: Zap },
             { label: 'Protocol Stability', val: '98.2%', sub: 'Settlement Node Uptime', color: 'text-success-500', icon: BarChart3 }
           ].map((m, i) => (
             <div key={i} className="bg-white border border-neutral-200 p-8 rounded-[2rem] shadow-sm">
                <div className="flex justify-between items-start mb-6">
                   <div className="p-3 bg-neutral-50 rounded-xl">
                      <m.icon className="h-5 w-5 text-secondary/40" />
                   </div>
                   <span className="text-[9px] font-black uppercase tracking-widest text-secondary/20">Real-Time</span>
                </div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-secondary/40 mb-2">{m.label}</h3>
                <div className={`text-3xl font-black ${m.color} tracking-tighter mb-1`}>{m.val}</div>
                <p className="text-[10px] font-bold text-neutral-400 italic">{m.sub}</p>
             </div>
           ))}
        </div>

        {/* Detailed Trends Table */}
        <div className="bg-white border border-neutral-200 rounded-[2.5rem] overflow-hidden shadow-xl shadow-neutral-200/50">
           <div className="p-8 border-b border-neutral-100 flex items-center justify-between">
              <h2 className="text-sm font-black text-secondary uppercase tracking-widest">Market Monitoring Board</h2>
              <div className="flex items-center space-x-2">
                 <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
                 <span className="text-[9px] font-black text-secondary/40 uppercase tracking-widest">Live Stream Active</span>
              </div>
           </div>
           
           <div className="overflow-x-auto">
             <table className="w-full text-left">
               <thead>
                 <tr className="border-b border-neutral-100 bg-neutral-50/50">
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Asset / Product</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Baseline Price</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Current Market</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Inflation Delta</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-right">Shield Response</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-neutral-100 font-mono">
                 {trends.map((t, i) => (
                   <tr key={i} className="hover:bg-neutral-50/50 transition-colors group">
                      <td className="px-8 py-6 font-bold text-secondary text-sm">{t.item}</td>
                      <td className="px-8 py-6 text-secondary/40 text-xs">₦{t.base}</td>
                      <td className="px-8 py-6 font-black text-secondary text-xs">₦{t.current}</td>
                      <td className="px-8 py-6">
                         <div className={`flex items-center space-x-2 ${t.change > 0 ? 'text-danger-500' : 'text-success-500'}`}>
                            {t.change > 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                            <span className="font-black text-xs">{t.change > 0 ? '+' : ''}{t.change}%</span>
                         </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                         <button className="btn-enterprise-primary py-2 px-4 text-[9px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-all border border-primary/20 bg-primary/5 text-primary">
                            Trigger AI Sourcing
                         </button>
                      </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>

      </div>
    </div>
  );
}
