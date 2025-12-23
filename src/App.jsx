import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import SortBar from './components/SortBar/SortBar';
import ProductGrid from './components/ProductGrid/ProductGrid';
import DashboardLayout from './pages/Dashboard/DashboardLayout';
import SalesOverview from './pages/Dashboard/SalesOverview';
import AddProduct from './pages/Dashboard/AddProduct';
import ProductsList from './pages/Dashboard/ProductsList';
import Orders from './pages/Dashboard/Orders';
import { fetchProducts } from './services/api';


// Main Shop Component
const Shop = ({ isDarkMode, toggleTheme }) => {
  const [filters, setFilters] = useState({
    flavors: [],
    types: [],
    weights: []
  });
  
  const [sortOption, setSortOption] = useState('popularity');
  const [allProducts, setAllProducts] = useState([]); 
  const [loading, setLoading] = useState(true);
  
  // New State
  const [cartCount, setCartCount] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch real products from backend
  useEffect(() => {
    const getProducts = async () => {
       try {
          const apiProducts = await fetchProducts();
          if (apiProducts) {
             setAllProducts(apiProducts);
          }
       } catch (e) {
          console.error("Failed to fetch products", e);
       } finally {
          setLoading(false);
       }
    };
    getProducts();
  }, []);

  // Handle Filter Change
  const handleFilterChange = (category, value) => {
    setFilters(prev => {
      const current = prev[category];
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      
      return { ...prev, [category]: updated };
    });
  };

  const handleAddToCart = (product) => {
     setCartCount(prev => prev + 1);
     alert(`Added ${product.title} to cart!`);
  };

  // Filter & Sort Logic
  const processedProducts = useMemo(() => {
    let result = [...allProducts];

    // 1. Filtering
    if (filters.flavors.length > 0) {
      result = result.filter(p => filters.flavors.includes(p.flavor));
    }
    if (filters.types.length > 0) {
      result = result.filter(p => filters.types.includes(p.type));
    }
    if (filters.weights.length > 0) {
      result = result.filter(p => filters.weights.includes(p.weight));
    }

    // 2. Sorting
    switch (sortOption) {
      case 'price_low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default: // popularity or default
        // assuming default order is popularity
        break;
    }

    return result;
  }, [allProducts, filters, sortOption]);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
      <Header 
         cartCount={cartCount} 
         isDarkMode={isDarkMode} 
         toggleTheme={toggleTheme} 
      />
      
      <div className="max-w-[1600px] w-[96%] mx-auto px-4 py-6 flex-1">
         <div className="text-sm text-slate-500 mb-4 dark:text-slate-400">
            Home / Cakes / <span className="text-slate-800 font-medium dark:text-slate-200">Order Cakes Online</span>
         </div>

         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
               Mouth-Watering Cakes 
               <span className="text-base font-normal text-slate-500 ml-2 dark:text-slate-400">({processedProducts.length} items)</span>
            </h1>
            
            {/* Mobile Filter Toggle */}
            <button 
              className="md:hidden bg-primary-green text-white px-4 py-2 rounded-lg font-medium" 
              onClick={() => setSidebarOpen(true)}
            >
               Filter
            </button>
         </div>

         <div className="flex flex-col lg:flex-row gap-8 relative items-start">
            <Sidebar 
               filters={filters} 
               onFilterChange={handleFilterChange} 
               isOpen={sidebarOpen}
               onClose={() => setSidebarOpen(false)}
            />
            
            <main className="flex-1 w-full">
               <SortBar 
                  count={processedProducts.length} 
                  sortOption={sortOption}
                  onSortChange={setSortOption}
               />
               {loading ? (
                  <div className="p-12 text-center text-slate-500 text-lg">Loading delicious cakes...</div>
               ) : (
                  <ProductGrid 
                     products={processedProducts} 
                     onAddToCart={handleAddToCart}
                  />
               )}
            </main>
         </div>
      </div>
      
      <footer className="bg-white border-t border-slate-200 py-8 mt-auto dark:bg-slate-800 dark:border-slate-700">
         <div className="container mx-auto px-4 text-center">
            <p className="text-slate-600 dark:text-slate-400">&copy; 2025 Clone. All rights reserved.</p>
            <div className="mt-4">
               <a href="/dashboard" className="text-sm text-slate-400 hover:text-primary-green transition-colors">Admin Dashboard</a>
            </div>
         </div>
      </footer>
    </div>
  );
};


function App() {
  // Global Theme State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check local storage or system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
       return true;
    }
    return false;
  });

  // Toggle Theme Effect
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Shop isDarkMode={isDarkMode} toggleTheme={toggleTheme} />} />
        
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout isDarkMode={isDarkMode} toggleTheme={toggleTheme} />}>
           <Route index element={<SalesOverview />} />
           <Route path="products" element={<ProductsList />} />
           <Route path="orders" element={<Orders />} />
           <Route path="add-product" element={<AddProduct />} />
           <Route path="*" element={<div style={{padding: 20}}>Coming Soon</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
