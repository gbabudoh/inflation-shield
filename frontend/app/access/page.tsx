'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Shield, 
  ArrowRight, 
  Lock, 
  User, 
  Mail, 
  Phone,
  AlertCircle,
  Activity,
  Zap,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { authApi } from '@/lib/api';

export default function AccessPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    full_name: '',
    phone_number: ''
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await authApi.register(formData);
      localStorage.setItem('shield_identity', formData.email);
      setStep(3); // Success step
    } catch (err) {
      console.error('Registration failed:', err);
      setError('Registration failed. This email may already be registered or system is under maintenance.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mesh-gradient min-h-screen pt-32 pb-32 flex items-center justify-center p-4">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Brand & Visuals */}
        <div className="hidden lg:block space-y-12">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20">
              <Zap className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">Protocol v4.2 Activation</span>
            </div>
            <h1 className="text-6xl xl:text-8xl font-black text-secondary tracking-tighter uppercase leading-[0.8]">
              NETWORK <br />
              <span className="text-gradient">IDENTITY.</span>
            </h1>
            <p className="text-xl text-secondary/60 font-medium max-w-md leading-relaxed">
              Activate your institutional node to lock in collective arbitrage rates and shield your capital from global inflation.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="glass-card p-6 bg-secondary text-white border-white/5">
              <ShieldCheck className="h-8 w-8 text-primary mb-4" />
              <h4 className="font-black text-sm uppercase tracking-wide mb-2">Price Defense</h4>
              <p className="text-xs text-neutral-400 font-medium">Escrow-backed price locks active upon registration.</p>
            </div>
            <div className="glass-card p-6 bg-white/40 border-white">
              <Globe className="h-8 w-8 text-secondary mb-4" />
              <h4 className="font-black text-sm uppercase tracking-wide mb-2">Global Quorum</h4>
              <p className="text-xs text-secondary/60 font-medium">Join 12,000+ active nodes in the procurement network.</p>
            </div>
          </div>
        </div>

        {/* Right Side: Identity Form */}
        <div className="relative">
          {/* Progress Indicator */}
          <div className="absolute -top-12 left-0 right-0 flex justify-center space-x-3">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-500 ${step >= i ? 'w-12 bg-primary' : 'w-6 bg-neutral-200'}`}
              ></div>
            ))}
          </div>

          <div className="glass-card p-12 bg-white/60 border-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full"></div>
            
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-10">
                <div className="text-center">
                  <div className="w-20 h-20 bg-secondary rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <Mail className="h-10 w-10 text-primary" />
                  </div>
                  <h2 className="text-3xl font-black text-secondary tracking-tighter uppercase">Initiate Identity</h2>
                  <p className="text-secondary/60 font-medium text-sm mt-2">Enter your primary protocol email</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase text-secondary/40 tracking-[0.2em] ml-2">Identity Email</label>
                    <div className="relative">
                      <Mail className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary/40" />
                      <input 
                        type="email" 
                        placeholder="identity@protocol.xyz"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-white text-secondary border border-neutral-200 rounded-2xl py-5 pl-16 pr-6 focus:ring-2 focus:ring-primary/40 focus:border-transparent outline-none transition-all font-bold cursor-pointer"
                      />
                    </div>
                  </div>
                  <button 
                    onClick={() => formData.email && setStep(2)}
                    className="btn-enterprise-primary w-full py-5 text-lg tracking-tight shadow-xl flex items-center justify-center group cursor-pointer"
                  >
                    CONTINUE ACTIVATION
                    <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-2" />
                  </button>
                  <div className="text-center pt-4">
                    <p className="text-[10px] text-secondary/40 font-black uppercase tracking-widest">
                      Already have an identity? <Link href="/orders" className="text-primary hover:underline">Access Clusters</Link>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-10">
                <div className="text-center">
                  <div className="w-20 h-20 bg-secondary rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <User className="h-10 w-10 text-primary" />
                  </div>
                  <h2 className="text-3xl font-black text-secondary tracking-tighter uppercase">Details Sync</h2>
                  <p className="text-secondary/60 font-medium text-sm mt-2">Personalize your procurement node</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-8">
                  {error && (
                    <div className="bg-danger-50 text-danger-600 p-4 rounded-xl flex items-center text-xs font-bold border border-danger-100 italic">
                      <AlertCircle className="h-4 w-4 mr-2 shrink-0" />
                      {error}
                    </div>
                  )}

                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase text-secondary/40 tracking-[0.2em] ml-2">Legal Name</label>
                      <div className="relative">
                        <User className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary/40" />
                        <input 
                          type="text" 
                          placeholder="Institutional or Personal Name"
                          required
                          value={formData.full_name}
                          onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                          className="w-full bg-white text-secondary border border-neutral-200 rounded-2xl py-5 pl-16 pr-6 focus:ring-2 focus:ring-primary/40 focus:border-transparent outline-none transition-all font-bold cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase text-secondary/40 tracking-[0.2em] ml-2">Secure Link (Phone)</label>
                      <div className="relative">
                        <Phone className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary/40" />
                        <input 
                          type="tel" 
                          placeholder="+1 (555) 000-0000"
                          value={formData.phone_number}
                          onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
                          className="w-full bg-white text-secondary border border-neutral-200 rounded-2xl py-5 pl-16 pr-6 focus:ring-2 focus:ring-primary/40 focus:border-transparent outline-none transition-all font-bold cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button 
                      type="button"
                      onClick={() => setStep(1)}
                      className="btn-enterprise-secondary py-5 flex-1 text-sm tracking-widest cursor-pointer"
                    >
                      BACK
                    </button>
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="btn-enterprise-primary py-5 flex-[2] text-sm tracking-widest shadow-xl cursor-pointer disabled:opacity-50"
                    >
                      {loading ? 'SYNCING...' : 'REGISTER IDENTITY'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {step === 3 && (
              <div className="animate-in zoom-in duration-500 space-y-12 text-center py-8">
                <div className="relative w-32 h-32 mx-auto">
                    <div className="absolute inset-0 bg-success-500/20 blur-3xl animate-pulse rounded-full"></div>
                    <div className="relative z-10 w-full h-full bg-success-50 rounded-[3rem] flex items-center justify-center shadow-2xl border-2 border-success-200">
                      <ShieldCheck className="h-16 w-16 text-success-600" />
                    </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-4xl font-black text-secondary tracking-tighter uppercase">Activated.</h2>
                  <p className="text-secondary/60 font-medium leading-relaxed max-w-xs mx-auto">
                    Your Registered Network Identity is now live. You are cleared for high-velocity capital shielding.
                  </p>
                </div>

                <div className="space-y-4">
                  <Link href="/marketplace" className="btn-enterprise-primary w-full py-5 block tracking-widest shadow-xl cursor-pointer">
                    COMMENCE SAVING
                  </Link>
                  <button 
                    onClick={() => router.push('/orders')}
                    className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary/40 hover:text-primary transition-colors cursor-pointer"
                  >
                    View Initial Node Order
                  </button>
                </div>

                <div className="pt-8 border-t border-neutral-100 flex items-center justify-center space-x-6 text-[10px] font-black uppercase tracking-widest text-secondary/30">
                  <span className="flex items-center"><Activity className="h-3 w-3 mr-2 text-success-500" /> Node Verified</span>
                  <span className="flex items-center"><Lock className="h-3 w-3 mr-2" /> TLS 1.3 Secure</span>
                </div>
              </div>
            )}

          </div>

          {/* Security Badge */}
          <div className="mt-8 flex items-center justify-center space-x-4">
            <Shield className="h-5 w-5 text-secondary/20" />
            <p className="text-[10px] text-secondary/40 font-bold uppercase tracking-widest leading-none">
              All identities are encrypted and stored on-protocol. <br />
              Inflation Shield adheres to ISO 27001 data standards.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
