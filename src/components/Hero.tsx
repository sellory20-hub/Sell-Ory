import React, { useState, useEffect } from 'react';
import {
  Search,
  BellRing,
  PhoneCall,
  FileText,
  GraduationCap,
  HeartPulse,
  Store,
  MessageSquarePlus,
  Landmark,
  ChevronRight,
  ShieldCheck,
  MapPin,
  ChevronLeft,
  Share2
} from 'lucide-react';
import { NavTab, Notice } from '../types';
import { shareOnFacebook } from '../utils/helpers';

interface HeroProps {
  notices: Notice[];
  setActiveTab: (tab: NavTab) => void;
  onSearchQuery: (query: string) => void;
}

const SLIDES = [
  {
    title: 'ভিজিবেল মোগলাবাজার',
    tagline: 'মোগলাবাজারের ঐতিহ্য, নাগরিক সেবা ও নিরাপত্তা এখন এক প্ল্যাটফর্মে',
    badge: 'দক্ষিণ সুরমা, সিলেট',
    bgImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
    primaryBtn: { text: 'ইউনিয়ন পরিষদ সেবা', tab: 'union' as NavTab },
    secondaryBtn: { text: 'জরুরি হেল্পলাইন', tab: 'emergency' as NavTab },
  },
  {
    title: 'শান্তি, শৃঙ্খলা ও নিরাপত্তা',
    tagline: 'মোগলাবাজার থানা পুলিশ ২৪ ঘণ্টা আপনার নিরাপত্তায় ও জরুরি সেবায় নিয়োজিত',
    badge: 'আইনশৃঙ্খলা ও জিডি সহায়তা',
    bgImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=1600&q=80',
    primaryBtn: { text: 'থানার কর্মকর্তা ও হটলাইন', tab: 'thana' as NavTab },
    secondaryBtn: { text: 'সমস্যা অভিযোগ জানান', tab: 'complaint' as NavTab },
  },
  {
    title: 'স্বাস্থ্যসেবা ও রক্তদাতা নেটওয়ার্ক',
    tagline: 'মোগলাবাজার উপস্বাস্থ্য কেন্দ্র, ২৪ ঘণ্টা ফার্মেসি ও তাৎক্ষণিক রক্তদাতা সন্ধান',
    badge: 'জনস্বাস্থ্য ও মানবসেবা',
    bgImage: 'https://images.unsplash.com/photo-1579208575657-c595a05383b7?auto=format&fit=crop&w=1600&q=80',
    primaryBtn: { text: 'রক্তদাতা খুঁজুন', tab: 'health' as NavTab },
    secondaryBtn: { text: 'চিকিৎসা ডিরেক্টরি', tab: 'health' as NavTab },
  }
];

export const Hero: React.FC<HeroProps> = ({ notices, setActiveTab, onSearchQuery }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchInput, setSearchInput] = useState('');

  // Auto-slide every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchQuery(searchInput.trim());
    }
  };

  const urgentNotices = notices.slice(0, 4);

  return (
    <div className="relative">
      {/* 1. Scrolling Notice Ticker */}
      <div className="bg-amber-500 text-stone-900 border-b border-amber-600 px-4 py-2 flex items-center shadow-xs overflow-hidden">
        <div className="flex items-center gap-2 bg-stone-900 text-amber-300 px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider shrink-0 z-10 shadow-xs">
          <BellRing className="w-3.5 h-3.5 animate-bounce" />
          <span>সর্বশেষ নোটিশ</span>
        </div>
        <div className="ml-3 overflow-hidden whitespace-nowrap w-full relative">
          <div className="inline-block animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused] cursor-pointer">
            {urgentNotices.map((n, idx) => (
              <span
                key={n.id}
                onClick={() => setActiveTab('news')}
                className="inline-flex items-center gap-2 mr-8 text-xs sm:text-sm font-semibold hover:underline"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-800"></span>
                {n.title}
                {idx < urgentNotices.length - 1 && <span className="text-amber-800 font-normal">|</span>}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Hero Carousel Banner */}
      <div className="relative min-h-[460px] sm:min-h-[520px] flex items-center justify-center overflow-hidden bg-stone-950 text-white">
        {SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
          >
            {/* Background Image with dark gradient overlay */}
            <img
              src={slide.bgImage}
              alt={slide.title}
              className="w-full h-full object-cover object-center brightness-60"
            />
            <div className="absolute inset-0 bg-linear-to-r from-emerald-950/90 via-emerald-950/75 to-stone-950/80"></div>
          </div>
        ))}

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 py-12 sm:py-16 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-emerald-800/80 border border-emerald-400/40 text-emerald-200 text-xs sm:text-sm px-3.5 py-1 rounded-full mb-4 backdrop-blur-xs shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>{SLIDES[currentSlide].badge}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4 drop-shadow-md">
            {SLIDES[currentSlide].title}
          </h1>

          <p className="max-w-2xl text-base sm:text-lg md:text-xl text-emerald-100 mb-8 leading-relaxed font-light">
            {SLIDES[currentSlide].tagline}
          </p>

          {/* Quick Search in Hero */}
          <form
            onSubmit={handleSearchSubmit}
            className="w-full max-w-2xl bg-white dark:bg-stone-900 rounded-xl shadow-2xl p-1.5 sm:p-2 flex items-center border-2 border-emerald-500/50 focus-within:border-amber-400 transition-all mb-8"
          >
            <div className="pl-3 text-stone-400">
              <Search className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
            </div>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="কী খুঁজছেন? (উদা: চেয়ারম্যান, ওসি, ডাক্তার, ব্লাড গ্রুপ, নোটিশ...)"
              className="w-full px-3 py-2 text-stone-800 dark:text-stone-100 text-sm sm:text-base outline-none bg-transparent"
            />
            <button
              type="submit"
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 sm:px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors shrink-0 shadow-sm"
            >
              অনুসন্ধান
            </button>
          </form>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setActiveTab(SLIDES[currentSlide].primaryBtn.tab)}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold px-6 py-3 rounded-lg text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <span>{SLIDES[currentSlide].primaryBtn.text}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab(SLIDES[currentSlide].secondaryBtn.tab)}
              className="inline-flex items-center gap-2 bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-400/50 text-white font-medium px-5 py-3 rounded-lg text-sm sm:text-base backdrop-blur-xs transition-colors"
            >
              <span>{SLIDES[currentSlide].secondaryBtn.text}</span>
            </button>
            <button
              onClick={() => shareOnFacebook(undefined, 'ভিজিবেল মোগলাবাজার - ইউনিয়ন ও থানার সমন্বিত পোর্টাল')}
              className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-3 rounded-lg border border-white/20 transition-colors"
              title="ফেসবুকে শেয়ার করুন"
            >
              <Share2 className="w-4 h-4 text-amber-300" />
              <span>শেয়ার</span>
            </button>
          </div>
        </div>

        {/* Carousel controls */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white transition-colors z-20 hidden sm:block"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % SLIDES.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white transition-colors z-20 hidden sm:block"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Carousel indicator dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all ${
                i === currentSlide ? 'w-6 bg-amber-400' : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* 3. Quick Action Service Grid */}
      <div className="relative -mt-8 z-30 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {[
            {
              tab: 'emergency' as NavTab,
              label: 'জরুরি নম্বর',
              icon: PhoneCall,
              color: 'bg-red-600 text-white',
              subtitle: 'পুলিশ, ফায়ার, বিদ্যুৎ'
            },
            {
              tab: 'union' as NavTab,
              label: 'ইউপি নাগরিক সনদ',
              icon: Landmark,
              color: 'bg-emerald-700 text-white',
              subtitle: 'জন্ম, ওয়ারিশান ও প্রত্যয়ন'
            },
            {
              tab: 'thana' as NavTab,
              label: 'মোগলাবাজার থানা',
              icon: ShieldCheck,
              color: 'bg-blue-700 text-white',
              subtitle: 'ওসি, জিডি ও নিরাপত্তা'
            },
            {
              tab: 'health' as NavTab,
              label: 'স্বাস্থ্য ও রক্তদান',
              icon: HeartPulse,
              color: 'bg-rose-600 text-white',
              subtitle: 'ডাক্তার, ক্লিনিক ও ডোনার'
            },
            {
              tab: 'education' as NavTab,
              label: 'শিক্ষা প্রতিষ্ঠান',
              icon: GraduationCap,
              color: 'bg-indigo-700 text-white',
              subtitle: 'স্কুল, কলেজ ও মাদ্রাসা'
            },
            {
              tab: 'complaint' as NavTab,
              label: 'সমস্যা জানান',
              icon: MessageSquarePlus,
              color: 'bg-amber-600 text-white',
              subtitle: 'রাস্তা, বাতি ও সমাধান'
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={() => setActiveTab(item.tab)}
                className="bg-white dark:bg-stone-800 p-3 sm:p-4 rounded-xl shadow-lg hover:shadow-xl border border-stone-200 dark:border-stone-700 transition-all transform hover:-translate-y-1 text-left flex flex-col justify-between group cursor-pointer"
              >
                <div className={`w-10 h-10 rounded-lg ${item.color} flex items-center justify-center mb-2 shadow-xs group-hover:scale-105 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                    {item.label}
                  </h3>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate">
                    {item.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
