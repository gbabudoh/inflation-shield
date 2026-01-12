'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { TrendingDown, Shield, Users, Zap, ArrowRight, DollarSign, BarChart3 } from 'lucide-react';
import Image from 'next/image';
import StatCard from '@/components/StatCard';
import ProductCard from '@/components/ProductCard';
import { productsApi, analyticsApi } from '@/lib/api';
import { Product, DashboardStats } from '@/lib/types';

export default function HomePage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  
  // Real-time Simulation State
  const [shieldYield, setShieldYield] = useState(42900);
  const [shieldRate, setShieldRate] = useState(42.1);
  const [tariffPrediction, setTariffPrediction] = useState(18.4);
  
  // Stats Section Simulation
  const [liveSavings, setLiveSavings] = useState(13440);
  const [liveVolume, setLiveVolume] = useState(450);
  
  useEffect(() => {
    // Fetch initial data
    analyticsApi.getDashboard().then(res => setStats(res.data));
    productsApi.getAll({ limit: 4 }).then(res => setTrendingProducts(res.data));

    // Live Simulation Interval
    const interval = setInterval(() => {
      setShieldYield(prev => prev + (Math.random() * 10 - 2));
      setShieldRate(prev => {
        const next = prev + (Math.random() * 0.4 - 0.2);
        return parseFloat(next.toFixed(1));
      });
      setTariffPrediction(prev => {
        const next = prev + (Math.random() * 0.2 - 0.1);
        return parseFloat(next.toFixed(1));
      });
      
      // Update stats section too
      setLiveSavings(prev => prev + (Math.random() * 5));
      setLiveVolume(prev => prev + (Math.random() > 0.8 ? 1 : 0));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mesh-gradient min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Static Background Accents */}
        <div className="absolute top-0 right-0 w-[50%] h-[500px] bg-primary/5 blur-[120px] rounded-full -mr-64 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-[30%] h-[300px] bg-accent/5 blur-[100px] rounded-full -ml-32 -mb-16"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="max-w-2xl">
              <h1 className="text-6xl sm:text-8xl font-black text-secondary mb-8 leading-[0.9] tracking-tighter">
                SHIELD YOUR <br />
                <span className="text-gradient">CAPITAL.</span>
              </h1>
              
              <p className="text-xl text-secondary/80 mb-10 leading-relaxed font-medium max-w-lg">
                Leverage high-velocity AI clusters and collective procurement 
                algorithms to neutralize inflation risks before they impact your bottom line.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5">
                <Link href="/marketplace" className="btn-enterprise-primary cursor-pointer">
                  Inquire Marketplace
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link href="/how-it-works" className="btn-enterprise-secondary cursor-pointer">
                  Protocol Details
                </Link>
              </div>

              <div className="mt-16 flex items-center space-x-8">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="relative w-10 h-10 rounded-full border-2 border-white bg-neutral-200 overflow-hidden shadow-sm">
                      <Image 
                        src={`https://i.pravatar.cc/100?u=${i}`} 
                        alt="user profile"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-primary flex items-center justify-center text-[10px] font-black text-secondary shadow-sm">
                    +2.4k
                  </div>
                </div>
                <div className="h-8 w-px bg-neutral-200"></div>
                <div>
                  <div className="text-sm font-black text-secondary">$240M+</div>
                  <div className="text-[10px] uppercase font-bold text-gray-400">Safeguarded Capital</div>
                </div>
              </div>
            </div>

            {/* Stable Hero Card */}
            <div className="hidden lg:block relative">
              <div className="absolute inset-0 bg-primary rounded-[3rem] blur-[80px] opacity-10"></div>
              <div className="relative glass-card p-12 rounded-[3.5rem] border-white/50 shadow-2xl bg-white/80">
                <div className="flex items-center justify-between mb-12">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                      <Zap className="h-7 w-7 text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-secondary">AI Price Lock</h3>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">Real-time optimization engine</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 bg-success-50 px-4 py-1.5 rounded-full">
                    <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-black text-success-600 uppercase tracking-widest">Live Syncing</span>
                  </div>
                </div>
                
                <div className="space-y-8 mb-12">
                  <div className="bg-neutral-50 p-6 rounded-[2rem] border border-neutral-100/50">
                    <div className="flex justify-between mb-4">
                      <span className="text-sm font-bold text-secondary/60">Global Tariff Volatility</span>
                      <span className="text-sm font-black text-danger-600">+{tariffPrediction}%</span>
                    </div>
                    <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                      <div className="h-full bg-danger-500 transition-all duration-1000" style={{ width: `${(tariffPrediction/30)*100}%` }}></div>
                    </div>
                  </div>
                  
                  <div className="bg-neutral-50 p-6 rounded-[2rem] border border-neutral-100/50">
                    <div className="flex justify-between mb-4">
                      <span className="text-sm font-bold text-secondary/60">Platform Shielding Rate</span>
                      <span className="text-sm font-black text-success-600">-{shieldRate}% Savings</span>
                    </div>
                    <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                      <div className="h-full bg-success-500 transition-all duration-1000 shadow-[0_0_10px_rgba(34,197,94,0.3)]" style={{ width: `${shieldRate}%` }}></div>
                    </div>
                  </div>
                </div>

                <div className="p-8 rounded-[2.5rem] bg-secondary text-white shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-gray-400">Total Capital Preserved</span>
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-4xl font-black text-primary tracking-tighter">
                      ${shieldYield.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <div className="mb-16">
          <h2 className="text-3xl font-black text-secondary tracking-tighter inline-flex items-center">
            <BarChart3 className="h-8 w-8 mr-3 text-primary" />
            Network Protocol Metrics
          </h2>
          <div className="h-1 w-20 bg-primary mt-2 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
            <StatCard
              title="Total Savings"
              value={liveSavings}
              change={28.5}
              icon={DollarSign}
              iconColor="text-primary"
              isCurrency
            />
          </div>
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
            <StatCard
              title="Procurement Volume"
              value={liveVolume}
              icon={Users}
              iconColor="text-secondary"
            />
          </div>
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
            <StatCard
              title="Shielded Clusters"
              value={stats?.total_products || 6}
              icon={Shield}
              iconColor="text-accent"
            />
          </div>
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-400">
            <StatCard
              title="Active Protocols"
              value={stats?.active_campaigns || 6}
              icon={Zap}
              iconColor="text-primary"
            />
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 bg-white rounded-[4rem] enterprise-shadow mb-32 border border-neutral-100">
        <div className="text-center mb-24">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-4 block">The Advantage</span>
          <h2 className="text-4xl sm:text-6xl font-black text-secondary tracking-tighter">
            PROACTIVE DEFENSE <br />
            <span className="text-gradient">FOR YOUR ASSETS.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="group">
            <div className="w-20 h-20 bg-neutral-50 rounded-[2.5rem] flex items-center justify-center mb-10 group-hover:bg-primary transition-colors duration-500 shadow-sm border border-neutral-100">
              <TrendingDown className="h-10 w-10 text-secondary transition-colors group-hover:text-white" />
            </div>
            <h3 className="text-2xl font-black text-secondary mb-4 tracking-tight">Predictive Arbitrage</h3>
            <p className="text-secondary/70 leading-relaxed font-medium">
              We leverage satellite data and trade cycle analysis to intercept price spikes up to 45 days before they reach retail markets.
            </p>
          </div>

          <div className="group">
            <div className="w-20 h-20 bg-neutral-50 rounded-[2.5rem] flex items-center justify-center mb-10 group-hover:bg-primary transition-colors duration-500 shadow-sm border border-neutral-100">
              <Users className="h-10 w-10 text-secondary transition-colors group-hover:text-white" />
            </div>
            <h3 className="text-2xl font-black text-secondary mb-4 tracking-tight">Collective Leverage</h3>
            <p className="text-secondary/70 leading-relaxed font-medium">
              Join ultra-high-velocity buying clusters to secure wholesale contract pricing usually reserved for Fortune 500 corporations.
            </p>
          </div>

          <div className="group">
            <div className="w-20 h-20 bg-neutral-50 rounded-[2.5rem] flex items-center justify-center mb-10 group-hover:bg-primary transition-colors duration-500 shadow-sm border border-neutral-100">
              <Shield className="h-10 w-10 text-secondary transition-colors group-hover:text-white" />
            </div>
            <h3 className="text-2xl font-black text-secondary mb-4 tracking-tight">Protocol Security</h3>
            <p className="text-secondary/70 leading-relaxed font-medium">
              Our triple-tier escrow and quality assurance protocols ensure that your procurement is safe, certified, and risk-neutral.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {trendingProducts.length > 0 && (
        <section className="bg-neutral-50 py-32 rounded-[4rem] border border-neutral-200/50 mx-4 lg:mx-8 mb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 gap-8">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-4 block">Current Opportunities</span>
                <h2 className="text-4xl sm:text-6xl font-black text-secondary tracking-tighter">
                  SHIELDED <br />
                  <span className="text-gradient">COMMODITIES.</span>
                </h2>
              </div>
              <Link href="/marketplace" className="btn-enterprise-primary cursor-pointer">
                Explore Full Directory
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {trendingProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Conversion Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="relative bg-secondary rounded-[4rem] p-16 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[100px] rounded-full -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 blur-[80px] rounded-full -ml-32 -mb-32"></div>
          
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-6xl font-black text-white mb-8 tracking-tighter">
              Ready to <span className="text-primary underline decoration-primary/30 underline-offset-8">Scale</span> Your Savings?
            </h2>
            <p className="text-xl text-neutral-400 mb-12 font-medium">
              Join the elite procurement network already protecting over $240M in collective purchasing power.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link href="/marketplace" className="btn-enterprise-primary px-12 py-5 text-xl text-[#686761] cursor-pointer">
                Get Started Now
              </Link>
              <Link href="/how-it-works" className="btn-enterprise-secondary bg-transparent border-white/20 text-white hover:bg-white/10 px-12 py-5 text-xl cursor-pointer">
                Talk to Protocol Expert
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}