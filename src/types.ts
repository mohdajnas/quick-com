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
  status: 'Delivered' | 'In Transit' | 'Cancelled';
  items: { productName: string; quantity: number; price: number }[];
}
