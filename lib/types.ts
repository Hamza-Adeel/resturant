export type MenuCategory = 
  | 'All'
  | 'Starters'
  | 'BBQ & Grills'
  | 'Curries'
  | 'Biryani & Rice'
  | 'Breads'
  | 'Vegetarian'
  | 'Seafood'
  | 'Desserts'
  | 'Drinks';

export type SpiceLevel = 0 | 1 | 2 | 3; // 0 = Mild/None, 1 = Mild+, 2 = Medium/Spicy, 3 = Extra Hot

export interface MenuItem {
  id: string;
  name: string;
  urduName?: string;
  category: MenuCategory;
  description: string;
  price: number;
  image: string;
  spiceLevel: SpiceLevel;
  isVegetarian?: boolean;
  isVegan?: boolean;
  isChefSpecial?: boolean;
  isPopular?: boolean;
  ingredients: string[];
  allergens?: string[];
  calories?: number;
  prepTime?: string;
  portionSize?: string;
}

export interface CartItem {
  dish: MenuItem;
  quantity: number;
  specialInstructions?: string;
  selectedSpiceLevel?: SpiceLevel;
}

export interface ReservationDetails {
  fullName: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  seatingPreference: 'Indoor Main Hall' | 'Courtyard Terrace' | 'Maharaja Private Dining';
  specialOccasion: 'Casual Dining' | 'Birthday' | 'Anniversary' | 'Business Meeting' | 'Family Gathering' | 'Other';
  specialRequests?: string;
}

export interface OrderDetails {
  orderId: string;
  items: CartItem[];
  orderType: 'delivery' | 'pickup';
  customerName: string;
  phone: string;
  email: string;
  address?: string;
  deliveryNotes?: string;
  paymentMethod: 'cod' | 'card' | 'jazzcash_easypaisa';
  subtotal: number;
  deliveryFee: number;
  tax: number;
  discount: number;
  tip: number;
  total: number;
  status: 'Received' | 'Preparing' | 'Tandoor & Cooking' | 'Out for Delivery' | 'Ready for Pickup';
  timestamp: string;
  estimatedTime: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  role?: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  dishRecommended?: string;
  verified: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Food' | 'Interior' | 'Events' | 'Kitchen';
  image: string;
  description: string;
}

export interface CateringPackage {
  id: string;
  name: string;
  tagline: string;
  pricePerPerson: number;
  minGuests: number;
  badge?: string;
  isPopular?: boolean;
  starters: string[];
  mains: string[];
  riceAndBreads: string[];
  desserts: string[];
  beverages: string[];
  complimentary: string[];
}

export interface SpecialOffer {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  discountPercentage?: number;
  fixedDiscount?: number;
  originalPrice?: number;
  offerPrice?: number;
  image: string;
  badge: string;
  validUntil: string;
  includes: string[];
  terms: string;
}

export interface FAQItem {
  id: string;
  category: 'General & Reservations' | 'Online Orders & Delivery' | 'Dietary & Halal' | 'Catering & Events';
  question: string;
  answer: string;
}
