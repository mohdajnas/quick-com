import React, { useState, useEffect } from 'react';
import { Category, Product } from '../types';
import { CATEGORIES, PRODUCTS } from '../data';
import { Search, MapPin, Sparkles, TrendingUp, Bike, Clock, ArrowRight, Zap, Flame, Gift, Percent, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const ADVERTISEMENTS = [
  {
    id: 'ad_1',
    title: 'Mega Fruit Festival!',
    description: 'Get fresh seasonal mangoes, bananas & premium apples at jaw-dropping discounts.',
    tag: 'FARM FRESH',
    bgClass: 'bg-gradient-to-r from-amber-500 via-orange-500 to-red-500',
    textClass: 'text-white',
    tagBgClass: 'bg-white/20 text-white',
    code: 'FRUIT30',
    discount: 'Up to 30% Off',
    catId: 'fruits',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDq9iEvG0Ce30wYUZzIAqda3Udx2D0OBZqYlnqXa09xHshq0QGCBi8LilgC95KAm5X5DdTNSTHCY8t1u034RqD5sNGpbsxK9u2xyOKaMEnfjBZ3HYavQ9GUfoXzsF7m3E5umweWkvVQUco6K-pC2_Z6Gy4DknOGoJQsQDagifzGW5Sumwy9Jn8QThssZX0ellIIuKoEbu2ycaqBqNiNMUb98NNtyPaoCIA5v7fNhfG_9GUE4gY_Vvwlrg'
  },
  {
    id: 'ad_2',
    title: 'Midnight Munchies Craving?',
    description: 'Crispy chips, hot savory namkeens, and sweet chocolates delivered instantly.',
    tag: 'LATE NIGHTS',
    bgClass: 'bg-gradient-to-r from-purple-800 via-indigo-800 to-indigo-950',
    textClass: 'text-white',
    tagBgClass: 'bg-purple-500/30 text-purple-200',
    code: 'CRAVE50',
    discount: 'Buy 1 Get 1 Free',
    catId: 'munchies',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByadZx4jEGv5OClIIFTEFfz3VuaczDsZ22IO70LuhuR1HkOTubhAsibDUEqnIE7H-K769RWIu02sR5zfIS-U-7n03-997uJLqjEVXv4q6HsbBZ7QKmnX8Ezm3ZVjsEevZbKOy_Q3SzUeoH__VN5rVrqNqm0JtMaBQfKXA5GVFxhHMuiEYv-zT-6odk4ijHoJAs2OAGCW3_lTIBdSCReTMOP0KOvoKQ7TDVjVrl0woLchg2ug-K3z0J7A'
  },
  {
    id: 'ad_3',
    title: 'Beat the Summer Heat!',
    description: 'Carbonated cold soft drinks, refreshing juices & pure water chilled to perfection.',
    tag: 'REFRESHING',
    bgClass: 'bg-gradient-to-r from-sky-400 via-blue-500 to-blue-700',
    textClass: 'text-white',
    tagBgClass: 'bg-white/25 text-white',
    code: 'CHILL15',
    discount: '15% Off Liquids',
    catId: 'drinks',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXdyINAMFM6aYAIvsJlnPdzRQH_JMOdP1RpOcyMWDr5o5PXVODqlT2d1-R7Mw9d-AM8iZ5IQC2wBqu_OYewArviaTioHM31QBcqrZJcNcdAaa9SWDQsWTrDYCGMipd_rdkPvIzUzHt-h33gqgIfZVH1IiPIoxCFg9OFEjCfySR89kteqKhKNmp-hsXsSAVZLb3NRG14viGZIf_2CG5r59C9NPwSwBAa5cWXeF7-Pt0OGoOnb8IG7cDVg'
  }
];

interface HomeViewProps {
  onSelectCategory: (categoryId: string) => void;
  onSearchQuery: (query: string) => void;
  onQuickAdd: (product: Product) => void;
  cartQuantities: Record<string, number>;
  onProfileClick: () => void;
}

export default function HomeView({
  onSelectCategory,
  onSearchQuery,
  onQuickAdd,
  cartQuantities,
  onProfileClick,
}: HomeViewProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto scroll slides
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % ADVERTISEMENTS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % ADVERTISEMENTS.length);
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + ADVERTISEMENTS.length) % ADVERTISEMENTS.length);
  };

  // Get trending products (with a tag or just 4 select items)
  const trendingProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="flex flex-col pb-24">
      {/* Dynamic Header Section */}
      <div className="bg-gradient-to-b from-emerald-50 to-white px-4 pt-6 pb-4 border-b border-neutral-100">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary animate-pulse">
              <Bike className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1 text-on-surface font-extrabold text-sm">
                <span>Delivery in 10 mins</span>
                <span className="text-secondary">⚡</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-on-surface-variant">
                <MapPin className="w-3 h-3 text-red-500" />
                <span className="truncate max-w-[200px]">Gurugram Sector 45, India</span>
              </div>
            </div>
          </div>
          <button 
            onClick={onProfileClick}
            className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary cursor-pointer hover:bg-primary/20 transition-colors"
          >
            <User className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar - Jumps to Categories with search focus */}
        <div className="relative mb-2">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-outline" />
          </div>
          <input
            type="text"
            placeholder="Search for 'Milk', 'Eggs', 'Croissant'..."
            onChange={(e) => onSearchQuery(e.target.value)}
            className="w-full bg-surface-container rounded-xl py-3 pl-10 pr-10 text-sm font-medium border-none focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-outline"
          />
          <div className="absolute inset-y-0 right-3 flex items-center gap-1.5 text-xs text-primary font-bold">
            <span className="px-1.5 py-0.5 bg-primary/10 rounded">Enter</span>
          </div>
        </div>
      </div>

      {/* Interactive Hero Advertisements Carousel Banner */}
      <div className="px-4 pt-4">
        <div className="relative rounded-2xl overflow-hidden shadow-sm border border-neutral-150 h-52 group/carousel">
          <AnimatePresence mode="wait">
            {ADVERTISEMENTS.map((ad, idx) => {
              if (idx !== activeSlide) return null;
              return (
                <motion.div
                  key={ad.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.35 }}
                  className={`absolute inset-0 p-5 flex flex-col justify-between ${ad.bgClass} ${ad.textClass}`}
                >
                  {/* Absolute subtle background graphic decor */}
                  <div className="absolute right-[-10px] bottom-[-10px] w-40 h-40 opacity-15 rounded-full bg-white blur-xl pointer-events-none" />
                  
                  {/* Upper info row */}
                  <div className="flex justify-between items-start gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] uppercase tracking-wider font-black px-2 py-0.5 rounded-full ${ad.tagBgClass}`}>
                          {ad.tag}
                        </span>
                        <span className="bg-[#ffde4e] text-[#746200] text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                          <Percent className="w-2.5 h-2.5" />
                          <span>{ad.discount}</span>
                        </span>
                      </div>
                      <h2 className="text-lg font-extrabold mt-2 leading-tight tracking-tight drop-shadow-xs line-clamp-2">
                        {ad.title}
                      </h2>
                      <p className="text-xs opacity-90 mt-1 max-w-[240px] line-clamp-2 leading-snug font-medium">
                        {ad.description}
                      </p>
                    </div>

                    {/* Floating Product Image illustration representing catalog categories */}
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-xs border border-white/20 rounded-xl p-1 flex-shrink-0 flex items-center justify-center shadow-xs">
                      <img
                        src={ad.image}
                        alt="Promo representation"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain transform group-hover/carousel:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Lower Promo Coupon Code and Action Link */}
                  <div className="flex justify-between items-center pt-2 border-t border-white/10">
                    <div className="flex items-center gap-1.5 bg-black/15 px-2.5 py-1 rounded-lg">
                      <Gift className="w-3.5 h-3.5 text-[#ffe264]" />
                      <span className="text-[10px] font-mono font-bold tracking-wider">
                        CODE: <strong className="text-[#ffe264]">{ad.code}</strong>
                      </span>
                    </div>

                    <button
                      id={`promo-btn-${ad.id}`}
                      onClick={() => onSelectCategory(ad.catId)}
                      className="bg-white hover:bg-neutral-100 text-on-surface text-[11px] font-black px-3.5 py-1.5 rounded-lg flex items-center gap-1 transition-all active:scale-95 cursor-pointer shadow-xs"
                    >
                      <span>Claim Deal</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Left Navigation Arrow Button */}
          <button
            id="prev-slide-btn"
            onClick={handlePrevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/25 hover:bg-black/45 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 backdrop-blur-xs cursor-pointer z-10"
            title="Previous Promotion"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Right Navigation Arrow Button */}
          <button
            id="next-slide-btn"
            onClick={handleNextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/25 hover:bg-black/45 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 backdrop-blur-xs cursor-pointer z-10"
            title="Next Promotion"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Indicator Dot Controls */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 pointer-events-auto">
            {ADVERTISEMENTS.map((_, idx) => (
              <button
                key={idx}
                id={`carousel-dot-${idx}`}
                onClick={() => setActiveSlide(idx)}
                className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                  activeSlide === idx ? 'bg-white w-4' : 'bg-white/40 hover:bg-white/70'
                }`}
                title={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Sub-Bento Secondary Dynamic Offer Row */}
      <div className="px-4 pt-3 grid grid-cols-2 gap-3">
        <div className="bg-secondary-container rounded-xl p-3.5 flex flex-col justify-between border border-yellow-200">
          <div>
            <span className="bg-white/80 text-on-surface text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full">
              Lightning Delivery
            </span>
            <h3 className="text-xs font-black text-on-surface mt-1.5 leading-tight">
              Delivered in under 10 minutes!
            </h3>
          </div>
          <button 
            onClick={() => onSelectCategory('dairy')}
            className="mt-2.5 self-start bg-on-surface text-white hover:bg-neutral-800 text-[10px] font-bold px-2.5 py-1 rounded flex items-center gap-1 cursor-pointer"
          >
            <span>Order Milk</span>
            <ArrowRight className="w-2.5 h-2.5" />
          </button>
        </div>

        <div className="bg-emerald-800 rounded-xl p-3.5 text-white flex flex-col justify-between">
          <div>
            <span className="bg-emerald-700 text-emerald-200 text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full">
              Super Saver
            </span>
            <h3 className="text-xs font-black mt-1.5 leading-tight">
              Flat 20% Off on Bakeries
            </h3>
          </div>
          <button 
            onClick={() => onSelectCategory('bakery')}
            className="mt-2.5 self-start bg-white text-emerald-900 hover:bg-neutral-100 text-[10px] font-bold px-2.5 py-1 rounded flex items-center gap-1 cursor-pointer"
          >
            <span>Claim Offer</span>
            <ArrowRight className="w-2.5 h-2.5" />
          </button>
        </div>
      </div>

      {/* Categories Bento Selection Grid */}
      <div className="px-4 py-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-base font-extrabold text-on-surface">Browse Categories</h3>
          <span className="text-xs text-outline font-medium">Bento Grid View</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {CATEGORIES.map((cat, index) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`${cat.color || 'bg-neutral-50'} border border-neutral-100 rounded-xl p-3 flex flex-col items-center justify-center transition-all hover:scale-102 hover:shadow-xs cursor-pointer group`}
            >
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xs border border-neutral-100 group-hover:rotate-6 transition-transform duration-300">
                <img
                  src={cat.icon}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 object-contain"
                />
              </div>
              <span className="text-xs font-extrabold text-on-surface mt-2">
                {cat.name}
              </span>
              <span className="text-[10px] text-outline font-semibold mt-0.5">
                {cat.id === 'dairy' ? '24 Items' : '5+ items'}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Trending Products Grid */}
      <div className="px-4 py-2">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-1">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
            <h3 className="text-base font-extrabold text-on-surface">Trending This Hour</h3>
          </div>
          <span className="text-xs text-primary font-bold">Top Picks</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {trendingProducts.map((prod) => {
            const qty = cartQuantities[prod.id] || 0;
            return (
              <div
                key={prod.id}
                className="bg-white border border-neutral-100 rounded-xl p-3 flex items-center gap-3 hover:border-primary/20 transition-all duration-300 relative"
              >
                <div className="w-16 h-16 bg-neutral-50 rounded-lg p-1 flex-shrink-0 flex items-center justify-center">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-bold text-outline uppercase">
                    {prod.subCategory}
                  </span>
                  <h4 className="text-xs font-bold text-on-surface truncate">
                    {prod.name}
                  </h4>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs font-extrabold text-on-surface">₹{prod.price}</span>
                    <button
                      id={`home-add-${prod.id}`}
                      onClick={() => onQuickAdd(prod)}
                      className={`text-[10px] font-bold rounded-md px-2 py-1 transition-all ${
                        qty > 0
                          ? 'bg-primary text-white'
                          : 'bg-primary-container/10 text-primary border border-primary/20 hover:bg-primary/10'
                      } cursor-pointer`}
                    >
                      {qty > 0 ? `${qty} in Cart` : '+ ADD'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fast Facts / Trust Row */}
      <div className="px-4 py-6 bg-neutral-100 mx-4 rounded-2xl grid grid-cols-3 gap-2 text-center mt-4">
        <div className="flex flex-col items-center">
          <Clock className="w-5 h-5 text-emerald-700 mb-1" />
          <span className="text-[10px] font-extrabold text-on-surface">7-12 Min Avg</span>
          <span className="text-[8px] text-outline">Supercharged Delivery</span>
        </div>
        <div className="flex flex-col items-center border-x border-neutral-200">
          <Zap className="w-5 h-5 text-yellow-600 mb-1" />
          <span className="text-[10px] font-extrabold text-on-surface">No Minimums</span>
          <span className="text-[8px] text-outline">Order any amount</span>
        </div>
        <div className="flex flex-col items-center">
          <Sparkles className="w-5 h-5 text-emerald-700 mb-1" />
          <span className="text-[10px] font-extrabold text-on-surface">Fresh Promise</span>
          <span className="text-[8px] text-outline">Hassle-free refunds</span>
        </div>
      </div>
    </div>
  );
}

