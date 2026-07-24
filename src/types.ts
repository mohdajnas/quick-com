export interface Product {
  id: string;
  name: string;
  subCategory: string;
  category: string;
  price: number;
  weight: string;
  image: string;
  tag?: string; // e.g. "URGENT", "OFFER", "POPULAR", "FRESH"
}

export interface Advertisement {
  id: string;
  type?: 'text' | 'image';
  title: string;
  description: string;
  tag: string;
  bgClass: string;
  textClass: string;
  tagBgClass: string;
  code: string;
  discount: string;
  catId: string;
  image: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color?: string; // light background color tint
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface UserAddress {
  id: string;
  label: string; // e.g. "Home", "Work", "Other"
  details: string;
}

export interface OrderHistoryItem {
  id: string;
  date: string;
  itemsCount: number;
  total: number;
  status: 'Confirmed' | 'Packing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  items: { productName: string; quantity: number; price: number }[];
}
