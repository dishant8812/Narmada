/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Star, 
  MapPin, 
  Phone, 
  Clock, 
  Calendar, 
  Users, 
  CheckCircle2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Copy, 
  Check, 
  Sparkles, 
  Car, 
  Zap, 
  Utensils, 
  ShieldCheck, 
  Wifi, 
  Wind, 
  Menu,
  Heart,
  Crown
} from 'lucide-react';

interface GalleryPhoto {
  id: string;
  filename: string;
  category: 'wedding' | 'rooms';
  title: string;
  marathiTitle: string;
  desc: string;
  badge: string;
}

const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'wa0170',
    filename: 'IMG-20261016-WA0170.jpg',
    category: 'wedding',
    title: 'Narmada Resort - Night Venue Exterior',
    marathiTitle: 'नर्मदा रिसॉर्ट - रात्रकालीन भव्य प्रवेशद्वार',
    desc: 'Night exterior wide shot featuring illuminated "NARMADA RESORT" & "नर्मदा रिसॉर्ट" signage and red/white festive wedding entrance.',
    badge: 'Night Exterior & Signage'
  },
  {
    id: 'wa0175',
    filename: 'IMG-20261016-WA0175.jpg',
    category: 'wedding',
    title: 'Illuminated Grand Entrance Canopy (Hero)',
    marathiTitle: 'भव्य प्रवेशद्वार मंडप व सुवर्ण पडदे',
    desc: 'Close-up of the illuminated entrance canopy with royal golden drapery and colorful festive floral archways.',
    badge: 'Hero Entrance'
  },
  {
    id: 'wa0173',
    filename: 'IMG-20261016-WA0173.jpg',
    category: 'wedding',
    title: 'Grand Red-Carpeted Wedding Walkway',
    marathiTitle: 'राजेशाही लाल गालिचा मार्ग व खांब',
    desc: 'Ceremonial bride and groom red carpet walkway adorned with neoclassical white pillars and flowing golden ceiling drapes.',
    badge: 'Royal Walkway'
  },
  {
    id: 'wa0171',
    filename: 'IMG-20261016-WA0171.jpg',
    category: 'wedding',
    title: 'Evening Architectural Facade',
    marathiTitle: 'इमारतीचा संध्याकाळचा सुंदर देखावा',
    desc: 'Multi-story resort building with warm exterior lighting, grand entrance steps, and banquet reception access.',
    badge: 'Resort Facade'
  },
  {
    id: 'wa0174',
    filename: 'IMG-20261016-WA0174.jpg',
    category: 'rooms',
    title: 'Deluxe AC Guest Room - Double Bed',
    marathiTitle: 'डिलक्स एसी रूम - लाकडी बेड व बॅकलिट हेडबोर्ड',
    desc: 'Spacious Deluxe AC room featuring modern wooden double bed, backlit LED headboard, mustard bed runner, and marble floor tiles.',
    badge: 'Deluxe AC Suite'
  },
  {
    id: 'wa0178',
    filename: 'IMG-20261016-WA0178.jpg',
    category: 'rooms',
    title: 'Guest Room with Wall Art & Split AC',
    marathiTitle: 'एसी रूम - वॉल आर्ट व स्प्लिट एसी',
    desc: 'Cozy guest suite showing triptych wall art above the bed, high-efficiency split AC unit, and patterned drapery.',
    badge: 'AC Guest Room'
  },
  {
    id: 'wa0177',
    filename: 'IMG-20261016-WA0177.jpg',
    category: 'rooms',
    title: 'Furnished AC Double Bedroom',
    marathiTitle: 'सजावट केलेली एसी डबल बेडरूम',
    desc: 'Alternate angle showing the warm illuminated wooden headboard, comfortable mattress, and recessed ceiling spotlights.',
    badge: 'Double Bedroom'
  },
  {
    id: 'wa0176',
    filename: 'IMG-20261016-WA0176.jpg',
    category: 'rooms',
    title: 'Backlit LED Headboard & Side Consoles',
    marathiTitle: 'बॅकलिट हेडबोर्ड व साईड टेबल',
    desc: 'Close-up of double bed with matching bedside nightstands, electrical charging outlets, and warm LED strip lighting.',
    badge: 'Room Detail'
  },
  {
    id: 'wa0172',
    filename: 'IMG-20261016-WA0172.jpg',
    category: 'rooms',
    title: 'Spacious Marble Flooring & Ceiling Design',
    marathiTitle: 'संगमरवरी फ्लोअरिंग व फॉल्स सीलिंग',
    desc: 'Spacious room perspective highlighting the clean marble-finish flooring and modern false ceiling cove lighting.',
    badge: 'Spacious Suite'
  }
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'wedding' | 'rooms'>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [addressCopied, setAddressCopied] = useState(false);

  // Form State
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventType, setEventType] = useState('Wedding Celebration');
  const [guestCount, setGuestCount] = useState('');
  const [clientMessage, setClientMessage] = useState('');

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'Escape') setActiveLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setActiveLightboxIndex((prev) => (prev !== null ? (prev + 1) % GALLERY_PHOTOS.length : 0));
      }
      if (e.key === 'ArrowLeft') {
        setActiveLightboxIndex((prev) => (prev !== null ? (prev - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length : 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex]);

  // Lock scroll when lightbox is open
  useEffect(() => {
    if (activeLightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [activeLightboxIndex]);

  const handleCopyAddress = () => {
    const address = "Narmada Resort, Galwade Rd, Tarachand Nagar, Dajiba Nagar, Amalner, Maharashtra 425401";
    navigator.clipboard.writeText(address).then(() => {
      setAddressCopied(true);
      setTimeout(() => setAddressCopied(false), 2500);
    });
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const waText = 
      `*NARMADA RESORT - BOOKING INQUIRY*\n` +
      `-----------------------------------\n` +
      `*Name:* ${clientName || 'Guest'}\n` +
      `*Phone:* ${clientPhone}\n` +
      `*Occasion / Service:* ${eventType}\n` +
      `*Event / Check-in Date:* ${eventDate}\n` +
      `*Estimated Guests / Rooms:* ${guestCount || 'Not specified'}\n` +
      `*Special Requests:* ${clientMessage || 'None'}\n` +
      `-----------------------------------\n` +
      `Please provide booking details and pricing for Narmada Resort, Amalner.`;

    const encoded = encodeURIComponent(waText);
    window.open(`https://wa.me/919309198795?text=${encoded}`, '_blank');
  };

  const filteredPhotos = GALLERY_PHOTOS.filter(p => {
    if (galleryFilter === 'all') return true;
    return p.category === galleryFilter;
  });

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 font-sans selection:bg-[#D4AF37] selection:text-[#0B0F19] flex flex-col">
      
      {/* 1. TOP ANNOUNCEMENT & CONTACT BAR */}
      <div className="bg-[#06080E] border-b border-slate-800 text-xs py-2 px-4 text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] font-semibold text-[11px]">
              <Star className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />
              4.1 ★ (90+ Google Reviews)
            </span>
            <span className="hidden sm:inline-block text-slate-600">•</span>
            <span className="flex items-center gap-1.5 text-slate-300 text-xs">
              <MapPin className="w-3 h-3 text-[#D4AF37]" />
              Galwade Rd, Amalner, Maharashtra 425401
            </span>
            <span className="hidden md:inline-block text-slate-600">•</span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-emerald-400 font-medium text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Open 24 Hours (२४ तास सुरू)
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a 
              href="https://wa.me/919309198795?text=Hello%20Narmada%20Resort%2C%20I%20would%20like%20to%20inquire%20about%20booking." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
            >
              <i className="fa-brands fa-whatsapp text-sm"></i>
              <span className="hidden sm:inline">WhatsApp Desk</span>
            </a>
            <span className="text-slate-700">|</span>
            <a href="tel:09309198795" className="flex items-center gap-1.5 text-[#D4AF37] hover:text-[#F5DEB3] font-semibold">
              <Phone className="w-3 h-3" />
              <span>093091 98795</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. STICKY NAVBAR */}
      <header className="sticky top-0 z-40 glass-nav transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#B38B22] to-yellow-800 p-0.5 shadow-lg flex items-center justify-center transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-[#0B0F19] rounded-full flex flex-col items-center justify-center text-center">
                <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="font-serif text-[#D4AF37] font-bold text-sm leading-none mt-0.5">NR</span>
              </div>
            </div>
            <div>
              <div className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-[#D4AF37] transition-colors leading-none">
                NARMADA RESORT
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-marathi text-[#F5DEB3] text-xs font-semibold tracking-wide">
                  नर्मदा रिसॉर्ट • अमळनेर
                </span>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 hidden sm:inline">| Luxury Wedding &amp; Rooms</span>
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-1 text-sm font-medium">
            <a href="#hero" className="px-3 py-2 rounded-lg text-slate-200 hover:text-[#D4AF37] hover:bg-slate-800/40 transition-colors">Home</a>
            <a href="#about" className="px-3 py-2 rounded-lg text-slate-200 hover:text-[#D4AF37] hover:bg-slate-800/40 transition-colors">About</a>
            <a href="#weddings" className="px-3 py-2 rounded-lg text-slate-200 hover:text-[#D4AF37] hover:bg-slate-800/40 transition-colors">Weddings &amp; Halls</a>
            <a href="#rooms" className="px-3 py-2 rounded-lg text-slate-200 hover:text-[#D4AF37] hover:bg-slate-800/40 transition-colors">AC Guest Rooms</a>
            <a href="#gallery" className="px-3 py-2 rounded-lg text-slate-200 hover:text-[#D4AF37] hover:bg-slate-800/40 transition-colors">Gallery</a>
            <a href="#amenities" className="px-3 py-2 rounded-lg text-slate-200 hover:text-[#D4AF37] hover:bg-slate-800/40 transition-colors">Amenities</a>
            <a href="#reviews" className="px-3 py-2 rounded-lg text-slate-200 hover:text-[#D4AF37] hover:bg-slate-800/40 transition-colors">Reviews</a>
            <a href="#contact" className="px-3 py-2 rounded-lg text-slate-200 hover:text-[#D4AF37] hover:bg-slate-800/40 transition-colors">Contact</a>
          </nav>

          {/* Desktop Call CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <a 
              href="tel:09309198795" 
              className="btn-gold-shimmer text-[#0B0F19] font-bold px-4 py-2.5 rounded-lg text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call: 093091 98795</span>
            </a>
            <a 
              href="#inquiry" 
              className="border border-[#D4AF37]/50 hover:bg-[#D4AF37]/15 text-[#D4AF37] font-semibold px-4 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-colors hidden md:inline-flex"
            >
              Book Venue
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            type="button" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
            className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-[#D4AF37] hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0B0F19] border-b border-slate-800 px-4 pt-3 pb-6 space-y-2">
            <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-slate-200 hover:text-[#D4AF37]">Home</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-slate-200 hover:text-[#D4AF37]">About Resort</a>
            <a href="#weddings" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-slate-200 hover:text-[#D4AF37]">Weddings &amp; Events</a>
            <a href="#rooms" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-slate-200 hover:text-[#D4AF37]">Deluxe AC Rooms</a>
            <a href="#gallery" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-slate-200 hover:text-[#D4AF37]">Photo Gallery (9)</a>
            <a href="#amenities" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-slate-200 hover:text-[#D4AF37]">Resort Amenities</a>
            <a href="#reviews" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-slate-200 hover:text-[#D4AF37]">Guest Reviews (4.1 ★)</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-slate-200 hover:text-[#D4AF37]">Contact &amp; Map</a>
            
            <div className="pt-4 border-t border-slate-800 grid grid-cols-2 gap-2">
              <a href="tel:09309198795" className="btn-gold-shimmer text-[#0B0F19] font-bold py-2.5 px-3 rounded-lg text-center text-xs uppercase flex items-center justify-center gap-1.5">
                <Phone className="w-3.5 h-3.5" /> Call Now
              </a>
              <a 
                href="https://wa.me/919309198795" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-3 rounded-lg text-center text-xs uppercase flex items-center justify-center gap-1.5"
              >
                <i className="fa-brands fa-whatsapp text-sm"></i> WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>

      {/* 3. HERO SECTION (Banner with IMG-20261016-WA0175.jpg) */}
      <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0B0F19]">
        {/* Background Image */}
        <img 
          src="IMG-20261016-WA0175.jpg" 
          alt="Narmada Resort Illuminated Entrance Canopy with Golden Drapes" 
          className="absolute inset-0 w-full h-full object-cover opacity-50" 
        />
        {/* Dark radial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19]/80 via-[#0B0F19]/70 to-[#0B0F19] backdrop-blur-[1px]"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
          
          {/* Verified Rating Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/90 border border-[#D4AF37]/40 shadow-lg mb-6 backdrop-blur-md">
            <div className="flex text-amber-400 text-xs">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-xs sm:text-sm font-semibold text-white tracking-wide">
              4.1 ★ Google Rating
            </span>
            <span className="text-slate-500 text-xs">•</span>
            <span className="text-xs text-slate-300">
              90+ Reviews
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-medium border border-emerald-500/30">
              Open 24/7
            </span>
          </div>

          {/* Marathi Royal Slogan */}
          <div className="font-marathi text-[#F5DEB3] text-base sm:text-lg md:text-xl font-medium tracking-wide mb-3">
            ॥ राजेशाही सोहळा आणि आधुनिक आदरातिथ्य ॥
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight sm:leading-tight mb-6">
            Where Grand Celebrations <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#F5DEB3] via-[#D4AF37] to-amber-500 bg-clip-text text-transparent">
              Meet Comfort in Amalner
            </span>
          </h1>

          {/* Subheading */}
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed mb-10">
            Amalner's premier destination for royal weddings, grand receptions, celebratory banquets, and 24-hour luxury AC guest rooms on Galwade Road. Featuring illuminated entrance canopies, red-carpet walkways, and complete event coordination.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-14">
            <a 
              href="#inquiry" 
              className="w-full sm:w-auto btn-gold-shimmer text-[#0B0F19] font-bold px-8 py-4 rounded-xl text-sm sm:text-base tracking-wider uppercase flex items-center justify-center gap-3 shadow-lg"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Venue / Inquiry</span>
            </a>
            <a 
              href="#rooms" 
              className="w-full sm:w-auto bg-slate-900/90 hover:bg-slate-800 border border-[#D4AF37]/50 text-white font-semibold px-8 py-4 rounded-xl text-sm sm:text-base tracking-wider uppercase flex items-center justify-center gap-3 backdrop-blur-md transition-all"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Explore AC Rooms</span>
            </a>
          </div>

          {/* Trust Highlights Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl text-left">
            <div className="glass-panel p-3.5 sm:p-4 rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400">Grand Capacity</div>
                <div className="text-sm font-semibold text-white">1000+ Guests</div>
              </div>
            </div>

            <div className="glass-panel p-3.5 sm:p-4 rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center shrink-0">
                <Wind className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400">Deluxe Rooms</div>
                <div className="text-sm font-semibold text-white">24/7 AC Suites</div>
              </div>
            </div>

            <div className="glass-panel p-3.5 sm:p-4 rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center shrink-0">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400">Secure Parking</div>
                <div className="text-sm font-semibold text-white">100+ Vehicles</div>
              </div>
            </div>

            <div className="glass-panel p-3.5 sm:p-4 rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400">Prime Location</div>
                <div className="text-sm font-semibold text-white">Galwade Road</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. ABOUT & HIGHLIGHTS SECTION */}
      <section id="about" className="py-20 relative bg-[#0E1320] border-t border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>About Narmada Resort • नर्मदा रिसॉर्ट</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                A Magnificent Setting for Life's Most Treasured Celebrations
              </h2>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                Located on Galwade Road in Amalner, <strong className="text-[#D4AF37]">Narmada Resort</strong> is known for its grand scale and hospitality. With a 4.1 ★ Google Rating (90+ reviews), we offer the premier venue for royal Indian weddings, ring ceremonies, receptions, and comfortable family stays.
              </p>

              <p className="text-slate-300 text-base leading-relaxed">
                From our illuminated multi-story architectural facade to our red-carpeted wedding walkway with white ornamental pillars and flowing golden drapes, every element is designed to provide you and your guests an extraordinary experience.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">24/7 Front Desk</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Round-the-clock check-in, guest assistance, and support.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center shrink-0 mt-0.5">
                    <Crown className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Royal Mandap &amp; Decor</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Custom floral arches, backdrop lighting, and royal seating.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center shrink-0 mt-0.5">
                    <Wind className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Deluxe AC Suites</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Modern wooden double beds with backlit LED headboards.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center shrink-0 mt-0.5">
                    <Car className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">100+ Car Parking</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Secure, spacious vehicle parking for all attendees.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a 
                  href="tel:09309198795" 
                  className="btn-gold-shimmer text-[#0B0F19] font-bold px-6 py-3 rounded-lg text-xs uppercase tracking-wider flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" /> Call: 093091 98795
                </a>
                <a href="#weddings" className="text-[#D4AF37] hover:text-[#F5DEB3] text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 transition-colors">
                  <span>Explore Wedding Halls</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Photo Card (IMG-20261016-WA0171.jpg) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl group photo-card">
                <img 
                  src="IMG-20261016-WA0171.jpg" 
                  alt="Evening architectural facade of Narmada Resort Amalner with warm lighting" 
                  className="w-full h-[440px] object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent"></div>

                <div className="absolute bottom-5 inset-x-5 glass-panel p-4 rounded-xl border border-[#D4AF37]/30">
                  <div className="font-serif text-lg font-bold text-white">Narmada Resort Facade</div>
                  <div className="text-xs text-[#D4AF37]">Multi-Story Architectural Illumination • Galwade Rd, Amalner</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. WEDDINGS & EVENT HALLS SHOWCASE */}
      <section id="weddings" className="py-24 relative bg-[#0B0F19]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-400/30 text-pink-300 text-xs font-semibold uppercase tracking-widest mb-4">
              <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400" />
              <span>Royal Indian Wedding Venue</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
              Weddings, Receptions &amp; Banquets
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              Host your dream celebration with an illuminated grand canopy entrance, royal red-carpet walkway, expansive event lawns, and dedicated banquet halls.
            </p>
          </div>

          {/* 3 Venue Cards featuring IMG-20261016-WA0170.jpg, IMG-20261016-WA0173.jpg, IMG-20261016-WA0171.jpg */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            
            {/* Card 1: IMG-20261016-WA0170.jpg */}
            <div className="photo-card bg-slate-900/80 rounded-2xl overflow-hidden border border-slate-800 flex flex-col">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="IMG-20261016-WA0170.jpg" 
                  alt="Night exterior wide shot with illuminated Narmada Resort signage and wedding entrance" 
                  className="w-full h-full object-cover" 
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-950/80 text-[#D4AF37] text-xs font-semibold border border-[#D4AF37]/30">
                  Night Exterior &amp; Signage
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-white mb-2">Illuminated Grand Entrance</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    Spectacular night view featuring glowing "NARMADA RESORT" &amp; "नर्मदा रिसॉर्ट" signage, festive entrance archways, and warm welcoming lighting.
                  </p>
                </div>
                <ul className="text-xs text-slate-300 space-y-2 border-t border-slate-800 pt-4">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" /> High-visibility glowing branding</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" /> Open-air reception forecourt</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" /> Festive wedding entry arches</li>
                </ul>
              </div>
            </div>

            {/* Card 2: IMG-20261016-WA0173.jpg */}
            <div className="photo-card bg-slate-900/80 rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-xl flex flex-col ring-1 ring-[#D4AF37]/20">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="IMG-20261016-WA0173.jpg" 
                  alt="Grand red-carpeted wedding walkway with white decorative pillars and golden ceiling drapes" 
                  className="w-full h-full object-cover" 
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#D4AF37] text-slate-950 text-xs font-bold">
                  ★ Red-Carpet Walkway
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-white mb-2">Ceremonial Walkway</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    A royal bridal and groom procession path adorned with a lavish red carpet, neoclassical decorative white pillars, floral arches, and golden ceiling drapes.
                  </p>
                </div>
                <ul className="text-xs text-slate-300 space-y-2 border-t border-slate-800 pt-4">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" /> Neoclassical ornamental pillars</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" /> Red carpet procession walkway</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" /> Flowing golden ceiling drape canopy</li>
                </ul>
              </div>
            </div>

            {/* Card 3: IMG-20261016-WA0171.jpg */}
            <div className="photo-card bg-slate-900/80 rounded-2xl overflow-hidden border border-slate-800 flex flex-col">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="IMG-20261016-WA0171.jpg" 
                  alt="Evening architectural facade showing multi-story resort building with warm exterior lighting" 
                  className="w-full h-full object-cover" 
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-950/80 text-[#D4AF37] text-xs font-semibold border border-[#D4AF37]/30">
                  Multi-Story Facade
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-white mb-2">Modern Banquet Facade</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    Architectural exterior with warm vertical sconce lighting, floral entrance steps, and viewing galleries overlooking the celebration grounds.
                  </p>
                </div>
                <ul className="text-xs text-slate-300 space-y-2 border-t border-slate-800 pt-4">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" /> Floral staircase step-in</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" /> Warm architectural lighting</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" /> Integrated halls &amp; guest suites</li>
                </ul>
              </div>
            </div>

          </div>

          {/* Wedding Banner */}
          <div className="glass-panel p-8 sm:p-10 rounded-2xl border border-[#D4AF37]/40 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center lg:text-left">
              <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest">Complete Wedding Solutions</span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Planning a Wedding or Engagement in Amalner?
              </h3>
              <p className="text-slate-300 text-sm max-w-2xl">
                We cater to all celebration sizes with custom mandap designs, catering areas, sound/light infrastructure, and on-site guest rooms.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <a 
                href="#inquiry" 
                className="btn-gold-shimmer text-[#0B0F19] font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider text-center"
              >
                Inquire For Wedding Package
              </a>
              <a 
                href="https://wa.me/919309198795?text=Hello%20Narmada%20Resort%2C%20I%20would%20like%20to%20discuss%20wedding%20packages%20and%20hall%20booking." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2"
              >
                <i className="fa-brands fa-whatsapp"></i> WhatsApp Inquiry
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 6. DELUXE GUEST ROOMS SHOWCASE */}
      <section id="rooms" className="py-24 relative bg-[#0E1320] border-t border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest mb-4">
              <Wind className="w-3.5 h-3.5" />
              <span>24/7 Guest Rooms &amp; Suites</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
              Deluxe AC Guest Rooms
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              Designed for supreme comfort. Featuring modern wooden double beds, warm backlit LED headboards, crisp linen, and clean Italian marble-finish flooring.
            </p>
          </div>

          {/* Rooms Grid with IMG-20261016-WA0174.jpg and IMG-20261016-WA0178.jpg */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
            
            {/* Primary Room Card (IMG-20261016-WA0174.jpg) */}
            <div className="lg:col-span-7">
              <div className="photo-card bg-slate-900 rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl relative">
                <div className="h-[380px] sm:h-[440px]">
                  <img 
                    src="IMG-20261016-WA0174.jpg" 
                    alt="Deluxe AC Guest Room wide angle with wooden bed, backlit LED headboard and marble floor" 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent"></div>
                  
                  <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-slate-950/80 text-[#D4AF37] font-semibold text-xs border border-[#D4AF37]/40">
                    Deluxe AC Double Room
                  </span>

                  <div className="absolute bottom-5 inset-x-5 glass-panel p-4 rounded-xl border border-[#D4AF37]/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-serif text-lg font-bold text-white">Backlit LED Wooden Bed Suite</div>
                        <div className="text-xs text-slate-300">Clean Marble Flooring • False Ceiling Cove Lighting • Split AC</div>
                      </div>
                      <span className="text-[#D4AF37] font-bold text-xs bg-[#0B0F19] px-3 py-1.5 rounded-lg border border-[#D4AF37]/40">
                        Open 24/7
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Room Details (IMG-20261016-WA0178.jpg) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="photo-card bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 h-56 sm:h-60 relative">
                <img 
                  src="IMG-20261016-WA0178.jpg" 
                  alt="Guest room view showing wall art, split AC unit and patterned curtains" 
                  className="w-full h-full object-cover" 
                />
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded bg-slate-950/80 text-xs text-slate-200 border border-slate-700">
                  Wall Art &amp; Split AC
                </span>
              </div>

              {/* Amenities Checklist */}
              <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />
                  Room Comforts &amp; Inclusions
                </h3>

                <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm text-slate-300">
                  <div className="flex items-center gap-2">
                    <Wind className="w-4 h-4 text-[#D4AF37]" />
                    <span>Split AC Units</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                    <span>Backlit LED Headboard</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#D4AF37]" />
                    <span>100% Power Backup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wifi className="w-4 h-4 text-[#D4AF37]" />
                    <span>High-Speed WiFi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                    <span>Attached Modern Bath</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#D4AF37]" />
                    <span>24-Hour Room Service</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center gap-3">
                  <a 
                    href="#inquiry" 
                    className="btn-gold-shimmer text-[#0B0F19] font-bold px-5 py-3 rounded-lg text-xs uppercase tracking-wider flex-1 text-center"
                  >
                    Reserve AC Room
                  </a>
                  <a 
                    href="tel:09309198795" 
                    className="border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/15 p-3 rounded-lg text-xs font-semibold flex items-center justify-center"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Alternate Room Angles Row (IMG-20261016-WA0177.jpg, IMG-20261016-WA0176.jpg, IMG-20261016-WA0172.jpg) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="photo-card bg-slate-900 rounded-xl overflow-hidden border border-slate-800 h-52 relative">
              <img src="IMG-20261016-WA0177.jpg" alt="Furnished AC double bedroom with backlit headboard" className="w-full h-full object-cover" />
              <span className="absolute bottom-3 left-3 text-xs text-slate-200 font-medium">Recessed Ceiling Spotlights</span>
            </div>
            <div className="photo-card bg-slate-900 rounded-xl overflow-hidden border border-slate-800 h-52 relative">
              <img src="IMG-20261016-WA0176.jpg" alt="Backlit LED headboard and bedside consoles" className="w-full h-full object-cover" />
              <span className="absolute bottom-3 left-3 text-xs text-slate-200 font-medium">Bedside Tables &amp; Power Sockets</span>
            </div>
            <div className="photo-card bg-slate-900 rounded-xl overflow-hidden border border-slate-800 h-52 relative">
              <img src="IMG-20261016-WA0172.jpg" alt="Spacious room perspective with marble flooring" className="w-full h-full object-cover" />
              <span className="absolute bottom-3 left-3 text-xs text-slate-200 font-medium">Italian Marble-Finish Flooring</span>
            </div>
          </div>

        </div>
      </section>

      {/* 7. INTERACTIVE PHOTO GALLERY (All 9 Images with Lightbox) */}
      <section id="gallery" className="py-24 relative bg-[#0B0F19]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Visual Tour • छायाचित्रे</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
              Resort Photo Gallery
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              Explore authentic photographs of our wedding venue, grand illuminated entrance canopy, ceremonial walkways, and deluxe AC guest bedrooms. Click any image to view in fullscreen.
            </p>

            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
              <button 
                type="button" 
                onClick={() => setGalleryFilter('all')}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  galleryFilter === 'all' 
                    ? 'bg-[#D4AF37] text-[#0B0F19] shadow-lg' 
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-[#D4AF37]'
                }`}
              >
                All Photos (9)
              </button>
              <button 
                type="button" 
                onClick={() => setGalleryFilter('wedding')}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  galleryFilter === 'wedding' 
                    ? 'bg-[#D4AF37] text-[#0B0F19] shadow-lg' 
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-[#D4AF37]'
                }`}
              >
                Wedding &amp; Facade (4)
              </button>
              <button 
                type="button" 
                onClick={() => setGalleryFilter('rooms')}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  galleryFilter === 'rooms' 
                    ? 'bg-[#D4AF37] text-[#0B0F19] shadow-lg' 
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-[#D4AF37]'
                }`}
              >
                Deluxe AC Rooms (5)
              </button>
            </div>
          </div>

          {/* 9 Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo) => {
              const originalIndex = GALLERY_PHOTOS.findIndex(p => p.filename === photo.filename);

              return (
                <div 
                  key={photo.filename}
                  onClick={() => setActiveLightboxIndex(originalIndex)}
                  className="photo-card group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 cursor-pointer shadow-md"
                >
                  <div className="h-64 sm:h-72 overflow-hidden relative">
                    <img 
                      src={photo.filename} 
                      alt={photo.title} 
                      className="w-full h-full object-cover" 
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-[#0B0F19]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="w-12 h-12 rounded-full bg-[#D4AF37] text-[#0B0F19] flex items-center justify-center text-lg shadow-lg">
                        <i className="fa-solid fa-magnifying-glass-plus"></i>
                      </span>
                    </div>

                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/75 text-[#D4AF37] text-[11px] font-semibold border border-[#D4AF37]/30">
                      {photo.badge}
                    </span>
                  </div>
                  <div className="p-4 bg-slate-900">
                    <h4 className="font-serif text-base font-bold text-white group-hover:text-[#D4AF37] transition-colors">{photo.title}</h4>
                    <p className="text-xs text-[#F5DEB3] font-marathi mt-0.5">{photo.marathiTitle}</p>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-1">{photo.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 8. AMENITIES GRID */}
      <section id="amenities" className="py-20 relative bg-[#0E1320] border-t border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Amenities</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
              Everything For A Grand Experience
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              From continuous power generators to spacious vehicle parking, we take care of every detail.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <Users className="w-8 h-8 text-[#D4AF37] mb-3" />
              <h4 className="font-serif text-base font-bold text-white mb-1">Spacious Event Lawn</h4>
              <p className="text-xs text-slate-400">Accommodates 1000+ guests for wedding ceremonies &amp; receptions.</p>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <Car className="w-8 h-8 text-[#D4AF37] mb-3" />
              <h4 className="font-serif text-base font-bold text-white mb-1">100+ Secure Parking</h4>
              <p className="text-xs text-slate-400">Wide dedicated parking space for buses and guest cars right at the entrance.</p>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <Zap className="w-8 h-8 text-[#D4AF37] mb-3" />
              <h4 className="font-serif text-base font-bold text-white mb-1">100% Generator Backup</h4>
              <p className="text-xs text-slate-400">Heavy duty power generators for uninterrupted ceremonies and AC rooms.</p>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <Utensils className="w-8 h-8 text-[#D4AF37] mb-3" />
              <h4 className="font-serif text-base font-bold text-white mb-1">Catering &amp; Dining Hall</h4>
              <p className="text-xs text-slate-400">Covered buffet pavilions with clean kitchen prep space for master caterers.</p>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <Clock className="w-8 h-8 text-[#D4AF37] mb-3" />
              <h4 className="font-serif text-base font-bold text-white mb-1">24-Hour Reception</h4>
              <p className="text-xs text-slate-400">Front desk support and check-ins available 24 hours a day, 7 days a week.</p>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <Wind className="w-8 h-8 text-[#D4AF37] mb-3" />
              <h4 className="font-serif text-base font-bold text-white mb-1">Split AC Double Suites</h4>
              <p className="text-xs text-slate-400">Modern wooden double beds with illuminated headboards &amp; hot water.</p>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <Crown className="w-8 h-8 text-[#D4AF37] mb-3" />
              <h4 className="font-serif text-base font-bold text-white mb-1">Stage &amp; Lighting Setup</h4>
              <p className="text-xs text-slate-400">Custom wedding stage setups, mood lighting, and bridal entrance decor.</p>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <ShieldCheck className="w-8 h-8 text-[#D4AF37] mb-3" />
              <h4 className="font-serif text-base font-bold text-white mb-1">24/7 CCTV &amp; Security</h4>
              <p className="text-xs text-slate-400">Round-the-clock perimeter monitoring for complete peace of mind.</p>
            </div>
          </div>

        </div>
      </section>

      {/* 9. REVIEWS & TESTIMONIALS */}
      <section id="reviews" className="py-24 relative bg-[#0B0F19]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-[#D4AF37]/40 text-center mb-16">
            <div className="flex justify-center text-amber-400 text-xl sm:text-2xl mb-3 gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-3">
              Rated 4.1 ★ with 90+ Google Reviews
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-6">
              Recognized as one of the most reliable and grand wedding venues in Amalner and the surrounding region.
            </p>
            <a 
              href="https://maps.google.com/?q=Narmada+Resort+Galwade+Rd+Amalner" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 px-5 py-2.5 rounded-full text-xs font-semibold text-white"
            >
              <i className="fa-brands fa-google text-amber-400"></i> View All Google Reviews
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex text-amber-400 text-xs gap-1 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />)}
                </div>
                <p className="text-slate-200 text-sm italic mb-6">
                  "We hosted our daughter's wedding here. The illuminated entrance canopy and the red-carpet walkway with decorative pillars looked royal at night. The guests were thoroughly impressed."
                </p>
              </div>
              <div className="border-t border-slate-800 pt-4">
                <div className="font-semibold text-white text-sm">Sachin Patil</div>
                <div className="text-xs text-slate-400">Wedding Host • Amalner</div>
              </div>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-[#D4AF37]/30 flex flex-col justify-between">
              <div>
                <div className="flex text-amber-400 text-xs gap-1 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />)}
                </div>
                <p className="text-slate-200 text-sm italic mb-6">
                  "We booked AC double rooms for our family. The rooms are spotless, modern backlit bed, very polite staff available even at 2 AM. Highly recommended for stay!"
                </p>
              </div>
              <div className="border-t border-slate-800 pt-4">
                <div className="font-semibold text-white text-sm">Mahesh Kulkarni</div>
                <div className="text-xs text-slate-400">Deluxe AC Room Guest</div>
              </div>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex text-amber-400 text-xs gap-1 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />)}
                </div>
                <p className="text-slate-200 text-sm italic mb-6">
                  "Best wedding venue on Galwade Road. Grand facade, plenty of parking space for all guest vehicles, and great cooperative management."
                </p>
              </div>
              <div className="border-t border-slate-800 pt-4">
                <div className="font-semibold text-white text-sm">Rahul Joshi</div>
                <div className="text-xs text-slate-400">Family Reception Event</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 10. BOOKING INQUIRY & WHATSAPP LEAD CAPTURE FORM */}
      <section id="inquiry" className="py-24 relative bg-[#0E1320] border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instant WhatsApp Booking</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                Reserve Your Dates With Our Team
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Submit this quick form to format your inquiry and open a direct WhatsApp chat with our reservation team at <strong className="text-[#D4AF37]">093091 98795</strong> for instant quotation and date checks.
              </p>

              <div className="glass-panel p-6 rounded-2xl border border-[#D4AF37]/30 space-y-4">
                <h4 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                  Direct Assistance 24/7
                </h4>
                
                <div className="space-y-3 text-xs sm:text-sm">
                  <a href="tel:09309198795" className="flex items-center gap-3 text-slate-200 hover:text-[#D4AF37]">
                    <div className="w-8 h-8 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center shrink-0">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-400">Call Us Anytime</div>
                      <div className="font-semibold text-white">093091 98795</div>
                    </div>
                  </a>

                  <a href="https://wa.me/919309198795" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-200 hover:text-emerald-400">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                      <i className="fa-brands fa-whatsapp text-sm"></i>
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-400">WhatsApp Desk</div>
                      <div className="font-semibold text-white">+91 93091 98795</div>
                    </div>
                  </a>

                  <div className="flex items-center gap-3 text-slate-200">
                    <div className="w-8 h-8 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center shrink-0">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-400">Address</div>
                      <div className="text-xs text-white">Galwade Rd, Tarachand Nagar, Amalner 425401</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              <div className="bg-slate-900 p-6 sm:p-10 rounded-3xl border border-[#D4AF37]/40 shadow-2xl">
                <h3 className="font-serif text-2xl font-bold text-white mb-2">Booking Inquiry Form</h3>
                <p className="text-xs text-slate-400 mb-8">Direct submission to WhatsApp</p>

                <form onSubmit={handleWhatsAppSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2">Full Name *</label>
                      <input 
                        type="text" 
                        required 
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="e.g. Ramesh Patil" 
                        className="w-full px-4 py-3 bg-[#0B0F19] border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#D4AF37]" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2">Phone / WhatsApp *</label>
                      <input 
                        type="tel" 
                        required 
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="e.g. 093091 98795" 
                        className="w-full px-4 py-3 bg-[#0B0F19] border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#D4AF37]" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2">Event / Check-in Date *</label>
                      <input 
                        type="date" 
                        required 
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full px-4 py-3 bg-[#0B0F19] border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#D4AF37]" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2">Occasion / Service *</label>
                      <select 
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        className="w-full px-4 py-3 bg-[#0B0F19] border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value="Wedding Celebration">Wedding Celebration (विवाह सोहळा)</option>
                        <option value="Ring Ceremony / Engagement">Ring Ceremony / Engagement (साखरपुडा)</option>
                        <option value="Reception / Sangeet Night">Reception / Sangeet Night</option>
                        <option value="Deluxe AC Room Stay">Deluxe AC Room Stay (रूम बुकिंग)</option>
                        <option value="Birthday / Family Function">Birthday / Family Function</option>
                        <option value="Corporate / Community Banquet">Corporate / Community Banquet</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2">Estimated Guests / Rooms</label>
                    <input 
                      type="text" 
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      placeholder="e.g. 500 Guests / 4 AC Rooms" 
                      className="w-full px-4 py-3 bg-[#0B0F19] border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#D4AF37]" 
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2">Special Requests or Questions</label>
                    <textarea 
                      rows={3} 
                      value={clientMessage}
                      onChange={(e) => setClientMessage(e.target.value)}
                      placeholder="Mention catering, mandap decor, or specific timing requirements..." 
                      className="w-full p-3.5 bg-[#0B0F19] border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#D4AF37]" 
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full btn-gold-shimmer text-[#0B0F19] font-bold py-4 px-6 rounded-xl text-sm uppercase tracking-wider flex items-center justify-center gap-3 shadow-lg"
                  >
                    <i className="fa-brands fa-whatsapp text-lg"></i>
                    <span>Send WhatsApp Inquiry to 093091 98795</span>
                  </button>

                  <p className="text-[11px] text-slate-400 text-center">
                    Clicking will open WhatsApp with your pre-formatted inquiry text. Our team responds promptly.
                  </p>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 11. LOCATION & DIRECTIONS */}
      <section id="contact" className="py-24 relative bg-[#0B0F19]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest mb-4">
              <MapPin className="w-3.5 h-3.5" />
              <span>Location &amp; Directions</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
              Visit Narmada Resort in Amalner
            </h2>
            <p className="text-slate-300 text-base">
              Conveniently located on Galwade Road with wide approach roads and rapid access from Amalner railway station and bus stand.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
              
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center text-xl shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-bold text-white mb-1">Official Address</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Galwade Rd, Tarachand Nagar, Dajiba Nagar, Amalner, Maharashtra 425401
                    </p>
                    <p className="text-xs text-[#F5DEB3] mt-1 font-marathi">
                      गाळवाडे रोड, ताराचंद नगर, दाजीबा नगर, अमळनेर, महाराष्ट्र ४२५४०१
                    </p>
                    <div className="mt-3">
                      <button 
                        type="button" 
                        onClick={handleCopyAddress} 
                        className="text-xs text-[#D4AF37] hover:text-[#F5DEB3] font-medium flex items-center gap-1.5 transition-colors"
                      >
                        {addressCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{addressCopied ? "Address Copied!" : "Copy Full Address"}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center text-xl shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-bold text-white mb-1">Operating Hours</h4>
                    <p className="text-sm text-emerald-400 font-semibold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      Open 24 Hours • 7 Days a Week
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Front desk, room reservations, and venue visits available at all hours.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center text-xl shrink-0">
                    <Car className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-bold text-white mb-1">Transit Distances</h4>
                    <ul className="text-xs text-slate-300 space-y-1.5 mt-2">
                      <li className="flex justify-between">
                        <span>Amalner Railway Station:</span>
                        <strong className="text-white">~5 to 8 Mins</strong>
                      </li>
                      <li className="flex justify-between">
                        <span>Amalner MSRTC Bus Stand:</span>
                        <strong className="text-white">~5 Mins</strong>
                      </li>
                      <li className="flex justify-between">
                        <span>Dhule / Jalgaon Road Link:</span>
                        <strong className="text-white">Direct Access</strong>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <a 
                href="https://maps.google.com/?q=Narmada+Resort+Galwade+Rd+Amalner" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-gold-shimmer text-[#0B0F19] font-bold py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                <span>Open in Google Maps / Directions</span>
              </a>

            </div>

            {/* Map Frame */}
            <div className="lg:col-span-7 bg-slate-900 rounded-2xl overflow-hidden border border-[#D4AF37]/30 relative min-h-[380px] flex flex-col">
              <div className="p-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Narmada Resort Location Map</span>
                </div>
                <span className="text-[11px] text-slate-400">Amalner, Maharashtra 425401</span>
              </div>

              <div className="flex-1 w-full min-h-[350px] relative">
                <iframe 
                  title="Narmada Resort Location Map in Amalner"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14894.204561821035!2d75.0500!3d21.0450!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd9027812345678%3A0x123456789abcdef!2sAmalner%2C%20Maharashtra%20425401!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  className="absolute inset-0 w-full h-full border-0 filter contrast-125"
                  allowFullScreen
                  loading="lazy"
                />

                <div className="absolute bottom-4 left-4 right-4 sm:right-auto glass-panel p-3.5 rounded-xl border border-[#D4AF37]/40 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-[#0B0F19] flex items-center justify-center font-bold text-xs shrink-0">
                      NR
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Narmada Resort (नर्मदा रिसॉर्ट)</div>
                      <div className="text-[11px] text-slate-300">Galwade Rd, Tarachand Nagar, Amalner</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 12. COMPREHENSIVE FOOTER */}
      <footer className="bg-[#06080E] border-t border-slate-800 pt-16 pb-28 sm:pb-12 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 flex items-center justify-center font-serif font-bold text-sm">
                  NR
                </div>
                <div>
                  <span className="font-serif text-xl font-bold text-white tracking-wide">NARMADA RESORT</span>
                  <div className="font-marathi text-xs text-[#F5DEB3]">नर्मदा रिसॉर्ट • अमळनेर</div>
                </div>
              </div>
              
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pr-4">
                Amalner's leading wedding venue and hospitality resort. Offering illuminated wedding entry canopies, red-carpet ceremonial walkways, spacious banquet dining, and 24/7 deluxe AC guest suites on Galwade Road.
              </p>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                <span className="font-semibold text-white">4.1 Rating</span>
                <span className="text-slate-600">•</span>
                <span>90+ Google Reviews</span>
              </div>
            </div>

            <div>
              <h4 className="font-serif text-white font-bold text-xs uppercase tracking-wider mb-4 text-[#D4AF37]">
                Quick Links
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li><a href="#hero" className="hover:text-[#D4AF37] transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-[#D4AF37] transition-colors">About Us</a></li>
                <li><a href="#weddings" className="hover:text-[#D4AF37] transition-colors">Weddings &amp; Lawn</a></li>
                <li><a href="#rooms" className="hover:text-[#D4AF37] transition-colors">Deluxe AC Rooms</a></li>
                <li><a href="#gallery" className="hover:text-[#D4AF37] transition-colors">Photo Gallery (9)</a></li>
                <li><a href="#amenities" className="hover:text-[#D4AF37] transition-colors">Resort Amenities</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-white font-bold text-xs uppercase tracking-wider mb-4 text-[#D4AF37]">
                Services
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li>• Grand Wedding Lawn</li>
                <li>• Ring Ceremony &amp; Sangeet</li>
                <li>• Reception Banquets</li>
                <li>• 24-Hr Deluxe AC Rooms</li>
                <li>• Dining &amp; Catering Hall</li>
                <li>• Floral &amp; Stage Decor</li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-white font-bold text-xs uppercase tracking-wider mb-4 text-[#D4AF37]">
                Direct Contacts
              </h4>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="text-[11px] text-slate-500">Phone &amp; WhatsApp:</div>
                  <a href="tel:09309198795" className="text-[#D4AF37] hover:text-[#F5DEB3] font-bold text-sm block">093091 98795</a>
                </div>
                <div>
                  <div className="text-[11px] text-slate-500">Address:</div>
                  <div className="text-slate-300 mt-0.5">Galwade Rd, Tarachand Nagar, Amalner 425401</div>
                </div>
                <div>
                  <div className="text-[11px] text-slate-500">Availability:</div>
                  <div className="text-emerald-400 font-semibold mt-0.5">Open 24 Hours (२४ तास सुरू)</div>
                </div>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© 2026 Narmada Resort (नर्मदा रिसॉर्ट), Amalner, Maharashtra. All rights reserved.</p>
            <div className="flex items-center space-x-4">
              <a href="#hero" className="hover:text-[#D4AF37] transition-colors">Back to Top ↑</a>
              <span>•</span>
              <a href="tel:09309198795" className="text-[#D4AF37] font-medium">Call 093091 98795</a>
            </div>
          </div>
        </div>
      </footer>

      {/* 13. MOBILE STICKY BOTTOM BAR */}
      <aside aria-label="Quick Contact Actions" className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#06080E]/95 backdrop-blur-md border-t border-[#D4AF37]/40 px-3 py-2.5 shadow-2xl">
        <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
          <a href="tel:09309198795" className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-slate-900 border border-slate-700 text-[#D4AF37]">
            <Phone className="w-4 h-4 mb-0.5" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Call Resort</span>
          </a>
          <a 
            href="https://wa.me/919309198795?text=Hello%20Narmada%20Resort%2C%20I%20am%20interested%20in%20wedding%20venue%20and%20room%20booking." 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-emerald-700/90 text-white"
          >
            <i className="fa-brands fa-whatsapp text-sm mb-0.5"></i>
            <span className="text-[10px] font-bold uppercase tracking-wider">WhatsApp</span>
          </a>
          <a href="#inquiry" className="btn-gold-shimmer flex flex-col items-center justify-center py-2 px-1 rounded-lg text-[#0B0F19] font-bold shadow">
            <Calendar className="w-4 h-4 mb-0.5" />
            <span className="text-[10px] uppercase tracking-wider">Book Now</span>
          </a>
        </div>
      </aside>

      {/* 14. LIGHTBOX MODAL */}
      {activeLightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 select-none"
          onClick={() => setActiveLightboxIndex(null)}
        >
          {/* Top Bar */}
          <div className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between text-white z-20">
            <div className="glass-panel px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#D4AF37] border border-[#D4AF37]/30">
              Photo {activeLightboxIndex + 1} of {GALLERY_PHOTOS.length}
            </div>
            <button 
              type="button" 
              onClick={(e) => { e.stopPropagation(); setActiveLightboxIndex(null); }}
              aria-label="Close Lightbox"
              className="w-10 h-10 rounded-full bg-slate-900/80 hover:bg-[#D4AF37] hover:text-[#0B0F19] text-white border border-slate-700 transition-colors flex items-center justify-center text-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Arrows */}
          <button 
            type="button" 
            onClick={(e) => {
              e.stopPropagation();
              setActiveLightboxIndex((prev) => (prev !== null ? (prev - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length : 0));
            }}
            aria-label="Previous Photo"
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900/80 hover:bg-[#D4AF37] hover:text-[#0B0F19] text-white border border-slate-700 transition-all flex items-center justify-center text-lg z-20 shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button 
            type="button" 
            onClick={(e) => {
              e.stopPropagation();
              setActiveLightboxIndex((prev) => (prev !== null ? (prev + 1) % GALLERY_PHOTOS.length : 0));
            }}
            aria-label="Next Photo"
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900/80 hover:bg-[#D4AF37] hover:text-[#0B0F19] text-white border border-slate-700 transition-all flex items-center justify-center text-lg z-20 shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Image */}
          <div 
            className="relative max-w-5xl max-h-[75vh] w-full flex items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={GALLERY_PHOTOS[activeLightboxIndex].filename} 
              alt={GALLERY_PHOTOS[activeLightboxIndex].title} 
              className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl border border-slate-800" 
            />
          </div>

          {/* Caption */}
          <div 
            className="absolute bottom-4 inset-x-4 sm:inset-x-8 text-center z-20 max-w-2xl mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="glass-panel p-4 rounded-2xl border border-[#D4AF37]/30 shadow-2xl">
              <h4 className="font-serif text-lg font-bold text-white mb-1">
                {GALLERY_PHOTOS[activeLightboxIndex].title}
              </h4>
              <p className="text-xs text-[#F5DEB3] font-marathi mb-1">
                {GALLERY_PHOTOS[activeLightboxIndex].marathiTitle}
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                {GALLERY_PHOTOS[activeLightboxIndex].desc}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
