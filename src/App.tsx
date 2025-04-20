import { lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Toast from './components/Toast';
import { CartProvider } from './context/CartContext';
import { WorkshopProvider } from './context/WorkshopContext';

// Lazy load pages with loading fallback
const HomePage = lazy(() => import('./pages/HomePage'));
const ArtisansPage = lazy(() => import('./pages/ArtisansPage'));
const MarketplacePage = lazy(() => import('./pages/MarketplacePage'));
const WorkshopsPage = lazy(() => import('./pages/WorkshopsPage'));
const ForumPage = lazy(() => import('./pages/ForumPage'));
const ResourcesPage = lazy(() => import('./pages/ResourcesPage'));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="space-y-4 text-center">
      <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p className="text-gray-600 animate-pulse">Loading...</p>
    </div>
  </div>
);

function App() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(7);
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <CartProvider>
      <WorkshopProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navigation />
            <main className="pt-16 pb-20 md:pb-0 px-4 max-w-7xl mx-auto animate-fade-in">
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/marketplace" element={<MarketplacePage addToast={addToast} />} />
                  <Route path="/artisans" element={<ArtisansPage />} />
                  <Route path="/workshops" element={<WorkshopsPage addToast={addToast} />} />
                  <Route path="/forum" element={<ForumPage addToast={addToast} />} />
                  <Route path="/resources" element={<ResourcesPage />} />
                </Routes>
              </Suspense>
            </main>
            {toasts.map(toast => (
              <Toast
                key={toast.id}
                message={toast.message}
                type={toast.type}
                onClose={() => removeToast(toast.id)}
              />
            ))}
          </div>
        </Router>
      </WorkshopProvider>
    </CartProvider>
  );
}

export default App;