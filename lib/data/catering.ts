import { CateringPackage } from '../types';

export const CATERING_PACKAGES: CateringPackage[] = [
  {
    id: 'cat-classic',
    name: 'The Classic Dawat Package',
    tagline: 'Ideal for intimate gatherings, birthday celebrations, and family feasts.',
    pricePerPerson: 1850,
    minGuests: 25,
    badge: 'Popular for Family Events',
    isPopular: false,
    starters: [
      'Crispy Vegetable Samosas with Tamarind Dip',
      'Lahori Chicken Pakora with Mint Raita'
    ],
    mains: [
      'Desi Murgh Shinwari Karahi',
      'Velvety Butter Chicken'
    ],
    riceAndBreads: [
      'Royal Mirch Masala Chicken Biryani',
      'Garlic Butter Naan & Roghni Naan',
      'Fresh Garden Salad & Zeera Raita'
    ],
    desserts: [
      'Hot Shahi Gulab Jamun with Pistachio'
    ],
    beverages: [
      'Fresh Mint Lemonade Margarita',
      'Chilled Soft Drinks & Mineral Water'
    ],
    complimentary: [
      'Chafing dishes & serving cutlery',
      'Professional buffet server',
      'Condiment bar (Chutneys, Pickle, Onions)'
    ]
  },
  {
    id: 'cat-royal',
    name: 'The Royal Mughal Banquet',
    tagline: 'Our signature grand feast designed for memorable weddings, corporate galas, and VIP receptions.',
    pricePerPerson: 2950,
    minGuests: 50,
    badge: 'Chef Recommended • Signature Tier',
    isPopular: true,
    starters: [
      'Live Charcoal Seekh Kebab Station',
      'Silk Malai Boti Skewers',
      'Dahi Bhalla Bowls with Pomegranate'
    ],
    mains: [
      'Special Mutton Karahi (Wok Special)',
      'Old Lahore Shahi Nihari with Nalli Marrow',
      'Velvety Butter Chicken',
      'Dal Makhni Bukhara'
    ],
    riceAndBreads: [
      'Hyderabadi Mutton Dum Biryani',
      'Live Tandoor Station: Garlic, Cheese & Roghni Naan',
      'Kachumber Salad, Plum Chutney & Mint Raita'
    ],
    desserts: [
      'Zafrani Matka Kheer',
      'Shahi Gajar Ka Halwa with Khoya',
      'Traditional Malai Matka Kulfi'
    ],
    beverages: [
      'Special Alphonso Mango Lassi',
      'Karak Masala Chai & Kashmiri Pink Chai',
      'Assorted Fresh Juices & Sodas'
    ],
    complimentary: [
      'Full royal brass/copper buffet staging',
      'Live Master Chef & Tandoori Ustaad on-site',
      'Uniformed silver-service hospitality staff',
      'Custom printed commemorative menus'
    ]
  },
  {
    id: 'cat-custom',
    name: 'Bespoke Gourmet Experience',
    tagline: 'Tailor every single dish, cooking style, and presentation to match your exact vision.',
    pricePerPerson: 3600,
    minGuests: 30,
    badge: 'Customizable Selection',
    isPopular: false,
    starters: [
      'Choice of 4 BBQ / Seafood / Vegetarian Starters'
    ],
    mains: [
      'Custom selection of 4 Premium Mutton, Beef, Poultry & Vegetarian Curries'
    ],
    riceAndBreads: [
      'Choice of Dum Biryanis, Kashmiri Pulao & Artisanal Tandoori Flatbreads'
    ],
    desserts: [
      'Dessert Tasting Bar (3 Gourmet Desserts of your choice)'
    ],
    beverages: [
      'Artisanal Mocktail Bar + Traditional Hot Teas'
    ],
    complimentary: [
      'Dedicated Event Operations Director',
      'Customized Tabletop Décor & Linen Styling',
      'Pre-event private tasting session for 4 guests'
    ]
  }
];
