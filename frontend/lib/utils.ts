import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function calculateSavings(retailPrice: number, groupPrice: number): number {
  return ((retailPrice - groupPrice) / retailPrice) * 100;
}

export function getProgressColor(percentage: number): string {
  if (percentage >= 80) return 'bg-success-500';
  if (percentage >= 50) return 'bg-warning-500';
  return 'bg-primary-500';
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}