'use client';

import { useState, useEffect } from 'react';
import { 
  Zap, 
  Shield,
  Users,
  TrendingUp,
  Activity,
  Database,
  Lock
} from 'lucide-react';

export default function AdminDashboard() {
  const [authorized, setAuthorized] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const ident = localStorage.getItem('shield_identity');
    const timer = setTimeout(() => {
      if (ident === 'admin1@shield-test.com') {
        setAuthorized(true);
      }
      setIsInitializing(false);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin1@shield-test.com' && password === 'admin123test') {
      localStorage.setItem('shield_identity', email);
      setAuthorized(true);
      setError('');
      window.location.reload();
    } else {
      setError('ACCESS DENIED: Invalid Administrative Credentials');
    }
  };

  if (isInitializing) return null;

  if (!authorized) {
    return (
      <div className="mesh-gradient min-h-screen flex items-center justify-center p-4">
        <div className="glass-card p-12 max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-secondary rounded-2xl flex items-center justify-center mx-auto shadow-2xl">
            <Lock className="h-10 w-10 text-primary" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-black text-secondary tracking-tighter uppercase">Vault Lock</h1>
            <p className="text-[10px] font-black uppercase tracking-widest text-secondary/40">Enter Protocol Security PIN</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ADMIN IDENTITY"
                className="w-full bg-white/50 border border-neutral-200 px-6 py-4 rounded-2xl font-mono text-center text-sm text-secondary focus:outline-none focus:border-primary transition-all shadow-inner"
                required
              />
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="PROTECTION KEY"
                className="w-full bg-white/50 border border-neutral-200 px-6 py-4 rounded-2xl font-mono text-center text-secondary focus:outline-none focus:border-primary transition-all shadow-inner"
                required
              />
              {error && (
                <div className="text-danger-500 text-[9px] font-black uppercase tracking-widest bg-danger-50 py-2 rounded-lg">
                  {error}
                </div>
              )}
            </div>
            
            <button className="btn-enterprise-primary w-full py-5 text-xs font-black tracking-widest shadow-2xl group">
              ACTIVATE GOVERNANCE
              <Zap className="ml-2 h-4 w-4 inline-block group-hover:animate-pulse" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 lg:p-12 text-secondary">
      <div className="max-w-6xl mx-auto">
        
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="space-y-4">
            <h1 className="text-5xl font-black text-secondary tracking-tighter leading-none uppercase">
              Administrative <br />
              <span className="text-primary">Governance</span>
            </h1>
            <p className="max-w-md text-xs font-black uppercase tracking-[0.2em] text-secondary/40 leading-relaxed">
              Global Procurement Protocol & AI Sourcing Control Center
            </p>
          </div>

          <div className="flex items-center space-x-6">
             <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-primary uppercase">Identity Verified</span>
                <span className="text-[11px] font-bold text-secondary italic">admin1@shield-test.com</span>
             </div>
             <div className="w-16 h-16 rounded-full bg-white border border-neutral-200 flex items-center justify-center shadow-lg">
                <Shield className="h-8 w-8 text-primary" />
             </div>
          </div>
        </div>

        {/* Global Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
           {[
             { label: 'Activated Capital', val: '₦1.24M', delta: '+12.4%', icon: Database, color: 'text-secondary' },
             { label: 'Active Clusters', val: '42', delta: '+8 New', icon: Zap, color: 'text-primary' },
             { label: 'Participant Nodes', val: '852', delta: '+12%', icon: Users, color: 'text-secondary' },
             { label: 'Inflation Shield Alpha', val: '24.2%', delta: 'Optimal', icon: TrendingUp, color: 'text-success-500' }
           ].map((stat, i) => (
             <div key={i} className="bg-white border border-neutral-200 p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-neutral-200/40 transition-all duration-500 group border-b-4 border-b-transparent hover:border-b-primary">
                <div className="flex justify-between items-start mb-6">
                   <div className="p-3 bg-neutral-50 rounded-2xl group-hover:bg-primary/10 transition-colors border border-neutral-100">
                      <stat.icon className={`h-5 w-5 ${stat.color} opacity-40 group-hover:opacity-100 transition-opacity`} />
                   </div>
                   <span className="text-[9px] font-black uppercase tracking-widest text-neutral-300 font-mono">Real-Time</span>
                </div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-secondary/40 mb-2">{stat.label}</h3>
                <div className="flex items-baseline space-x-3">
                   <span className="text-3xl font-black text-secondary tracking-tighter">{stat.val}</span>
                   <span className={`text-[10px] font-black font-mono px-2 py-0.5 rounded-full ${stat.delta.includes('+') ? 'bg-success-500/10 text-success-600' : 'bg-primary/10 text-primary-600'}`}>{stat.delta}</span>
                </div>
             </div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
           {/* Governance Activity */}
           <div className="lg:col-span-2 space-y-8">
              <div className="flex items-center justify-between mb-4">
                 <h2 className="text-xs font-black uppercase tracking-[0.2em] text-secondary flex items-center space-x-3">
                    <Activity className="h-4 w-4 text-primary" />
                    <span>Recent Governance Events</span>
                 </h2>
                 <button className="text-[9px] font-black text-primary uppercase tracking-widest hover:underline px-4 py-2 bg-primary/5 rounded-full border border-primary/10">Audit Log</button>
              </div>
              <div className="space-y-4">
                 {[
                   { event: 'Cluster SC-14 Activated', time: '12m ago', status: 'success' },
                   { event: 'AI Node proposal #822 Received', time: '45m ago', status: 'neutral' },
                   { event: 'Price Threshold Alert: Maize (Nigeria)', time: '2h ago', status: 'warning' }
                 ].map((ev, i) => (
                   <div key={i} className="bg-white border border-neutral-200 p-6 rounded-3xl flex items-center justify-between shadow-sm hover:shadow-md transition-all cursor-pointer group">
                      <div className="flex items-center space-x-4">
                         <div className={`w-2.5 h-2.5 rounded-full shadow-inner ${ev.status === 'success' ? 'bg-success-500' : ev.status === 'warning' ? 'bg-danger-500' : 'bg-primary'}`}></div>
                         <span className="text-[11px] font-bold text-secondary group-hover:text-primary transition-colors">{ev.event}</span>
                      </div>
                      <span className="text-[9px] font-black text-secondary/30 uppercase font-mono">{ev.time}</span>
                   </div>
                 ))}
              </div>
           </div>

           {/* System Health */}
           <div className="bg-secondary rounded-[2.5rem] p-10 text-white shadow-2xl shadow-secondary/20 flex flex-col justify-between overflow-hidden relative group">
              <div className="absolute -right-12 -top-12 w-48 h-48 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-all"></div>
              <div className="relative z-10">
                 <h2 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-8">Node Infrastructure</h2>
                 <div className="space-y-6">
                    <div>
                       <div className="flex justify-between text-[10px] font-black uppercase mb-3 text-white/60">
                          <span>Shield Coverage</span>
                          <span>88%</span>
                       </div>
                       <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-primary w-[88%] shadow-lg shadow-primary/40 animate-pulse"></div>
                       </div>
                    </div>
                    <div>
                       <div className="flex justify-between text-[10px] font-black uppercase mb-3 text-white/60">
                          <span>Alpha Coefficient</span>
                          <span>92%</span>
                       </div>
                       <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-success-500 w-[92%] shadow-lg shadow-success-500/40"></div>
                       </div>
                    </div>
                 </div>
              </div>
              <div className="relative z-10 pt-12">
                 <button className="w-full py-4 bg-white/10 hover:bg-white text-white hover:text-secondary text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all border border-white/5 shadow-xl">
                    Global System Audit
                 </button>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
