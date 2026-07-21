import React, { useState } from 'react';
import { CartItem } from '../types';
import { PrintStyle } from './PrintStyle'; // we will create a simple print styled block
import { Printer, Plus, Trash2, CheckSquare, Square, RefreshCw, FileText, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PrintViewProps {
  cartItems: CartItem[];
  onClearCart: () => void;
  onSetCartItems: (items: CartItem[]) => void;
}

interface CustomListItem {
  id: string;
  name: string;
  quantity: string;
  checked: boolean;
}

export default function PrintView({
  cartItems,
  onClearCart,
  onSetCartItems,
}: PrintViewProps) {
  const [customItems, setCustomItems] = useState<CustomListItem[]>([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQty, setNewItemQty] = useState('1 unit');

  const handleAddCustomItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const newItem: CustomListItem = {
      id: `custom_${Date.now()}`,
      name: newItemName.trim(),
      quantity: newItemQty.trim(),
      checked: false,
    };

    setCustomItems([...customItems, newItem]);
    setNewItemName('');
    setNewItemQty('1 unit');
  };

  const handleToggleCustomChecked = (id: string) => {
    setCustomItems(
      customItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleRemoveCustomItem = (id: string) => {
    setCustomItems(customItems.filter((item) => item.id !== id));
  };

  const handlePrint = () => {
    window.print();
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const gst = Math.round(subtotal * 0.05); // 5% GST simulation
  const handlingFee = subtotal > 0 ? 15 : 0;
  const deliveryFee = subtotal > 200 || subtotal === 0 ? 0 : 25;
  const grandTotal = subtotal + gst + handlingFee + deliveryFee;

  return (
    <div className="flex flex-col pb-24 px-4 pt-6 max-w-2xl mx-auto">
      {/* Dynamic style tag for print layout formatting */}
      <PrintStyle />

      <div className="flex items-center justify-between mb-4 no-print">
        <div>
          <h1 className="text-xl font-semibold text-on-surface">Print Assistant</h1>
          <p className="text-xs text-on-surface-variant">Generate shopping check-lists & store billing receipts</p>
        </div>
        <button
          id="print-btn"
          onClick={handlePrint}
          disabled={cartItems.length === 0 && customItems.length === 0}
          className="bg-primary hover:bg-primary/95 text-on-primary disabled:opacity-40 disabled:cursor-not-allowed font-semibold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Print Receipt / List</span>
        </button>
      </div>

      {/* Main Print Container Block */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-xs flex flex-col gap-6 print-container" id="printable-area">
        {/* Invoice Header */}
        <div className="flex justify-between items-start border-b border-dashed border-neutral-200 pb-4">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-primary text-lg font-semibold tracking-tighter uppercase">⚡ VELOCITY GRID</span>
            </div>
            <p className="text-[10px] text-outline uppercase font-semibold tracking-wider mt-0.5">Instant Grocery Delivery</p>
          </div>
          <div className="text-right">
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded uppercase">
              Paid Receipt
            </span>
            <p className="text-[10px] text-outline mt-1 font-mono">DATE: {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Section 1: Catalog Shopping Cart Items */}
        <div>
          <h3 className="text-xs font-semibold text-on-surface uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <ShoppingCart className="w-3.5 h-3.5 text-primary" />
            <span>Store Cart Items ({cartItems.length})</span>
          </h3>

          {cartItems.length > 0 ? (
            <div className="flex flex-col border border-neutral-100 rounded-xl divide-y divide-neutral-100 overflow-hidden">
              {cartItems.map((item) => (
                <div key={item.product.id} className="p-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 object-contain bg-neutral-50 rounded"
                    />
                    <div>
                      <h4 className="font-semibold text-on-surface leading-tight">{item.product.name}</h4>
                      <p className="text-[10px] text-outline mt-0.5">
                        {item.product.weight} • ₹{item.product.price} each
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-on-surface-variant font-medium">
                      {item.quantity} x ₹{item.product.price}
                    </span>
                    <p className="font-semibold text-on-surface font-mono mt-0.5">
                      ₹{item.quantity * item.product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-neutral-200 rounded-xl py-6 px-4 text-center text-xs text-outline no-print">
              No store items added yet. Click 'Categories' below to pick groceries.
            </div>
          )}
        </div>

        {/* Section 2: Custom Shopping List items */}
        <div className="border-t border-neutral-100 pt-4">
          <h3 className="text-xs font-semibold text-on-surface uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-secondary" />
            <span>Extra Hand-Written items ({customItems.length})</span>
          </h3>

          {/* Inline Add Custom Item Form */}
          <form onSubmit={handleAddCustomItem} className="flex gap-2 mb-3 no-print">
            <input
              type="text"
              placeholder="e.g. Tomatoes, Coriander, Milk packet"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              className="flex-1 bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-primary focus:bg-white text-on-surface"
            />
            <input
              type="text"
              placeholder="Qty (e.g. 1kg)"
              value={newItemQty}
              onChange={(e) => setNewItemQty(e.target.value)}
              className="w-24 bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-primary focus:bg-white text-on-surface"
            />
            <button
              id="add-custom-item-btn"
              type="submit"
              className="bg-primary hover:bg-primary/95 text-on-primary p-2.5 rounded-xl flex items-center justify-center cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </form>

          {customItems.length > 0 ? (
            <div className="flex flex-col border border-neutral-100 rounded-xl divide-y divide-neutral-100 overflow-hidden">
              {customItems.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 flex items-center justify-between text-xs transition-colors ${
                    item.checked ? 'bg-neutral-50 text-outline' : ''
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => handleToggleCustomChecked(item.id)}
                    className="flex items-center gap-2.5 text-left flex-1 cursor-pointer"
                  >
                    {item.checked ? (
                      <CheckSquare className="w-4 h-4 text-primary flex-shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-outline flex-shrink-0" />
                    )}
                    <div>
                      <span className={`font-semibold text-on-surface ${item.checked ? 'line-through opacity-60' : ''}`}>
                        {item.name}
                      </span>
                      <span className="ml-2 text-[10px] bg-neutral-100 px-1.5 py-0.5 rounded text-outline">
                        {item.quantity}
                      </span>
                    </div>
                  </button>
                  <button
                    type="button"
                    id={`remove-custom-${item.id}`}
                    onClick={() => handleRemoveCustomItem(item.id)}
                    className="text-red-500 hover:text-red-700 p-1 no-print cursor-pointer"
                    title="Delete item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-neutral-200 rounded-xl py-6 px-4 text-center text-xs text-outline no-print">
              No extra hand-written list items yet. Add some above!
            </div>
          )}
        </div>

        {/* Section 3: Summary Totals */}
        {cartItems.length > 0 && (
          <div className="border-t border-dashed border-neutral-200 pt-4 flex flex-col gap-2 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-outline">Cart Subtotal:</span>
              <span className="font-semibold text-on-surface">₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-outline">GST Taxes (5%):</span>
              <span className="font-semibold text-on-surface">₹{gst}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-outline">Bag Handling Fee:</span>
              <span className="font-semibold text-on-surface">₹{handlingFee}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-outline">Delivery Charge:</span>
              <span className="font-semibold text-on-surface">
                {deliveryFee === 0 ? <span className="text-primary font-semibold">FREE</span> : `₹${deliveryFee}`}
              </span>
            </div>
            <div className="flex justify-between border-t border-neutral-200 pt-2 text-sm font-semibold text-on-surface font-sans">
              <span>Grand Total Amount:</span>
              <span>₹{grandTotal}</span>
            </div>
          </div>
        )}

        {/* Print Footer Notice */}
        <div className="border-t border-dashed border-neutral-200 pt-4 text-center text-[9px] text-outline leading-tight font-mono">
          <p>Thank you for shopping on VELOCITY GRID!</p>
          <p className="mt-1">Order packed with care & sealed with freshness.</p>
        </div>
      </div>
    </div>
  );
}
