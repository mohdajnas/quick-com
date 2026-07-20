import React from 'react';
import { Product } from '../types';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductCardProps {
  key?: string | number;
  product: Product;
  quantity: number;
  onAdd: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
}

export default function ProductCard({
  product,
  quantity,
  onAdd,
  onIncrease,
  onDecrease,
}: ProductCardProps) {
  // Determine tag style based on value
  const getTagClass = (tag: string) => {
    switch (tag.toUpperCase()) {
      case 'URGENT':
        return 'bg-secondary-container text-on-secondary-container';
      case 'OFFER':
        return 'bg-[#74ff6a] text-[#002201]';
      case 'POPULAR':
        return 'bg-blue-100 text-blue-900';
      case 'FRESH':
        return 'bg-emerald-100 text-emerald-900';
      default:
        return 'bg-neutral-100 text-neutral-900';
    }
  };

  return (
    <div className="flex flex-col bg-surface-container-lowest border border-outline-variant/30 rounded-xl overflow-hidden group hover:shadow-sm transition-shadow duration-300">
      {/* Image Area */}
      <div className="relative aspect-square bg-surface-container-lowest p-3 flex items-center justify-center overflow-hidden">
        {product.tag && (
          <div className={`absolute top-2 left-2 px-1.5 py-0.5 rounded-sm text-[10px] font-bold tracking-wider uppercase z-10 ${getTagClass(product.tag)}`}>
            {product.tag}
          </div>
        )}
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain max-h-[140px] group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Information */}
      <div className="p-3 flex flex-col flex-1">
        <span className="text-[11px] text-on-surface-variant font-medium truncate mb-1">
          {product.subCategory}
        </span>
        <h3 className="text-sm font-bold text-on-surface leading-tight line-clamp-2 h-10 mb-2">
          {product.name}
        </h3>

        {/* Price & Add Stepper Row */}
        <div className="mt-auto pt-2 flex items-end justify-between gap-1">
          <div className="flex flex-col">
            <span className="text-xs text-outline">{product.weight}</span>
            <span className="text-lg font-extrabold text-on-surface">
              ₹{product.price}
            </span>
          </div>

          <div className="relative h-8 min-w-[76px] flex items-center justify-end">
            <AnimatePresence mode="wait">
              {quantity === 0 ? (
                <motion.button
                  key="add-btn"
                  id={`add-btn-${product.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onAdd();
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.15 }}
                  className="h-8 px-4 bg-primary hover:bg-primary/90 text-on-primary rounded-lg text-xs font-bold transition-all active:scale-95 bento-inner-glow flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>ADD</span>
                </motion.button>
              ) : (
                <motion.div
                  key="stepper"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.15 }}
                  className="h-8 bg-primary text-on-primary rounded-lg flex items-center justify-between px-1 gap-2 border border-primary-container"
                >
                  <button
                    id={`decrease-${product.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onDecrease();
                    }}
                    className="p-1 hover:bg-white/10 rounded transition-colors cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-sm font-extrabold px-1 min-w-[14px] text-center">
                    {quantity}
                  </span>
                  <button
                    id={`increase-${product.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onIncrease();
                    }}
                    className="p-1 hover:bg-white/10 rounded transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
