'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  ShieldCheck, 
  ShieldAlert,
  ArrowUpRight,
  Database,
  Mail
} from 'lucide-react';
import { api } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';

interface AdminUser {
  id: number;
  email: string;
  full_name: string | null;
  phone_number: string | null;
  is_active: boolean;
  order_count: number;
  total_spent: number;
}

export default function UserRegistry() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/admin/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Failed to fetch user registry:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleStatus = async (id: number) => {
    try {
      await api.patch(`/api/admin/users/${id}/toggle-status`);
      fetchUsers();
    } catch (err) {
      console.error('Failed to toggle user status:', err);
    }
  };

  const filteredUsers = users.filter(u => 
    u.email.toLowerCase().includes(search.toLowerCase()) || 
    u.full_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 lg:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-secondary tracking-tighter uppercase">User Registry</h1>
            <p className="text-[10px] font-black uppercase tracking-widest text-secondary/40">Protocol-Activated procurement identities</p>
          </div>

          <div className="flex items-center space-x-4">
             <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary/20" />
                <input 
                  type="text"
                  placeholder="Search identities..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-white border border-neutral-200 rounded-2xl py-3 pl-12 pr-6 text-sm text-secondary placeholder:text-neutral-300 focus:outline-none focus:border-primary/50 transition-all w-64 lg:w-80 shadow-sm"
                />
             </div>
             <button className="p-3 bg-white border border-neutral-200 rounded-2xl text-secondary/40 hover:text-secondary transition-colors shadow-sm">
                <Filter className="h-5 w-5" />
             </button>
          </div>
        </div>

        {/* User Table */}
        <div className="bg-white border border-neutral-200 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-neutral-200/50">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-neutral-100 bg-neutral-50/50">
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-secondary">Identity</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-secondary">Status</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-secondary">Procurement Stats</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-secondary">Economic Value</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-secondary text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center">
                       <Database className="h-8 w-8 text-primary animate-pulse mx-auto mb-4" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-secondary/20">Syncing Registry...</span>
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-neutral-50/50 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center space-x-4">
                           <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-black uppercase">
                              {user.email[0]}
                           </div>
                           <div className="flex flex-col">
                              <span className="text-sm font-black text-secondary">{user.full_name || 'Anonymous Node'}</span>
                              <div className="flex items-center space-x-2 text-[10px] text-secondary/40 font-medium">
                                 <Mail className="h-3 w-3" />
                                 <span>{user.email}</span>
                              </div>
                           </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border ${user.is_active ? 'bg-success-500/10 border-success-500/20 text-success-500' : 'bg-danger-500/10 border-danger-500/20 text-danger-500'} text-[9px] font-black uppercase tracking-widest`}>
                           {user.is_active ? <ShieldCheck className="h-3 w-3" /> : <ShieldAlert className="h-3 w-3" />}
                           <span>{user.is_active ? 'Active' : 'Locked'}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                         <div className="flex flex-col">
                            <span className="text-sm font-black text-secondary">{user.order_count}</span>
                            <span className="text-[9px] text-secondary/20 font-black uppercase">Active Clusters</span>
                         </div>
                      </td>
                      <td className="px-8 py-6">
                         <div className="flex flex-col">
                            <span className="text-sm font-black text-primary">{formatCurrency(user.total_spent)}</span>
                            <span className="text-[9px] text-secondary/20 font-black uppercase">Escrowed Value</span>
                         </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                         <div className="flex items-center justify-end space-x-2">
                            <button 
                              onClick={() => toggleStatus(user.id)}
                              className={`p-2 rounded-lg border border-neutral-100 ${user.is_active ? 'text-danger-500 hover:bg-danger-500/10' : 'text-success-500 hover:bg-success-500/10'} transition-all`}
                              title={user.is_active ? 'Freeze Identity' : 'Restore Identity'}
                            >
                               <ShieldAlert className="h-4 w-4" />
                            </button>
                            <button className="p-2 rounded-lg border border-neutral-100 text-secondary/40 hover:text-secondary hover:bg-neutral-50 transition-all">
                               <ArrowUpRight className="h-4 w-4" />
                            </button>
                         </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
