'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShoppingBag, 
  Shield,
  Users, 
  Clock, 
  AlertCircle,
  Package,
  Search,
  Lock,
  ArrowBigUpDash
} from 'lucide-react';
import { preordersApi, productsApi } from '@/lib/api';
import { Product } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';

interface OrderWithProduct {
  id: number;
  product_id: number;
  quantity: number;
  price_locked: number;
  status: string;
  product: Product;
}

export default function OrdersPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<OrderWithProduct[]>([]);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-fetch if identity exists
  useEffect(() => {
    const savedIdentity = localStorage.getItem('shield_identity');
    if (savedIdentity) {
      setEmail(savedIdentity);
      // Using a short timeout to ensure the state is set before calling fetch
      setTimeout(() => {
        // Use the function directly with the saved value since setEmail is async
        const fetchSaved = async () => {
          try {
            setLoading(true);
            const res = await preordersApi.getByUser(savedIdentity);
            const preordersData = res.data;
            const ordersWithDetails = await Promise.all(
              preordersData.map(async (order: { product_id: number; id: number; quantity: number; price_locked: number; status: string }) => {
                const productRes = await productsApi.getById(order.product_id);
                return { ...order, product: productRes.data };
              })
            );
            setOrders(ordersWithDetails);
            setSearched(true);
          } catch (err) {
            console.error('Auto-fetch failed:', err);
          } finally {
            setLoading(false);
          }
        };
        fetchSaved();
      }, 100);
    }
  }, []);

  const fetchOrders = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!email) return;

    try {
      setLoading(true);
      setError(null);
      const res = await preordersApi.getByUser(email);
      const preordersData = res.data;

      // Fetch product details for each preorder
      const ordersWithDetails = await Promise.all(
        preordersData.map(async (order: { product_id: number; id: number; quantity: number; price_locked: number; status: string }) => {
          const productRes = await productsApi.getById(order.product_id);
          return { ...order, product: productRes.data };
        })
      );

      setOrders(ordersWithDetails);
      setSearched(true);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
      setError('Unable to retrieve your procurement clusters. Please check your identity and try again.');
    } finally {
      setLoading(false);
    }
  };

  const totalCapitalShielded = orders.reduce((acc, order) => {
    const savings = (order.product.retail_price - order.price_locked) * order.quantity;
    return acc + savings;
  }, 0);

  return (
    <div className="mesh-gradient min-h-screen pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {!searched ? (
          /* Identity Portal */
          <div className="max-w-xl mx-auto py-20">
            <div className="glass-card p-12 bg-white/60 border-white relative overflow-hidden text-center">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full"></div>
              <div className="w-20 h-20 bg-secondary rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-2xl">
                <Lock className="h-10 w-10 text-primary" />
              </div>
              
              <h1 className="text-4xl font-black text-secondary tracking-tighter mb-4 uppercase">Identity Portal</h1>
              <p className="text-secondary/60 font-medium mb-12">Enter your registered network identity to access your active procurement clusters.</p>
              
              <form onSubmit={fetchOrders} className="space-y-6">
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary/40" />
                  <input 
                    type="email" 
                    placeholder="identity@protocol.xyz"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white text-secondary border border-neutral-200 rounded-2xl py-5 pl-16 pr-6 focus:ring-2 focus:ring-primary/40 focus:border-transparent outline-none transition-all font-bold cursor-pointer"
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn-enterprise-primary w-full py-5 text-lg tracking-tight shadow-xl cursor-pointer disabled:opacity-50"
                >
                  {loading ? 'AUTHENTICATING...' : 'ACCESS CLUSTERS'}
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Active Clusters Dashboard */
          <div className="space-y-16">
            {/* Error Message */}
            {error && (
              <div className="bg-danger-50 border border-danger-200 text-danger-600 p-6 rounded-2xl flex items-center space-x-4 mb-12">
                <AlertCircle className="h-6 w-6" />
                <p className="font-bold">{error}</p>
              </div>
            )}

            {/* Header / Stats Overlay */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
              <div className="space-y-4">
                <button 
                  onClick={() => setSearched(false)}
                  className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/40 hover:text-primary transition-colors flex items-center cursor-pointer"
                >
                  <Search className="h-3 w-3 mr-2" /> Change Identity
                </button>
                <h1 className="text-5xl sm:text-7xl font-black text-secondary tracking-tighter uppercase leading-[0.8] mb-2">
                  Procurement <br />
                  <span className="text-gradient">Clusters.</span>
                </h1>
                <p className="text-secondary/60 font-medium max-w-md">
                  Active monitoring of your capital preservation across {orders.length} institutional buying nodes.
                </p>
              </div>

              <div className="glass-card p-10 bg-secondary text-white border-white/5 relative overflow-hidden min-w-[320px]">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 blur-3xl rounded-full"></div>
                <div className="relative z-10">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-4 block">Net Capital Preserved</span>
                  <div className="text-5xl font-black tracking-tighter mb-2">{formatCurrency(totalCapitalShielded)}</div>
                  <div className="flex items-center space-x-2 text-xs font-bold text-neutral-400">
                    <ArrowBigUpDash className="h-4 w-4 text-primary" />
                    <span>Real-time Shield Value</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Orders List */}
            {orders.length === 0 ? (
              <div className="glass-card p-20 bg-white/40 border-dashed border-neutral-200 text-center">
                <ShoppingBag className="h-16 w-16 text-neutral-200 mx-auto mb-6" />
                <h3 className="text-2xl font-black text-secondary mb-4 uppercase">No Active Nodes</h3>
                <p className="text-secondary/60 mb-8 max-w-sm mx-auto font-medium">Your identity is not currently associated with any procurement clusters.</p>
                <Link href="/marketplace" className="btn-enterprise-primary px-10">Start Saving</Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8">
                {orders.map((order) => {
                  const progress = (order.product.current_preorders / order.product.target_quantity) * 100;
                  const isQuorumReached = progress >= 100;
                  const savings = (order.product.retail_price - order.price_locked) * order.quantity;

                  return (
                    <div key={order.id} className="glass-card bg-white/60 border-white hover:border-primary/30 transition-all duration-500 overflow-hidden group">
                      <div className="grid grid-cols-1 lg:grid-cols-12">
                        {/* Summary Column */}
                        <div className="lg:col-span-4 p-8 border-b lg:border-b-0 lg:border-r border-neutral-100 flex items-center space-x-8">
                          <div className="w-24 h-24 rounded-2xl overflow-hidden relative shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-500">
                             {order.product.image_url ? (
                               <Image src={order.product.image_url} alt={order.product.name} fill className="object-cover" />
                             ) : (
                               <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
                                 <Package className="h-8 w-8 text-neutral-200" />
                               </div>
                             )}
                          </div>
                          <div>
                            <div className="text-[9px] font-black uppercase tracking-widest text-primary mb-1">{order.product.category}</div>
                            <h3 className="text-lg font-black text-secondary leading-tight mb-2 line-clamp-1">{order.product.name}</h3>
                            <p className="text-xs font-bold text-secondary/40 uppercase tracking-widest">Quantity: {order.quantity} Units</p>
                          </div>
                        </div>

                        {/* Progress/Quorum Column */}
                        <div className="lg:col-span-5 p-8 flex flex-col justify-center space-y-6">
                          <div className="flex justify-between items-end">
                            <div>
                               <span className="text-[10px] font-black uppercase tracking-widest text-secondary/40 block mb-2">Cluster Strength</span>
                               <div className="flex items-center text-sm font-black text-secondary">
                                 <Users className="h-4 w-4 mr-2 text-primary" />
                                 {order.product.current_preorders} / {order.product.target_quantity} Joined
                               </div>
                            </div>
                            <div className="text-right">
                               <span className="text-[10px] font-black uppercase tracking-widest text-secondary/40 block mb-2">Phase</span>
                               <div className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${isQuorumReached ? 'bg-success-100 text-success-600' : 'bg-primary/20 text-secondary'}`}>
                                 {isQuorumReached ? 'Quorum Achievement' : 'Node Gathering'}
                               </div>
                            </div>
                          </div>
                          <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-1000 ${isQuorumReached ? 'bg-success-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]' : 'bg-primary shadow-[0_0_10px_rgba(243,214,112,0.3)]'}`} 
                              style={{ width: `${Math.min(progress, 100)}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Status/CTA Column */}
                        <div className="lg:col-span-3 p-8 bg-neutral-50/50 flex flex-col justify-center space-y-6">
                          <div className="flex justify-between items-center">
                            <div className="text-right flex-1 pr-6 border-r border-neutral-200">
                               <span className="text-[9px] font-black uppercase tracking-widest text-secondary/40 block mb-1">Locked Price</span>
                               <span className="text-xl font-black text-secondary">{formatCurrency(order.price_locked)}</span>
                            </div>
                            <div className="pl-6 flex-1">
                               <span className="text-[9px] font-black uppercase tracking-widest text-primary block mb-1">Shielded</span>
                               <span className="text-xl font-black text-primary">{formatCurrency(savings)}</span>
                            </div>
                          </div>
                          
                          {isQuorumReached ? (
                            <button className="btn-enterprise-primary w-full py-4 text-xs font-black tracking-widest shadow-xl animate-bounce cursor-pointer">
                              COMPLETE PURCHASE
                            </button>
                          ) : (
                            <div className="flex items-center justify-center space-x-3 text-[10px] font-black uppercase tracking-widest text-secondary/40 py-4 bg-white rounded-xl border border-neutral-100">
                               <Clock className="h-4 w-4" />
                               <span>Waiting for Quorum</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Security Notice */}
            <div className="max-w-xl mx-auto flex items-start space-x-4 p-8 glass-card border-white/40">
              <Shield className="h-6 w-6 text-primary shrink-0" />
              <div>
                <h4 className="text-xs font-black text-secondary uppercase tracking-[0.1em] mb-1">Capital Defense Protocol</h4>
                <p className="text-[11px] text-secondary/60 font-medium leading-relaxed">
                  Allocation nodes are escrow-locked. If a cluster fails to reach 100% quorum within the specified epoch, your allocation is automatically released with zero capital impact.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
