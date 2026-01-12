'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  Shield, 
  Zap, 
  Users,
  TrendingDown,
  Clock,
  ShieldCheck, 
  AlertTriangle,
  ChevronRight,
  Activity,
  Globe,
  Package,
  Truck,
  ArrowRight
} from 'lucide-react';
import { productsApi, preordersApi } from '@/lib/api';
import { Product } from '@/lib/types';
import { formatCurrency, formatPercentage, formatNumber } from '@/lib/utils';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [joined, setJoined] = useState(false);
  const [email, setEmail] = useState('');
  
  // AI Simulation State
  const [marketVolatility, setMarketVolatility] = useState(18.4);
  const [shieldEfficiency, setShieldEfficiency] = useState(94.2);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await productsApi.getById(parseInt(id));
        setProduct(res.data);
      } catch (err) {
        console.error('Failed to fetch product:', err);
        setError('Product not found or system offline.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();

    const interval = setInterval(() => {
      setMarketVolatility(prev => parseFloat((prev + (Math.random() * 0.4 - 0.2)).toFixed(1)));
      setShieldEfficiency(prev => parseFloat((prev + (Math.random() * 0.2 - 0.1)).toFixed(1)));
    }, 4000);

    return () => clearInterval(interval);
  }, [id]);

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || !email) return;
    
    try {
      await preordersApi.create({
        product_id: product.id,
        user_email: email,
        quantity: quantity
      });
      localStorage.setItem('shield_identity', email);
      setJoined(true);
    } catch (err) {
      console.error('Preorder failed:', err);
      // Fallback for demo
      setJoined(true);
    }
  };

  // Tabs state
  const [activeTab, setActiveTab] = useState('Specifications');

  if (loading) {
    return (
      <div className="mesh-gradient min-h-screen pt-24 animate-pulse">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="h-[600px] bg-neutral-200 rounded-[3rem]"></div>
            <div className="space-y-8">
              <div className="h-12 w-3/4 bg-neutral-200 rounded-2xl"></div>
              <div className="h-40 bg-neutral-200 rounded-[2.5rem]"></div>
              <div className="h-64 bg-neutral-200 rounded-[2.5rem]"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="mesh-gradient min-h-screen flex items-center justify-center p-4">
        <div className="glass-card p-12 text-center max-w-lg">
          <AlertTriangle className="h-16 w-16 text-danger-500 mx-auto mb-6" />
          <h2 className="text-3xl font-black text-secondary mb-4 tracking-tighter">Asset Unavailable</h2>
          <p className="text-secondary/60 mb-8 font-medium">{error || 'Unable to retrieve data cluster.'}</p>
          <Link href="/marketplace" className="btn-enterprise-primary w-full">Back to Marketplace</Link>
        </div>
      </div>
    );
  }

  const savingsPerUnit = product.retail_price - product.group_buy_price;
  const totalSavings = savingsPerUnit * quantity;
  const progress = (product.current_preorders / product.target_quantity) * 100;

  return (
    <div className="mesh-gradient min-h-screen pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="mb-12 flex items-center space-x-4 text-[10px] font-black uppercase tracking-[0.2em] text-secondary/40">
          <Link href="/marketplace" className="hover:text-primary transition-colors flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Marketplace
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-secondary/60">{product.category}</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-primary truncate max-w-[200px] tracking-widest">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Content (8 cols) */}
          <div className="lg:col-span-8 space-y-12">
            {/* Visualizer Stage */}
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full group-hover:bg-primary/20 transition-all duration-700"></div>
              <div className="relative glass-card overflow-hidden h-[500px] sm:h-[600px] border-white/50 bg-white/40 shadow-2xl">
                {product.image_url ? (
                  <Image 
                    src={product.image_url} 
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-neutral-100">
                    <Shield className="h-32 w-32 text-neutral-200" />
                  </div>
                )}
                
                {/* AI Overlay Brackets */}
                <div className="absolute inset-8 pointer-events-none">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary"></div>
                </div>

                {/* Live Scanning Indicator */}
                <div className="absolute top-12 left-12 flex items-center space-x-3 bg-white/80 backdrop-blur-3xl px-6 py-3 rounded-2xl border border-white shadow-xl">
                  <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-secondary">Asset Status: Protected</span>
                </div>
              </div>
            </div>

            {/* AI Market Intel Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-card p-10 bg-secondary text-white border-white/5">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 bg-primary transform rotate-45 flex items-center justify-center shadow-lg">
                    <Zap className="h-6 w-6 text-secondary transform-rotate-45" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary">Volatility Monitor</span>
                </div>
                <h3 className="text-xl font-black mb-4">Retail Impact Analysis</h3>
                <p className="text-sm text-neutral-400 font-medium leading-relaxed mb-8">
                  Algorithmic observation of current logistics bottlenecks indicates a pending retail surge for this asset cluster.
                </p>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-3">
                      <span className="text-neutral-500">Predicted Hike</span>
                      <span className="text-danger-500">+{marketVolatility}%</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-danger-500 transition-all duration-1000" style={{ width: `${(marketVolatility/30)*100}%` }}></div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 bg-white/5 p-4 rounded-xl">
                    <Activity className="h-4 w-4 text-primary animate-pulse" />
                    <span className="text-xs font-bold text-neutral-200">Institutional Signal Received</span>
                  </div>
                </div>
              </div>

              <div className="glass-card p-10 bg-white/60 border-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full"></div>
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center shadow-lg">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-secondary/40">Shield Efficiency</span>
                </div>
                <h3 className="text-xl font-black text-secondary mb-4">Protection Alpha</h3>
                <p className="text-sm text-secondary/60 font-medium leading-relaxed mb-8">
                  Our collective arbitrage strategy is currently neutralizing {shieldEfficiency}% of identified inflation risks.
                </p>
                <div className="flex items-center space-x-6">
                  <div>
                    <div className="text-4xl font-black text-secondary tracking-tighter">-{product.savings_percentage}%</div>
                    <div className="text-[9px] font-black uppercase tracking-widest text-secondary/40 mt-1">Net Savings</div>
                  </div>
                  <div className="h-12 w-px bg-neutral-200"></div>
                  <div>
                    <div className="text-4xl font-black text-primary tracking-tighter">LOCKED</div>
                    <div className="text-[9px] font-black uppercase tracking-widest text-secondary/40 mt-1">Price Stage</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Specs/Strategy Tabs */}
            <div className="glass-card p-12 bg-white/40 border-white/60">
              <div className="flex space-x-12 border-b border-neutral-200 mb-12">
                {['Specifications', 'Shield Strategy', 'Fulfillment'].map((tab) => (
                  <button 
                    key={tab} 
                    onClick={() => setActiveTab(tab)}
                    className={`pb-6 text-sm font-black uppercase tracking-widest transition-all relative cursor-pointer ${
                      activeTab === tab ? 'text-secondary border-b-2 border-primary' : 'text-secondary/40 hover:text-secondary'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              
              <div className="prose prose-neutral max-w-none">
                {activeTab === 'Specifications' && (
                  <div className="animate-in fade-in duration-500">
                    <p className="text-lg text-secondary/70 leading-relaxed font-medium mb-8">
                      {product.description}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                       <div>
                         <h4 className="flex items-center font-black text-secondary mb-6 tracking-tight uppercase text-xs tracking-[0.2em] text-primary">
                            <Package className="h-4 w-4 mr-2" /> Asset Properties
                         </h4>
                         <ul className="space-y-4">
                           <li className="flex justify-between text-sm py-3 border-b border-neutral-100">
                             <span className="text-secondary/40 font-bold">Category Cluster</span>
                             <span className="text-secondary font-black">{product.category}</span>
                           </li>
                           <li className="flex justify-between text-sm py-3 border-b border-neutral-100">
                             <span className="text-secondary/40 font-bold">Current Quorum</span>
                             <span className="text-secondary font-black">{product.current_preorders} Active Nodes</span>
                           </li>
                           <li className="flex justify-between text-sm py-3 border-b border-neutral-100">
                             <span className="text-secondary/40 font-bold">Protocol Stage</span>
                             <span className="text-success-600 font-black">Velocity Phase</span>
                           </li>
                         </ul>
                       </div>
                       <div>
                         <h4 className="flex items-center font-black text-secondary mb-6 tracking-tight uppercase text-xs tracking-[0.2em] text-primary">
                            <Truck className="h-4 w-4 mr-2" /> Fulfillment Logistics
                         </h4>
                         <p className="text-sm text-secondary/60 font-medium leading-relaxed">
                           Once 100% quorum is reached, our logistics layer executes institutional priority fulfillment. 
                           Assets are shielded during transit through our global bonded warehouse network.
                         </p>
                         <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/10 flex items-center space-x-3 text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                           <Globe className="h-4 w-4" />
                           Real-time GPS Tracking Activated Upon Dispatch
                         </div>
                       </div>
                    </div>
                  </div>
                )}

                {activeTab === 'Shield Strategy' && (
                  <div className="animate-in fade-in duration-500">
                    <h3 className="text-2xl font-black text-secondary tracking-tight mb-8">Asset Protection Protocol</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                      <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-100">
                        <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center mb-4">
                          <TrendingDown className="h-5 w-5 text-secondary" />
                        </div>
                        <h4 className="font-black text-secondary mb-2 text-sm uppercase tracking-wide">Pre-Tariff Lock</h4>
                        <p className="text-xs text-secondary/60 font-medium">Buying nodes activated before legislative trade adjustments impact retail costs.</p>
                      </div>
                      <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-100">
                        <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center mb-4">
                          <Users className="h-5 w-5 text-secondary" />
                        </div>
                        <h4 className="font-black text-secondary mb-2 text-sm uppercase tracking-wide">Quorum Leverage</h4>
                        <p className="text-xs text-secondary/60 font-medium">Aggregated purchasing power forces wholesale contract pricing previously unavailable.</p>
                      </div>
                      <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-100">
                        <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center mb-4">
                          <ShieldCheck className="h-5 w-5 text-secondary" />
                        </div>
                        <h4 className="font-black text-secondary mb-2 text-sm uppercase tracking-wide">Escrow Safety</h4>
                        <p className="text-xs text-secondary/60 font-medium">Triple-verified escrow nodes ensure zero capital loss risk during the quorum phase.</p>
                      </div>
                    </div>
                    <div className="bg-secondary p-8 rounded-3xl text-white">
                      <div className="flex items-center space-x-4 mb-6">
                        <Activity className="h-6 w-6 text-primary" />
                        <h4 className="text-lg font-black tracking-tight">AI Optimisation Engine</h4>
                      </div>
                      <p className="text-sm text-neutral-400 font-medium leading-relaxed">
                        Our algorithm continuously monitors global supply chain fluctuations. By locking in this price, you are joining a cluster that has already secured allocation at the current lower-tier logistics rate, protecting you from the upcoming {marketVolatility}% volatility surge detected in our neural network.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'Fulfillment' && (
                  <div className="animate-in fade-in duration-500">
                    <h3 className="text-2xl font-black text-secondary tracking-tight mb-8">Logistics & Asset Dispatch</h3>
                    <div className="space-y-8">
                      <div className="flex items-start space-x-6 pb-8 border-b border-neutral-100">
                        <div className="w-14 h-14 bg-neutral-100 rounded-2xl flex items-center justify-center shrink-0">
                          <Clock className="h-6 w-6 text-secondary/40" />
                        </div>
                        <div>
                          <h4 className="font-black text-secondary mb-1">Quorum Deadline</h4>
                          <p className="text-sm text-secondary/60 font-medium mb-3">Expected quorum completion in 12 days based on current network velocity.</p>
                          <div className="inline-flex items-center px-3 py-1 bg-success-50 text-success-600 rounded-lg text-[10px] font-black uppercase tracking-widest">
                            High Velocity Node
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-6 pb-8 border-b border-neutral-100">
                        <div className="w-14 h-14 bg-neutral-100 rounded-2xl flex items-center justify-center shrink-0">
                          <Truck className="h-6 w-6 text-secondary/40" />
                        </div>
                        <div>
                          <h4 className="font-black text-secondary mb-1">Institutional Fulfillment</h4>
                          <p className="text-sm text-secondary/60 font-medium">Prioritized dispatch via our bonded warehouse network. Estimated delivery: 14-21 business days post-quorum.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-6">
                        <div className="w-14 h-14 bg-neutral-100 rounded-2xl flex items-center justify-center shrink-0">
                          <Globe className="h-6 w-6 text-secondary/40" />
                        </div>
                        <div>
                          <h4 className="font-black text-secondary mb-1">Global Trade Tracking</h4>
                          <p className="text-sm text-secondary/60 font-medium">Real-time telemetry data provided for all intercontinental asset movements.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Checkout/Join Sidebar (4 cols) */}
          <div className="lg:col-span-4 mt-12 lg:mt-0">
            <div className="sticky top-32 space-y-8">
              {!joined ? (
                <div className="glass-card p-10 bg-secondary text-white border-white/10 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)]">
                  <div className="mb-10">
                    <h2 className="text-3xl font-black text-white tracking-tighter mb-4">JOIN CLUSTER.</h2>
                    <p className="text-neutral-400 text-xs font-bold uppercase tracking-widest">Protocol v4.2 Activation</p>
                  </div>

                  <form onSubmit={handleJoin} className="space-y-8">
                    {/* Price Breakdown */}
                    <div className="space-y-6 bg-white/5 p-6 rounded-3xl border border-white/5">
                      <div className="flex justify-between items-center pb-6 border-b border-white/5">
                        <span className="text-[10px] font-black uppercase text-neutral-500 tracking-widest">Future Retail</span>
                        <span className="font-bold text-neutral-400 line-through">{formatCurrency(product.retail_price)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase text-primary tracking-widest">Locked Shield</span>
                        <span className="text-3xl font-black text-primary tracking-tighter">{formatCurrency(product.group_buy_price)}</span>
                      </div>
                    </div>

                    {/* Quantity Selection */}
                    <div>
                      <label className="text-[10px] font-black uppercase text-neutral-400 tracking-[0.2em] mb-4 block">Select Volume Units</label>
                      <div className="flex items-center space-x-4 bg-white/5 rounded-2xl p-2 border border-white/5 focus-within:border-primary/40 transition-all">
                        <button 
                          type="button"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-12 h-12 rounded-xl hover:bg-white/10 flex items-center justify-center font-black transition-all cursor-pointer"
                        >
                          -
                        </button>
                        <input 
                          type="number" 
                          value={quantity}
                          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                          className="bg-white text-secondary border-none focus:ring-0 text-center flex-1 font-black text-xl rounded-lg"
                        />
                        <button 
                          type="button"
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-12 h-12 rounded-xl hover:bg-white/10 flex items-center justify-center font-black transition-all cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Savings Visualizer */}
                    <div className="p-8 rounded-[2.5rem] bg-primary text-secondary relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                      <div className="relative z-10">
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/40 mb-2">Net Capital Preserved</div>
                        <div className="text-4xl font-black tracking-tighter">{formatCurrency(totalSavings)}</div>
                      </div>
                    </div>

                    {/* Email Input */}
                    <div>
                      <label className="text-[10px] font-black uppercase text-neutral-400 tracking-[0.2em] mb-4 block">Network Identity (Email)</label>
                      <input 
                        type="email" 
                        required
                        placeholder="identity@protocol.xyz"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white text-secondary border border-white/10 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary/40 focus:border-transparent outline-none transition-all font-bold placeholder:text-neutral-400 cursor-pointer"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="btn-enterprise-primary w-full py-5 text-xl tracking-tight shadow-[0_0_30px_rgba(243,214,112,0.3)] cursor-pointer"
                    >
                      SECURE ALLOCATION
                    </button>
                  </form>
                </div>
              ) : (
                <div className="glass-card p-12 bg-white text-center border-primary shadow-2xl relative overflow-hidden">
                   <div className="absolute inset-0 bg-primary/10 opacity-50 blur-[100px] pointer-events-none"></div>
                   <div className="relative z-10">
                     <div className="w-24 h-24 bg-success-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-lg">
                       <ShieldCheck className="h-10 w-10 text-success-600" />
                     </div>
                     <h2 className="text-4xl font-black text-secondary tracking-tighter mb-4 uppercase">Allocation Locked.</h2>
                     <p className="text-lg text-secondary/60 font-medium leading-relaxed mb-10">
                       Your network identity has been registered for this procurement cluster.
                       Receipt and protocol instructions transmitted to <br />
                       <span className="text-secondary font-black underline decoration-primary underline-offset-4">{email}</span>
                     </p>
                     <div className="space-y-4">
                        <Link href="/marketplace" className="btn-enterprise-primary w-full cursor-pointer">Explore More Clusters</Link>
                        <button 
                          onClick={() => setJoined(false)}
                          className="text-xs font-black uppercase tracking-[0.3em] text-secondary/40 hover:text-primary transition-colors cursor-pointer"
                        >
                          Modify Node Order
                        </button>
                     </div>
                   </div>
                </div>
              )}

              {/* Status/Quorum Card */}
              <div className="glass-card p-10 bg-white/40 border-white/60">
                 <div className="flex justify-between items-center mb-10">
                    <span className="text-[10px] font-black uppercase text-secondary/40 tracking-widest">Collective Quorum</span>
                    <span className="text-[10px] font-black uppercase text-secondary tracking-widest">{formatPercentage(progress, 0)} Secured</span>
                 </div>
                 <div className="h-1.5 bg-neutral-200 rounded-full overflow-hidden mb-10">
                   <div className="h-full bg-primary shadow-[0_0_15px_rgba(243,214,112,0.5)] transition-all duration-1000" style={{ width: `${Math.min(progress, 100)}%` }}></div>
                 </div>
                 <div className="flex items-center space-x-4">
                   <div className="flex -space-x-3">
                     {[1, 2, 3].map((i) => (
                       <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-neutral-100 overflow-hidden relative">
                         <Image src={`https://i.pravatar.cc/100?u=${i+10}`} alt="user" fill />
                       </div>
                     ))}
                   </div>
                   <span className="text-[10px] font-black text-secondary/60 uppercase tracking-widest whitespace-nowrap">
                     +{formatNumber(product.current_preorders)} / {product.target_quantity} Secure Nodes Joined
                   </span>
                 </div>
              </div>

              {/* Secure Transport Indicator */}
              <div className="flex items-start space-x-4 p-8 glass-card bg-primary shadow-xl border-none">
                 <Shield className="h-7 w-7 text-secondary mt-1" />
                 <div>
                    <h4 className="text-sm font-black text-secondary uppercase tracking-[0.1em] mb-1">Guaranteed Defense</h4>
                    <p className="text-[11px] text-secondary/70 font-semibold leading-relaxed">
                      Escrow-backed purchase. Refund criteria automated if procurement cluster fails quorum within 14 cycles.
                    </p>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Options */}
        <div className="mt-32 pt-24 border-t border-neutral-200">
           <div className="flex items-end justify-between mb-16 gap-8">
             <div>
               <span className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-4 block">Recommended Discovery</span>
               <h2 className="text-4xl sm:text-6xl font-black text-secondary tracking-tighter uppercase leading-[0.9]">
                 RELATED <br />
                 <span className="text-gradient">CLUSTERS.</span>
               </h2>
             </div>
             <Link href="/marketplace" className="hidden sm:flex group items-center text-xs font-black uppercase tracking-[0.3em] text-secondary hover:text-primary transition-colors cursor-pointer">
                Full Directory Discovery <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-2" />
             </Link>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
             {/* Mocking for now, could be dynamic related products */}
             {[1, 2, 3, 4].map((i) => (
               <div key={i} className="glass-card h-48 bg-white/20 border-white animate-pulse rounded-[2rem]"></div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
}
