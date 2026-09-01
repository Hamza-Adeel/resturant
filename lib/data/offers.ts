import { SpecialOffer } from '../types';

export const SPECIAL_OFFERS: SpecialOffer[] = [
  {
    id: 'off-family',
    code: 'FEAST500',
    title: 'The Sultan Family Feast',
    subtitle: 'A complete celebratory dinner crafted for 4 to 5 people',
    description: 'Enjoy a rich banquet of our top-selling signatures packaged together at an exclusive bundle savings.',
    originalPrice: 4850,
    offerPrice: 3950,
    fixedDiscount: 900,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop',
    badge: 'Save Rs. 900 • Family Favorite',
    validUntil: 'Valid all days for Dine-In & Delivery',
    includes: [
      '1x Royal Chicken Dum Biryani (Large)',
      '1x Desi Murgh Shinwari Karahi (Half)',
      '1x Mixed Seekh Kebab & Malai Boti Platter (8 pcs)',
      '4x Fresh Garlic Butter Naan',
      '1x Zeera Raita & Kachumber Salad',
      '4x Shahi Gulab Jamun',
      '1.5L Chilled Soft Drink'
    ],
    terms: 'Cannot be combined with other promo coupon codes. Available daily.'
  },
  {
    id: 'off-weekend',
    code: 'MIRCH10',
    title: 'Weekend BBQ & Karahi Special',
    subtitle: 'Flat 10% OFF on all signature curries and charcoal grills',
    description: 'Make your weekends extra flavorful. Use coupon code MIRCH10 at checkout to unlock 10% off your entire order.',
    discountPercentage: 10,
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?q=80&w=800&auto=format&fit=crop',
    badge: '10% OFF • Friday to Sunday',
    validUntil: 'Friday – Sunday Every Weekend',
    includes: [
      'Applicable on all BBQ, Grills, Karahis, and Handi dishes',
      'Valid for both online delivery and pickup orders',
      'No minimum order limit'
    ],
    terms: 'Valid during weekend hours only. Apply code MIRCH10 in your cart.'
  },
  {
    id: 'off-lunch',
    code: 'LUNCHBOX',
    title: 'Royal Executive Lunch Box',
    subtitle: 'Quick, hearty, and premium lunch combo for busy workdays',
    description: 'Available Monday to Thursday 12:00 PM – 4:00 PM. Balanced individual meal boxes delivered hot and fast.',
    originalPrice: 1250,
    offerPrice: 890,
    fixedDiscount: 360,
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=800&auto=format&fit=crop',
    badge: 'Special Lunch Pricing',
    validUntil: 'Mon – Thu, 12:00 PM – 4:00 PM',
    includes: [
      'Choice of Butter Chicken or Chicken Karahi portion',
      'Fragrant Saffron Rice or 2 Tandoori Rotis',
      '1 Seekh Kebab piece & Fresh Mint Chutney',
      '1 Hot Gulab Jamun dessert',
      '1 Fresh Mint Lemonade'
    ],
    terms: 'Available for dine-in, takeaway, and delivery during lunch hours.'
  },
  {
    id: 'off-sweet',
    code: 'SWEETFREE',
    title: 'Complimentary Shahi Dessert',
    subtitle: 'Free Zafrani Matka Kheer or Gulab Jamun on orders above Rs. 2,500',
    description: 'Add a sweet royal touch to your family dinners. Automatically qualify for a complimentary dessert with any order over Rs. 2,500.',
    originalPrice: 390,
    offerPrice: 0,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop',
    badge: 'Free Gift with Cart > Rs. 2500',
    validUntil: 'Limited Period Offer',
    includes: [
      'Select between Shahi Gulab Jamun (2 pcs) or Zafrani Matka Kheer',
      'Added during checkout with code SWEETFREE'
    ],
    terms: 'Minimum cart subtotal of Rs. 2,500 required before taxes.'
  }
];
