'use client';

import Link from 'next/link';
import { ShoppingCart, BarChart3, Menu, X, Shield, Activity } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [identity, setIdentity] = useState<string | null>(null);

  useEffect(() => {
    // Initializing identity from localStorage
    const saved = localStorage.getItem('shield_identity');
    if (saved) {
      setTimeout(() => setIdentity(saved), 0);
    }
  }, []);

  const handleDisconnect = () => {
    localStorage.removeItem('shield_identity');
    setIdentity(null);
    window.location.href = '/';
  };

  return (
    <header className="sticky top-0 z-50 glass-card border-b border-neutral-200">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-all duration-500 shadow-xl">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-black text-secondary tracking-tighter uppercase italic">Shield.</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <Link href="/marketplace" className="text-secondary-500 hover:text-black font-semibold transition-all hover:scale-105">
              Marketplace
            </Link>
            <Link href="/how-it-works" className="text-secondary-500 hover:text-black font-semibold transition-all hover:scale-105">
              How It Works
            </Link>
            <Link href="/analytics" className="flex items-center space-x-1 text-secondary-500 hover:text-black font-semibold transition-all hover:scale-105">
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </Link>
            {!identity && (
              <Link href="/access" className="text-secondary-500 hover:text-black font-semibold transition-all hover:scale-105">
                Protocol Access
              </Link>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {identity ? (
              <div className="flex items-center space-x-4">
                <div className="flex flex-col items-end mr-2">
                  <span className="text-[8px] font-black uppercase tracking-widest text-secondary/40">Active Node</span>
                  <span className="text-[10px] font-bold text-secondary truncate max-w-[120px]">{identity}</span>
                </div>
                {identity === 'admin1@shield-test.com' && (
                  <Link href="/admin">
                    <button className="text-[10px] font-black uppercase tracking-widest text-secondary/40 hover:text-primary transition-colors cursor-pointer mr-2">
                      Admin
                    </button>
                  </Link>
                )}
                <Link href="/orders">
                  <button className="btn-enterprise-secondary text-sm px-6 cursor-pointer">
                    Dashboard
                  </button>
                </Link>
                <button 
                  onClick={handleDisconnect}
                  className="p-2 text-secondary/40 hover:text-danger-500 transition-colors cursor-pointer"
                  title="Disconnect Identity"
                >
                  <Activity className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <>
                <Link href="/orders">
                  <button className="btn-enterprise-secondary text-sm px-6 cursor-pointer">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    My Orders
                  </button>
                </Link>
                <Link href="/access">
                  <button className="btn-enterprise-primary text-sm px-6 cursor-pointer">
                    Start Saving
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-neutral-100 text-secondary-500"
          >
            {identity && !mobileMenuOpen && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-white animate-pulse"></div>
            )}
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-6 space-y-4 border-t border-neutral-100 animate-in fade-in slide-in-from-top-4 duration-300">
            <Link
              href="/marketplace"
              className="block py-3 px-4 rounded-xl hover:bg-neutral-100 text-secondary-500 font-bold"
            >
              Marketplace
            </Link>
            <Link
              href="/how-it-works"
              className="block py-3 px-4 rounded-xl hover:bg-neutral-100 text-secondary-500 font-bold"
            >
              How It Works
            </Link>
            <Link
              href="/analytics"
              className="block py-3 px-4 rounded-xl hover:bg-neutral-100 text-secondary-500 font-bold"
            >
              Analytics
            </Link>
            {!identity && (
              <Link
                href="/access"
                className="block py-3 px-4 rounded-xl hover:bg-neutral-100 text-primary font-bold"
              >
                Protocol Access
              </Link>
            )}
            
            <div className="pt-4 space-y-3 px-4">
              {identity ? (
                <>
                  <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-2xl mb-4">
                    <div className="flex flex-col">
                      <span className="text-[8px] font-black uppercase tracking-widest text-secondary/40">Active Node</span>
                      <span className="text-[10px] font-bold text-secondary truncate max-w-[200px]">{identity}</span>
                    </div>
                    <button onClick={handleDisconnect} className="text-danger-500 text-xs font-bold uppercase tracking-wider">
                      Exit Node
                    </button>
                  </div>
                  {identity === 'admin1@shield-test.com' && (
                    <Link href="/admin" className="block mb-2">
                      <button className="w-full py-3 rounded-xl border border-neutral-200 text-secondary/60 text-[10px] font-black uppercase tracking-widest hover:bg-neutral-50 transition-colors cursor-pointer">
                        Governance Console
                      </button>
                    </Link>
                  )}
                  <Link href="/orders" className="block">
                    <button className="btn-enterprise-primary w-full cursor-pointer">Go to Dashboard</button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/orders" className="block">
                    <button className="btn-enterprise-secondary w-full cursor-pointer">My Orders</button>
                  </Link>
                  <Link href="/access" className="block">
                    <button className="btn-enterprise-primary w-full cursor-pointer">Start Saving</button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}