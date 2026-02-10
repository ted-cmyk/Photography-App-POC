'use client'

import React, { useState, useEffect } from 'react';
import { Heart, MapPin, Camera, Calendar, Star, Filter, Search, X, MessageCircle, Home, User, Mail } from 'lucide-react';

// Mock photographer data
const photographers = [
  {
    id: 1,
    name: "Sarah Mitchell",
    specialty: "Wedding & Engagement",
    style: ["Romantic", "Bright", "Candid"],
    location: "Downtown Charleston",
    bio: "Capturing love stories across the Lowcountry for 8+ years. I believe in natural moments and golden hour magic.",
    rating: 4.9,
    reviews: 127,
    packages: [
      { name: "Engagement Session", price: "$450", details: "2 hours, 50+ edited photos, online gallery" },
      { name: "Full Wedding Day", price: "$3,200", details: "8 hours, 500+ photos, second shooter, album" }
    ]
  },
  {
    id: 2,
    name: "Marcus Thompson",
    specialty: "Portrait & Lifestyle",
    style: ["Moody", "Editorial", "Urban"],
    location: "North Charleston",
    bio: "Creative portrait photographer specializing in personal branding and lifestyle. Let's tell your story.",
    rating: 4.8,
    reviews: 89,
    packages: [
      { name: "Headshot Session", price: "$250", details: "1 hour, 10 edited photos, digital delivery" },
      { name: "Personal Branding", price: "$650", details: "3 hours, 40+ photos, multiple locations" }
    ]
  },
  {
    id: 3,
    name: "Emily Chen",
    specialty: "Family & Maternity",
    style: ["Bright", "Natural", "Candid"],
    location: "Mount Pleasant",
    bio: "Mom of three, lover of chaos and genuine smiles. I specialize in making families feel comfortable.",
    rating: 5.0,
    reviews: 156,
    packages: [
      { name: "Family Session", price: "$400", details: "1.5 hours, beach or park location, 30+ photos" },
      { name: "Maternity Package", price: "$550", details: "2 sessions, 50+ photos, maternity gown included" }
    ]
  },
  {
    id: 4,
    name: "Jake Harrison",
    specialty: "Real Estate",
    style: ["Clean", "Architectural"],
    location: "James Island",
    bio: "Architectural and real estate photography that sells homes. Fast turnaround, professional quality.",
    rating: 4.7,
    reviews: 203,
    packages: [
      { name: "Basic Listing", price: "$175", details: "Up to 2000 sq ft, 20-25 photos, 24hr delivery" },
      { name: "Luxury Property", price: "$350", details: "Any size, 40+ photos, twilight shots, drone" }
    ]
  },
  {
    id: 5,
    name: "Olivia Rodriguez",
    specialty: "Events & Corporate",
    style: ["Candid", "Documentary"],
    location: "Downtown Charleston",
    bio: "Event photographer capturing the energy and moments that matter. Corporate events, conferences, and celebrations.",
    rating: 4.9,
    reviews: 94,
    packages: [
      { name: "Half Day Event", price: "$600", details: "4 hours coverage, 200+ photos, online gallery" },
      { name: "Full Day Corporate", price: "$1,200", details: "8 hours, unlimited photos, same-day highlights" }
    ]
  },
  {
    id: 6,
    name: "David Park",
    specialty: "Product & Commercial",
    style: ["Clean", "Minimal", "Studio"],
    location: "West Ashley",
    bio: "Product and commercial photographer for brands and small businesses. Studio available.",
    rating: 4.8,
    reviews: 67,
    packages: [
      { name: "Product Photography", price: "$400", details: "Up to 10 products, white background, basic edits" },
      { name: "Brand Package", price: "$1,500", details: "Full day studio, 50+ final images, lifestyle & product" }
    ]
  },
  {
    id: 7,
    name: "Rachel Green",
    specialty: "Wedding & Engagement",
    style: ["Romantic", "Film-inspired", "Timeless"],
    location: "Isle of Palms",
    bio: "Film photographer capturing timeless love stories. I shoot mostly film with digital backup for the perfect blend.",
    rating: 5.0,
    reviews: 142,
    packages: [
      { name: "Engagement + Film", price: "$600", details: "3 hours, mix of film + digital, 60+ photos" },
      { name: "Wedding Collection", price: "$4,500", details: "10 hours, film + digital, album, prints" }
    ]
  },
  {
    id: 8,
    name: "Tyler Brooks",
    specialty: "Portrait & Lifestyle",
    style: ["Moody", "Cinematic", "Urban"],
    location: "Downtown Charleston",
    bio: "Creative director and photographer. I love working with musicians, artists, and creatives to build their visual brand.",
    rating: 4.9,
    reviews: 78,
    packages: [
      { name: "Artist Session", price: "$350", details: "2 hours, urban locations, 25+ edited photos" },
      { name: "Album Cover Package", price: "$800", details: "Full concept development, 4 hours, unlimited edits" }
    ]
  }
];

const BottomNav = ({ activeView, onNavigate }) => {
  const navItems = [
    { id: 'feed', icon: Home, label: 'For You' },
    { id: 'find', icon: Search, label: 'Find' },
    { id: 'saved', icon: Heart, label: 'Saved' },
    { id: 'messages', icon: Mail, label: 'Messages' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-white/10 z-50">
      <div className="max-w-lg mx-auto px-2 py-2">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition min-w-[60px] ${
                  isActive ? 'text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const ForYouFeed = ({ onViewProfile }) => {
  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
  ];

  return (
    <div className="min-h-screen bg-black pb-20">
      <div className="bg-black/50 backdrop-blur-lg border-b border-white/10 fixed top-0 left-0 right-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2">
            <Camera className="w-6 h-6 text-white" />
            <h1 className="text-lg font-bold text-white">Charleston Shots</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto pt-14">
        {photographers.map((photographer, photoIdx) => (
          Array(3).fill(0).map((_, idx) => (
            <div 
              key={`${photographer.id}-${idx}`}
              className="relative min-h-screen flex items-center justify-center bg-black border-b border-gray-900"
            >
              <div className="relative w-full h-screen">
                <div 
                  className="w-full h-full"
                  style={{ background: gradients[(photoIdx * 3 + idx) % gradients.length] }}
                ></div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                
                <div className="absolute bottom-20 left-0 right-0 p-4">
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full border-2 border-white/50 bg-white/10 backdrop-blur flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {photographer.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-bold text-lg">{photographer.name}</p>
                        <p className="text-white/80 text-sm">{photographer.specialty}</p>
                      </div>
                    </div>
                    <p className="text-white/90 text-sm mb-3">{photographer.bio}</p>
                    <button 
                      onClick={() => onViewProfile(photographer)}
                      className="w-full px-6 py-3 bg-white hover:bg-gray-100 text-black font-semibold rounded-lg transition"
                    >
                      View Portfolio
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ))}
      </div>
    </div>
  );
};

const FindPhotographersPage = ({ onViewProfile, selectedFilters, onFilterChange }) => {
  const [showFilters, setShowFilters] = useState(false);
  
  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
  ];

  const filteredPhotographers = photographers.filter(p => {
    if (selectedFilters.specialty && !p.specialty.includes(selectedFilters.specialty)) return false;
    if (selectedFilters.style && !p.style.some(s => s.toLowerCase().includes(selectedFilters.style.toLowerCase()))) return false;
    if (selectedFilters.location && !p.location.includes(selectedFilters.location)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-zinc-950 pb-20">
      <div className="bg-zinc-950/95 backdrop-blur border-b border-zinc-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Find Photographers</h1>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition"
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>
          <p className="text-zinc-400 text-sm">{filteredPhotographers.length} photographers in Charleston</p>

          {showFilters && (
            <div className="mt-4 p-4 bg-zinc-900 rounded-lg border border-zinc-800">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Specialty</label>
                  <select 
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 text-white rounded-lg text-sm"
                    value={selectedFilters.specialty || ''}
                    onChange={(e) => onFilterChange({ ...selectedFilters, specialty: e.target.value })}
                  >
                    <option value="">All Specialties</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Portrait">Portrait</option>
                    <option value="Family">Family</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Events">Events</option>
                    <option value="Product">Product</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Style</label>
                  <select 
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 text-white rounded-lg text-sm"
                    value={selectedFilters.style || ''}
                    onChange={(e) => onFilterChange({ ...selectedFilters, style: e.target.value })}
                  >
                    <option value="">All Styles</option>
                    <option value="Romantic">Romantic</option>
                    <option value="Moody">Moody</option>
                    <option value="Bright">Bright</option>
                    <option value="Candid">Candid</option>
                    <option value="Editorial">Editorial</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Location</label>
                  <select 
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 text-white rounded-lg text-sm"
                    value={selectedFilters.location || ''}
                    onChange={(e) => onFilterChange({ ...selectedFilters, location: e.target.value })}
                  >
                    <option value="">All Charleston</option>
                    <option value="Downtown">Downtown</option>
                    <option value="Mount Pleasant">Mount Pleasant</option>
                    <option value="James Island">James Island</option>
                    <option value="Isle of Palms">Isle of Palms</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredPhotographers.map((photographer, photoIdx) => (
            Array(3).fill(0).map((_, idx) => (
              <div 
                key={`${photographer.id}-${idx}`}
                onClick={() => onViewProfile(photographer)}
                className="aspect-square rounded-lg overflow-hidden cursor-pointer group relative"
                style={{ background: gradients[(photoIdx * 3 + idx) % gradients.length] }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition">
                  <div className="absolute bottom-0 left-0 right-0 p-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white text-xs font-bold">
                        {photographer.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-xs truncate">{photographer.name}</p>
                        <p className="text-white/80 text-xs truncate">{photographer.specialty}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ))}</div>
      </div>
    </div>
  );
};

const SavedPage = ({ onViewProfile }) => {
  const savedPhotographers = photographers.slice(0, 3);
  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  ];

  return (
    <div className="min-h-screen bg-zinc-950 pb-20">
      <div className="bg-zinc-950/95 backdrop-blur border-b border-zinc-800 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Saved</h1>
          <p className="text-zinc-400 text-sm">{savedPhotographers.length} photographers</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="space-y-4">
          {savedPhotographers.map((photographer, photoIdx) => (
            <div 
              key={photographer.id}
              onClick={() => onViewProfile(photographer)}
              className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 hover:border-zinc-700 cursor-pointer"
            >
              <div className="flex items-start gap-4 mb-3">
                <div className="w-16 h-16 rounded-full border-2 border-zinc-800 flex items-center justify-center text-white font-bold text-lg"
                     style={{ background: gradients[photoIdx] }}>
                  {photographer.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg mb-1">{photographer.name}</h3>
                  <p className="text-zinc-400 text-sm mb-2">{photographer.specialty}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-white font-semibold">{photographer.rating}</span>
                    <span className="text-zinc-500">({photographer.reviews})</span>
                  </div>
                </div>
                <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                {Array(3).fill(0).map((_, idx) => (
                  <div key={idx} className="aspect-square rounded-lg" 
                       style={{ background: gradients[(photoIdx + idx) % gradients.length] }}>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MessagesPage = () => {
  const messages = [
    {
      id: 1,
      photographer: photographers[0],
      lastMessage: "Sounds perfect! I have that Saturday available. Let's do golden hour at Waterfront Park?",
      time: "2h ago",
      unread: true
    },
    {
      id: 2,
      photographer: photographers[2],
      lastMessage: "Thanks for reaching out! I'd love to shoot your family session. When were you thinking?",
      time: "5h ago",
      unread: true
    },
    {
      id: 3,
      photographer: photographers[4],
      lastMessage: "I'll send over the full gallery by end of day tomorrow. Preview looks amazing!",
      time: "1d ago",
      unread: false
    },
    {
      id: 4,
      photographer: photographers[6],
      lastMessage: "Got your booking request! Let me check my calendar and get back to you shortly.",
      time: "2d ago",
      unread: false
    }
  ];

  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
  ];

  return (
    <div className="min-h-screen bg-zinc-950 pb-20">
      <div className="bg-zinc-950/95 backdrop-blur border-b border-zinc-800 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Messages</h1>
          <p className="text-zinc-400 text-sm">{messages.filter(m => m.unread).length} unread</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        {messages.map((message, idx) => (
          <div 
            key={message.id}
            className={`border-b border-zinc-800 p-4 hover:bg-zinc-900/50 cursor-pointer ${
              message.unread ? 'bg-zinc-900/30' : ''
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full border-2 border-zinc-800 flex items-center justify-center text-white font-bold"
                   style={{ background: gradients[idx] }}>
                {message.photographer.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className={`font-semibold ${message.unread ? 'text-white' : 'text-zinc-300'}`}>
                    {message.photographer.name}
                  </h3>
                  <span className="text-xs text-zinc-500">{message.time}</span>
                </div>
                <p className={`text-sm line-clamp-2 ${message.unread ? 'text-zinc-300' : 'text-zinc-500'}`}>
                  {message.lastMessage}
                </p>
              </div>
              {message.unread && (
                <div className="w-2 h-2 rounded-full bg-rose-500 mt-2"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const UserProfilePage = () => {
  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
  ];

  return (
    <div className="min-h-screen bg-zinc-950 pb-20">
      <div className="bg-zinc-950/95 backdrop-blur border-b border-zinc-800 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-white">Profile</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-20 h-20 rounded-full border-4 border-zinc-800 flex items-center justify-center text-white font-bold text-2xl"
                 style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              AR
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-1">Alex Rivera</h2>
              <p className="text-zinc-400 text-sm mb-2">Wedding & Portrait</p>
              <p className="text-zinc-500 text-sm flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                Charleston, SC
              </p>
            </div>
            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition border border-white/20 text-sm">
              Edit Profile
            </button>
          </div>
          
          <p className="text-zinc-300 text-sm mb-4">Passionate about capturing authentic moments and telling visual stories. Available for weddings, engagements, and portrait sessions.</p>

          <div className="grid grid-cols-4 gap-4 pt-4 border-t border-zinc-800">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">2.4k</div>
              <div className="text-xs text-zinc-500">Views</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">23</div>
              <div className="text-xs text-zinc-500">Bookings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">18</div>
              <div className="text-xs text-zinc-500">Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                4.9
              </div>
              <div className="text-xs text-zinc-500">Rating</div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">Your Portfolio</h3>
            <button className="text-sm text-zinc-400 hover:text-white transition">Manage</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {gradients.map((gradient, idx) => (
              <div key={idx} className="aspect-square rounded-lg" style={{ background: gradient }}></div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <button className="w-full flex items-center justify-between p-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg transition">
            <span className="text-white">Account Settings</span>
            <span className="text-zinc-500">›</span>
          </button>
          <button className="w-full flex items-center justify-between p-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg transition">
            <span className="text-white">Pricing & Packages</span>
            <span className="text-zinc-500">›</span>
          </button>
          <button className="w-full flex items-center justify-between p-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg transition">
            <span className="text-white">Availability</span>
            <span className="text-zinc-500">›</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const PhotographerProfile = ({ photographer, onBack, onBook }) => {
  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
  ];

  return (
    <div className="min-h-screen bg-zinc-950 pb-20">
      <div className="bg-zinc-950/95 backdrop-blur border-b border-zinc-800 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
            Back
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-full border-4 border-zinc-800 flex items-center justify-center text-white font-bold text-xl"
                 style={{ background: gradients[photographer.id % gradients.length] }}>
              {photographer.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{photographer.name}</h1>
              <div className="flex flex-wrap items-center gap-3 text-zinc-400 text-sm mb-2">
                <div className="flex items-center gap-1">
                  <Camera className="w-4 h-4" />
                  <span>{photographer.specialty}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{photographer.location}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-white">{photographer.rating}</span>
                <span className="text-zinc-500">({photographer.reviews})</span>
              </div>
            </div>
          </div>
          
          <p className="text-zinc-300 text-sm">{photographer.bio}</p>
          
          <div className="flex flex-wrap gap-2">
            {photographer.style.map((style, idx) => (
              <span 
                key={idx}
                className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full text-xs font-medium border border-zinc-700"
              >
                {style}
              </span>
            ))}
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => onBook(photographer)}
              className="flex-1 px-6 py-3 bg-white hover:bg-zinc-100 text-black font-semibold rounded-lg transition flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Book Session
            </button>
            <button className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition border border-white/20">
              <MessageCircle className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Portfolio</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {gradients.map((gradient, idx) => (
              <div key={idx} className="aspect-square rounded-lg" style={{ background: gradient }}></div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-4">Packages & Pricing</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {photographer.packages.map((pkg, idx) => (
              <div 
                key={idx}
                className="border-2 border-zinc-800 rounded-lg p-4 hover:border-white transition cursor-pointer bg-zinc-900/50"
              >
                <h3 className="text-lg font-bold text-white mb-2">{pkg.name}</h3>
                <p className="text-2xl font-bold text-rose-400 mb-2">{pkg.price}</p>
                <p className="text-zinc-400 text-sm">{pkg.details}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const BookingFlow = ({ photographer, onBack }) => {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-zinc-900 rounded-2xl shadow-2xl p-8 text-center border border-zinc-800">
        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/20">
          <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Booking Flow</h2>
        <p className="text-zinc-400 mb-6">
          Full booking form would go here. For POC, this shows the flow works!
        </p>
        <button 
          onClick={onBack}
          className="w-full px-6 py-3 bg-white hover:bg-zinc-100 text-black font-semibold rounded-lg transition"
        >
          Back to Feed
        </button>
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState('feed');
  const [selectedPhotographer, setSelectedPhotographer] = useState(null);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  const handleViewProfile = (photographer) => {
    setSelectedPhotographer(photographer);
    setView('photographer');
  };

  const handleBook = (photographer) => {
    setSelectedPhotographer(photographer);
    setView('booking');
  };

  const handleNavigate = (destination) => {
    setView(destination);
    setSelectedPhotographer(null);
  };

  const handleBackToFeed = () => {
    setView('feed');
    setSelectedPhotographer(null);
  };

  return (
    <div className="min-h-screen bg-black">
      {view === 'feed' && (
        <ForYouFeed onViewProfile={handleViewProfile} />
      )}
      {view === 'find' && (
        <FindPhotographersPage 
          onViewProfile={handleViewProfile}
          selectedFilters={filters}
          onFilterChange={setFilters}
        />
      )}
      {view === 'saved' && (
        <SavedPage onViewProfile={handleViewProfile} />
      )}
      {view === 'messages' && (
        <MessagesPage />
      )}
      {view === 'profile' && (
        <UserProfilePage />
      )}
      {view === 'photographer' && selectedPhotographer && (
        <PhotographerProfile 
          photographer={selectedPhotographer}
          onBack={handleBackToFeed}
          onBook={handleBook}
        />
      )}
      {view === 'booking' && selectedPhotographer && (
        <BookingFlow 
          photographer={selectedPhotographer}
          onBack={handleBackToFeed}
        />
      )}
      
      {view !== 'booking' && (
        <BottomNav 
          activeView={view === 'photographer' ? 'feed' : view} 
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
}
