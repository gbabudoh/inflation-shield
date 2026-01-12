'use client';

import { useState, useEffect } from 'react';
import { 
  Zap, 
  TrendingUp,
  RefreshCw, 
  CheckCircle2, 
  XSquare,
  AlertCircle,
  Database,
  Cpu
} from 'lucide-react';
import { productsApi, sourcingApi } from '@/lib/api';
import { Product } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';

export default function AISourcingBoard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sourcing, setSourcing] = useState(false);
  const [message, setMessage] = useState('');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await productsApi.getAll();
      // Filter for AI sourced products only
      setProducts(res.data.filter((p: Product) => p.sourced_from === 'ai_finder' || (p.description?.includes('AI Sourced') ?? false)));
    } catch (err) {
      console.error('Failed to fetch sourcing data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const triggerSourcing = async () => {
    try {
      setSourcing(true);
      setMessage('AI Node activating... Scanning global supply chains...');
      await sourcingApi.findDeals();
      await fetchProducts();
      setMessage('Scan Complete: New arbitrage opportunities detected.');
    } catch (err) {
      console.error('Sourcing activation failed:', err);
      setMessage('Critical: AI Node connection timeout.');
    } finally {
      setTimeout(() => setSourcing(false), 2000);
      setTimeout(() => setMessage(''), 5000);
    }
  };

  const approveDeal = async (id: number) => {
    try {
      await sourcingApi.approveDeal(id);
      fetchProducts();
    } catch (err) {
      console.error('Deal activation failed:', err);
    }
  };

  return (
    <div className="p-8 lg:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-12 mb-12">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
               <div className="p-2 bg-primary/10 rounded-lg">
                  <Cpu className="h-5 w-5 text-primary" />
               </div>
               <h1 className="text-4xl font-black text-secondary tracking-tighter uppercase">AI Sourcing Board</h1>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-secondary/40">Autonomous Arbitrage Discovery Engine</p>
          </div>

          <button 
            onClick={triggerSourcing}
            disabled={sourcing}
            className={`btn-enterprise-primary py-5 px-8 rounded-2xl flex items-center space-x-4 border-2 border-primary group relative overflow-hidden ${sourcing ? 'opacity-50 cursor-wait' : ''}`}
          >
            {sourcing ? (
              <RefreshCw className="h-5 w-5 animate-spin" />
            ) : (
              <Zap className="h-5 w-5 group-hover:animate-pulse" />
            )}
            <span className="text-xs font-black tracking-widest">TRIGGER AI SEARCH</span>
          </button>
        </div>

        {message && (
          <div className="mb-8 p-4 bg-primary/5 border border-primary/20 rounded-2xl flex items-center space-x-4 animate-in fade-in slide-in-from-top-4 duration-500">
             <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
             <span className="text-[9px] font-black text-primary uppercase tracking-widest">{message}</span>
          </div>
        )}

        {/* Pending Deals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           {loading ? (
             <div className="col-span-full py-32 text-center">
                <Database className="h-12 w-12 text-secondary/10 mx-auto mb-6 animate-bounce" />
                <span className="text-[10px] font-black uppercase tracking-widest text-secondary/20">Syncing AI Repository...</span>
             </div>
           ) : products.length === 0 ? (
             <div className="col-span-full bg-white border border-neutral-100 p-20 rounded-[3rem] text-center">
                <AlertCircle className="h-16 w-16 text-neutral-100 mx-auto mb-8" />
                <h3 className="text-xl font-black text-secondary uppercase tracking-tight mb-2">No Active AI Proposals</h3>
                <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-widest">Trigger a new search to discover arbitrage opportunities.</p>
             </div>
           ) : (
             products.map((deal) => (
               <div key={deal.id} className="bg-white border border-neutral-200 p-10 rounded-[3rem] shadow-xl shadow-neutral-200/40 flex flex-col justify-between group hover:border-primary/50 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors"></div>
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-10">
                       <span className="px-4 py-2 bg-secondary text-primary text-[9px] font-black uppercase tracking-[0.2em] rounded-xl shadow-lg shadow-black/5">
                          {deal.category}
                       </span>
                       <div className="flex items-center space-x-2 px-3 py-1.5 bg-danger-500/5 border border-danger-500/10 rounded-full">
                          <TrendingUp className="h-4 w-4 text-danger-500" />
                          <span className="text-[10px] font-black text-danger-600 uppercase tracking-widest">{deal.savings_percentage}% Alpha</span>
                       </div>
                    </div>
                    
                    <h3 className="text-3xl font-black text-secondary tracking-tighter leading-none mb-6 group-hover:text-primary transition-colors">{deal.name}</h3>
                    <p className="text-[11px] font-bold text-secondary/50 uppercase tracking-wider leading-relaxed mb-10 max-w-[280px]">
                       Optimized arbitrage node activation for sub-saharan logistics hubs via cluster logic.
                    </p>

                    <div className="grid grid-cols-2 gap-6 p-8 bg-neutral-50/50 border border-neutral-100 rounded-[2rem] mb-12">
                       <div className="flex flex-col">
                          <span className="text-[9px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-2">Retail Delta</span>
                          <span className="text-xl font-bold text-secondary/30 line-through decoration-danger-500/30 font-mono italic">{formatCurrency(deal.retail_price)}</span>
                       </div>
                       <div className="flex flex-col">
                          <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em] mb-2">Protocol Lock</span>
                          <span className="text-2xl font-black text-secondary font-mono tracking-tighter">{formatCurrency(deal.group_buy_price)}</span>
                       </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 relative z-10">
                     <button 
                       onClick={() => approveDeal(deal.id)}
                       className="flex-1 bg-primary hover:bg-white border-2 border-primary text-secondary py-6 rounded-[1.5rem] flex items-center justify-center space-x-4 shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] active:scale-95 transition-all group/btn"
                     >
                        <CheckCircle2 className="h-5 w-5 group-hover/btn:scale-110 transition-transform" />
                        <span className="text-[12px] font-black tracking-[0.15em] uppercase">Activate Protocol</span>
                     </button>
                     <button className="p-6 bg-white border border-neutral-200 rounded-[1.5rem] text-neutral-300 hover:text-danger-500 hover:border-danger-500/20 hover:bg-danger-500/5 transition-all group/reject shadow-sm">
                        <XSquare className="h-6 w-6 group-hover/reject:rotate-90 transition-transform" />
                     </button>
                  </div>
               </div>
             ))
           )}
        </div>
      </div>
    </div>
  );
}
