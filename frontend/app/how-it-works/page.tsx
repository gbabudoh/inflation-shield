'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Zap, 
  TrendingDown, 
  ArrowRight, 
  Lock, 
  Globe,
  Shield,
  Activity
} from 'lucide-react';

export default function HowItWorksPage() {
  const [shieldYield, setShieldYield] = useState(46.8);
  const [activeNodes, setActiveNodes] = useState(2402);

  useEffect(() => {
    const interval = setInterval(() => {
      setShieldYield(prev => {
        const next = prev + (Math.random() * 0.2 - 0.1);
        return parseFloat(next.toFixed(1));
      });
      setActiveNodes(prev => prev + (Math.random() > 0.7 ? 1 : 0));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const protocols = [
    {
      step: '01',
      title: 'Buying Group Aggregation',
      description: 'Synchronize with global procurement clusters to unlock high-velocity bulk pricing tiers usually reserved for industrial conglomerates.',
      icon: Users,
      accent: 'text-primary',
    },
    {
      step: '02',
      title: 'AI Price Lock Execution',
      description: 'Our proprietary algorithms intercept market signals to neutralize tariff volatility, locking in institutional rates before retail spikes.',
      icon: Lock,
      accent: 'text-accent',
    },
    {
      step: '03',
      title: 'Collective Arbitrage',
      description: 'Leverage our unified purchasing network to negotiate sovereign-level discounts with manufacturers and logistics partners.',
      icon: TrendingDown,
      accent: 'text-primary',
    },
    {
      step: '04',
      title: 'Shielded Fulfillment',
      description: 'Once quorum is reached, our logistics layer executes priority fulfillment, delivering protected assets directly to our network members.',
      icon: Globe,
      accent: 'text-secondary',
    },
  ];

  return (
    <div className="mesh-gradient min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-[50%] h-[500px] bg-primary/5 blur-[120px] rounded-full -mr-64 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-[30%] h-[300px] bg-accent/5 blur-[100px] rounded-full -ml-32 -mb-16"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
          <div className="inline-flex items-center px-4 py-2 rounded-xl bg-white border border-neutral-200 shadow-sm mb-12">
            <Activity className="h-4 w-4 mr-2 text-primary" />
            <span className="text-xs font-black uppercase tracking-widest text-secondary/60">Shield Strategy Protocol v3.0</span>
          </div>
          
          <h1 className="text-6xl sm:text-8xl font-black text-secondary mb-8 leading-[0.9] tracking-tighter">
            PROTECT YOUR <br />
            <span className="text-gradient underline decoration-primary/20 underline-offset-[12px]">PURCHASING POWER.</span>
          </h1>
          
          <p className="text-xl text-secondary/70 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
            Inflation Shield combines predictive AI clustering with institutional procurement algorithms 
            to neutralize retail price volatility.
          </p>
          
          <div className="flex justify-center gap-6">
            <Link href="/marketplace" className="btn-enterprise-primary px-10 py-4 cursor-pointer">
              Access Marketplace
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Protocol Stepper */}
      <section className="py-32 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-4 block">The Process</span>
            <h2 className="text-4xl sm:text-6xl font-black text-secondary tracking-tighter">
              COLLECTIVE <br />
              <span className="text-gradient">ARCHITECTURE.</span>
            </h2>
          </div>
          <p className="text-secondary/60 font-bold uppercase tracking-widest text-xs border-b-2 border-primary pb-2">
            Protocol Efficiency: 98.4%
          </p>
        </div>

        <div className="relative">
          {/* Vertical Line Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neutral-200 to-transparent"></div>
          
          <div className="space-y-32">
            {protocols.map((protocol, idx) => (
              <div key={idx} className={`flex flex-col lg:flex-row items-center gap-16 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="flex-1 w-full flex justify-center lg:justify-end lg:pr-16 text-right">
                  <div className={`hidden lg:block ${idx % 2 !== 0 ? 'text-left lg:pl-16 lg:pr-0' : ''}`}>
                    <span className="text-8xl font-black text-neutral-100/50 -mb-8 block leading-none select-none">
                      {protocol.step}
                    </span>
                    <h3 className="text-3xl font-black text-secondary mb-4 tracking-tight">{protocol.title}</h3>
                    <p className="text-lg text-secondary/60 leading-relaxed font-semibold max-w-md ml-auto">
                      {protocol.description}
                    </p>
                  </div>
                </div>

                {/* Central Icon */}
                <div className="relative z-10 flex-shrink-0">
                  <div className={`w-24 h-24 rounded-[2.5rem] bg-white border-4 border-neutral-50 shadow-2xl flex items-center justify-center ${protocol.accent}`}>
                    <protocol.icon className="h-10 w-10 transition-transform group-hover:scale-110" />
                  </div>
                  <div className="absolute inset-0 bg-primary/20 blur-3xl -z-10 rounded-full"></div>
                </div>

                <div className="flex-1 w-full lg:pl-16">
                  <div className="lg:hidden text-center">
                    <span className="text-6xl font-black text-neutral-100/50 mb-4 block leading-none">
                      {protocol.step}
                    </span>
                    <h3 className="text-2xl font-black text-secondary mb-3">{protocol.title}</h3>
                    <p className="text-secondary/60 leading-relaxed font-semibold">
                      {protocol.description}
                    </p>
                  </div>
                  
                  {/* Stats snippet for visual depth */}
                  <div className="mt-8 lg:mt-0 p-6 glass-card border-none shadow-sm inline-block">
                    <div className="flex items-center space-x-3">
                      <div className="w-1.5 h-1.5 bg-success-500 rounded-full animate-pulse"></div>
                      <span className="text-[10px] uppercase font-black tracking-widest text-secondary/40">Verified Node Cluster</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Performance Deep Dive */}
      <section className="py-32 bg-secondary text-white rounded-[4rem] mx-4 lg:mx-8 mb-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[100px] rounded-full -mr-48 -mt-48"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-primary mb-8">
                <Zap className="h-4 w-4 mr-2" />
                <span className="text-xs font-black uppercase tracking-widest">AI Cluster Analysis</span>
              </div>
              
              <h2 className="text-4xl sm:text-6xl font-black mb-8 tracking-tighter">
                PREDICTING VOLATILITY <br />
                <span className="text-primary italic">BEFORE</span> IT IMPACTS.
              </h2>
              
              <p className="text-xl text-neutral-400 mb-12 font-medium leading-relaxed">
                Our network clusters monitor satellite-derived commodity movements and sovereign trade declarations 
                daily to identify retail-level spikes up to 45 days in advance.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { label: 'Supply Chain Monitoring', icon: Globe },
                  { label: 'Tariff Prediction AI', icon: Shield },
                  { label: 'Bulk Negotiation Triggers', icon: TrendingDown },
                  { label: 'Logistics Optimization', icon: Zap }
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                    <item.icon className="h-5 w-5 text-primary" />
                    <span className="text-sm font-bold text-neutral-200">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="glass-card bg-white/5 border-white/10 p-12 relative">
              <div className="flex items-center justify-between mb-12">
                <h3 className="text-2xl font-black">Protocol Efficiency</h3>
                <div className="flex items-center space-x-2">
                   <span className="text-[10px] font-black uppercase tracking-widest text-primary">Live Data</span>
                   <Activity className="h-4 w-4 text-primary animate-pulse" />
                </div>
              </div>
              
              <div className="space-y-12">
                <div>
                  <div className="flex justify-between mb-4 text-xs font-black uppercase tracking-widest">
                    <span className="text-neutral-400">Projected Retail Spike</span>
                    <span className="text-danger-500">+114.2%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-danger-500 w-full shadow-[0_0_20px_rgba(239,68,68,0.3)]"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-4 text-xs font-black uppercase tracking-widest">
                    <span className="text-neutral-400">Shield Lock Variable</span>
                    <span className="text-primary">64.2% Reduction</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[64%] shadow-[0_0_20px_rgba(243,214,112,0.3)]"></div>
                  </div>
                </div>

                <div className="pt-12 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-5xl font-black text-primary tracking-tighter">-{shieldYield}%</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mt-2">Protected Yield</div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black text-neutral-200">{activeNodes.toLocaleString()}</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mt-2">Active Nodes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-48">
        <div className="relative bg-secondary rounded-[4rem] p-20 overflow-hidden shadow-2xl text-center border border-white/5">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.03] pointer-events-none"></div>
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-6xl font-black text-white mb-8 tracking-tighter">
              Ready to Activate <br />
              <span className="text-primary text-gradient">Institutional Defense?</span>
            </h2>
            <p className="text-xl text-neutral-400 mb-12 max-w-2xl mx-auto font-medium">
              Join the smart shoppers cluster and lock in institutional pricing before global trade changes forever.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/marketplace" className="btn-enterprise-primary px-12 py-5 text-xl text-secondary cursor-pointer">
                Launch Marketplace
              </Link>
              <Link href="/" className="btn-enterprise-secondary bg-transparent border-white/20 text-white hover:bg-white/10 px-12 py-5 text-xl cursor-pointer">
                System Overview
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
