import React from 'react';
import Link from 'next/link';
import { Award, Flame, Heart, Sparkles, ShieldCheck, Users, Clock, CheckCircle2, Utensils, Calendar } from 'lucide-react';

export const metadata = {
  title: 'Our Story & Heritage | Mirch Masala Restaurant',
  description: 'Learn about the culinary philosophy, spice sourcing, master chefs, and timeline behind Mirch Masala authentic South Asian dining.'
};

export default function AboutPage() {
  const chefs = [
    {
      name: 'Ustaad Tariq Mehmood',
      role: 'Executive Master Chef & Culinary Director',
      experience: '28+ Years of Craft',
      specialty: 'Mughlai Curries & Slow-Braised Karahis',
      image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=600&auto=format&fit=crop',
      bio: 'Trained under generational spice masters in Old Lahore, Chef Tariq has dedicated three decades to perfecting the balance of hand-ground whole spices.'
    },
    {
      name: 'Ustaad Rafiq Qureshi',
      role: 'Head Tandoori & Charcoal Master',
      experience: '22+ Years of Craft',
      specialty: 'Clay Oven Flatbreads & Charcoal Seekh Kebabs',
      image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=600&auto=format&fit=crop',
      bio: 'A true maestro of the glowing clay tandoor. Ustaad Rafiq controls 500-degree clay walls with surgical precision to produce our signature melt-in-mouth naan and smoky kebabs.'
    },
    {
      name: 'Chef Farhan Ali',
      role: 'Sous Chef & Dum Biryani Specialist',
      experience: '14+ Years of Craft',
      specialty: 'Sealed Handi Dum Biryanis & Yakhni Pulao',
      image: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?q=80&w=600&auto=format&fit=crop',
      bio: 'Renowned for his fragrant layered basmati creations, Chef Farhan uses authentic dough-sealed clay pots and premium Iranian saffron infusions.'
    }
  ];

  const timeline = [
    {
      year: '2011',
      title: 'The Humble Beginning',
      description: 'Mirch Masala was born in a modest 6-table eatery with a solitary clay tandoor and a burning obsession for genuine, uncompromised spice recipes.'
    },
    {
      year: '2016',
      title: 'The Signature Karahi Revelation',
      description: 'Our cast-iron Mutton Karahi and Royal Chicken Dum Biryani became citywide favorites, drawing food connoisseurs and families from across the region.'
    },
    {
      year: '2021',
      title: 'Flagship Gulberg Opening & Royal Suite',
      description: 'We relocated to our grand flagship venue on Main Boulevard, featuring the Maharaja Private Dining Suite and open live charcoal grill counters.'
    },
    {
      year: 'Today',
      title: 'Continuing the Flavor Legacy',
      description: 'Serving thousands of satisfied guests monthly through fine dine-in hospitality, luxury bespoke wedding catering, and direct online food delivery.'
    }
  ];

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28">
      {/* 1. Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-bold bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/20 inline-block">
          Authentic Heritage & Soul
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif-luxury font-bold text-cream-100">
          Rooted in Tradition. <br />
          <span className="text-gold-gradient italic">Crafted for Today.</span>
        </h1>
        <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
          At Mirch Masala, every recipe is a tribute to the rich culinary history of South Asia. We blend ancient recipes with modern warmth, pristine hygiene, and royal hospitality.
        </p>
      </div>

      {/* 2. Story Split Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 relative">
          <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop"
              alt="Mirch Masala Charcoal Cooking"
              className="w-full h-[480px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-zinc-950/85 backdrop-blur-md border border-amber-500/20">
              <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">The Sacred Fire</span>
              <p className="text-xs text-zinc-300 mt-1">Live charcoal embers, cast iron karahis, and hand-beaten spices.</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-cream-100">
            A Passion Born from the Heart of South Asian Kitchens
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            Mirch Masala was founded with a singular conviction: real South Asian food cannot be hurried. It requires the gentle browning of onions to deep gold, the slow tempering of whole green cardamom and cloves, and the patient braising of prime meats until they effortlessly yield.
          </p>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            In an era of artificial pastes and mass commercial shortcuts, our ustaads still roast whole coriander seeds, crush Kashmiri chilies by hand, and knead fresh tandoori dough multiple times a day. We believe hospitality is sacred — when you dine with us, you are family at our dastarkhwan.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#14141c] border border-zinc-800">
              <span className="text-2xl font-bold font-mono text-amber-400">100%</span>
              <h4 className="text-xs font-bold text-cream-100 uppercase tracking-wider mt-1">Certified Halal</h4>
              <p className="text-[11px] text-zinc-400 mt-0.5">Ethically sourced, fresh poultry and prime meats.</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#14141c] border border-zinc-800">
              <span className="text-2xl font-bold font-mono text-amber-400">0%</span>
              <h4 className="text-xs font-bold text-cream-100 uppercase tracking-wider mt-1">Artificial Flavors</h4>
              <p className="text-[11px] text-zinc-400 mt-0.5">No synthetic food colorings or commercial extracts.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Core Values */}
      <div className="p-8 sm:p-14 rounded-3xl bg-[#111116] border border-amber-500/20 shadow-2xl">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">What Guides Us</span>
          <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-cream-100">
            Our Pillars of Hospitality
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              👑
            </div>
            <h3 className="text-base font-bold text-cream-100 font-serif-luxury">Royal Authenticity</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              We never compromise traditional techniques for speed. Heritage recipes stay true to their origins.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              🌿
            </div>
            <h3 className="text-base font-bold text-cream-100 font-serif-luxury">Pure Ingredients</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Real desi ghee, whole spices, pure saffron threads, and farm fresh vegetables sourced daily.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              🧼
            </div>
            <h3 className="text-base font-bold text-cream-100 font-serif-luxury">Flawless Hygiene</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Open-kitchen transparency, daily deep sterilization, and strict international culinary safety protocols.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              ❤️
            </div>
            <h3 className="text-base font-bold text-cream-100 font-serif-luxury">Generous Spirit</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Hearty portions, warm attentive service, and an atmosphere where guests feel genuinely cherished.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Master Chefs Profiles */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">The Artisans</span>
          <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-cream-100">
            Meet Our Master Chefs
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Decades of mastery behind the glowing tandoors, whistling karahis, and fragrant biryani pots.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {chefs.map((chef, idx) => (
            <div
              key={idx}
              className="rounded-3xl overflow-hidden bg-[#13131a] border border-zinc-800 hover:border-amber-500/40 transition-all shadow-xl group flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-900">
                <img
                  src={chef.image}
                  alt={chef.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono font-bold text-amber-300 border border-amber-500/30">
                  {chef.experience}
                </div>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-serif-luxury font-bold text-cream-100">
                    {chef.name}
                  </h3>
                  <p className="text-xs text-amber-400 font-semibold mt-0.5">{chef.role}</p>
                  <p className="text-xs text-zinc-300 font-medium mt-2">
                    <strong className="text-cream-100">Specialty:</strong> {chef.specialty}
                  </p>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                    {chef.bio}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-800 flex items-center gap-2 text-xs text-zinc-400">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Verified Master of South Asian Cuisine</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Historical Timeline */}
      <div className="p-8 sm:p-12 rounded-3xl bg-card-gradient border border-zinc-800 relative">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">The Milestones</span>
          <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-cream-100">
            Our Journey Through the Years
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {timeline.map((item, i) => (
            <div key={i} className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2 relative">
              <span className="text-3xl font-serif-luxury font-bold text-amber-400">
                {item.year}
              </span>
              <h3 className="text-base font-bold text-cream-100 font-serif-luxury mt-1">
                {item.title}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Call to Action Banner */}
      <div className="text-center p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-red-950 via-zinc-900 to-amber-950 border border-amber-500/30 space-y-5">
        <h2 className="text-2xl sm:text-4xl font-serif-luxury font-bold text-cream-100">
          Experience the Legend in Person
        </h2>
        <p className="text-xs sm:text-base text-zinc-300 max-w-xl mx-auto">
          Whether joining us for an intimate family dinner or reserving our Maharaja Private Dining Room, we are honored to host you.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/reservations"
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-red-700 to-amber-600 text-white font-bold text-sm shadow-xl hover:scale-105 transition-all"
          >
            Reserve Your Table
          </Link>
          <Link
            href="/menu"
            className="px-8 py-3.5 rounded-xl bg-zinc-900 text-cream-100 font-bold text-sm border border-zinc-700 hover:border-amber-400 transition-all hover:scale-105"
          >
            Browse Full Menu
          </Link>
        </div>
      </div>
    </div>
  );
}
