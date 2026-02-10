'use client'

import React, { useState } from 'react';
import { Heart, MapPin, Camera, Calendar, Star, Filter, Search, X, MessageCircle, Home, User, Image, Upload, ChevronRight, Check, DollarSign, Bell, Settings, ArrowLeft, Plus, Eye, Grid } from 'lucide-react';

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────

// Brand: Dark Studio — monochrome base + ice blue accent
const ACCENT = '#4FACFE';
const ACCENT_DIM = 'rgba(79,172,254,0.12)';
const ACCENT_BORDER = 'rgba(79,172,254,0.25)';
const PRIMARY = `linear-gradient(135deg, ${ACCENT} 0%, #00d4ff 100%)`;

// Portfolio stand-ins — dark monochrome tones (real photos replace these)
const gradients = [
  'linear-gradient(160deg, #1e293b 0%, #0f172a 100%)',
  'linear-gradient(160deg, #1a1a2e 0%, #09090b 100%)',
  'linear-gradient(160deg, #27272a 0%, #18181b 100%)',
  'linear-gradient(160deg, #0f3460 0%, #1a1a2e 100%)',
  'linear-gradient(160deg, #1c1c2e 0%, #111827 100%)',
  'linear-gradient(160deg, #18181b 0%, #09090b 100%)',
];
const g = (seed) => gradients[Math.abs(seed) % gradients.length];

// ─── BASE COMPONENTS ─────────────────────────────────────────────────────────

const Avatar = ({ name, seed = 0, size = 'md' }) => {
  const initials = name ? name.split(' ').map(n => n[0]).join('') : '?';
  const sizes = { xs: 'w-7 h-7 text-xs', sm: 'w-9 h-9 text-xs', md: 'w-12 h-12 text-sm', lg: 'w-16 h-16 text-base', xl: 'w-20 h-20 text-xl' };
  // Subtle variation on the accent so avatars feel distinct but on-brand
  const avatarBgs = [
    `linear-gradient(135deg, ${ACCENT} 0%, #00d4ff 100%)`,
    'linear-gradient(135deg, #2d5a8e 0%, #1e3a5f 100%)',
    'linear-gradient(135deg, #3a3a4a 0%, #27272a 100%)',
    'linear-gradient(135deg, #1e4080 0%, #0f2547 100%)',
    `linear-gradient(135deg, #0ea5e9 0%, ${ACCENT} 100%)`,
    'linear-gradient(135deg, #334155 0%, #1e293b 100%)',
  ];
  return (
    <div className={`${sizes[size]} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 ring-2 ring-zinc-950`} style={{ background: avatarBgs[Math.abs(seed) % avatarBgs.length] }}>
      {initials}
    </div>
  );
};

const Pill = ({ children, color = 'zinc' }) => {
  const colors = {
    zinc: 'bg-zinc-800 text-zinc-300 border-zinc-700',
    green: 'bg-green-500/10 text-green-400 border-green-500/20',
    blue: 'text-sky-300 border-sky-400/25',
    yellow: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    purple: 'text-sky-300 border-sky-400/25',
  };
  const inlineStyle = (color === 'blue' || color === 'purple') ? { background: ACCENT_DIM } : {};
  return <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[color]}`} style={inlineStyle}>{children}</span>;
};

const PrimaryButton = ({ children, onClick, className = '', icon: Icon }) => (
  <button onClick={onClick} className={`flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-white font-semibold transition active:scale-95 ${className}`} style={{ background: PRIMARY }}>
    {Icon && <Icon className="w-4 h-4" />}{children}
  </button>
);

// Viewfinder corner-bracket logo mark
const ViewfinderMark = ({ size = 20, color = ACCENT }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <path d="M1 5V2h4" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15 2h4v3" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19 15v3h-4" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 18H1v-3" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="10" cy="10" r="2.5" stroke={color} strokeWidth="1.5"/>
  </svg>
);

const Logo = ({ size = 'md' }) => {
  const cfg = { sm: [16, 'text-sm'], md: [20, 'text-lg'], lg: [26, 'text-2xl'] }[size];
  return (
    <div className="flex items-center gap-2">
      <ViewfinderMark size={cfg[0]} />
      <span className={`text-white font-black ${cfg[1]}`} style={{ letterSpacing: '-0.03em' }}>viewfinder</span>
    </div>
  );
};

const SecondaryButton = ({ children, onClick, className = '', icon: Icon }) => (
  <button onClick={onClick} className={`flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-white font-semibold border border-zinc-700 hover:border-zinc-500 bg-zinc-900 transition active:scale-95 ${className}`}>
    {Icon && <Icon className="w-4 h-4" />}{children}
  </button>
);

const PageHeader = ({ title, subtitle, action }) => (
  <div className="bg-zinc-950/95 backdrop-blur border-b border-zinc-800/60 sticky top-0 z-40">
    <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">{title}</h1>
        {subtitle && <p className="text-zinc-500 text-sm mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  </div>
);

const SectionTitle = ({ children }) => (
  <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">{children}</h2>
);

const Card = ({ children, onClick, className = '' }) => (
  <div onClick={onClick} className={`bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden transition ${onClick ? 'hover:border-zinc-600 cursor-pointer active:scale-[0.99]' : ''} ${className}`}>
    {children}
  </div>
);

// ─── DATA ─────────────────────────────────────────────────────────────────────

const photographers = [
  { id: 1, name: "Sarah Mitchell", specialty: "Wedding & Engagement", style: ["Romantic", "Bright", "Candid"], location: "Downtown Charleston", bio: "Capturing love stories across the Lowcountry for 8+ years.", rating: 4.9, reviews: 127, packages: [{ name: "Engagement Session", price: "$450", details: "2 hours, 50+ edited photos, online gallery" }, { name: "Full Wedding Day", price: "$3,200", details: "8 hours, 500+ photos, second shooter, album" }] },
  { id: 2, name: "Marcus Thompson", specialty: "Portrait & Lifestyle", style: ["Moody", "Editorial", "Urban"], location: "North Charleston", bio: "Creative portrait photographer specializing in personal branding and lifestyle.", rating: 4.8, reviews: 89, packages: [{ name: "Headshot Session", price: "$250", details: "1 hour, 10 edited photos, digital delivery" }, { name: "Personal Branding", price: "$650", details: "3 hours, 40+ photos, multiple locations" }] },
  { id: 3, name: "Emily Chen", specialty: "Family & Maternity", style: ["Bright", "Natural", "Candid"], location: "Mount Pleasant", bio: "Mom of three, lover of chaos and genuine smiles.", rating: 5.0, reviews: 156, packages: [{ name: "Family Session", price: "$400", details: "1.5 hours, beach or park, 30+ photos" }, { name: "Maternity Package", price: "$550", details: "2 sessions, 50+ photos, maternity gown included" }] },
  { id: 4, name: "Jake Harrison", specialty: "Real Estate", style: ["Clean", "Architectural"], location: "James Island", bio: "Architectural and real estate photography that sells homes.", rating: 4.7, reviews: 203, packages: [{ name: "Basic Listing", price: "$175", details: "Up to 2000 sq ft, 20-25 photos, 24hr delivery" }, { name: "Luxury Property", price: "$350", details: "Any size, 40+ photos, twilight shots, drone" }] },
  { id: 5, name: "Olivia Rodriguez", specialty: "Events & Corporate", style: ["Candid", "Documentary"], location: "Downtown Charleston", bio: "Event photographer capturing the energy and moments that matter.", rating: 4.9, reviews: 94, packages: [{ name: "Half Day Event", price: "$600", details: "4 hours, 200+ photos, online gallery" }, { name: "Full Day Corporate", price: "$1,200", details: "8 hours, unlimited photos, same-day highlights" }] },
  { id: 6, name: "David Park", specialty: "Product & Commercial", style: ["Clean", "Minimal", "Studio"], location: "West Ashley", bio: "Product and commercial photographer for brands and small businesses.", rating: 4.8, reviews: 67, packages: [{ name: "Product Photography", price: "$400", details: "Up to 10 products, white background" }, { name: "Brand Package", price: "$1,500", details: "Full day studio, 50+ final images" }] },
  { id: 7, name: "Rachel Green", specialty: "Wedding & Engagement", style: ["Romantic", "Film", "Timeless"], location: "Isle of Palms", bio: "Film photographer capturing timeless love stories.", rating: 5.0, reviews: 142, packages: [{ name: "Engagement + Film", price: "$600", details: "3 hours, film + digital, 60+ photos" }, { name: "Wedding Collection", price: "$4,500", details: "10 hours, film + digital, album, prints" }] },
  { id: 8, name: "Tyler Brooks", specialty: "Portrait & Lifestyle", style: ["Moody", "Cinematic", "Urban"], location: "Downtown Charleston", bio: "Creative director and photographer for musicians, artists and creatives.", rating: 4.9, reviews: 78, packages: [{ name: "Artist Session", price: "$350", details: "2 hours, urban locations, 25+ edited photos" }, { name: "Album Cover Package", price: "$800", details: "Full concept development, 4 hours" }] },
];

const mockGalleries = [
  { id: 1, client: "Johnson Wedding", date: "Jan 18, 2026", photos: 342, shared: true, coverSeed: 0 },
  { id: 2, client: "Rivera Family", date: "Jan 25, 2026", photos: 87, shared: true, coverSeed: 2 },
  { id: 3, client: "Park Headshots", date: "Feb 1, 2026", photos: 45, shared: false, coverSeed: 4 },
  { id: 4, client: "Thompson Engagement", date: "Feb 8, 2026", photos: 128, shared: false, coverSeed: 1 },
];

// ─── NAV ──────────────────────────────────────────────────────────────────────

const BottomNav = ({ items, active, onNavigate }) => (
  <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-white/5 z-50">
    <div className="max-w-lg mx-auto px-1 py-1 flex items-center justify-around">
      {items.map(({ id, icon: Icon, label }) => {
        const isActive = active === id;
        return (
          <button key={id} onClick={() => onNavigate(id)} className="flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition min-w-[64px] relative">
            {isActive && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full" style={{ background: PRIMARY }} />}
            <Icon className={`w-6 h-6 transition ${isActive ? 'text-white' : 'text-zinc-500'}`} />
            <span className={`text-xs font-medium transition ${isActive ? 'text-white' : 'text-zinc-500'}`}>{label}</span>
          </button>
        );
      })}
    </div>
  </div>
);

const ClientNav = ({ active, onNavigate }) => (
  <BottomNav active={active} onNavigate={onNavigate} items={[{ id: 'feed', icon: Home, label: 'For You' }, { id: 'find', icon: Search, label: 'Find' }, { id: 'saved', icon: Heart, label: 'Saved' }, { id: 'bookings', icon: Calendar, label: 'Bookings' }]} />
);

const PhotographerNav = ({ active, onNavigate }) => (
  <BottomNav active={active} onNavigate={onNavigate} items={[{ id: 'feed', icon: Home, label: 'Feed' }, { id: 'galleries', icon: Image, label: 'Galleries' }, { id: 'bookings', icon: Calendar, label: 'Bookings' }, { id: 'portfolio', icon: Grid, label: 'Portfolio' }, { id: 'account', icon: User, label: 'Account' }]} />
);

// ─── SPLASH & ONBOARDING ─────────────────────────────────────────────────────

const SplashScreen = ({ onContinue }) => (
  <div className="min-h-screen bg-black flex flex-col relative overflow-hidden">
    <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full opacity-25" style={{ background: `radial-gradient(circle, ${ACCENT}, transparent)` }} />
    <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #00d4ff, transparent)' }} />
    <div className="absolute top-1/3 right-8 w-48 h-48 rounded-full opacity-10" style={{ background: `radial-gradient(circle, ${ACCENT}, transparent)` }} />
    <div className="relative flex flex-col flex-1 px-7 pt-16 pb-10">
      <div className="mb-14">
        <Logo size="md" />
      </div>
      <div className="mb-12">
        <h1 className="text-[52px] font-black text-white leading-[1.05] mb-5 tracking-tight">
          Discover.<br />Book.<br />
          <span style={{ background: 'linear-gradient(135deg, #667eea 0%, #f093fb 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Deliver.</span>
        </h1>
        <p className="text-zinc-400 text-base leading-relaxed max-w-xs">Find local photographers you'll love, book securely, and get your photos — all in one place.</p>
      </div>
      <div className="space-y-3.5 mb-12">
        {[
          { icon: Search, label: 'Discover', desc: 'Find photographers whose style you love', seed: 0 },
          { icon: Calendar, label: 'Book', desc: 'Book and pay securely in minutes', seed: 2 },
          { icon: Image, label: 'Deliver', desc: 'Your gallery lands right in the app', seed: 4 },
        ].map(({ icon: Icon, label, desc, seed }) => (
          <div key={label} className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md" style={{ background: g(seed) }}><Icon className="w-4 h-4 text-white" /></div>
            <div><p className="text-white font-semibold text-sm">{label}</p><p className="text-zinc-500 text-xs mt-0.5">{desc}</p></div>
          </div>
        ))}
      </div>
      <div className="mt-auto space-y-3">
        <PrimaryButton onClick={onContinue} className="w-full text-base py-4 rounded-2xl shadow-xl">Get Started</PrimaryButton>
        <p className="text-center text-zinc-600 text-xs">100% real photographers · No AI images · 10% only</p>
      </div>
    </div>
  </div>
);

const RoleSelection = ({ onSelectRole }) => (
  <div className="min-h-screen bg-black flex flex-col px-6 py-12">
    <div className="mb-10">
      <Logo size="sm" />
    </div>
    <div className="mb-8">
      <h2 className="text-3xl font-black text-white tracking-tight mb-2">How will you use<br />Viewfinder?</h2>
      <p className="text-zinc-500 text-sm">You'll get a tailored experience for your role</p>
    </div>
    <div className="space-y-3 mb-8">
      {[
        { id: 'client', Icon: Search, title: "I'm looking for a photographer", desc: 'Discover, browse and book local photographers', seed: 0, features: ['Personalized photo feed', 'Book and pay securely', 'Receive your gallery in-app'] },
        { id: 'photographer', Icon: Camera, title: "I'm a photographer", desc: 'Grow your business and connect with clients', seed: 1, features: ['Free profile & portfolio', 'Keep 90% of every booking', 'Deliver galleries in-app'] },
      ].map((role) => (
        <button key={role.id} onClick={() => onSelectRole(role.id)} className="w-full text-left bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-2xl p-5 transition active:scale-[0.99] group">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center shadow-md" style={{ background: g(role.seed) }}><role.Icon className="w-5 h-5 text-white" /></div>
            <div className="flex-1">
              <p className="text-white font-bold mb-1">{role.title}</p>
              <p className="text-zinc-500 text-sm mb-3">{role.desc}</p>
              <div className="space-y-1.5">
                {role.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-zinc-500" />
                    <span className="text-zinc-400 text-xs">{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300 transition mt-1 flex-shrink-0" />
          </div>
        </button>
      ))}
    </div>
    <button onClick={() => onSelectRole('client')} className="w-full py-3 text-zinc-600 hover:text-zinc-400 text-sm transition">Browse as guest →</button>
  </div>
);

// ─── SHARED SCREENS ───────────────────────────────────────────────────────────

const PhotographerProfileScreen = ({ photographer, onBack, onBook }) => (
  <div className="min-h-screen bg-zinc-950 pb-8">
    <div className="bg-zinc-950/95 backdrop-blur border-b border-zinc-800/60 sticky top-0 z-40">
      <div className="max-w-2xl mx-auto px-4 py-3">
        <button onClick={onBack} className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition text-sm">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </div>
    </div>
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Hero */}
      <div className="flex items-start gap-4 mb-4">
        <Avatar name={photographer.name} seed={photographer.id} size="xl" />
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-black text-white tracking-tight mb-1">{photographer.name}</h1>
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="text-zinc-400 text-sm flex items-center gap-1"><Camera className="w-3.5 h-3.5" />{photographer.specialty}</span>
            <span className="text-zinc-500">·</span>
            <span className="text-zinc-400 text-sm flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{photographer.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-white font-bold text-sm">{photographer.rating}</span>
            <span className="text-zinc-500 text-sm">({photographer.reviews} reviews)</span>
          </div>
        </div>
      </div>
      <p className="text-zinc-300 text-sm leading-relaxed mb-4">{photographer.bio}</p>
      <div className="flex flex-wrap gap-1.5 mb-5">
        {photographer.style.map((s, i) => <Pill key={i}>{s}</Pill>)}
      </div>
      <div className="flex gap-2.5 mb-8">
        <PrimaryButton onClick={() => onBook(photographer)} className="flex-1" icon={Calendar}>Book Session</PrimaryButton>
        <SecondaryButton className="px-4"><MessageCircle className="w-5 h-5" /></SecondaryButton>
      </div>
      {/* Portfolio */}
      <SectionTitle>Portfolio</SectionTitle>
      <div className="grid grid-cols-3 gap-1.5 mb-8">
        {Array(9).fill(0).map((_, i) => (
          <div key={i} className="aspect-square rounded-xl overflow-hidden" style={{ background: g(photographer.id + i) }} />
        ))}
      </div>
      {/* Packages */}
      <SectionTitle>Packages & Pricing</SectionTitle>
      <div className="space-y-2.5">
        {photographer.packages.map((pkg, i) => (
          <Card key={i} onClick={() => {}} className="p-4">
            <div className="flex items-start justify-between mb-1">
              <p className="text-white font-bold">{pkg.name}</p>
              <p className="text-white font-black text-lg">{pkg.price}</p>
            </div>
            <p className="text-zinc-500 text-sm">{pkg.details}</p>
          </Card>
        ))}
      </div>
    </div>
  </div>
);

const BookingConfirmation = ({ onBack }) => (
  <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
    <div className="max-w-sm w-full text-center">
      <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
        <Check className="w-10 h-10 text-white" strokeWidth={3} />
      </div>
      <h2 className="text-3xl font-black text-white tracking-tight mb-3">You're booked!</h2>
      <p className="text-zinc-400 leading-relaxed mb-8">Your photographer will confirm within 24 hours. Your photos will be delivered through Viewfinder galleries.</p>
      <PrimaryButton onClick={onBack} className="w-full text-base py-4 rounded-2xl">Back to Feed</PrimaryButton>
    </div>
  </div>
);

// ─── CLIENT SCREENS ───────────────────────────────────────────────────────────

const ClientFeed = ({ onViewProfile }) => (
  <div className="min-h-screen bg-black pb-20">
    <div className="bg-black/60 backdrop-blur-xl border-b border-white/5 fixed top-0 left-0 right-0 z-40">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo size="sm" />
        </div>
        <Bell className="w-5 h-5 text-zinc-500" />
      </div>
    </div>
    <div className="pt-14">
      {photographers.map((photographer, pi) =>
        Array(2).fill(0).map((_, idx) => (
          <div key={`${photographer.id}-${idx}`} className="relative w-full h-screen">
            <div className="absolute inset-0" style={{ background: g(pi * 2 + idx) }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
            <div className="absolute top-6 left-4 right-4 flex items-center justify-between">
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5">
                <Avatar name={photographer.name} seed={photographer.id} size="xs" />
                <span className="text-white text-xs font-semibold">{photographer.name}</span>
                <span className="text-white/50 text-xs">·</span>
                <span className="text-white/70 text-xs">{photographer.specialty}</span>
              </div>
              <button className="w-9 h-9 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </button>
            </div>
            {/* Bottom CTA */}
            <div className="absolute bottom-24 left-0 right-0 px-4">
              <p className="text-white/80 text-sm mb-4 line-clamp-2">{photographer.bio}</p>
              <button onClick={() => onViewProfile(photographer)} className="w-full py-3.5 bg-white text-black font-bold rounded-2xl text-sm active:scale-[0.98] transition">
                View Portfolio & Book
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);

const ClientFind = ({ onViewProfile }) => {
  const [showFilters, setShowFilters] = useState(false);
  return (
    <div className="min-h-screen bg-zinc-950 pb-20">
      <PageHeader
        title="Find Photographers"
        subtitle={`${photographers.length} photographers in Charleston`}
        action={
          <button onClick={() => setShowFilters(!showFilters)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition border ${showFilters ? 'bg-white text-black border-white' : 'border-zinc-700 text-zinc-300 hover:border-zinc-500'}`}>
            <Filter className="w-3.5 h-3.5" /> Filters
          </button>
        }
      />
      {showFilters && (
        <div className="max-w-3xl mx-auto px-4 pt-3">
          <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800 grid grid-cols-3 gap-3">
            {[{ label: 'Specialty', opts: ['Wedding', 'Portrait', 'Family', 'Real Estate', 'Events'] }, { label: 'Style', opts: ['Romantic', 'Moody', 'Bright', 'Candid'] }, { label: 'Location', opts: ['Downtown', 'Mount Pleasant', 'James Island'] }].map(({ label, opts }) => (
              <div key={label}>
                <label className="text-xs text-zinc-500 mb-1.5 block font-medium">{label}</label>
                <select className="w-full px-2.5 py-1.5 bg-zinc-800 border border-zinc-700 text-white rounded-lg text-xs focus:outline-none">
                  <option>All</option>{opts.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="max-w-3xl mx-auto px-4 py-4 grid grid-cols-3 gap-1">
        {photographers.map((p, pi) => Array(3).fill(0).map((_, idx) => (
          <div key={`${p.id}-${idx}`} onClick={() => onViewProfile(p)} className="aspect-square cursor-pointer group relative overflow-hidden rounded-sm" style={{ background: g(pi * 3 + idx) }}>
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-end p-2">
              <p className="text-white text-xs font-semibold truncate">{p.name}</p>
            </div>
          </div>
        )))}
      </div>
    </div>
  );
};

const ClientSaved = ({ onViewProfile }) => (
  <div className="min-h-screen bg-zinc-950 pb-20">
    <PageHeader title="Saved" subtitle="3 photographers" />
    <div className="max-w-2xl mx-auto px-4 py-5 space-y-3">
      {photographers.slice(0, 3).map((p, i) => (
        <Card key={p.id} onClick={() => onViewProfile(p)} className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <Avatar name={p.name} seed={i} size="md" />
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold truncate">{p.name}</p>
              <p className="text-zinc-400 text-sm">{p.specialty}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" /><span className="text-white text-sm font-semibold">{p.rating}</span></div>
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-1">
            {Array(3).fill(0).map((_, idx) => <div key={idx} className="aspect-square rounded-lg" style={{ background: g(i * 3 + idx + 1) }} />)}
          </div>
        </Card>
      ))}
    </div>
  </div>
);

const ClientBookings = ({ onViewGallery }) => {
  const bookings = [
    { id: 1, photographer: photographers[0], date: "Feb 14, 2026", type: "Engagement Session", status: "confirmed", hasGallery: false },
    { id: 2, photographer: photographers[2], date: "Jan 25, 2026", type: "Family Session", status: "completed", hasGallery: true, photoCount: 87 },
    { id: 3, photographer: photographers[4], date: "Dec 10, 2025", type: "Corporate Event", status: "completed", hasGallery: true, photoCount: 214 },
  ];
  const statusColor = { confirmed: 'blue', completed: 'green', pending: 'yellow' };
  return (
    <div className="min-h-screen bg-zinc-950 pb-20">
      <PageHeader title="My Bookings" subtitle="3 sessions" />
      <div className="max-w-2xl mx-auto px-4 py-5 space-y-3">
        {bookings.map((b, i) => (
          <Card key={b.id} className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Avatar name={b.photographer.name} seed={i + 2} size="md" />
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold truncate">{b.photographer.name}</p>
                <p className="text-zinc-400 text-sm">{b.type}</p>
                <p className="text-zinc-600 text-xs mt-0.5">{b.date}</p>
              </div>
              <Pill color={statusColor[b.status]}>{b.status}</Pill>
            </div>
            {b.hasGallery ? (
              <button onClick={() => onViewGallery(b)} className="w-full py-2.5 rounded-xl border text-sm font-semibold text-white flex items-center justify-center gap-2 transition" style={{ background: ACCENT_DIM, borderColor: ACCENT_BORDER }}>
                <Image className="w-4 h-4" /> View Gallery · {b.photoCount} photos
              </button>
            ) : (
              <div className="w-full py-2.5 rounded-xl border border-zinc-800 text-xs text-zinc-600 flex items-center justify-center gap-2">
                <Image className="w-3.5 h-3.5" /> Gallery delivered after your session
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

const ClientGalleryView = ({ booking, onBack }) => {
  const [selected, setSelected] = useState([]);
  const count = Math.min(booking.photoCount, 24);
  const toggle = (i) => setSelected(p => p.includes(i) ? p.filter(x => x !== i) : [...p, i]);
  return (
    <div className="min-h-screen bg-zinc-950 pb-24">
      <div className="bg-zinc-950/95 backdrop-blur border-b border-zinc-800/60 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <button onClick={onBack} className="flex items-center gap-1.5 text-zinc-400 hover:text-white text-sm mb-2"><ArrowLeft className="w-4 h-4" /> Back</button>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-bold">{booking.photographer.name}</p>
              <p className="text-zinc-500 text-xs">{booking.type} · {booking.date} · {booking.photoCount} photos</p>
            </div>
            {selected.length > 0 && <Pill color="purple">{selected.length} selected</Pill>}
          </div>
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-4 pt-3 pb-4">
        <div className="flex gap-1.5 mb-3 overflow-x-auto pb-1">
          {['All', 'Favorites', 'Portraits', 'Candid', 'Details'].map((tab, i) => (
            <button key={tab} className={`px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 border transition ${i === 0 ? 'bg-white text-black border-white' : 'text-zinc-400 border-zinc-700'}`}>{tab}</button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-0.5">
          {Array(count).fill(0).map((_, i) => (
            <div key={i} onClick={() => toggle(i)} className="aspect-square relative cursor-pointer">
              <div className="w-full h-full" style={{ background: g(i) }} />
              {selected.includes(i) && (
                <div className="absolute inset-0 ring-2 ring-white ring-inset">
                  <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <Check className="w-3 h-3 text-black" strokeWidth={3} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        {booking.photoCount > 24 && <p className="text-center text-zinc-600 text-xs mt-3">+{booking.photoCount - 24} more photos</p>}
      </div>
      <div className="fixed bottom-0 left-0 right-0 px-4 pb-6 pt-3 bg-gradient-to-t from-zinc-950 to-transparent">
        <div className="max-w-2xl mx-auto flex gap-2.5">
          <SecondaryButton className="flex-1">Download All</SecondaryButton>
          <PrimaryButton className="flex-1">Order Prints</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

// ─── PHOTOGRAPHER SCREENS ─────────────────────────────────────────────────────

const PhotographerFeed = ({ onViewProfile }) => (
  <div className="min-h-screen bg-black pb-20">
    <div className="bg-black/60 backdrop-blur-xl border-b border-white/5 fixed top-0 left-0 right-0 z-40">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo size="sm" />
        </div>
        <Pill color="purple">Photographer</Pill>
      </div>
    </div>
    <div className="pt-14">
      {photographers.map((photographer, pi) =>
        Array(2).fill(0).map((_, idx) => (
          <div key={`${photographer.id}-${idx}`} className="relative w-full h-screen">
            <div className="absolute inset-0" style={{ background: g(pi * 2 + idx) }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
            <div className="absolute top-6 left-4 right-4 flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5 self-start">
              <Avatar name={photographer.name} seed={photographer.id} size="xs" />
              <span className="text-white text-xs font-semibold">{photographer.name}</span>
              <span className="text-white/50 text-xs">·</span>
              <span className="text-white/70 text-xs">{photographer.specialty}</span>
            </div>
            <div className="absolute bottom-24 left-4 right-4">
              <button onClick={() => onViewProfile(photographer)} className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-xl border border-white/20 hover:bg-white/20 transition">
                View Profile
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);

const PhotographerGalleries = ({ onOpenGallery, onNewGallery }) => (
  <div className="min-h-screen bg-zinc-950 pb-20">
    <PageHeader
      title="Galleries"
      subtitle={`${mockGalleries.length} sessions`}
      action={<PrimaryButton onClick={onNewGallery} className="py-2 px-3.5 text-sm rounded-xl" icon={Plus}>New</PrimaryButton>}
    />
    <div className="max-w-2xl mx-auto px-4 py-5 space-y-3">
      {mockGalleries.map((gallery) => (
        <Card key={gallery.id} onClick={() => onOpenGallery(gallery)} className="flex overflow-hidden">
          <div className="w-20 h-20 flex-shrink-0" style={{ background: g(gallery.coverSeed) }} />
          <div className="flex-1 p-3.5 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <p className="text-white font-bold truncate">{gallery.client}</p>
              <Pill color={gallery.shared ? 'green' : 'zinc'}>{gallery.shared ? 'Shared' : 'Draft'}</Pill>
            </div>
            <p className="text-zinc-500 text-xs mb-2">{gallery.date}</p>
            <div className="flex items-center gap-3 text-xs text-zinc-500">
              <span className="flex items-center gap-1"><Image className="w-3 h-3" />{gallery.photos} photos</span>
              {gallery.shared && <span className="flex items-center gap-1 text-green-500"><Eye className="w-3 h-3" />Client notified</span>}
            </div>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

const GalleryDetail = ({ gallery, onBack }) => {
  const [selectedForFeed, setSelectedForFeed] = useState([0, 3, 7]);
  const count = Math.min(gallery.photos, 24);
  const toggle = (i) => setSelectedForFeed(p => p.includes(i) ? p.filter(x => x !== i) : [...p, i]);
  return (
    <div className="min-h-screen bg-zinc-950 pb-24">
      <div className="bg-zinc-950/95 backdrop-blur border-b border-zinc-800/60 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <button onClick={onBack} className="flex items-center gap-1.5 text-zinc-400 hover:text-white text-sm mb-2"><ArrowLeft className="w-4 h-4" /> Galleries</button>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-bold">{gallery.client}</p>
              <p className="text-zinc-500 text-xs">{gallery.photos} photos · {gallery.date}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-4 pt-4">
        {/* Post to feed banner */}
        <div className="rounded-2xl p-4 mb-4" style={{ background: ACCENT_DIM, border: `1px solid ${ACCENT_BORDER}` }}>
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-white font-semibold text-sm">Post to Discovery Feed</p>
            <span className="text-xs text-zinc-400">{selectedForFeed.length} selected</span>
          </div>
          <p className="text-zinc-500 text-xs mb-3">Selected photos appear in client discovery feeds and drive bookings.</p>
          <PrimaryButton className={`w-full py-2.5 rounded-xl text-sm ${selectedForFeed.length === 0 ? 'opacity-40' : ''}`}>
            {selectedForFeed.length > 0 ? `Publish ${selectedForFeed.length} Photos` : 'Select photos below'}
          </PrimaryButton>
        </div>
        <p className="text-zinc-600 text-xs mb-2">Tap to select for feed · All photos shared with client</p>
        <div className="grid grid-cols-3 gap-0.5">
          {Array(count).fill(0).map((_, i) => (
            <div key={i} onClick={() => toggle(i)} className="aspect-square relative cursor-pointer">
              <div className="w-full h-full" style={{ background: g(gallery.coverSeed + i) }} />
              {selectedForFeed.includes(i) && (
                <div className="absolute inset-0 ring-2 ring-white ring-inset">
                  <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow">
                    <Check className="w-3 h-3 text-black" strokeWidth={3} />
                  </div>
                  <div className="absolute bottom-1.5 left-1.5">
                    <span className="text-white text-xs font-bold bg-black/60 px-1.5 py-0.5 rounded-md">Feed</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 px-4 pb-6 pt-3 bg-gradient-to-t from-zinc-950 to-transparent">
        <div className="max-w-2xl mx-auto flex gap-2.5">
          <SecondaryButton className="flex-1 text-sm">Download All</SecondaryButton>
          <PrimaryButton className="flex-1 text-sm">Share with Client</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

const NewGallery = ({ onBack }) => (
  <div className="min-h-screen bg-zinc-950 pb-20">
    <div className="bg-zinc-950/95 backdrop-blur border-b border-zinc-800/60 sticky top-0 z-40">
      <div className="max-w-2xl mx-auto px-4 py-3">
        <button onClick={onBack} className="flex items-center gap-1.5 text-zinc-400 hover:text-white text-sm mb-1"><ArrowLeft className="w-4 h-4" /> Galleries</button>
        <h1 className="text-xl font-bold text-white">New Gallery</h1>
      </div>
    </div>
    <div className="max-w-2xl mx-auto px-4 py-5 space-y-4">
      {[{ label: 'Client Name', placeholder: 'e.g. Smith Wedding', type: 'text' }, { label: 'Session Date', placeholder: '', type: 'date' }].map(({ label, placeholder, type }) => (
        <div key={label}>
          <label className="block text-sm font-medium text-zinc-300 mb-1.5">{label}</label>
          <input type={type} placeholder={placeholder} className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600 transition text-sm" />
        </div>
      ))}
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-1.5">Session Type</label>
        <select className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white focus:outline-none text-sm">
          {['Wedding', 'Engagement', 'Family', 'Portrait', 'Event', 'Commercial'].map(o => <option key={o}>{o}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-1.5">Upload Photos</label>
        <div className="border-2 border-dashed border-zinc-800 rounded-2xl p-10 text-center hover:border-zinc-600 transition cursor-pointer">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 bg-zinc-800"><Upload className="w-6 h-6 text-zinc-500" /></div>
          <p className="text-white font-semibold text-sm mb-1">Drag photos here</p>
          <p className="text-zinc-600 text-xs">or tap to browse · JPG, PNG, RAW</p>
        </div>
      </div>
      <Card className="p-4 flex items-center justify-between">
        <div>
          <p className="text-white font-medium text-sm">Client Watermark</p>
          <p className="text-zinc-500 text-xs mt-0.5">Preview photos include your logo until delivered</p>
        </div>
        <div className="w-11 h-6 rounded-full bg-zinc-700 relative cursor-pointer"><div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow" /></div>
      </Card>
      <PrimaryButton className="w-full text-base py-4 rounded-2xl">Create Gallery</PrimaryButton>
    </div>
  </div>
);

const PhotographerBookings = () => {
  const bookings = [
    { id: 1, client: "Emma Johnson", type: "Wedding", date: "Feb 14, 2026", amount: "$3,200", status: "upcoming" },
    { id: 2, client: "The Rivera Family", type: "Family Session", date: "Jan 25, 2026", amount: "$400", status: "completed" },
    { id: 3, client: "David Park", type: "Headshots", date: "Jan 10, 2026", amount: "$250", status: "completed" },
    { id: 4, client: "Ashley & Mike", type: "Engagement", date: "Mar 5, 2026", amount: "$450", status: "pending" },
  ];
  const statusColor = { upcoming: 'blue', completed: 'green', pending: 'yellow' };
  return (
    <div className="min-h-screen bg-zinc-950 pb-20">
      <PageHeader title="Bookings" subtitle="$4,300 earned this month" />
      <div className="max-w-2xl mx-auto px-4 py-5 space-y-2.5">
        {bookings.map((b, i) => (
          <Card key={b.id} className="p-4 flex items-center gap-3">
            <Avatar name={b.client} seed={i + 3} size="md" />
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold truncate">{b.client}</p>
              <p className="text-zinc-400 text-sm">{b.type}</p>
              <p className="text-zinc-600 text-xs">{b.date}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-white font-black">{b.amount}</p>
              <Pill color={statusColor[b.status]}>{b.status}</Pill>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const PhotographerPortfolio = () => (
  <div className="min-h-screen bg-zinc-950 pb-20">
    <PageHeader title="My Portfolio" action={<button className="text-xs text-zinc-400 border border-zinc-700 px-3 py-1.5 rounded-lg hover:border-zinc-500 transition">Edit Profile</button>} />
    <div className="max-w-2xl mx-auto px-4 py-5">
      <div className="flex items-start gap-4 mb-6">
        <Avatar name="Sarah Mitchell" seed={0} size="xl" />
        <div className="flex-1">
          <h2 className="text-2xl font-black text-white tracking-tight mb-1">Sarah Mitchell</h2>
          <p className="text-zinc-400 text-sm mb-2">Wedding & Engagement · Isle of Palms</p>
          <div className="flex gap-4">
            <span className="text-sm"><span className="text-white font-bold">127</span> <span className="text-zinc-500">reviews</span></span>
            <span className="text-sm"><span className="text-white font-bold">4.9★</span></span>
            <span className="text-sm"><span className="text-white font-bold">$3.2k</span> <span className="text-zinc-500">avg booking</span></span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-0.5 mb-6">
        {gradients.map((grad, i) => <div key={i} className="aspect-square" style={{ background: grad }} />)}
      </div>
      <SectionTitle>Packages</SectionTitle>
      <div className="space-y-2.5">
        {photographers[0].packages.map((pkg, i) => (
          <Card key={i} className="p-4 flex items-center justify-between">
            <div><p className="text-white font-bold">{pkg.name}</p><p className="text-zinc-500 text-xs mt-0.5">{pkg.details}</p></div>
            <p className="text-white font-black text-lg">{pkg.price}</p>
          </Card>
        ))}
      </div>
    </div>
  </div>
);

const PhotographerAccount = () => (
  <div className="min-h-screen bg-zinc-950 pb-20">
    <PageHeader title="Account" />
    <div className="max-w-2xl mx-auto px-4 py-5 space-y-5">
      {/* Earnings card */}
      <div className="rounded-2xl p-5 relative overflow-hidden" style={{ background: PRIMARY }}>
        <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(circle at 80% 20%, white, transparent)' }} />
        <p className="text-white/70 text-sm mb-1 relative">This month's earnings</p>
        <p className="text-4xl font-black text-white relative mb-1">$3,870</p>
        <p className="text-white/60 text-sm relative">After Viewfinder's 10% · 9 sessions</p>
      </div>
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2.5">
        {[{ val: '9', label: 'Bookings' }, { val: '4.9★', label: 'Rating' }, { val: '127', label: 'Reviews' }].map(({ val, label }) => (
          <Card key={label} className="p-3.5 text-center">
            <p className="text-white font-black text-xl">{val}</p>
            <p className="text-zinc-500 text-xs mt-0.5">{label}</p>
          </Card>
        ))}
      </div>
      {/* Settings list */}
      <div className="space-y-2">
        {[
          { icon: DollarSign, label: 'Stripe Payouts', sub: 'Connected · Weekly deposits', color: 'green' },
          { icon: Bell, label: 'Notifications', sub: 'Booking requests, messages', color: 'blue' },
          { icon: Settings, label: 'Account Settings', sub: 'Email, password, availability', color: 'zinc' },
        ].map(({ icon: Icon, label, sub, color }) => (
          <Card key={label} onClick={() => {}} className="p-4 flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-zinc-800"><Icon className="w-4 h-4 text-zinc-400" /></div>
            <div className="flex-1"><p className="text-white font-semibold text-sm">{label}</p><p className="text-zinc-500 text-xs">{sub}</p></div>
            <ChevronRight className="w-4 h-4 text-zinc-600 flex-shrink-0" />
          </Card>
        ))}
      </div>
    </div>
  </div>
);

// ─── ROOT APP ─────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState('splash');
  const [role, setRole] = useState(null);
  const [activeTab, setActiveTab] = useState('feed');
  const [selectedPhotographer, setSelectedPhotographer] = useState(null);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const go = (s) => setScreen(s);
  const back = () => { setScreen('app'); setSelectedPhotographer(null); setSelectedGallery(null); setSelectedBooking(null); };

  const handleRoleSelect = (r) => { setRole(r); setActiveTab('feed'); go('app'); };
  const handleViewProfile = (p) => { setSelectedPhotographer(p); go('profile'); };
  const handleBook = (p) => { setSelectedPhotographer(p); go('booking'); };
  const handleOpenGallery = (g) => { setSelectedGallery(g); go('galleryDetail'); };
  const handleViewClientGallery = (b) => { setSelectedBooking(b); go('clientGallery'); };

  if (screen === 'splash') return <SplashScreen onContinue={() => go('role')} />;
  if (screen === 'role') return <RoleSelection onSelectRole={handleRoleSelect} />;
  if (screen === 'profile' && selectedPhotographer) return <PhotographerProfileScreen photographer={selectedPhotographer} onBack={back} onBook={handleBook} />;
  if (screen === 'booking') return <BookingConfirmation onBack={back} />;
  if (screen === 'galleryDetail' && selectedGallery) return <GalleryDetail gallery={selectedGallery} onBack={back} />;
  if (screen === 'newGallery') return <NewGallery onBack={back} />;
  if (screen === 'clientGallery' && selectedBooking) return <ClientGalleryView booking={selectedBooking} onBack={back} />;

  if (role === 'client') return (
    <div className="min-h-screen bg-zinc-950">
      {activeTab === 'feed' && <ClientFeed onViewProfile={handleViewProfile} />}
      {activeTab === 'find' && <ClientFind onViewProfile={handleViewProfile} />}
      {activeTab === 'saved' && <ClientSaved onViewProfile={handleViewProfile} />}
      {activeTab === 'bookings' && <ClientBookings onViewGallery={handleViewClientGallery} />}
      <ClientNav active={activeTab} onNavigate={setActiveTab} />
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-950">
      {activeTab === 'feed' && <PhotographerFeed onViewProfile={handleViewProfile} />}
      {activeTab === 'galleries' && <PhotographerGalleries onOpenGallery={handleOpenGallery} onNewGallery={() => go('newGallery')} />}
      {activeTab === 'bookings' && <PhotographerBookings />}
      {activeTab === 'portfolio' && <PhotographerPortfolio />}
      {activeTab === 'account' && <PhotographerAccount />}
      <PhotographerNav active={activeTab} onNavigate={setActiveTab} />
    </div>
  );
}
