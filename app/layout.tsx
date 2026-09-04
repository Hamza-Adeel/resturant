import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { ToastProvider } from '../context/ToastContext';
import { CartProvider } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import MobileFloatingBar from '../components/MobileFloatingBar';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Mirch Masala | Authentic South Asian Cuisine & Royal Dining',
  description: 'Experience authentic South Asian flavors, slow-cooked karahis, live charcoal BBQ, aromatic dum biryani, and warm traditional hospitality at Mirch Masala.',
  keywords: [
    'Mirch Masala',
    'Pakistani restaurant',
    'Indian restaurant',
    'Desi cuisine',
    'Halal dining',
    'Chicken Biryani',
    'Mutton Karahi',
    'BBQ Platter',
    'Butter Chicken',
    'Online Food Delivery'
  ],
  authors: [{ name: 'Mirch Masala Culinary Group' }],
  openGraph: {
    title: 'Mirch Masala | Authentic South Asian Cuisine & Royal Dining',
    description: 'Where Every Bite Tells a Story. Taste authentic dum biryani, charcoal kebabs, rich karahis, and artisanal naan in a luxury dining ambiance.',
    url: 'https://mirchmasala-restaurant.com',
    siteName: 'Mirch Masala Restaurant',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Mirch Masala South Asian Royal Feast'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mirch Masala | Authentic South Asian Cuisine',
    description: 'Where Every Bite Tells a Story. Savor exquisite Pakistani and Indian culinary craftsmanship.',
    images: ['https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop'],
  },
  robots: 'index, follow',
};

const restaurantSchema = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Mirch Masala',
  image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop',
  description: 'Local Pakistani and South Asian restaurant offering slow-simmered curries, live charcoal grills, royal dum biryani, and warm hospitality.',
  servesCuisine: ['Pakistani', 'Indian', 'South Asian', 'Mughlai', 'Halal', 'Barbecue'],
  priceRange: '₨₨',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Main Boulevard, Gulberg III',
    addressLocality: 'Lahore',
    addressRegion: 'Punjab',
    postalCode: '54000',
    addressCountry: 'PK'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 31.5204,
    longitude: 74.3587
  },
  telephone: '+92-300-1234567',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Sunday'],
      opens: '12:00',
      closes: '23:00'
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Friday', 'Saturday'],
      opens: '12:00',
      closes: '24:00'
    }
  ],
  menu: 'https://mirchmasala-restaurant.com/menu'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${playfair.variable} ${jakarta.variable} scroll-smooth dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
        />
      </head>
      <body className="min-h-screen bg-[#0c0c0e] text-[#f5f0e8] antialiased flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
        <ToastProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1 pb-16 lg:pb-0">
              {children}
            </main>
            <Footer />
            <CartDrawer />
            <MobileFloatingBar />
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
