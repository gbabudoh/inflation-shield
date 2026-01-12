'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Shield, 
  LayoutDashboard, 
  Users, 
  TrendingUp, 
  Zap, 
  LogOut,
  Lock
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Initialize state based on whether we are on the client and have the identity
  const [authorized, setAuthorized] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isInitializing, setIsInitializing] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const ident = localStorage.getItem('shield_identity');
    const isAdmin = ident === 'admin1@shield-test.com';
    
    // Wrap in setTimeout to avoid synchronous cascading render error
    const timer = setTimeout(() => {
      setAuthorized(isAdmin);
      setIsInitializing(false);
      
      if (!isAdmin && pathname !== '/admin') {
        router.push('/admin');
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem('shield_identity');
    setAuthorized(false);
    window.location.href = '/admin';
  };

  // Prevent flash or redirect issues during hydration
  if (isInitializing) {
    return <div className="min-h-screen bg-[#0a0a0b]" />;
  }

  // If not authorized, we only show the main admin page (which has the login gate)
  if (!authorized) {
    return <main>{children}</main>;
  }

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'User Registry', href: '/admin/users', icon: Users },
    { name: 'Price Trends', href: '/admin/trends', icon: TrendingUp },
    { name: 'AI Sourcing', href: '/admin/sourcing', icon: Zap },
  ];

  return (
    <div className="flex h-screen bg-[#fbfbfb] text-secondary overflow-hidden">
      {/* Sidebar for Desktop */}
      <aside className={`bg-white border-r border-neutral-200 transition-all duration-300 ${sidebarOpen ? 'w-72' : 'w-20'} flex flex-col shadow-2xl shadow-neutral-200/50 z-20`}>
        {/* Sidebar Header */}
        <div className="h-24 flex items-center px-6 border-b border-neutral-100">
          <div className="w-10 h-10 bg-secondary rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-secondary/10">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          {sidebarOpen && (
            <div className="ml-4 animate-in fade-in duration-500">
              <span className="text-sm font-black tracking-tighter uppercase italic text-secondary">Shield.</span>
              <span className="block text-[8px] font-black text-primary uppercase tracking-[0.2em]">Governance</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`flex items-center p-4 rounded-2xl transition-all group ${
                  isActive 
                    ? 'bg-primary text-secondary font-black shadow-xl shadow-primary/20 scale-[1.02]' 
                    : 'text-neutral-400 hover:text-secondary hover:bg-neutral-50'
                }`}
              >
                <Icon className={`h-5 w-5 shrink-0 ${isActive ? 'text-secondary' : 'group-hover:scale-110 transition-transform'}`} />
                {sidebarOpen && <span className="ml-4 text-[10px] font-black uppercase tracking-[0.15em] animate-in fade-in slide-in-from-left-2 duration-300">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-neutral-100 space-y-2">
          <div className={`p-4 rounded-2xl bg-neutral-50/50 border border-neutral-100 flex items-center ${sidebarOpen ? 'justify-between' : 'justify-center'}`}>
            {sidebarOpen && (
              <div className="flex flex-col">
                <span className="text-[7px] font-black uppercase tracking-widest text-neutral-400">Node Cluster Alpha</span>
                <span className="text-[10px] font-bold text-secondary truncate max-w-[120px]">admin@shield.protocol</span>
              </div>
            )}
            <button 
              onClick={handleLogout}
              className="p-2 text-neutral-300 hover:text-danger-500 transition-colors"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-neutral-300 hover:text-secondary transition-all hover:bg-neutral-50"
          >
            {sidebarOpen ? 'Collapse' : '»'}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header/Topbar */}
        <header className="h-24 bg-white/95 backdrop-blur-xl border-b border-neutral-200 flex items-center justify-between px-8 z-10 shadow-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3 bg-success-500/5 px-4 py-2 rounded-full border border-success-500/10">
              <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse shadow-sm shadow-success-500"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-success-600">Protocol: Optimal</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
             <div className="flex flex-col items-end">
                <span className="text-[9px] font-black text-secondary uppercase tracking-widest">Signed Identity</span>
                <span className="text-[10px] font-bold text-primary italic">admin1@shield-test.com</span>
             </div>
             <div className="w-12 h-12 rounded-2xl bg-white border border-neutral-200 flex items-center justify-center shadow-sm">
                <Lock className="h-4 w-4 text-secondary/40" />
             </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {children}
        </div>
      </main>
    </div>
  );
}
