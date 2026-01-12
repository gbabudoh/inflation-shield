'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Header />}
      <main className={!isAdmin ? "min-h-screen" : ""}>
        {children}
      </main>
      {!isAdmin && (
        <footer className="bg-gray-900 text-white py-12 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-bold mb-4">Inflation Shield</h3>
                <p className="text-gray-400 text-sm">
                  Fighting inflation through collective buying power and AI optimization.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Product</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="/marketplace" className="hover:text-white">Marketplace</a></li>
                  <li><a href="/how-it-works" className="hover:text-white">How It Works</a></li>
                  <li><a href="/analytics" className="hover:text-white">Analytics</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="/about" className="hover:text-white">About</a></li>
                  <li><a href="/blog" className="hover:text-white">Blog</a></li>
                  <li><a href="/contact" className="hover:text-white">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="/privacy" className="hover:text-white">Privacy</a></li>
                  <li><a href="/terms" className="hover:text-white">Terms</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
              <p>&copy; 2026 Inflation Shield. All rights reserved.</p>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}
