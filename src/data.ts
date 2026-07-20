import { Category, Product, UserAddress, OrderHistoryItem } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'dairy',
    name: 'Dairy',
    icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtBy1KkSF9TFf2rPtJ3nTDnDmg8MrYUVXaqs5CtPWslKdBoISqmJwbhKnG2zeWCZh8z1LGq4Hy-FMMazbs2XXzuT2xOO8RfmywQPp7uGwdKIFn3W0AeFD4SOu298VTThwtDERvzelAZhWJ5s7appzfglgA3JlQg82T6tbQJy44bhdBnq9F8XfMuEt2382VO4CbwovMnxH8ECqQ4RbiLZvr6dsw9MBOseqEVHAfS7t41eXB1ahdVQtAAw',
    color: 'bg-green-50'
  },
  {
    id: 'fruits',
    name: 'Fruits',
    icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDq9iEvG0Ce30wYUZzIAqda3Udx2D0OBZqYlnqXa09xHshq0QGCBi8LilgC95KAm5X5DdTNSTHCY8t1u034RqD5sNGpbsxK9u2xyOKaMEnfjBZ3HYavQ9GUfoXzsF7m3E5umweWkvVQUco6K-pC2_Z6Gy4DknOGoJQsQDagifzGW5Sumwy9Jn8QThssZX0ellIIuKoEbu2ycaqBqNiNMUb98NNtyPaoCIA5v7fNhfG_9GUE4gY_Vvwlrg',
    color: 'bg-amber-50'
  },
  {
    id: 'munchies',
    name: 'Munchies',
    icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByadZx4jEGv5OClIIFTEFfz3VuaczDsZ22IO70LuhuR1HkOTubhAsibDUEqnIE7H-K769RWIu02sR5zfIS-U-7n03-997uJLqjEVXv4q6HsbBZ7QKmnX8Ezm3ZVjsEevZbKOy_Q3SzUeoH__VN5rVrqNqm0JtMaBQfKXA5GVFxhHMuiEYv-zT-6odk4ijHoJAs2OAGCW3_lTIBdSCReTMOP0KOvoKQ7TDVjVrl0woLchg2ug-K3z0J7A',
    color: 'bg-rose-50'
  },
  {
    id: 'drinks',
    name: 'Drinks',
    icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXdyINAMFM6aYAIvsJlnPdzRQH_JMOdP1RpOcyMWDr5o5PXVODqlT2d1-R7Mw9d-AM8iZ5IQC2wBqu_OYewArviaTioHM31QBcqrZJcNcdAaa9SWDQsWTrDYCGMipd_rdkPvIzUzHt-h33gqgIfZVH1IiPIoxCFg9OFEjCfySR89kteqKhKNmp-hsXsSAVZLb3NRG14viGZIf_2CG5r59C9NPwSwBAa5cWXeF7-Pt0OGoOnb8IG7cDVg',
    color: 'bg-sky-50'
  },
  {
    id: 'bakery',
    name: 'Bakery',
    icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgSAHH3RNHEuAH36xRnJdGsbF59zuW9IKGZSjrci6N3yAI01VfJGaLJmvA0qtlstJ4e_nDxsspo_7VaMOigM2XPXctAIa06kQP_lp5SEW092w2PALuq5B9lUABmID93g8zCR6LRsQK6UkGmYHyZCaUbY30KcEZ3W8lNdm60v2WnUqu0sH3T6ufhKwxDZSs6BZLtBpOBDV_OL6_hpsRcQQVBKr5Yc_5d9jRmYja3Z0QXcYGwc7iKB1kg',
    color: 'bg-orange-50'
  }
];

export const PRODUCTS: Product[] = [
  // --- DAIRY CATEGORY ---
  {
    id: 'dairy_1',
    name: 'Amul Gold Fresh Milk',
    subCategory: 'Full Cream Milk',
    category: 'dairy',
    price: 33,
    weight: '500 ml',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsvX56qSQzhDbr3tVeJyQ5mPwDzSIFBN8pFROdiE0lF7_MS-Oha6c8Q8qQpdu5GQV_3EAUdjuXe9zrpCV-0rsnuT09tmtC0Q3Vfw7K8UrGXpV0U_ap7SbKcOT-d_hPXEDGS-fYQy39g3xCtu0P3cuxHQ-XRszfJ9JMj2BmHtgInLqr4B_QZCsOj7pgqwzYWB7PkTwAXmB8vclQ-v_DiTFeaYzpaz_2Cq1l-GbFgBwvKZ7N8hsmbLKVOw',
    tag: 'URGENT'
  },
  {
    id: 'dairy_2',
    name: 'Amul Pasteurised Butter',
    subCategory: 'Salted Butter',
    category: 'dairy',
    price: 58,
    weight: '100 g',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXNpiptBHHrVUJU5W07_FXirxTdEn7LP5XtefSedQ9aCRNHSFCyEB8qeUiNjM5Yr-2YYoSm6km_Zu9XooMTRVFKK4mDWVNt0Ho6792lS6I45QFxwOdK1Ls3qoC4zv-P1fWYzpeOP2ptmruWULjXLb1NlZGtzShfA_CZUkvKYa3IXSukAbywQNj_ENMwKXxnluLV-OEL52bIK8XDHn93t5NAmlDCz9B_J5Z2uYKAtPHllC6gQV9k0f5eA'
  },
  {
    id: 'dairy_3',
    name: 'Farm Fresh Brown Eggs',
    subCategory: 'Farm Fresh',
    category: 'dairy',
    price: 72,
    weight: '6 pcs',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIHlclygG5SmbugQF3ePspSv96O896lTkoRdwvzdDC6ckETgEgR0FkSyv-OUxrngD4zLs3m6CtdeId1XzVUyjoKCOhK3PG_1B5GjapPc3_Eem0_bjQ2JQgPHd730CTiCR8crZTrCqSGaQsoUu6hdFY1_cCFyX4Wfs9xRcSMv6n1i6p_fhcEOVSZuEjaouk6CgmHadH-ppOIqjWPzm06TlIWO1wT6w71LV33toEBVdkAIFzVN_rew3bVA'
  },
  {
    id: 'dairy_4',
    name: 'Harvest Gold Brown Bread',
    subCategory: 'Bread',
    category: 'dairy',
    price: 45,
    weight: '400 g',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYloxGIlesO0SCjv1j2YkEz9rW4F-xRxGgDfcPWzS7ReNPXHBFcgI5sZvgaENHqzNA-Xnm4QPozxvt3-nGw7qwRrt9AAwK-hOUu1cF79P_g3VQBNy_Eq5gPB-91ZWziKKaVB7M45kVIaCzXdbl7xnvMTHnakVhT4ePEoqBE5XKOkesC7rj_iVzQICDaG3mJ59mPOxzu6h6zrH67BCxQA9nARNpeghKJ7lxVpa_cVEImx6wW89sEvSovQ',
    tag: 'OFFER'
  },
  {
    id: 'dairy_5',
    name: 'Mother Dairy Paneer Block',
    subCategory: 'Paneer',
    category: 'dairy',
    price: 90,
    weight: '200 g',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtBy1KkSF9TFf2rPtJ3nTDnDmg8MrYUVXaqs5CtPWslKdBoISqmJwbhKnG2zeWCZh8z1LGq4Hy-FMMazbs2XXzuT2xOO8RfmywQPp7uGwdKIFn3W0AeFD4SOu298VTThwtDERvzelAZhWJ5s7appzfglgA3JlQg82T6tbQJy44bhdBnq9F8XfMuEt2382VO4CbwovMnxH8ECqQ4RbiLZvr6dsw9MBOseqEVHAfS7t41eXB1ahdVQtAAw',
    tag: 'POPULAR'
  },
  {
    id: 'dairy_6',
    name: 'Amul Masti Spiced Buttermilk',
    subCategory: 'Buttermilk',
    category: 'dairy',
    price: 20,
    weight: '250 ml',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtBy1KkSF9TFf2rPtJ3nTDnDmg8MrYUVXaqs5CtPWslKdBoISqmJwbhKnG2zeWCZh8z1LGq4Hy-FMMazbs2XXzuT2xOO8RfmywQPp7uGwdKIFn3W0AeFD4SOu298VTThwtDERvzelAZhWJ5s7appzfglgA3JlQg82T6tbQJy44bhdBnq9F8XfMuEt2382VO4CbwovMnxH8ECqQ4RbiLZvr6dsw9MBOseqEVHAfS7t41eXB1ahdVQtAAw'
  },

  // --- FRUITS CATEGORY ---
  {
    id: 'fruits_1',
    name: 'Fresh Robusta Banana',
    subCategory: 'Bananas',
    category: 'fruits',
    price: 49,
    weight: '6 pcs (approx. 800g)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDq9iEvG0Ce30wYUZzIAqda3Udx2D0OBZqYlnqXa09xHshq0QGCBi8LilgC95KAm5X5DdTNSTHCY8t1u034RqD5sNGpbsxK9u2xyOKaMEnfjBZ3HYavQ9GUfoXzsF7m3E5umweWkvVQUco6K-pC2_Z6Gy4DknOGoJQsQDagifzGW5Sumwy9Jn8QThssZX0ellIIuKoEbu2ycaqBqNiNMUb98NNtyPaoCIA5v7fNhfG_9GUE4gY_Vvwlrg',
    tag: 'POPULAR'
  },
  {
    id: 'fruits_2',
    name: 'Shimla Royal Apple',
    subCategory: 'Apples',
    category: 'fruits',
    price: 120,
    weight: '4 pcs (approx. 600g)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDq9iEvG0Ce30wYUZzIAqda3Udx2D0OBZqYlnqXa09xHshq0QGCBi8LilgC95KAm5X5DdTNSTHCY8t1u034RqD5sNGpbsxK9u2xyOKaMEnfjBZ3HYavQ9GUfoXzsF7m3E5umweWkvVQUco6K-pC2_Z6Gy4DknOGoJQsQDagifzGW5Sumwy9Jn8QThssZX0ellIIuKoEbu2ycaqBqNiNMUb98NNtyPaoCIA5v7fNhfG_9GUE4gY_Vvwlrg',
    tag: 'FRESH'
  },
  {
    id: 'fruits_3',
    name: 'Nagpur Fresh Orange',
    subCategory: 'Citrus',
    category: 'fruits',
    price: 89,
    weight: '1 kg',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDq9iEvG0Ce30wYUZzIAqda3Udx2D0OBZqYlnqXa09xHshq0QGCBi8LilgC95KAm5X5DdTNSTHCY8t1u034RqD5sNGpbsxK9u2xyOKaMEnfjBZ3HYavQ9GUfoXzsF7m3E5umweWkvVQUco6K-pC2_Z6Gy4DknOGoJQsQDagifzGW5Sumwy9Jn8QThssZX0ellIIuKoEbu2ycaqBqNiNMUb98NNtyPaoCIA5v7fNhfG_9GUE4gY_Vvwlrg',
    tag: 'OFFER'
  },
  {
    id: 'fruits_4',
    name: 'Red Pomegranate (Anar)',
    subCategory: 'Pomegranates',
    category: 'fruits',
    price: 139,
    weight: '2 pcs (approx. 500g)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDq9iEvG0Ce30wYUZzIAqda3Udx2D0OBZqYlnqXa09xHshq0QGCBi8LilgC95KAm5X5DdTNSTHCY8t1u034RqD5sNGpbsxK9u2xyOKaMEnfjBZ3HYavQ9GUfoXzsF7m3E5umweWkvVQUco6K-pC2_Z6Gy4DknOGoJQsQDagifzGW5Sumwy9Jn8QThssZX0ellIIuKoEbu2ycaqBqNiNMUb98NNtyPaoCIA5v7fNhfG_9GUE4gY_Vvwlrg'
  },

  // --- MUNCHIES CATEGORY ---
  {
    id: 'munchies_1',
    name: "Haldiram's Bhujia Sev",
    subCategory: 'Namkeen',
    category: 'munchies',
    price: 45,
    weight: '150 g',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByadZx4jEGv5OClIIFTEFfz3VuaczDsZ22IO70LuhuR1HkOTubhAsibDUEqnIE7H-K769RWIu02sR5zfIS-U-7n03-997uJLqjEVXv4q6HsbBZ7QKmnX8Ezm3ZVjsEevZbKOy_Q3SzUeoH__VN5rVrqNqm0JtMaBQfKXA5GVFxhHMuiEYv-zT-6odk4ijHoJAs2OAGCW3_lTIBdSCReTMOP0KOvoKQ7TDVjVrl0woLchg2ug-K3z0J7A',
    tag: 'BESTSELLER'
  },
  {
    id: 'munchies_2',
    name: 'Lay’s Classic Salted Chips',
    subCategory: 'Potato Chips',
    category: 'munchies',
    price: 20,
    weight: '50 g',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByadZx4jEGv5OClIIFTEFfz3VuaczDsZ22IO70LuhuR1HkOTubhAsibDUEqnIE7H-K769RWIu02sR5zfIS-U-7n03-997uJLqjEVXv4q6HsbBZ7QKmnX8Ezm3ZVjsEevZbKOy_Q3SzUeoH__VN5rVrqNqm0JtMaBQfKXA5GVFxhHMuiEYv-zT-6odk4ijHoJAs2OAGCW3_lTIBdSCReTMOP0KOvoKQ7TDVjVrl0woLchg2ug-K3z0J7A'
  },
  {
    id: 'munchies_3',
    name: 'Kurkure Masala Munch',
    subCategory: 'Puffs & Twisters',
    category: 'munchies',
    price: 30,
    weight: '90 g',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByadZx4jEGv5OClIIFTEFfz3VuaczDsZ22IO70LuhuR1HkOTubhAsibDUEqnIE7H-K769RWIu02sR5zfIS-U-7n03-997uJLqjEVXv4q6HsbBZ7QKmnX8Ezm3ZVjsEevZbKOy_Q3SzUeoH__VN5rVrqNqm0JtMaBQfKXA5GVFxhHMuiEYv-zT-6odk4ijHoJAs2OAGCW3_lTIBdSCReTMOP0KOvoKQ7TDVjVrl0woLchg2ug-K3z0J7A',
    tag: 'OFFER'
  },
  {
    id: 'munchies_4',
    name: 'Cadbury Dairy Milk Silk',
    subCategory: 'Chocolates',
    category: 'munchies',
    price: 80,
    weight: '60 g',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByadZx4jEGv5OClIIFTEFfz3VuaczDsZ22IO70LuhuR1HkOTubhAsibDUEqnIE7H-K769RWIu02sR5zfIS-U-7n03-997uJLqjEVXv4q6HsbBZ7QKmnX8Ezm3ZVjsEevZbKOy_Q3SzUeoH__VN5rVrqNqm0JtMaBQfKXA5GVFxhHMuiEYv-zT-6odk4ijHoJAs2OAGCW3_lTIBdSCReTMOP0KOvoKQ7TDVjVrl0woLchg2ug-K3z0J7A'
  },

  // --- DRINKS CATEGORY ---
  {
    id: 'drinks_1',
    name: 'Real Mixed Fruit Juice',
    subCategory: 'Fruit Juices',
    category: 'drinks',
    price: 110,
    weight: '1 L',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXdyINAMFM6aYAIvsJlnPdzRQH_JMOdP1RpOcyMWDr5o5PXVODqlT2d1-R7Mw9d-AM8iZ5IQC2wBqu_OYewArviaTioHM31QBcqrZJcNcdAaa9SWDQsWTrDYCGMipd_rdkPvIzUzHt-h33gqgIfZVH1IiPIoxCFg9OFEjCfySR89kteqKhKNmp-hsXsSAVZLb3NRG14viGZIf_2CG5r59C9NPwSwBAa5cWXeF7-Pt0OGoOnb8IG7cDVg',
    tag: 'OFFER'
  },
  {
    id: 'drinks_2',
    name: 'Red Bull Energy Drink',
    subCategory: 'Energy Drinks',
    category: 'drinks',
    price: 125,
    weight: '250 ml',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXdyINAMFM6aYAIvsJlnPdzRQH_JMOdP1RpOcyMWDr5o5PXVODqlT2d1-R7Mw9d-AM8iZ5IQC2wBqu_OYewArviaTioHM31QBcqrZJcNcdAaa9SWDQsWTrDYCGMipd_rdkPvIzUzHt-h33gqgIfZVH1IiPIoxCFg9OFEjCfySR89kteqKhKNmp-hsXsSAVZLb3NRG14viGZIf_2CG5r59C9NPwSwBAa5cWXeF7-Pt0OGoOnb8IG7cDVg',
    tag: 'URGENT'
  },
  {
    id: 'drinks_3',
    name: 'Coca-Cola Soft Drink Can',
    subCategory: 'Cold Drinks',
    category: 'drinks',
    price: 40,
    weight: '330 ml',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXdyINAMFM6aYAIvsJlnPdzRQH_JMOdP1RpOcyMWDr5o5PXVODqlT2d1-R7Mw9d-AM8iZ5IQC2wBqu_OYewArviaTioHM31QBcqrZJcNcdAaa9SWDQsWTrDYCGMipd_rdkPvIzUzHt-h33gqgIfZVH1IiPIoxCFg9OFEjCfySR89kteqKhKNmp-hsXsSAVZLb3NRG14viGZIf_2CG5r59C9NPwSwBAa5cWXeF7-Pt0OGoOnb8IG7cDVg'
  },
  {
    id: 'drinks_4',
    name: 'Bisleri Purified Water',
    subCategory: 'Water',
    category: 'drinks',
    price: 20,
    weight: '1 L',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXdyINAMFM6aYAIvsJlnPdzRQH_JMOdP1RpOcyMWDr5o5PXVODqlT2d1-R7Mw9d-AM8iZ5IQC2wBqu_OYewArviaTioHM31QBcqrZJcNcdAaa9SWDQsWTrDYCGMipd_rdkPvIzUzHt-h33gqgIfZVH1IiPIoxCFg9OFEjCfySR89kteqKhKNmp-hsXsSAVZLb3NRG14viGZIf_2CG5r59C9NPwSwBAa5cWXeF7-Pt0OGoOnb8IG7cDVg'
  },

  // --- BAKERY CATEGORY ---
  {
    id: 'bakery_1',
    name: 'Artisanal Butter Croissant',
    subCategory: 'Croissants',
    category: 'bakery',
    price: 90,
    weight: '2 pcs (approx. 120g)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgSAHH3RNHEuAH36xRnJdGsbF59zuW9IKGZSjrci6N3yAI01VfJGaLJmvA0qtlstJ4e_nDxsspo_7VaMOigM2XPXctAIa06kQP_lp5SEW092w2PALuq5B9lUABmID93g8zCR6LRsQK6UkGmYHyZCaUbY30KcEZ3W8lNdm60v2WnUqu0sH3T6ufhKwxDZSs6BZLtBpOBDV_OL6_hpsRcQQVBKr5Yc_5d9jRmYja3Z0QXcYGwc7iKB1kg',
    tag: 'NEW'
  },
  {
    id: 'bakery_2',
    name: 'Britannia Veg Fruit Cake',
    subCategory: 'Cakes',
    category: 'bakery',
    price: 40,
    weight: '150 g',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgSAHH3RNHEuAH36xRnJdGsbF59zuW9IKGZSjrci6N3yAI01VfJGaLJmvA0qtlstJ4e_nDxsspo_7VaMOigM2XPXctAIa06kQP_lp5SEW092w2PALuq5B9lUABmID93g8zCR6LRsQK6UkGmYHyZCaUbY30KcEZ3W8lNdm60v2WnUqu0sH3T6ufhKwxDZSs6BZLtBpOBDV_OL6_hpsRcQQVBKr5Yc_5d9jRmYja3Z0QXcYGwc7iKB1kg'
  },
  {
    id: 'bakery_3',
    name: 'English Oven Burger Buns',
    subCategory: 'Breads',
    category: 'bakery',
    price: 30,
    weight: '2 pcs',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgSAHH3RNHEuAH36xRnJdGsbF59zuW9IKGZSjrci6N3yAI01VfJGaLJmvA0qtlstJ4e_nDxsspo_7VaMOigM2XPXctAIa06kQP_lp5SEW092w2PALuq5B9lUABmID93g8zCR6LRsQK6UkGmYHyZCaUbY30KcEZ3W8lNdm60v2WnUqu0sH3T6ufhKwxDZSs6BZLtBpOBDV_OL6_hpsRcQQVBKr5Yc_5d9jRmYja3Z0QXcYGwc7iKB1kg',
    tag: 'FRESH'
  }
];

export const MOCK_ADDRESSES: UserAddress[] = [
  {
    id: 'addr_1',
    label: 'Home',
    details: 'Flat 402, Royal Palms, Sector 15, Gurgaon, Haryana - 122001'
  },
  {
    id: 'addr_2',
    label: 'Office',
    details: 'Zoftcares Technologies, Cyber City Phase II, Block C, Gurgaon - 122002'
  }
];

export const MOCK_ORDERS: OrderHistoryItem[] = [
  {
    id: 'ORD-98716',
    date: 'July 18, 2026',
    itemsCount: 3,
    total: 136,
    status: 'Delivered',
    items: [
      { productName: 'Amul Gold Fresh Milk', quantity: 2, price: 33 },
      { productName: 'Harvest Gold Brown Bread', quantity: 1, price: 45 },
      { productName: 'Bisleri Purified Water', quantity: 1, price: 20 }
    ]
  },
  {
    id: 'ORD-84511',
    date: 'July 12, 2026',
    itemsCount: 2,
    total: 103,
    status: 'Delivered',
    items: [
      { productName: 'Amul Pasteurised Butter', quantity: 1, price: 58 },
      { productName: 'Haldiram\'s Bhujia Sev', quantity: 1, price: 45 }
    ]
  }
];
