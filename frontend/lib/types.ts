export interface Product {
  id: number;
  name: string;
  description: string | null;
  category: string;
  retail_price: number;
  group_buy_price: number;
  target_quantity: number;
  current_preorders: number;
  savings_percentage: number;
  tariff_impact: number;
  image_url: string | null;
  sourced_from: string | null;
  is_active: boolean;
  deadline: string | null;
  created_at: string;
}

export interface Preorder {
  id: number;
  product_id: number;
  user_email: string;
  quantity: number;
  price_locked: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
}

export interface DashboardStats {
  total_products: number;
  total_preorders: number;
  total_savings: number;
  active_campaigns: number;
  top_categories: {
    category: string;
    products: number;
    preorders: number;
  }[];
}

export interface TrendingProduct {
  id: number;
  name: string;
  current_preorders: number;
  target_quantity: number;
  progress_percentage: number;
  savings_percentage: number;
}

export interface CategoryImpact {
  category: string;
  avg_tariff_impact: number;
  avg_savings: number;
}