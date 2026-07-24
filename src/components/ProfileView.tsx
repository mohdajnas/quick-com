import React, { useState } from 'react';
import { UserAddress, OrderHistoryItem, Product } from '../types';
import { MOCK_ADDRESSES, MOCK_ORDERS, PRODUCTS } from '../data';
import { User, MapPin, Package, Settings, Bell, Shield, Plus, Edit2, Check, RefreshCw, Bike, Heart, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProfileViewProps {
  userEmail?: string;
  onReorder: (items: { productName: string; quantity: number }[]) => void;
  activeOrder?: {
    id: string;
    total: number;
    itemsCount: number;
    status: string;
    etaMinutes: number;
  } | null;
  onCancelActiveOrder?: () => void;
  onAdvanceActiveOrderStatus?: () => void;
  onLogout?: () => void;
}

export default function ProfileView({
  userEmail = 'm.ajnas@zoftcares.com',
  onReorder,
  activeOrder,
  onCancelActiveOrder,
  onAdvanceActiveOrderStatus,
  onLogout,
}: ProfileViewProps) {
  const [addresses, setAddresses] = useState<UserAddress[]>(MOCK_ADDRESSES);
  const [editingAddrId, setEditingAddrId] = useState<string | null>(null);
  const [editDetails, setEditDetails] = useState('');
  const [isAddingAddr, setIsAddingAddr] = useState(false);
  const [newLabel, setNewLabel] = useState('Home');
  const [newDetails, setNewDetails] = useState('');

  // Handle address edits
  const handleStartEdit = (addr: UserAddress) => {
    setEditingAddrId(addr.id);
    setEditDetails(addr.details);
  };

  const handleSaveEdit = (id: string) => {
    setAddresses(
      addresses.map((a) => (a.id === id ? { ...a, details: editDetails } : a))
    );
    setEditingAddrId(null);
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDetails.trim()) return;

    const newAddr: UserAddress = {
      id: `addr_${Date.now()}`,
      label: newLabel,
      details: newDetails.trim(),
    };

    setAddresses([...addresses, newAddr]);
    setNewDetails('');
    setIsAddingAddr(false);
  };

  return (
    <div className="flex flex-col pb-24 px-4 pt-6 max-w-2xl mx-auto gap-6">
      {/* Profile Card */}
      <div className="bg-white border border-neutral-200/60 rounded-2xl p-5 flex items-center gap-4 shadow-xs">
        <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xl font-semibold border border-primary/20">
          {userEmail.substring(0, 2).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-[10px] bg-secondary-container text-on-secondary-container font-semibold px-2 py-0.5 rounded-full uppercase">
            VIP member
          </span>
          <h2 className="text-base font-semibold text-on-surface truncate mt-1">
            {userEmail}
          </h2>
          <p className="text-xs text-outline">Joined July 2026</p>
        </div>
      </div>

      {/* Active Order Live Tracker */}
      <AnimatePresence>
        {activeOrder && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="bg-emerald-900 text-white rounded-2xl p-5 shadow-sm overflow-hidden relative"
          >
            <div className="absolute right-[-20px] top-[-20px] w-24 h-24 opacity-10">
              <Bike className="w-full h-full" />
            </div>

            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="bg-primary-container text-on-primary-container text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded">
                  Active Delivery • {activeOrder.id}
                </span>
                <h3 className="text-base font-semibold mt-1">Rider is on the way!</h3>
              </div>
              <div className="text-right">
                <span className="text-2xl font-semibold text-[#74ff6a]">{activeOrder.etaMinutes}</span>
                <span className="text-[10px] text-white/80 block uppercase tracking-wider font-semibold">MINUTES ETA</span>
              </div>
            </div>

            {/* Stepper progress indicator */}
            <div className="flex items-center gap-2 my-4">
              <div className="flex-1 h-1.5 rounded-full bg-white/20 overflow-hidden">
                <div 
                  className="h-full bg-[#74ff6a] transition-all duration-500" 
                  style={{ 
                    width: activeOrder.status === 'Confirmed' ? '25%' : 
                           activeOrder.status === 'Packing' ? '50%' : 
                           activeOrder.status === 'Out for Delivery' ? '75%' : '100%' 
                  }}
                />
              </div>
              <span className="text-[10px] font-semibold text-[#74ff6a] uppercase">
                {activeOrder.status}
              </span>
            </div>

            {/* Simulated actions */}
            <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/10 text-xs">
              <button
                id="cancel-active-order-btn"
                onClick={onCancelActiveOrder}
                className="text-red-300 hover:text-red-200 font-semibold hover:underline cursor-pointer"
              >
                Cancel Order
              </button>

              <button
                id="advance-order-status-btn"
                onClick={onAdvanceActiveOrderStatus}
                className="bg-[#74ff6a] text-[#002201] hover:bg-[#4fe24b] font-semibold px-3 py-1 rounded transition-colors cursor-pointer"
              >
                {activeOrder.status === 'Arrived' ? 'Acknowledge Delivery' : 'Speed up Delivery'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Address Management Bento */}
      <div className="bg-white border border-neutral-200/60 rounded-2xl p-5 flex flex-col gap-4 shadow-xs">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-primary" />
            <span>Saved Addresses</span>
          </h3>
          <button
            id="toggle-add-addr-btn"
            onClick={() => setIsAddingAddr(!isAddingAddr)}
            className="text-xs text-primary font-semibold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New</span>
          </button>
        </div>

        {/* Add Address Form */}
        {isAddingAddr && (
          <form onSubmit={handleAddAddress} className="bg-neutral-50 p-4 rounded-xl border border-neutral-200/60 flex flex-col gap-3">
            <div className="flex gap-2">
              {['Home', 'Office', 'Other'].map((lbl) => (
                <button
                  key={lbl}
                  type="button"
                  id={`addr-label-btn-${lbl}`}
                  onClick={() => setNewLabel(lbl)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    newLabel === lbl ? 'bg-primary text-white' : 'bg-white border border-neutral-200 text-on-surface'
                  }`}
                >
                  {lbl}
                </button>
              ))}
            </div>
            <input
              type="text"
              id="addr-input"
              placeholder="Enter complete address details..."
              value={newDetails}
              onChange={(e) => setNewDetails(e.target.value)}
              className="bg-white border border-neutral-200 rounded-xl px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-primary text-on-surface"
              required
            />
            <div className="flex justify-end gap-2 text-xs">
              <button
                type="button"
                id="cancel-add-addr-btn"
                onClick={() => setIsAddingAddr(false)}
                className="px-3 py-1.5 hover:underline font-semibold text-on-surface"
              >
                Cancel
              </button>
              <button
                type="submit"
                id="save-new-addr-btn"
                className="bg-primary text-on-primary font-semibold px-3 py-1.5 rounded-lg hover:bg-primary/95 cursor-pointer"
              >
                Save Address
              </button>
            </div>
          </form>
        )}

        <div className="flex flex-col gap-3">
          {addresses.map((addr) => (
            <div key={addr.id} className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 flex items-start gap-3 text-xs justify-between group">
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-neutral-200 flex items-center justify-center text-on-surface font-semibold flex-shrink-0">
                  {addr.label[0]}
                </div>
                <div className="flex-1">
                  <span className="font-semibold text-on-surface">{addr.label}</span>
                  {editingAddrId === addr.id ? (
                    <div className="mt-1.5 flex gap-1">
                      <input
                        type="text"
                        id={`edit-addr-input-${addr.id}`}
                        value={editDetails}
                        onChange={(e) => setEditDetails(e.target.value)}
                        className="bg-white border border-neutral-300 rounded-lg px-2 py-1 text-xs outline-none focus:ring-1 focus:ring-primary text-on-surface"
                      />
                      <button
                        type="button"
                        id={`save-edit-btn-${addr.id}`}
                        onClick={() => handleSaveEdit(addr.id)}
                        className="bg-primary text-on-primary p-1.5 rounded-lg cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <p className="text-on-surface-variant leading-relaxed mt-0.5">{addr.details}</p>
                  )}
                </div>
              </div>

              {editingAddrId !== addr.id && (
                <button
                  type="button"
                  id={`edit-addr-btn-${addr.id}`}
                  onClick={() => handleStartEdit(addr)}
                  className="text-outline hover:text-primary p-1 cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Admin Access Button */}
      <button 
        onClick={() => window.location.href = '/admin'}
        className="w-full mt-2 bg-neutral-800 text-white p-4 rounded-xl flex items-center justify-between shadow-sm cursor-pointer hover:bg-neutral-900 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-neutral-700 flex items-center justify-center">
            <Settings className="w-4 h-4" />
          </div>
          <div className="text-left">
            <span className="font-semibold block text-sm">Admin Dashboard</span>
            <span className="text-xs text-neutral-400">Manage products, offers, orders</span>
          </div>
        </div>
      </button>

      {/* Order History Bento */}
      <div className="bg-white border border-neutral-200/60 rounded-2xl p-5 flex flex-col gap-4 shadow-xs">
        <h3 className="text-sm font-semibold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
          <Package className="w-4 h-4 text-[#ffde4e]" />
          <span>Past Orders</span>
        </h3>

        <div className="flex flex-col gap-4 divide-y divide-neutral-100">
          {MOCK_ORDERS.map((order) => (
            <div key={order.id} className="pt-3 first:pt-0 flex flex-col gap-2">
              <div className="flex justify-between items-start text-xs">
                <div>
                  <span className="font-mono font-semibold text-on-surface">{order.id}</span>
                  <p className="text-[10px] text-outline mt-0.5">{order.date}</p>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-on-surface">₹{order.total}</span>
                  <p className="text-[10px] text-emerald-700 font-semibold mt-0.5">{order.status}</p>
                </div>
              </div>

              {/* Items Summary list */}
              <div className="text-[11px] text-on-surface-variant bg-neutral-50 rounded-lg p-2.5">
                {order.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between mt-0.5 first:mt-0">
                    <span>{it.productName} (x{it.quantity})</span>
                    <span className="font-mono">₹{it.price * it.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  id={`reorder-btn-${order.id}`}
                  onClick={() => onReorder(order.items)}
                  className="text-xs bg-primary-container/10 hover:bg-primary-container/20 text-primary font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reorder All Items</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats section */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-neutral-200/60 p-4 rounded-2xl shadow-xs text-center">
          <Heart className="w-5 h-5 text-red-500 mx-auto mb-1 fill-red-500" />
          <span className="text-lg font-semibold text-on-surface">8 Mins</span>
          <p className="text-[10px] text-outline uppercase font-semibold mt-0.5">Fastest Delivery</p>
        </div>
        <div className="bg-white border border-neutral-200/60 p-4 rounded-2xl shadow-xs text-center">
          <Settings className="w-5 h-5 text-primary mx-auto mb-1" />
          <span className="text-lg font-semibold text-on-surface">₹380 Saved</span>
          <p className="text-[10px] text-outline uppercase font-semibold mt-0.5">Using Super Coupons</p>
        </div>
      </div>

      {/* Logout Button */}
      <button 
        onClick={onLogout}
        className="w-full mt-2 bg-red-50 text-red-600 p-4 rounded-xl flex items-center justify-center gap-2 shadow-sm cursor-pointer hover:bg-red-100 transition-colors font-semibold"
      >
        <LogOut className="w-5 h-5" />
        <span>Log Out</span>
      </button>
    </div>
  );
}
