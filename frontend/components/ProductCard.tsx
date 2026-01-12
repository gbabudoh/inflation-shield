'use client';

import { Product } from '@/lib/types';
import Link from 'next/link';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import { Users, Shield } from 'lucide-react';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const progress = (product.current_preorders / product.target_quantity) * 100;

  return (
    <div className="glass-card group flex flex-col rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all duration-500 border-neutral-200/50">
      <Link href={`/products/${product.id}`} className="flex flex-col flex-1 cursor-pointer">
        {/* Image Section */}
        <div className="relative h-64 overflow-hidden">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-neutral-100">
              <Shield className="h-20 w-20 text-neutral-300" />
            </div>
          )}
          
          {/* Overlays */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Savings Badge */}
          <div className="absolute top-4 right-4">
            <div className="bg-primary-500 text-secondary-500 px-4 py-1.5 rounded-full text-xs font-black shadow-xl uppercase tracking-tighter">
              -{formatPercentage(product.savings_percentage)} Total Shield
            </div>
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <div className="bg-white/80 backdrop-blur-md text-secondary-500 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-white shadow-sm">
              {product.category}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-7 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-secondary-500 mb-3 line-clamp-2 leading-snug group-hover:text-black transition-colors">
            {product.name}
          </h3>
          
          {/* Price Section */}
          <div className="flex items-center justify-between mb-6 bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">
                Future Price
              </div>
              <div className="text-sm text-gray-400 line-through font-medium">
                {formatCurrency(product.retail_price)}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-widest text-primary-600 font-bold mb-1">
                Shielded Price
              </div>
              <div className="text-2xl font-black text-secondary-500">
                {formatCurrency(product.group_buy_price)}
              </div>
            </div>
          </div>

          {/* Progress Section */}
          <div className="mb-6 space-y-3">
            <div className="flex justify-between items-end">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Group Strength</div>
                <div className="flex items-center text-sm font-bold text-secondary-500">
                  <Users className="h-4 w-4 mr-1.5 text-primary-500" />
                  {product.current_preorders} / {product.target_quantity} Joined
                </div>
              </div>
              <div className="text-sm font-black text-secondary-500 bg-primary-500/10 px-2 py-1 rounded-lg">
                {formatPercentage(progress, 0)}
              </div>
            </div>
            <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
              <div
                className={`h-full bg-primary-500 shadow-[0_0_10px_rgba(243,214,112,0.5)] transition-all duration-700 ease-out`}
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>

          {/* Action Button */}
          <button
            className="btn-enterprise-primary w-full shadow-2xl hover:translate-y-[-2px] mt-auto cursor-pointer"
          >
            Secure Your Savings
          </button>
        </div>
      </Link>
    </div>
  );
}