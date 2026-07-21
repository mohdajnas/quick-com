import React, { useState, useMemo } from 'react';
import { Category, Product } from '../types';
import { CATEGORIES, PRODUCTS } from '../data';
import { Search, Mic, ArrowLeft, RotateCcw, AlertCircle, ShoppingBag } from 'lucide-react';
import ProductCard from './ProductCard';
import { motion, AnimatePresence } from 'motion/react';

interface CategoriesViewProps {
  selectedCategoryId: string;
  setSelectedCategoryId: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cartQuantities: Record<string, number>;
  onAddToCart: (product: Product) => void;
  onIncreaseQuantity: (productId: string) => void;
  onDecreaseQuantity: (productId: string) => void;
}

export default function CategoriesView({
  selectedCategoryId,
  setSelectedCategoryId,
  searchQuery,
  setSearchQuery,
  cartQuantities,
  onAddToCart,
  onIncreaseQuantity,
  onDecreaseQuantity,
}: CategoriesViewProps) {
  const [isListening, setIsListening] = useState(false);
  const [voiceTip, setVoiceTip] = useState('');

  // Handle voice recognition simulation
  const handleVoiceSearch = () => {
    setIsListening(true);
    setVoiceTip('Listening...');
    
    const randomPresets = ['Milk', 'Butter', 'Eggs', 'Croissant', 'Bread', 'Orange', 'Sev', 'Juice'];
    const selectedKeyword = randomPresets[Math.floor(Math.random() * randomPresets.length)];
    
    setTimeout(() => {
      setVoiceTip(`Found: "${selectedKeyword}"`);
      setTimeout(() => {
        setSearchQuery(selectedKeyword);
        setIsListening(false);
        setVoiceTip('');
        
        // Auto-navigate to correct category based on the preset search
        const matchedProd = PRODUCTS.find(p => p.name.toLowerCase().includes(selectedKeyword.toLowerCase()));
        if (matchedProd) {
          setSelectedCategoryId(matchedProd.category);
        }
      }, 1000);
    }, 1800);
  };

  // Filter products by category AND search query
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory = product.category === selectedCategoryId;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.subCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      // If there is an active search, let it override category if matched or stick to current
      if (searchQuery) {
        return matchesSearch;
      }
      return matchesCategory;
    });
  }, [selectedCategoryId, searchQuery]);

  // Selected category info
  const activeCategory = CATEGORIES.find(c => c.id === selectedCategoryId) || CATEGORIES[0];

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] overflow-hidden">
      {/* Voice Assistant Simulation Banner */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-primary text-white text-xs px-4 py-2 flex items-center justify-between font-semibold"
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-red-400 rounded-full animate-ping"></span>
              <span>{voiceTip}</span>
            </div>
            <button 
              onClick={() => setIsListening(false)}
              className="underline opacity-80 hover:opacity-100"
            >
              Cancel
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Search & Filter Bar (Precisely matching mockup header) */}
      <header className="bg-white border-b border-neutral-100 px-4 py-3 flex items-center gap-3">
        <button
          id="back-to-home-btn"
          onClick={() => {
            setSearchQuery('');
            setSelectedCategoryId('dairy');
          }}
          className="p-1.5 rounded-full hover:bg-neutral-100 transition-colors"
          title="Reset search"
        >
          <ArrowLeft className="w-5 h-5 text-on-surface" />
        </button>

        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-outline" />
          </div>
          <input
            id="search-input"
            type="text"
            className="w-full bg-surface-container rounded-xl py-2 pl-9 pr-9 text-sm font-medium border-none focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-outline text-on-surface"
            placeholder="Search for 'Milk'"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            id="mic-search-btn"
            onClick={handleVoiceSearch}
            className="absolute inset-y-0 right-3 flex items-center text-primary hover:scale-110 active:scale-95 transition-transform"
            title="Simulate Voice Search"
          >
            <Mic className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Two-Column Workspace Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Side: Category Navigation Rail */}
        <aside className="w-24 bg-surface-container-low flex-shrink-0 overflow-y-auto hide-scrollbar border-r border-outline-variant/20">
          <nav className="flex flex-col">
            {CATEGORIES.map((cat) => {
              const isActive = cat.id === selectedCategoryId && !searchQuery;
              return (
                <button
                  key={cat.id}
                  id={`cat-rail-${cat.id}`}
                  onClick={() => {
                    setSelectedCategoryId(cat.id);
                    setSearchQuery(''); // clear search when switching tabs
                  }}
                  className={`flex flex-col items-center py-4 gap-1.5 transition-all relative cursor-pointer ${
                    isActive
                      ? 'border-r-4 border-primary bg-white text-primary font-semibold'
                      : 'text-on-surface-variant hover:bg-surface-container/60'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                    isActive ? 'bg-primary-container/10' : 'bg-surface-container-highest'
                  }`}>
                    <img
                      src={cat.icon}
                      alt={cat.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <span className="text-[11px] font-semibold tracking-wider text-center px-1">
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Right Side: Product Catalog Grid */}
        <section className="flex-1 bg-white overflow-y-auto hide-scrollbar p-4">
          {/* Header Row */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-on-surface">
              {searchQuery ? `Search Results for "${searchQuery}"` : `${activeCategory.name} & Bread`}
            </h2>
            <span className="text-xs text-outline font-semibold">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'Item' : 'Items'}
            </span>
          </div>

          {/* Catalog Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 pb-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  quantity={cartQuantities[product.id] || 0}
                  onAdd={() => onAddToCart(product)}
                  onIncrease={() => onIncreaseQuantity(product.id)}
                  onDecrease={() => onDecreaseQuantity(product.id)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-outline mb-4">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="text-base font-semibold text-on-surface">No products found</h3>
              <p className="text-xs text-on-surface-variant mt-1 max-w-[200px]">
                We couldn't find matching items in this catalog.
              </p>
              <button
                id="reset-search-btn"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategoryId('dairy');
                }}
                className="mt-4 bg-primary text-on-primary hover:bg-primary/90 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset View</span>
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
