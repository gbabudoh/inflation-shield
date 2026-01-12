'use client';

import { useEffect, useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  ArrowUpRight, 
  ArrowDownRight,
  Info,
  DollarSign,
  Users,
  Activity,
  Globe,
  Shield
} from 'lucide-react';
import StatCard from '@/components/StatCard';
import { analyticsApi } from '@/lib/api';
import { DashboardStats, CategoryImpact, TrendingProduct } from '@/lib/types';

export default function AnalyticsPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [impactData, setImpactData] = useState<CategoryImpact[]>([]);
  const [trending, setTrending] = useState<TrendingProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Live Simulation State
  const [liveSavings, setLiveSavings] = useState(0);
  const [liveNodes, setLiveNodes] = useState(1240);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [statsRes, impactRes, trendingRes] = await Promise.all([
          analyticsApi.getDashboard(),
          analyticsApi.getPriceImpact(),
          analyticsApi.getTrending(5)
        ]);

        setStats(statsRes.data);
        setLiveSavings(statsRes.data.total_savings);
        setImpactData(impactRes.data.categories);
        setTrending(trendingRes.data.trending);
      } catch (err) {
        console.error('Failed to fetch analytics data:', err);
        setError('Failed to load analytics data. Please ensure the backend is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Live Oscillation
    const interval = setInterval(() => {
      setLiveSavings(prev => prev + (Math.random() * 5));
      setLiveNodes(prev => prev + (Math.random() > 0.8 ? 1 : 0));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="mesh-gradient min-h-screen pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
          <div className="h-12 w-64 bg-neutral-200 rounded-2xl mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            {[...Array(4)].map((_, i) => <div key={i} className="h-40 bg-neutral-200 rounded-[2.5rem]"></div>)}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="h-[500px] bg-neutral-200 rounded-[3rem]"></div>
            <div className="h-[500px] bg-neutral-200 rounded-[3rem]"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mesh-gradient min-h-screen flex items-center justify-center py-20 px-4">
        <div className="glass-card p-12 text-center max-w-lg">
          <div className="w-20 h-20 bg-danger-50 text-danger-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
            <Info className="h-10 w-10" />
          </div>
          <h2 className="text-3xl font-black text-secondary mb-4 tracking-tighter">System Offline</h2>
          <p className="text-secondary/60 mb-10 font-medium leading-relaxed">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-enterprise-primary w-full cursor-pointer"
          >
            Reconnect Protocol
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mesh-gradient min-h-screen pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Live Network Intelligence</span>
            </div>
            <h1 className="text-5xl sm:text-7xl font-black text-secondary tracking-tighter">
              PLATFORM <br />
              <span className="text-gradient underline decoration-primary/20 underline-offset-8">ANALYTICS.</span>
            </h1>
          </div>
          
          <div className="glass-card bg-white/40 border-white/60 p-5 rounded-3xl flex items-center space-x-6 backdrop-blur-3xl shadow-sm">
             <div className="flex items-center space-x-3">
               <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                 <Globe className="h-5 w-5 text-primary" />
               </div>
               <div>
                 <div className="text-[10px] font-black text-secondary/40 uppercase tracking-widest">Active Nodes</div>
                 <div className="text-lg font-black text-secondary leading-none">{liveNodes.toLocaleString()}</div>
               </div>
             </div>
             <div className="h-10 w-px bg-neutral-200"></div>
             <div className="flex items-center space-x-3">
               <div className="w-10 h-10 bg-success-50 rounded-xl flex items-center justify-center">
                 <Activity className="h-5 w-5 text-success-600" />
               </div>
               <div>
                 <div className="text-[10px] font-black text-secondary/40 uppercase tracking-widest">Network Load</div>
                 <div className="text-lg font-black text-secondary leading-none">12.4%</div>
               </div>
             </div>
          </div>
        </div>

        {/* Overview Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <StatCard
              title="Collective Savings"
              value={liveSavings}
              change={28.5}
              icon={DollarSign}
              iconColor="text-primary"
              isCurrency
            />
            <StatCard
              title="Verified Preorders"
              value={stats.total_preorders}
              icon={Users}
              iconColor="text-secondary"
            />
            <StatCard
              title="Active Campaigns"
              value={stats.active_campaigns}
              icon={Zap}
              iconColor="text-accent"
            />
            <StatCard
              title="Avg. Shield Rate"
              value={28.5}
              icon={ShieldCheck}
              iconColor="text-primary"
              isPercentage
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Category Impact Analysis */}
          <div className="glass-card p-10 bg-white/50 border-white/50 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full -mr-16 -mt-16"></div>
            
            <div className="flex items-center justify-between mb-12">
              <div>
                <h3 className="text-2xl font-black text-secondary tracking-tight">Inflation Defense</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Cross-category analysis</p>
              </div>
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>

            <div className="space-y-10">
              {impactData.map((data) => (
                <div key={data.category} className="relative group/item">
                  <div className="flex justify-between items-end mb-4">
                    <span className="font-black text-secondary tracking-tight">{data.category}</span>
                    <div className="flex space-x-4">
                      <div className="text-right">
                        <div className="text-[9px] uppercase font-black text-danger-500 tracking-widest mb-1">Impact</div>
                        <div className="text-sm font-black text-danger-600 flex items-center justify-end leading-none">
                          <ArrowUpRight className="h-3 w-3 mr-0.5" />
                          {data.avg_tariff_impact}%
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[9px] uppercase font-black text-success-500 tracking-widest mb-1">Protected</div>
                        <div className="text-sm font-black text-success-600 flex items-center justify-end leading-none">
                          <ArrowDownRight className="h-3 w-3 mr-0.5" />
                          {data.avg_savings}%
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="h-3 bg-neutral-100 rounded-full overflow-hidden flex shadow-inner border border-neutral-200/50">
                    <div 
                      className="h-full bg-danger-400 transition-all duration-1000 ease-out"
                      style={{ width: `${data.avg_tariff_impact}%` }}
                    ></div>
                    <div 
                      className="h-full bg-primary transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(243,214,112,0.5)]"
                      style={{ width: `${data.avg_savings}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Velocity */}
          <div className="glass-card p-10 bg-secondary text-white border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full -mr-32 -mt-32"></div>
            
            <div className="flex items-center justify-between mb-12">
              <div>
                <h3 className="text-2xl font-black text-white tracking-tight">Trending Velocity</h3>
                <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mt-1">High-demand clusters</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>

            <div className="space-y-6">
              {trending.map((item) => (
                <div key={item.id} className="group/item flex items-center justify-between p-5 rounded-[2rem] bg-white/5 border border-white/5 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center min-w-0">
                    <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center font-black text-secondary mr-5 shadow-lg shadow-primary/20 transform group-hover/item:scale-110 transition-transform">
                      {item.progress_percentage}%
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-black text-white truncate text-lg tracking-tight">{item.name}</h4>
                      <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">{item.current_preorders} Secure Nodes</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-primary leading-none">-{item.savings_percentage}%</div>
                    <div className="text-[9px] text-neutral-500 font-black uppercase tracking-widest mt-2">Yield</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Network Insights */}
        <div className="relative bg-secondary rounded-[4rem] p-16 overflow-hidden shadow-2xl border border-white/5">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.03] pointer-events-none"></div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
            <div className="lg:col-span-2">
              <div className="inline-flex items-center px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-primary mb-8">
                <Shield className="h-4 w-4 mr-2" />
                <span className="text-xs font-black uppercase tracking-widest">Protocol Insight</span>
              </div>
              <h3 className="text-3xl sm:text-5xl font-black text-white mb-8 tracking-tighter">
                SUPPLY CHAIN <span className="text-primary">OPTIMIZATION.</span>
              </h3>
              <p className="text-xl text-neutral-400 leading-relaxed font-medium">
                Our clusters indicate that electronics and domestic appliances are facing the highest inflation risk. 
                Securing bulk allocations now captures effective savings of <span className="text-white font-black underline decoration-primary underline-offset-4">18.4%</span> against retail projections.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-center p-10 rounded-[3rem] bg-white/5 backdrop-blur-3xl border border-white/10 shadow-2xl w-full group overflow-hidden relative">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative z-10">
                  <div className="text-5xl font-black text-primary tracking-tighter mb-2">
                    ${(liveSavings * 0.08).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                  <div className="text-xs font-black text-neutral-400 uppercase tracking-[0.2em]">Collective Yield <br /> Cycles Fixed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
