import React, { useState } from 'react';
import { Product, Advertisement, OrderHistoryItem, Category } from '../types';
import { Package, Tag, ShoppingBag, Plus, Edit2, Trash2, X } from 'lucide-react';
import { CATEGORIES } from '../data';

interface AdminViewProps {
  products: Product[];
  setProducts: (products: Product[]) => void;
  advertisements: Advertisement[];
  setAdvertisements: (ads: Advertisement[]) => void;
  orders: OrderHistoryItem[];
  setOrders: (orders: OrderHistoryItem[]) => void;
}

export default function AdminView({
  products,
  setProducts,
  advertisements,
  setAdvertisements,
  orders,
  setOrders
}: AdminViewProps) {
  const [activeTab, setActiveTab] = useState<'products' | 'offers' | 'orders'>('products');

  // Modal states
  const [isProductModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [isOfferModalOpen, setOfferModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Advertisement | null>(null);
  const [offerType, setOfferType] = useState<'text' | 'image'>('text');

  const openOfferModal = (offer: Advertisement | null) => {
    setEditingOffer(offer);
    setOfferType(offer?.type || 'text');
    setOfferModalOpen(true);
  };

  // --- Product Handlers ---
  const handleSaveProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const product: Product = {
      id: editingProduct ? editingProduct.id : `prod_${Date.now()}`,
      name: formData.get('name') as string,
      subCategory: formData.get('subCategory') as string,
      category: formData.get('category') as string,
      price: Number(formData.get('price')),
      weight: formData.get('weight') as string,
      image: formData.get('image') as string,
      tag: formData.get('tag') as string || undefined,
    };

    if (editingProduct) {
      setProducts(products.map(p => p.id === product.id ? product : p));
    } else {
      setProducts([product, ...products]);
    }
    setProductModalOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  // --- Offer Handlers ---
  const handleSaveOffer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const offer: Advertisement = {
      id: editingOffer ? editingOffer.id : `ad_${Date.now()}`,
      type: offerType,
      title: (formData.get('title') as string) || '',
      description: (formData.get('description') as string) || '',
      tag: (formData.get('tag') as string) || '',
      bgClass: (formData.get('bgClass') as string) || '',
      textClass: (formData.get('textClass') as string) || '',
      tagBgClass: (formData.get('tagBgClass') as string) || '',
      code: (formData.get('code') as string) || '',
      discount: (formData.get('discount') as string) || '',
      catId: (formData.get('catId') as string) || 'fruits',
      image: formData.get('image') as string,
    };

    if (editingOffer) {
      setAdvertisements(advertisements.map(a => a.id === offer.id ? offer : a));
    } else {
      setAdvertisements([offer, ...advertisements]);
    }
    setOfferModalOpen(false);
    setEditingOffer(null);
  };

  const handleDeleteOffer = (id: string) => {
    if (window.confirm('Are you sure you want to delete this offer?')) {
      setAdvertisements(advertisements.filter(a => a.id !== id));
    }
  };

  return (
    <div className="flex flex-col h-full bg-surface-container-lowest max-w-4xl mx-auto w-full">
      <div className="bg-primary text-on-primary p-6 shadow-sm flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold">Admin CMS</h1>
          <p className="text-sm opacity-90 mt-1">Manage your store's content</p>
        </div>
        <button 
          onClick={() => window.location.href = '/'}
          className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          Exit Admin
        </button>
      </div>

      <div className="flex border-b border-outline-variant bg-surface-container-low">
        <button
          onClick={() => setActiveTab('products')}
          className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${activeTab === 'products' ? 'text-primary border-b-2 border-primary bg-white' : 'text-on-surface-variant hover:bg-black/5'}`}
        >
          <Package className="w-4 h-4" /> Products
        </button>
        <button
          onClick={() => setActiveTab('offers')}
          className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${activeTab === 'offers' ? 'text-primary border-b-2 border-primary bg-white' : 'text-on-surface-variant hover:bg-black/5'}`}
        >
          <Tag className="w-4 h-4" /> Offers
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${activeTab === 'orders' ? 'text-primary border-b-2 border-primary bg-white' : 'text-on-surface-variant hover:bg-black/5'}`}
        >
          <ShoppingBag className="w-4 h-4" /> Orders
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 bg-surface">
        {/* --- PRODUCTS TAB --- */}
        {activeTab === 'products' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Products ({products.length})</h2>
              <button 
                onClick={() => { setEditingProduct(null); setProductModalOpen(true); }}
                className="bg-primary hover:bg-primary-container text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Product
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map(p => (
                <div key={p.id} className="bg-white p-4 rounded-xl border border-neutral-100 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                  <img src={p.image} alt={p.name} className="w-16 h-16 object-contain bg-neutral-50 rounded-lg border border-neutral-100 p-1" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm truncate">{p.name}</h3>
                    <p className="text-xs text-outline mt-0.5">₹{p.price} • {p.weight} • {p.category}</p>
                    {p.tag && <span className="inline-block mt-1 text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded font-semibold">{p.tag}</span>}
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => { setEditingProduct(p); setProductModalOpen(true); }}
                      className="text-primary p-2 hover:bg-primary/10 rounded-lg transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteProduct(p.id)}
                      className="text-red-500 p-2 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- OFFERS TAB --- */}
        {activeTab === 'offers' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Offers ({advertisements.length})</h2>
              <button 
                onClick={() => openOfferModal(null)}
                className="bg-primary hover:bg-primary-container text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Offer
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {advertisements.map(ad => (
                <div key={ad.id} className={`p-5 rounded-2xl flex flex-col gap-3 shadow-md relative overflow-hidden ${ad.bgClass} ${ad.textClass}`}>
                  <div className="flex justify-between items-start z-10">
                    <div>
                      {ad.type !== 'image' && <span className={`text-[10px] font-bold px-2 py-1 rounded mb-2 inline-block ${ad.tagBgClass}`}>{ad.tag}</span>}
                      <h3 className="font-extrabold text-lg leading-tight">{ad.title || (ad.type === 'image' ? 'Image Advertisement' : '')}</h3>
                    </div>
                    <div className="flex gap-1 bg-black/20 p-1 rounded-lg backdrop-blur-sm">
                      <button 
                        onClick={() => openOfferModal(ad)}
                        className="p-1.5 hover:bg-white/20 rounded text-white cursor-pointer transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteOffer(ad.id)}
                        className="p-1.5 hover:bg-red-500/50 rounded text-white cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm opacity-90 z-10 leading-snug">{ad.description}</p>
                  <div className="mt-2 pt-3 border-t border-white/20 flex justify-between items-center z-10">
                    <span className="text-xs font-mono font-bold bg-white/20 px-2 py-1 rounded">Code: {ad.code}</span>
                    <span className="text-sm font-bold">{ad.discount}</span>
                  </div>
                  {/* Decorative Image */}
                  <img src={ad.image} alt="" className="absolute right-[-20px] bottom-[-20px] w-32 h-32 object-contain opacity-40 z-0 pointer-events-none" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- ORDERS TAB --- */}
        {activeTab === 'orders' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 className="text-xl font-bold mb-6">Orders ({orders.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {orders.map(order => (
                <div key={order.id} className="bg-white p-5 rounded-xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-mono font-bold text-base">{order.id}</span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                      order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                      order.status === 'Out for Delivery' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-outline mb-4 flex justify-between">
                    <span>{order.date}</span>
                    <span className="font-semibold text-on-surface">₹{order.total} ({order.itemsCount} items)</span>
                  </p>
                  
                  <div className="pt-3 border-t border-neutral-100">
                    <label className="block text-xs font-semibold text-outline mb-1.5 uppercase tracking-wider">Update Status</label>
                    <select 
                      value={order.status}
                      onChange={(e) => {
                        const newOrders = orders.map(o => o.id === order.id ? { ...o, status: e.target.value as any } : o);
                        setOrders(newOrders);
                      }}
                      className="w-full bg-surface text-sm p-2.5 rounded-lg border border-neutral-200 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all cursor-pointer"
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Packing">Packing</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* --- PRODUCT MODAL --- */}
      {isProductModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-4 border-b border-neutral-100">
              <h3 className="font-bold text-lg">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <button onClick={() => setProductModalOpen(false)} className="p-2 hover:bg-neutral-100 rounded-full cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveProduct} className="p-4 flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Product Name *</label>
                <input required name="name" defaultValue={editingProduct?.name} className="w-full border border-neutral-200 rounded-lg p-2.5 text-sm focus:border-primary outline-none" placeholder="e.g. Amul Gold Fresh Milk" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">Category *</label>
                  <select required name="category" defaultValue={editingProduct?.category || 'dairy'} className="w-full border border-neutral-200 rounded-lg p-2.5 text-sm focus:border-primary outline-none bg-white">
                    {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">Sub Category *</label>
                  <input required name="subCategory" defaultValue={editingProduct?.subCategory} className="w-full border border-neutral-200 rounded-lg p-2.5 text-sm focus:border-primary outline-none" placeholder="e.g. Full Cream Milk" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">Price (₹) *</label>
                  <input required type="number" name="price" defaultValue={editingProduct?.price} className="w-full border border-neutral-200 rounded-lg p-2.5 text-sm focus:border-primary outline-none" placeholder="e.g. 33" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">Weight/Volume *</label>
                  <input required name="weight" defaultValue={editingProduct?.weight} className="w-full border border-neutral-200 rounded-lg p-2.5 text-sm focus:border-primary outline-none" placeholder="e.g. 500 ml" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Image URL *</label>
                <input required name="image" defaultValue={editingProduct?.image} className="w-full border border-neutral-200 rounded-lg p-2.5 text-sm focus:border-primary outline-none" placeholder="https://..." />
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Tag (Optional)</label>
                <input name="tag" defaultValue={editingProduct?.tag} className="w-full border border-neutral-200 rounded-lg p-2.5 text-sm focus:border-primary outline-none" placeholder="e.g. URGENT, OFFER, BESTSELLER" />
              </div>
              <div className="pt-4 border-t border-neutral-100 flex justify-end gap-3">
                <button type="button" onClick={() => setProductModalOpen(false)} className="px-4 py-2 font-semibold text-sm rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-primary text-white font-semibold text-sm rounded-lg hover:bg-primary-container transition-colors cursor-pointer">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- OFFER MODAL --- */}
      {isOfferModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden my-8 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-4 border-b border-neutral-100">
              <h3 className="font-bold text-lg">{editingOffer ? 'Edit Offer' : 'Add New Offer'}</h3>
              <button onClick={() => setOfferModalOpen(false)} className="p-2 hover:bg-neutral-100 rounded-full cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveOffer} className="p-4 flex flex-col gap-4">
              <div className="flex gap-4 mb-2 bg-neutral-50 p-2 rounded-lg border border-neutral-100">
                <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
                  <input type="radio" name="typeGroup" checked={offerType === 'text'} onChange={() => setOfferType('text')} className="text-primary focus:ring-primary" />
                  Text & Graphic
                </label>
                <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
                  <input type="radio" name="typeGroup" checked={offerType === 'image'} onChange={() => setOfferType('image')} className="text-primary focus:ring-primary" />
                  Full Image
                </label>
              </div>

              {offerType === 'text' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-on-surface mb-1">Title *</label>
                      <input required name="title" defaultValue={editingOffer?.title} className="w-full border border-neutral-200 rounded-lg p-2.5 text-sm focus:border-primary outline-none" placeholder="e.g. Mega Fruit Festival!" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-on-surface mb-1">Tag *</label>
                      <input required name="tag" defaultValue={editingOffer?.tag} className="w-full border border-neutral-200 rounded-lg p-2.5 text-sm focus:border-primary outline-none" placeholder="e.g. FARM FRESH" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-on-surface mb-1">Description *</label>
                    <textarea required name="description" defaultValue={editingOffer?.description} rows={2} className="w-full border border-neutral-200 rounded-lg p-2.5 text-sm focus:border-primary outline-none resize-none" placeholder="Short description..." />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-on-surface mb-1">Promo Code *</label>
                      <input required name="code" defaultValue={editingOffer?.code} className="w-full border border-neutral-200 rounded-lg p-2.5 text-sm focus:border-primary outline-none" placeholder="e.g. FRUIT30" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-on-surface mb-1">Discount Text *</label>
                      <input required name="discount" defaultValue={editingOffer?.discount} className="w-full border border-neutral-200 rounded-lg p-2.5 text-sm focus:border-primary outline-none" placeholder="e.g. Up to 30% Off" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                      <label className="block text-xs font-semibold text-on-surface mb-1">Background Gradient Class *</label>
                      <input required name="bgClass" defaultValue={editingOffer?.bgClass} className="w-full border border-neutral-200 rounded-lg p-2.5 text-sm focus:border-primary outline-none font-mono text-[10px]" placeholder="bg-gradient-to-r from-red-500..." />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-on-surface mb-1">Text Class *</label>
                      <input required name="textClass" defaultValue={editingOffer?.textClass || 'text-white'} className="w-full border border-neutral-200 rounded-lg p-2.5 text-sm focus:border-primary outline-none font-mono text-[10px]" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-on-surface mb-1">Tag Background Class *</label>
                      <input required name="tagBgClass" defaultValue={editingOffer?.tagBgClass || 'bg-white/20 text-white'} className="w-full border border-neutral-200 rounded-lg p-2.5 text-sm focus:border-primary outline-none font-mono text-[10px]" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-on-surface mb-1">Target Category ID *</label>
                      <select required name="catId" defaultValue={editingOffer?.catId || 'fruits'} className="w-full border border-neutral-200 rounded-lg p-2.5 text-sm focus:border-primary outline-none bg-white">
                        {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-on-surface mb-1">Decorative Image URL *</label>
                    <input required name="image" defaultValue={editingOffer?.image} className="w-full border border-neutral-200 rounded-lg p-2.5 text-sm focus:border-primary outline-none" placeholder="https://..." />
                  </div>
                </>
              )}

              {offerType === 'image' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-on-surface mb-1">Full Banner Image URL *</label>
                    <input required name="image" defaultValue={editingOffer?.image} className="w-full border border-neutral-200 rounded-lg p-2.5 text-sm focus:border-primary outline-none" placeholder="https://..." />
                    <p className="text-[10px] text-outline mt-1">Recommended aspect ratio is 2:1 (e.g. 800x400px).</p>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-on-surface mb-1">Target Category ID *</label>
                    <select required name="catId" defaultValue={editingOffer?.catId || 'fruits'} className="w-full border border-neutral-200 rounded-lg p-2.5 text-sm focus:border-primary outline-none bg-white">
                      {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                </>
              )}
              
              <div className="pt-4 border-t border-neutral-100 flex justify-end gap-3 mt-2">
                <button type="button" onClick={() => setOfferModalOpen(false)} className="px-4 py-2 font-semibold text-sm rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-primary text-white font-semibold text-sm rounded-lg hover:bg-primary-container transition-colors cursor-pointer">Save Offer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
