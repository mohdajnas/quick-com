/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Product, CartItem, Category } from './types';
import { PRODUCTS } from './data';
import HomeView from './components/HomeView';
import CategoriesView from './components/CategoriesView';
import PrintView from './components/PrintView';
import ProfileView from './components/ProfileView';
import { Home, Grid, Printer, User, ArrowRight, X, Check, MapPin, CreditCard, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'categories' | 'print' | 'profile'>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('dairy');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [activeDelivery, setActiveDelivery] = useState<{
    id: string;
    total: number;
    itemsCount: number;
    status: 'Confirmed' | 'Packing' | 'Out for Delivery' | 'Arrived';
    etaMinutes: number;
  } | null>(null);

  // Load cart from localStorage on mount (for persistent user experience)
  useEffect(() => {
    const savedCart = localStorage.getItem('velocity_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error loading cart', e);
      }
    }
  }, []);

  // Save cart to localStorage
  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem('velocity_cart', JSON.stringify(items));
  };

  // Stepper handlers
  const handleAddToCart = (product: Product) => {
    const existing = cartItems.find((item) => item.product.id === product.id);
    if (existing) {
      const updated = cartItems.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      saveCart(updated);
    } else {
      const updated = [...cartItems, { product, quantity: 1 }];
      saveCart(updated);
    }
  };

  const handleIncreaseQuantity = (productId: string) => {
    const updated = cartItems.map((item) =>
      item.product.id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    saveCart(updated);
  };

  const handleDecreaseQuantity = (productId: string) => {
    const existing = cartItems.find((item) => item.product.id === productId);
    if (!existing) return;

    let updated: CartItem[];
    if (existing.quantity <= 1) {
      updated = cartItems.filter((item) => item.product.id !== productId);
    } else {
      updated = cartItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    }
    saveCart(updated);
  };

  // Reorder all items from past orders
  const handleReorder = (items: { productName: string; quantity: number }[]) => {
    const newCartItems: CartItem[] = [...cartItems];

    items.forEach((item) => {
      // Find matching product in database
      const prod = PRODUCTS.find((p) => p.name.toLowerCase() === item.productName.toLowerCase());
      if (prod) {
        const existingIdx = newCartItems.findIndex((ci) => ci.product.id === prod.id);
        if (existingIdx > -1) {
          newCartItems[existingIdx].quantity += item.quantity;
        } else {
          newCartItems.push({ product: prod, quantity: item.quantity });
        }
      }
    });

    saveCart(newCartItems);
    setActiveTab('categories');
    setCheckoutOpen(true); // Open the checkout drawer directly so they can complete the purchase!
  };

  // Calculate totals
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartPrice = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const cartQuantities = cartItems.reduce((acc, item) => {
    acc[item.product.id] = item.quantity;
    return acc;
  }, {} as Record<string, number>);

  // Handle Order Placement simulation
  const handlePlaceOrder = () => {
    const orderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    setActiveDelivery({
      id: orderId,
      total: totalCartPrice + Math.round(totalCartPrice * 0.05) + 15 + (totalCartPrice > 200 ? 0 : 25),
      itemsCount: totalItemsCount,
      status: 'Confirmed',
      etaMinutes: 10,
    });
    setCheckoutOpen(false);
    saveCart([]); // clear cart
    setActiveTab('profile'); // Send them to the profile screen to see live tracking bento!
  };

  // Advance Order simulation state (confirmed -> packing -> out -> arrived)
  const handleAdvanceOrderStatus = () => {
    if (!activeDelivery) return;

    if (activeDelivery.status === 'Confirmed') {
      setActiveDelivery({ ...activeDelivery, status: 'Packing', etaMinutes: 8 });
    } else if (activeDelivery.status === 'Packing') {
      setActiveDelivery({ ...activeDelivery, status: 'Out for Delivery', etaMinutes: 5 });
    } else if (activeDelivery.status === 'Out for Delivery') {
      setActiveDelivery({ ...activeDelivery, status: 'Arrived', etaMinutes: 0 });
    } else {
      setActiveDelivery(null); // Clear upon acknowledgement
    }
  };

  // Render core views based on active tab
  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeView
            onSelectCategory={(catId) => {
              setSelectedCategoryId(catId);
              setActiveTab('categories');
            }}
            onSearchQuery={(q) => {
              setSearchQuery(q);
              setActiveTab('categories');
            }}
            onQuickAdd={handleAddToCart}
            cartQuantities={cartQuantities}
            onProfileClick={() => setActiveTab('profile')}
          />
        );
      case 'categories':
        return (
          <CategoriesView
            selectedCategoryId={selectedCategoryId}
            setSelectedCategoryId={setSelectedCategoryId}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            cartQuantities={cartQuantities}
            onAddToCart={handleAddToCart}
            onIncreaseQuantity={handleIncreaseQuantity}
            onDecreaseQuantity={handleDecreaseQuantity}
          />
        );
      case 'print':
        return (
          <PrintView
            cartItems={cartItems}
            onClearCart={() => saveCart([])}
            onSetCartItems={(items) => saveCart(items)}
          />
        );
      case 'profile':
        return (
          <ProfileView
            userEmail="m.ajnas@zoftcares.com"
            onReorder={handleReorder}
            activeOrder={activeDelivery}
            onCancelActiveOrder={() => setActiveDelivery(null)}
            onAdvanceActiveOrderStatus={handleAdvanceOrderStatus}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-on-surface select-none relative pb-16">
      {/* Top Main Application viewport */}
      <main className="w-full max-w-lg mx-auto bg-white min-h-screen shadow-md flex flex-col relative overflow-x-hidden">
        {/* Dynamic Screen View */}
        <div className="flex-1">
          {renderActiveView()}
        </div>

        {/* Floating View Cart Sticky Bar (Precisely styled matching Mockup Level 2 elevation) */}
        <AnimatePresence>
          {totalItemsCount > 0 && !checkoutOpen && (
            <motion.div
              id="cartBar"
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ type: 'spring', damping: 22, stiffness: 200 }}
              className="fixed bottom-20 left-4 right-4 max-w-[448px] mx-auto z-40 bg-primary text-on-primary p-4 rounded-xl shadow-lg flex justify-between items-center bento-inner-glow"
            >
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">
                    {totalItemsCount} {totalItemsCount === 1 ? 'Item' : 'Items'}
                  </span>
                  <span className="text-lg font-black font-mono">
                    ₹{totalCartPrice}
                  </span>
                </div>
              </div>
              <button
                id="view-cart-btn"
                onClick={() => setCheckoutOpen(true)}
                className="flex items-center gap-1.5 font-bold text-sm tracking-wide text-white hover:opacity-90 active:scale-95 transition-all cursor-pointer"
              >
                <span>VIEW CART</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Navigation Shell (Matching bottom layout in mockup) */}
        <nav className="fixed bottom-0 left-0 w-full z-45 flex justify-around items-center px-2 pb-5 pt-2 bg-white border-t border-neutral-100 shadow-md no-print max-w-lg mx-auto right-0">
          {/* Home */}
          <button
            id="tab-btn-home"
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center px-4 py-1.5 transition-all duration-200 cursor-pointer ${
              activeTab === 'home'
                ? 'text-primary bg-primary-container/10 rounded-xl font-bold'
                : 'text-on-surface-variant hover:opacity-80'
            }`}
          >
            <Home className="w-5 h-5 mb-0.5" />
            <span className="text-[11px] font-bold">Home</span>
          </button>

          {/* Categories (Active initially) */}
          <button
            id="tab-btn-categories"
            onClick={() => setActiveTab('categories')}
            className={`flex flex-col items-center justify-center px-4 py-1.5 transition-all duration-200 cursor-pointer ${
              activeTab === 'categories'
                ? 'text-primary bg-primary-container/10 rounded-xl font-bold'
                : 'text-on-surface-variant hover:opacity-80'
            }`}
          >
            <Grid className="w-5 h-5 mb-0.5" />
            <span className="text-[11px] font-bold">Categories</span>
          </button>

          {/* Print Assistant */}
          <button
            id="tab-btn-print"
            onClick={() => setActiveTab('print')}
            className={`flex flex-col items-center justify-center px-4 py-1.5 transition-all duration-200 cursor-pointer ${
              activeTab === 'print'
                ? 'text-primary bg-primary-container/10 rounded-xl font-bold'
                : 'text-on-surface-variant hover:opacity-80'
            }`}
          >
            <Printer className="w-5 h-5 mb-0.5" />
            <span className="text-[11px] font-bold">Print</span>
          </button>

        </nav>
      </main>

      {/* Checkout Drawer / Sheet Modal */}
      <AnimatePresence>
        {checkoutOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              id="checkout-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setCheckoutOpen(false)}
              className="fixed inset-0 bg-black z-50 cursor-pointer"
            />

            {/* Sliding Sheet */}
            <motion.div
              id="checkout-sheet"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-white rounded-t-3xl shadow-2xl z-55 overflow-y-auto max-h-[85vh] flex flex-col hide-scrollbar"
            >
              {/* Header */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-neutral-100 sticky top-0 bg-white z-10">
                <div>
                  <h3 className="text-base font-extrabold text-on-surface">Checkout Billing</h3>
                  <p className="text-xs text-outline">{totalItemsCount} products selected</p>
                </div>
                <button
                  id="close-checkout-btn"
                  onClick={() => setCheckoutOpen(false)}
                  className="p-1.5 hover:bg-neutral-100 rounded-full text-on-surface-variant cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col gap-5 flex-1 overflow-y-auto">
                {/* Store Items list */}
                <div>
                  <h4 className="text-xs font-extrabold text-on-surface uppercase tracking-wider mb-2">My Shopping Bag</h4>
                  <div className="flex flex-col gap-2.5 max-h-[220px] overflow-y-auto hide-scrollbar pr-1">
                    {cartItems.map((item) => (
                      <div key={item.product.id} className="flex justify-between items-center text-xs p-2 bg-neutral-50 rounded-xl border border-neutral-100">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            referrerPolicy="no-referrer"
                            className="w-9 h-9 object-contain bg-white rounded-lg p-0.5 border border-neutral-100"
                          />
                          <div className="min-w-0">
                            <h5 className="font-bold text-on-surface truncate">{item.product.name}</h5>
                            <span className="text-[10px] text-outline">{item.product.weight}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-bold text-outline">{item.quantity} x ₹{item.product.price}</span>
                          <span className="font-bold text-on-surface font-mono text-right min-w-[40px]">₹{item.quantity * item.product.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Simulated Delivery Address */}
                <div className="bg-emerald-50/50 border border-primary/10 rounded-xl p-3.5 flex items-start gap-2.5 text-xs">
                  <MapPin className="w-4 h-4 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-extrabold text-primary">Delivering to Home</h4>
                    <p className="text-on-surface-variant leading-relaxed mt-0.5">Flat 402, Royal Palms, Sector 15, Gurgaon, Haryana - 122001</p>
                  </div>
                </div>

                {/* Simulated Payment Selector */}
                <div className="bg-neutral-50 border border-neutral-100 rounded-xl p-3.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <CreditCard className="w-4 h-4 text-secondary" />
                    <div>
                      <h4 className="font-extrabold text-on-surface">Google Pay UPI</h4>
                      <p className="text-outline text-[10px]">m.ajnas@oksbi</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-primary-container/20 text-primary font-bold px-2 py-0.5 rounded">
                    Selected
                  </span>
                </div>

                {/* Subtotals & Fees */}
                <div className="border-t border-dashed border-neutral-200 pt-4 flex flex-col gap-2 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-outline">Basket Subtotal:</span>
                    <span className="font-bold text-on-surface">₹{totalCartPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-outline">Taxes & packing charge:</span>
                    <span className="font-bold text-on-surface">₹{Math.round(totalCartPrice * 0.05)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-outline">Rider Handling fee:</span>
                    <span className="font-bold text-on-surface">₹15</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-outline">Delivery Partner charge:</span>
                    <span className="font-bold text-on-surface">
                      {totalCartPrice > 200 ? <span className="text-primary font-bold">FREE</span> : '₹25'}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-neutral-200 pt-2 text-sm font-extrabold text-on-surface font-sans">
                    <span>Grand Total Bill:</span>
                    <span>₹{totalCartPrice + Math.round(totalCartPrice * 0.05) + 15 + (totalCartPrice > 200 ? 0 : 25)}</span>
                  </div>
                </div>

                {/* Swipe/Click to Pay Simulator Button */}
                <motion.button
                  id="place-order-btn"
                  onClick={handlePlaceOrder}
                  whileTap={{ scale: 0.98 }}
                  className="mt-2 w-full bg-primary hover:bg-primary/95 text-on-primary py-3.5 rounded-xl font-bold tracking-wider text-xs uppercase flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Slide to Place Order</span>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
