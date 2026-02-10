'use client'

import React, { useState } from 'react';
import { Heart, MapPin, Camera, Calendar, Star, Filter, Search, X, MessageCircle, Home, User, Mail, Image, BookOpen, Grid, Upload, ChevronRight, Check, DollarSign, Bell, Settings, ArrowLeft, Plus, Eye } from 'lucide-react';

// ─── SHARED DATA ────────────────────────────────────────────────────────────

const gradients = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
];
const g = (seed) => gradients[Math.abs(seed) % gradients.length];

const Avatar = ({ name, seed = 0, size = 'md' }) => {
  const initials = name ? name.split(' ').map(n => n[0]).join('') : '?';
  const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-12 h-12 text-sm', lg: 'w-16 h-16 text-base', xl: 'w-20 h-20 text-xl' };
  return (
    <div className={`${sizes[size]} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`} style={{ background: g(seed) }}>
      {initials}
    </div>
  );
};

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

// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────

const PhotographerProfileCard = ({ photographer, onBack, onBook }) => (
  <div className="min-h-screen bg-zinc-950 pb-20">
    <div className="bg-zinc-950/95 backdrop-blur border-b border-zinc-800 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <button onClick={onBack} className="flex items-center gap-2 text-zinc-400 hover:text-white transition">
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
      </div>
    </div>
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-start gap-4">
          <Avatar name={photographer.name} seed={photographer.id} size="xl" />
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white mb-1">{photographer.name}</h1>
            <div className="flex flex-wrap gap-3 text-zinc-400 text-sm mb-2">
              <span className="flex items-center gap-1"><Camera className="w-4 h-4" />{photographer.specialty}</span>
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{photographer.location}</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-white">{photographer.rating}</span>
              <span className="text-zinc-500">({photographer.reviews} reviews)</span>
            </div>
          </div>
        </div>
        <p className="text-zinc-300 text-sm">{photographer.bio}</p>
        <div className="flex flex-wrap gap-2">
          {photographer.style.map((s, i) => <span key={i} className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full text-xs border border-zinc-700">{s}</span>)}
        </div>
        <div className="flex gap-3">
          <button onClick={() => onBook(photographer)} className="flex-1 py-3 bg-white hover:bg-zinc-100 text-black font-semibold rounded-lg transition flex items-center justify-center gap-2">
            <Calendar className="w-5 h-5" /> Book Session
          </button>
          <button className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition border border-white/20">
            <MessageCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-bold text-white mb-3">Portfolio</h2>
        <div className="grid grid-cols-3 gap-2">
          {Array(6).fill(0).map((_, i) => <div key={i} className="aspect-square rounded-lg" style={{ background: g(photographer.id + i) }} />)}
        </div>
      </div>
      <div>
        <h2 className="text-lg font-bold text-white mb-3">Packages</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {photographer.packages.map((pkg, i) => (
            <div key={i} className="border border-zinc-800 rounded-lg p-4 bg-zinc-900 hover:border-zinc-600 transition cursor-pointer">
              <p className="text-white font-bold mb-1">{pkg.name}</p>
              <p className="text-rose-400 text-xl font-bold mb-1">{pkg.price}</p>
              <p className="text-zinc-400 text-sm">{pkg.details}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const BookingConfirmation = ({ onBack }) => (
  <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
    <div className="max-w-md w-full bg-zinc-900 rounded-2xl p-8 text-center border border-zinc-800">
      <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/20">
        <Check className="w-8 h-8 text-green-400" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">Booking Requested!</h2>
      <p className="text-zinc-400 mb-6">Your photographer will confirm within 24 hours. You'll receive your photos through Viewfinder galleries.</p>
      <button onClick={onBack} className="w-full py-3 bg-white hover:bg-zinc-100 text-black font-semibold rounded-lg transition">Back to Feed</button>
    </div>
  </div>
);

// ─── SPLASH + ROLE SELECTION ─────────────────────────────────────────────────

const SplashScreen = ({ onContinue }) => (
  <div className="min-h-screen bg-black flex flex-col relative overflow-hidden">
    <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #667eea, transparent)' }} />
    <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #f093fb, transparent)' }} />
    <div className="relative flex flex-col flex-1 px-8 pt-20 pb-12">
      <div className="flex items-center gap-3 mb-16">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: g(0) }}>
          <Camera className="w-5 h-5 text-white" />
        </div>
        <span className="text-white text-2xl font-bold tracking-tight">Viewfinder</span>
      </div>
      <div className="mb-16">
        <h1 className="text-5xl font-bold text-white leading-tight mb-4">
          Discover.<br />Book.<br />
          <span style={{ background: 'linear-gradient(135deg, #667eea 0%, #f093fb 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Deliver.</span>
        </h1>
        <p className="text-zinc-400 text-lg leading-relaxed">All in one place. Find local photographers you'll love, book securely, and receive your photos — without leaving the app.</p>
      </div>
      <div className="space-y-4 mb-16">
        {[{ icon: Search, label: 'Discover', desc: 'Find photographers whose style you love' }, { icon: Calendar, label: 'Book', desc: 'Book and pay securely in minutes' }, { icon: Image, label: 'Deliver', desc: 'Receive your gallery right in the app' }].map(({ icon: Icon, label, desc }, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: g(i) }}><Icon className="w-5 h-5 text-white" /></div>
            <div><p className="text-white font-semibold">{label}</p><p className="text-zinc-500 text-sm">{desc}</p></div>
          </div>
        ))}
      </div>
      <div className="mt-auto">
        <button onClick={onContinue} className="w-full py-4 rounded-2xl text-white font-bold text-lg" style={{ background: g(0) }}>Get Started</button>
        <p className="text-center text-zinc-600 text-xs mt-4">100% real photographers · No AI images · 10% commission only</p>
      </div>
    </div>
  </div>
);

const RoleSelection = ({ onSelectRole }) => (
  <div className="min-h-screen bg-black flex flex-col px-6 py-12">
    <div className="flex items-center gap-3 mb-12">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: g(0) }}><Camera className="w-4 h-4 text-white" /></div>
      <span className="text-white font-bold text-lg">Viewfinder</span>
    </div>
    <div className="mb-10">
      <h2 className="text-3xl font-bold text-white mb-2">How will you use Viewfinder?</h2>
      <p className="text-zinc-500">You'll get a tailored experience based on your role</p>
    </div>
    <div className="space-y-4 mb-10">
      {[
        { id: 'client', Icon: Search, title: "I'm looking for a photographer", desc: 'Discover, browse and book local photographers', seed: 0, features: ['Personalized photo feed', 'Book and pay securely', 'Receive your gallery in-app'] },
        { id: 'photographer', Icon: Camera, title: "I'm a photographer", desc: 'Grow your business and connect with clients', seed: 1, features: ['Free profile & portfolio', 'Keep 90% of every booking', 'Deliver galleries in-app'] },
      ].map((role) => (
        <button key={role.id} onClick={() => onSelectRole(role.id)} className="w-full text-left bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-2xl p-5 transition group">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: g(role.seed) }}><role.Icon className="w-6 h-6 text-white" /></div>
            <div className="flex-1">
              <p className="text-white font-bold text-lg mb-1">{role.title}</p>
              <p className="text-zinc-500 text-sm mb-3">{role.desc}</p>
              <div className="space-y-1">{role.features.map((f, i) => <div key={i} className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-zinc-600" /><span className="text-zinc-400 text-xs">{f}</span></div>)}</div>
            </div>
            <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-white transition mt-1" />
          </div>
        </button>
      ))}
    </div>
    <button onClick={() => onSelectRole('client')} className="w-full py-3 text-zinc-500 hover:text-zinc-300 text-sm transition">Browse as guest →</button>
  </div>
);

// ─── CLIENT VIEW ─────────────────────────────────────────────────────────────

const ClientBottomNav = ({ active, onNavigate }) => {
  const items = [{ id: 'feed', icon: Home, label: 'For You' }, { id: 'find', icon: Search, label: 'Find' }, { id: 'saved', icon: Heart, label: 'Saved' }, { id: 'bookings', icon: Calendar, label: 'Bookings' }];
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-white/10 z-50">
      <div className="max-w-lg mx-auto px-2 py-2 flex items-center justify-around">
        {items.map(({ id, icon: Icon, label }) => (
          <button key={id} onClick={() => onNavigate(id)} className={`flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition ${active === id ? 'text-white' : 'text-zinc-500 hover:text-white'}`}>
            <Icon className="w-6 h-6" /><span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const ClientFeed = ({ onViewProfile }) => (
  <div className="min-h-screen bg-black pb-20">
    <div className="bg-black/50 backdrop-blur-lg border-b border-white/10 fixed top-0 left-0 right-0 z-40">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2"><Camera className="w-6 h-6 text-white" /><h1 className="text-lg font-bold text-white">Viewfinder</h1></div>
        <Bell className="w-6 h-6 text-zinc-400" />
      </div>
    </div>
    <div className="max-w-4xl mx-auto pt-14">
      {photographers.map((photographer, pi) =>
        Array(2).fill(0).map((_, idx) => (
          <div key={`${photographer.id}-${idx}`} className="relative w-full h-screen border-b border-gray-900">
            <div className="w-full h-full" style={{ background: g(pi * 2 + idx) }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
            <div className="absolute top-6 right-4 flex flex-col gap-4">
              <button className="flex flex-col items-center gap-1"><Heart className="w-7 h-7 text-white" /><span className="text-white text-xs">Save</span></button>
            </div>
            <div className="absolute bottom-20 left-0 right-0 p-4 max-w-2xl">
              <div className="flex items-center gap-3 mb-2">
                <Avatar name={photographer.name} seed={photographer.id} size="sm" />
                <div><p className="text-white font-bold">{photographer.name}</p><p className="text-white/70 text-xs">{photographer.specialty} · {photographer.location}</p></div>
              </div>
              <p className="text-white/80 text-sm mb-3">{photographer.bio}</p>
              <button onClick={() => onViewProfile(photographer)} className="w-full py-3 bg-white hover:bg-zinc-100 text-black font-semibold rounded-lg transition">View Portfolio & Book</button>
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
      <div className="bg-zinc-950/95 backdrop-blur border-b border-zinc-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-2xl font-bold text-white">Find Photographers</h1>
            <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 px-3 py-2 bg-zinc-800 rounded-lg text-white text-sm"><Filter className="w-4 h-4" /> Filters</button>
          </div>
          <p className="text-zinc-500 text-sm">{photographers.length} photographers in Charleston</p>
          {showFilters && (
            <div className="mt-3 p-4 bg-zinc-900 rounded-lg border border-zinc-800">
              <div className="grid grid-cols-3 gap-3">
                {[{ label: 'Specialty', opts: ['Wedding', 'Portrait', 'Family', 'Real Estate', 'Events'] }, { label: 'Style', opts: ['Romantic', 'Moody', 'Bright', 'Candid'] }, { label: 'Location', opts: ['Downtown', 'Mount Pleasant', 'James Island'] }].map(({ label, opts }) => (
                  <div key={label}><label className="text-xs text-zinc-400 mb-1 block">{label}</label>
                    <select className="w-full px-2 py-1.5 bg-zinc-800 border border-zinc-700 text-white rounded text-sm"><option>All</option>{opts.map(o => <option key={o}>{o}</option>)}</select>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {photographers.map((p, pi) => Array(3).fill(0).map((_, idx) => (
          <div key={`${p.id}-${idx}`} onClick={() => onViewProfile(p)} className="aspect-square rounded-lg cursor-pointer group relative overflow-hidden" style={{ background: g(pi * 3 + idx) }}>
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-end p-2">
              <div><p className="text-white text-xs font-semibold">{p.name}</p><p className="text-white/70 text-xs">{p.specialty}</p></div>
            </div>
          </div>
        )))}
      </div>
    </div>
  );
};

const ClientSaved = ({ onViewProfile }) => (
  <div className="min-h-screen bg-zinc-950 pb-20">
    <div className="bg-zinc-950/95 backdrop-blur border-b border-zinc-800 sticky top-0 z-40">
      <div className="max-w-3xl mx-auto px-4 py-4"><h1 className="text-2xl font-bold text-white mb-1">Saved</h1><p className="text-zinc-500 text-sm">3 photographers</p></div>
    </div>
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
      {photographers.slice(0, 3).map((p, i) => (
        <div key={p.id} onClick={() => onViewProfile(p)} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-zinc-600 cursor-pointer">
          <div className="flex items-start gap-4 mb-3">
            <Avatar name={p.name} seed={i} size="lg" />
            <div className="flex-1"><h3 className="text-white font-bold mb-1">{p.name}</h3><p className="text-zinc-400 text-sm mb-1">{p.specialty}</p>
              <div className="flex items-center gap-1 text-sm"><Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /><span className="text-white text-xs">{p.rating}</span><span className="text-zinc-500 text-xs">({p.reviews})</span></div>
            </div>
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500 flex-shrink-0" />
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {Array(3).fill(0).map((_, idx) => <div key={idx} className="aspect-square rounded" style={{ background: g(i + idx + 1) }} />)}
          </div>
        </div>
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
  const statusStyles = { confirmed: 'bg-blue-500/10 text-blue-400 border-blue-500/20', completed: 'bg-green-500/10 text-green-400 border-green-500/20' };
  return (
    <div className="min-h-screen bg-zinc-950 pb-20">
      <div className="bg-zinc-950/95 backdrop-blur border-b border-zinc-800 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 py-4"><h1 className="text-2xl font-bold text-white mb-1">My Bookings</h1><p className="text-zinc-500 text-sm">3 sessions</p></div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
        {bookings.map((booking, i) => (
          <div key={booking.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <div className="flex items-start gap-3 mb-3">
              <Avatar name={booking.photographer.name} seed={i} size="md" />
              <div className="flex-1">
                <h3 className="text-white font-bold">{booking.photographer.name}</h3>
                <p className="text-zinc-400 text-sm">{booking.type}</p>
                <p className="text-zinc-500 text-xs mt-1">{booking.date}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs border ${statusStyles[booking.status]}`}>{booking.status}</span>
            </div>
            {booking.hasGallery && (
              <button onClick={() => onViewGallery(booking)} className="w-full mt-2 py-2.5 flex items-center justify-center gap-2 rounded-lg border border-zinc-700 hover:border-zinc-500 text-white text-sm transition" style={{ background: 'linear-gradient(135deg, rgba(102,126,234,0.15), rgba(240,147,251,0.15))' }}>
                <Image className="w-4 h-4" />
                View Gallery · {booking.photoCount} photos
              </button>
            )}
            {!booking.hasGallery && (
              <div className="mt-2 py-2.5 flex items-center justify-center gap-2 rounded-lg border border-zinc-800 text-zinc-600 text-sm">
                <Image className="w-4 h-4" /> Gallery delivered after session
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Client gallery view — receiving delivered photos
const ClientGalleryView = ({ booking, onBack }) => {
  const [selected, setSelected] = useState([]);
  const photos = Array(booking.photoCount).fill(0).map((_, i) => ({ id: i, seed: i }));
  const visible = photos.slice(0, 18);
  const toggle = (id) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  return (
    <div className="min-h-screen bg-zinc-950 pb-24">
      <div className="bg-zinc-950/95 backdrop-blur border-b border-zinc-800 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <button onClick={onBack} className="flex items-center gap-2 text-zinc-400 hover:text-white mb-2"><ArrowLeft className="w-5 h-5" /> Back</button>
          <div className="flex items-center justify-between">
            <div><h1 className="text-xl font-bold text-white">{booking.photographer.name}</h1><p className="text-zinc-500 text-sm">{booking.type} · {booking.photoCount} photos · {booking.date}</p></div>
            {selected.length > 0 && <span className="text-sm text-white bg-zinc-800 px-3 py-1 rounded-full">{selected.length} selected</span>}
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
          {['All Photos', 'Favorites', 'Portraits', 'Candid', 'Details'].map((tab, i) => (
            <button key={tab} className={`px-3 py-1.5 rounded-full text-sm flex-shrink-0 border transition ${i === 0 ? 'bg-white text-black border-white' : 'text-zinc-400 border-zinc-700 hover:border-zinc-500'}`}>{tab}</button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1">
          {visible.map((photo) => (
            <div key={photo.id} onClick={() => toggle(photo.id)} className="aspect-square relative cursor-pointer group">
              <div className="w-full h-full rounded-sm" style={{ background: g(photo.seed) }} />
              <div className={`absolute inset-0 rounded-sm transition ${selected.includes(photo.id) ? 'ring-2 ring-white' : 'ring-0'}`} />
              {selected.includes(photo.id) && (
                <div className="absolute top-1 right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-black" />
                </div>
              )}
            </div>
          ))}
        </div>
        {booking.photoCount > 18 && <p className="text-center text-zinc-600 text-sm mt-4">+{booking.photoCount - 18} more photos</p>}
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-zinc-950/95 backdrop-blur border-t border-zinc-800">
        <div className="max-w-4xl mx-auto flex gap-3">
          <button className="flex-1 py-3 bg-white hover:bg-zinc-100 text-black font-semibold rounded-xl transition flex items-center justify-center gap-2">
            Download All
          </button>
          <button className="flex-1 py-3 border border-zinc-700 hover:border-zinc-500 text-white font-semibold rounded-xl transition flex items-center justify-center gap-2">
            Order Prints
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── PHOTOGRAPHER VIEW ────────────────────────────────────────────────────────

const PhotographerBottomNav = ({ active, onNavigate }) => {
  const items = [{ id: 'feed', icon: Home, label: 'Feed' }, { id: 'galleries', icon: Image, label: 'Galleries' }, { id: 'bookings', icon: Calendar, label: 'Bookings' }, { id: 'portfolio', icon: Grid, label: 'Portfolio' }, { id: 'account', icon: User, label: 'Account' }];
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-white/10 z-50">
      <div className="max-w-lg mx-auto px-2 py-2 flex items-center justify-around">
        {items.map(({ id, icon: Icon, label }) => (
          <button key={id} onClick={() => onNavigate(id)} className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition ${active === id ? 'text-white' : 'text-zinc-500 hover:text-white'}`}>
            <Icon className="w-5 h-5" /><span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const PhotographerFeed = ({ onViewProfile }) => (
  <div className="min-h-screen bg-black pb-20">
    <div className="bg-black/50 backdrop-blur-lg border-b border-white/10 fixed top-0 left-0 right-0 z-40">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2"><Camera className="w-6 h-6 text-white" /><h1 className="text-lg font-bold text-white">Viewfinder</h1></div>
        <div className="flex items-center gap-3"><span className="text-xs text-zinc-500 bg-zinc-900 px-2 py-1 rounded-full border border-zinc-800">Photographer View</span><Bell className="w-5 h-5 text-zinc-400" /></div>
      </div>
    </div>
    <div className="max-w-4xl mx-auto pt-14">
      {photographers.map((photographer, pi) =>
        Array(2).fill(0).map((_, idx) => (
          <div key={`${photographer.id}-${idx}`} className="relative w-full h-screen border-b border-gray-900">
            <div className="w-full h-full" style={{ background: g(pi * 2 + idx) }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
            <div className="absolute bottom-20 left-0 right-0 p-4 max-w-2xl">
              <div className="flex items-center gap-3 mb-2">
                <Avatar name={photographer.name} seed={photographer.id} size="sm" />
                <div><p className="text-white font-bold">{photographer.name}</p><p className="text-white/70 text-xs">{photographer.specialty}</p></div>
              </div>
              <button onClick={() => onViewProfile(photographer)} className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg border border-white/20 transition">View Profile</button>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);

const PhotographerGalleries = ({ onOpenGallery, onNewGallery }) => (
  <div className="min-h-screen bg-zinc-950 pb-20">
    <div className="bg-zinc-950/95 backdrop-blur border-b border-zinc-800 sticky top-0 z-40">
      <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-white">Galleries</h1><p className="text-zinc-500 text-sm">{mockGalleries.length} sessions</p></div>
        <button onClick={onNewGallery} className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold" style={{ background: g(0) }}>
          <Plus className="w-4 h-4" /> New Gallery
        </button>
      </div>
    </div>
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
      {mockGalleries.map((gallery) => (
        <div key={gallery.id} onClick={() => onOpenGallery(gallery)} className="bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-xl overflow-hidden cursor-pointer transition">
          <div className="flex">
            <div className="w-24 h-24 flex-shrink-0" style={{ background: g(gallery.coverSeed) }} />
            <div className="flex-1 p-4">
              <div className="flex items-start justify-between mb-1">
                <h3 className="text-white font-bold">{gallery.client}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${gallery.shared ? 'text-green-400 bg-green-500/10 border-green-500/20' : 'text-zinc-500 bg-zinc-800 border-zinc-700'}`}>
                  {gallery.shared ? 'Shared' : 'Draft'}
                </span>
              </div>
              <p className="text-zinc-500 text-sm mb-2">{gallery.date}</p>
              <div className="flex items-center gap-4 text-xs text-zinc-400">
                <span className="flex items-center gap-1"><Image className="w-3 h-3" /> {gallery.photos} photos</span>
                {gallery.shared && <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> Client notified</span>}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const GalleryDetail = ({ gallery, onBack }) => {
  const [selectedForFeed, setSelectedForFeed] = useState([0, 3, 7]);
  const photos = Array(Math.min(gallery.photos, 24)).fill(0).map((_, i) => i);
  const toggle = (i) => setSelectedForFeed(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
  return (
    <div className="min-h-screen bg-zinc-950 pb-24">
      <div className="bg-zinc-950/95 backdrop-blur border-b border-zinc-800 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <button onClick={onBack} className="flex items-center gap-2 text-zinc-400 hover:text-white mb-2"><ArrowLeft className="w-5 h-5" /> Galleries</button>
          <div className="flex items-center justify-between">
            <div><h1 className="text-xl font-bold text-white">{gallery.client}</h1><p className="text-zinc-500 text-sm">{gallery.photos} photos · {gallery.date}</p></div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-sm text-zinc-400 border border-zinc-700 rounded-lg hover:border-zinc-500 transition">Share with Client</button>
            </div>
          </div>
        </div>
      </div>

      {/* Post to Feed banner */}
      <div className="max-w-4xl mx-auto px-4 pt-4">
        <div className="rounded-xl p-4 mb-4 border border-zinc-700" style={{ background: 'linear-gradient(135deg, rgba(102,126,234,0.12), rgba(240,147,251,0.12))' }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-white font-semibold text-sm">Post to Your Feed</p>
            <span className="text-xs text-zinc-400">{selectedForFeed.length} selected</span>
          </div>
          <p className="text-zinc-400 text-xs mb-3">Tap photos below to select your best shots. They'll appear in client discovery feeds.</p>
          <button className="w-full py-2 rounded-lg text-white text-sm font-semibold transition" style={{ background: selectedForFeed.length > 0 ? g(0) : undefined, backgroundColor: selectedForFeed.length === 0 ? '#3f3f46' : undefined }}>
            {selectedForFeed.length > 0 ? `Publish ${selectedForFeed.length} Photos to Feed` : 'Select photos to publish'}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <p className="text-zinc-500 text-xs mb-3">Tap to select for feed · All photos shared with client</p>
        <div className="grid grid-cols-3 gap-1">
          {photos.map((i) => (
            <div key={i} onClick={() => toggle(i)} className="aspect-square relative cursor-pointer">
              <div className="w-full h-full rounded-sm" style={{ background: g(gallery.coverSeed + i) }} />
              {selectedForFeed.includes(i) ? (
                <div className="absolute inset-0 rounded-sm ring-2 ring-white">
                  <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-white flex items-center justify-center">
                    <Check className="w-3 h-3 text-black" />
                  </div>
                  <div className="absolute bottom-1 left-1 text-white text-xs font-bold bg-black/50 px-1 rounded">Feed</div>
                </div>
              ) : (
                <div className="absolute inset-0 rounded-sm ring-0 opacity-0 hover:opacity-100 hover:ring-1 hover:ring-zinc-400 transition" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-zinc-950/95 backdrop-blur border-t border-zinc-800">
        <div className="max-w-4xl mx-auto flex gap-3">
          <button className="flex-1 py-3 border border-zinc-700 text-white font-semibold rounded-xl text-sm hover:border-zinc-500 transition">Download All</button>
          <button className="flex-1 py-3 text-white font-semibold rounded-xl text-sm transition" style={{ background: g(0) }}>Share with Client</button>
        </div>
      </div>
    </div>
  );
};

const NewGallery = ({ onBack }) => (
  <div className="min-h-screen bg-zinc-950 pb-20">
    <div className="bg-zinc-950/95 backdrop-blur border-b border-zinc-800 sticky top-0 z-40">
      <div className="max-w-3xl mx-auto px-4 py-3">
        <button onClick={onBack} className="flex items-center gap-2 text-zinc-400 hover:text-white mb-1"><ArrowLeft className="w-5 h-5" /> Galleries</button>
        <h1 className="text-xl font-bold text-white">New Gallery</h1>
      </div>
    </div>
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-5">
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-2">Client Name</label>
        <input className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-500" placeholder="e.g. Smith Wedding" />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-2">Session Date</label>
        <input type="date" className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-zinc-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-2">Session Type</label>
        <select className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-zinc-500">
          <option>Wedding</option><option>Engagement</option><option>Family</option><option>Portrait</option><option>Event</option><option>Commercial</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-2">Upload Photos</label>
        <div className="border-2 border-dashed border-zinc-700 rounded-xl p-10 text-center hover:border-zinc-500 transition cursor-pointer">
          <Upload className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
          <p className="text-white font-medium mb-1">Drag photos here</p>
          <p className="text-zinc-500 text-sm">or tap to browse · JPG, PNG, RAW</p>
        </div>
      </div>
      <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-xl border border-zinc-800">
        <div><p className="text-white font-medium text-sm">Client Watermark</p><p className="text-zinc-500 text-xs">Preview photos have your logo until delivered</p></div>
        <div className="w-10 h-6 bg-zinc-700 rounded-full relative cursor-pointer"><div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 transition" /></div>
      </div>
      <button className="w-full py-4 rounded-xl text-white font-bold text-lg" style={{ background: g(0) }}>Create Gallery</button>
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
  const statusStyles = { upcoming: 'text-blue-400 bg-blue-500/10 border-blue-500/20', completed: 'text-green-400 bg-green-500/10 border-green-500/20', pending: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' };
  return (
    <div className="min-h-screen bg-zinc-950 pb-20">
      <div className="bg-zinc-950/95 backdrop-blur border-b border-zinc-800 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-white mb-1">Bookings</h1>
          <div className="flex gap-4 text-sm">
            <span className="text-white font-semibold">$4,300 <span className="text-zinc-500 font-normal">this month</span></span>
            <span className="text-zinc-500">4 sessions</span>
          </div>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-3">
        {bookings.map((b, i) => (
          <div key={b.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center gap-4">
            <Avatar name={b.client} seed={i + 3} size="md" />
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold truncate">{b.client}</p>
              <p className="text-zinc-400 text-sm">{b.type} · {b.date}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-white font-bold text-sm">{b.amount}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full border ${statusStyles[b.status]}`}>{b.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PhotographerPortfolio = () => (
  <div className="min-h-screen bg-zinc-950 pb-20">
    <div className="bg-zinc-950/95 backdrop-blur border-b border-zinc-800 sticky top-0 z-40">
      <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">My Portfolio</h1>
        <button className="text-sm text-zinc-400 hover:text-white border border-zinc-700 px-3 py-1.5 rounded-lg transition">Edit Profile</button>
      </div>
    </div>
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="flex items-start gap-4 mb-6">
        <Avatar name="Sarah Mitchell" seed={0} size="xl" />
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white mb-1">Sarah Mitchell</h2>
          <p className="text-zinc-400 text-sm mb-1">Wedding & Engagement</p>
          <p className="text-zinc-500 text-sm flex items-center gap-1 mb-3"><MapPin className="w-4 h-4" /> Downtown Charleston</p>
          <div className="flex gap-4 text-sm">
            <span><span className="text-white font-bold">127</span> <span className="text-zinc-500">reviews</span></span>
            <span><span className="text-white font-bold">4.9★</span> <span className="text-zinc-500">rating</span></span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1 mb-6">
        {gradients.map((grad, i) => <div key={i} className="aspect-square rounded-sm" style={{ background: grad }} />)}
      </div>
      <div>
        <h3 className="text-lg font-bold text-white mb-3">Packages</h3>
        <div className="space-y-3">
          {photographers[0].packages.map((pkg, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-zinc-900 rounded-xl border border-zinc-800">
              <div><p className="text-white font-semibold">{pkg.name}</p><p className="text-zinc-500 text-sm">{pkg.details}</p></div>
              <p className="text-rose-400 font-bold">{pkg.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const PhotographerAccount = () => (
  <div className="min-h-screen bg-zinc-950 pb-20">
    <div className="bg-zinc-950/95 backdrop-blur border-b border-zinc-800 sticky top-0 z-40">
      <div className="max-w-3xl mx-auto px-4 py-4"><h1 className="text-2xl font-bold text-white">Account</h1></div>
    </div>
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
        <p className="text-zinc-500 text-xs mb-1">This month</p>
        <p className="text-3xl font-bold text-white mb-1">$3,870 <span className="text-lg text-zinc-400 font-normal">earned</span></p>
        <p className="text-zinc-500 text-sm">After Viewfinder's 10% · 9 bookings</p>
      </div>
      <div className="space-y-2">
        {[{ icon: DollarSign, label: 'Stripe Payouts', sub: 'Connected · Weekly deposits' }, { icon: Bell, label: 'Notifications', sub: 'Booking requests, messages' }, { icon: Settings, label: 'Account Settings', sub: 'Email, password, availability' }].map(({ icon: Icon, label, sub }) => (
          <button key={label} className="w-full flex items-center gap-4 p-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl transition text-left">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-zinc-800"><Icon className="w-5 h-5 text-zinc-400" /></div>
            <div className="flex-1"><p className="text-white font-medium">{label}</p><p className="text-zinc-500 text-sm">{sub}</p></div>
            <ChevronRight className="w-5 h-5 text-zinc-600" />
          </button>
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

  const handleRoleSelect = (r) => { setRole(r); setActiveTab('feed'); setScreen('app'); };
  const handleViewProfile = (p) => { setSelectedPhotographer(p); setScreen('profile'); };
  const handleBook = (p) => { setSelectedPhotographer(p); setScreen('booking'); };
  const handleBackToApp = () => { setScreen('app'); setSelectedPhotographer(null); setSelectedGallery(null); setSelectedBooking(null); };
  const handleOpenGallery = (gallery) => { setSelectedGallery(gallery); setScreen('galleryDetail'); };
  const handleViewClientGallery = (booking) => { setSelectedBooking(booking); setScreen('clientGallery'); };

  // Splash & role selection
  if (screen === 'splash') return <SplashScreen onContinue={() => setScreen('role')} />;
  if (screen === 'role') return <RoleSelection onSelectRole={handleRoleSelect} />;

  // Shared overlay screens
  if (screen === 'profile' && selectedPhotographer) return <PhotographerProfileCard photographer={selectedPhotographer} onBack={handleBackToApp} onBook={handleBook} />;
  if (screen === 'booking') return <BookingConfirmation onBack={handleBackToApp} />;
  if (screen === 'galleryDetail' && selectedGallery) return <GalleryDetail gallery={selectedGallery} onBack={handleBackToApp} />;
  if (screen === 'newGallery') return <NewGallery onBack={handleBackToApp} />;
  if (screen === 'clientGallery' && selectedBooking) return <ClientGalleryView booking={selectedBooking} onBack={handleBackToApp} />;

  // CLIENT APP
  if (role === 'client') return (
    <div className="min-h-screen bg-black">
      {activeTab === 'feed' && <ClientFeed onViewProfile={handleViewProfile} />}
      {activeTab === 'find' && <ClientFind onViewProfile={handleViewProfile} />}
      {activeTab === 'saved' && <ClientSaved onViewProfile={handleViewProfile} />}
      {activeTab === 'bookings' && <ClientBookings onViewGallery={handleViewClientGallery} />}
      <ClientBottomNav active={activeTab} onNavigate={setActiveTab} />
    </div>
  );

  // PHOTOGRAPHER APP
  return (
    <div className="min-h-screen bg-black">
      {activeTab === 'feed' && <PhotographerFeed onViewProfile={handleViewProfile} />}
      {activeTab === 'galleries' && <PhotographerGalleries onOpenGallery={handleOpenGallery} onNewGallery={() => setScreen('newGallery')} />}
      {activeTab === 'bookings' && <PhotographerBookings />}
      {activeTab === 'portfolio' && <PhotographerPortfolio />}
      {activeTab === 'account' && <PhotographerAccount />}
      <PhotographerBottomNav active={activeTab} onNavigate={setActiveTab} />
    </div>
  );
}
