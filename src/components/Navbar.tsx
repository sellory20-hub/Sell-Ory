import React, { useState } from 'react';
import {
  Menu,
  X,
  Phone,
  Shield,
  Sun,
  Moon,
  Clock,
  MessageSquareWarning,
  UserCheck,
  Search,
  Globe
} from 'lucide-react';
import { NavTab } from '../types';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  openAdminModal: () => void;
  openSearchModal: () => void;
  openPrayerTimes: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isDark,
  setIsDark,
  openAdminModal,
  openSearchModal,
  openPrayerTimes
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langEnglish, setLangEnglish] = useState(false);

  const navLinks: { id: NavTab; labelBn: string; labelEn: string }[] = [
    { id: 'home', labelBn: 'প্রচ্ছদ', labelEn: 'Home' },
    { id: 'about', labelBn: 'পরিচিতি', labelEn: 'About' },
    { id: 'union', labelBn: 'ইউনিয়ন পরিষদ', labelEn: 'Union Parishad' },
    { id: 'thana', labelBn: 'থানা পুলিশ', labelEn: 'Police Thana' },
    { id: 'emergency', labelBn: 'জরুরি সেবা', labelEn: 'Emergency' },
    { id: 'health', labelBn: 'স্বাস্থ্য ও রক্তদান', labelEn: 'Health & Blood' },
    { id: 'education', labelBn: 'শিক্ষা', labelEn: 'Education' },
    { id: 'business', labelBn: 'ব্যবসা ও বাজার', labelEn: 'Market' },
    { id: 'religious', labelBn: 'ধর্ম ও সমাজ', labelEn: 'Religious' },
    { id: 'news', labelBn: 'খবর ও নোটিশ', labelEn: 'News & Notices' },
    { id: 'gallery', labelBn: 'গ্যালারি', labelEn: 'Gallery' },
    { id: 'contact', labelBn: 'যোগাযোগ', labelEn: 'Contact' },
  ];

  const handleTabClick = (tab: NavTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full shadow-md bg-white dark:bg-stone-900 border-b border-emerald-800/10 dark:border-emerald-700/20 transition-colors">
      {/* Top emergency & utility bar */}
      <div className="bg-emerald-900 text-emerald-50 px-4 py-1.5 text-xs sm:text-sm font-medium border-b border-emerald-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3 overflow-x-auto py-0.5">
            <span className="inline-flex items-center gap-1.5 bg-red-600 text-white px-2 py-0.5 rounded text-xs font-bold shrink-0 animate-pulse">
              <Phone className="w-3 h-3" /> জরুরি: ৯৯৯
            </span>
            <span className="hidden sm:inline text-emerald-200">|</span>
            <a
              href="tel:01713373150"
              className="hover:text-amber-300 transition-colors inline-flex items-center gap-1 shrink-0"
              title="মোগলাবাজার থানা ওসি"
            >
              <Shield className="w-3.5 h-3.5 text-amber-300" />
              <span>ওসি মোগলাবাজার: ০১৭১৩-৩৭৩১৫০</span>
            </a>
            <span className="hidden md:inline text-emerald-200">|</span>
            <button
              onClick={openPrayerTimes}
              className="hidden md:inline-flex items-center gap-1 text-emerald-100 hover:text-amber-300 cursor-pointer transition-colors"
            >
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              <span>আজকের নামাজের সময়সূচি</span>
            </button>
          </div>

          <div className="flex items-center gap-2.5 ml-auto">
            {/* Quick search button */}
            <button
              onClick={openSearchModal}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 text-xs transition-colors"
              title="ওয়েবসাইট খুঁজুন"
            >
              <Search className="w-3 h-3" />
              <span className="hidden sm:inline">অনুসন্ধান</span>
            </button>

            {/* Language switch */}
            <button
              onClick={() => setLangEnglish(!langEnglish)}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 text-xs transition-colors"
              title="ভাষা পরিবর্তন"
            >
              <Globe className="w-3 h-3 text-amber-300" />
              <span>{langEnglish ? 'বাংলা' : 'English'}</span>
            </button>

            {/* Dark / Light Mode Switch */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-1 rounded bg-emerald-800/80 hover:bg-emerald-700 text-amber-300 transition-colors"
              aria-label="Toggle theme"
              title={isDark ? 'লাইট মোড' : 'ডার্ক মোড'}
            >
              {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            {/* Admin entry */}
            <button
              onClick={openAdminModal}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-600/90 hover:bg-amber-500 text-white text-xs font-semibold transition-colors"
              title="অ্যাডমিন প্যানেল"
            >
              <UserCheck className="w-3 h-3" />
              <span className="hidden sm:inline">অ্যাডমিন</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Branding Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 sm:py-3.5 flex items-center justify-between">
        <div 
          onClick={() => handleTabClick('home')} 
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          {/* Logo Crest */}
          <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-linear-to-tr from-emerald-800 via-emerald-700 to-green-600 p-0.5 shadow-md flex items-center justify-center shrink-0 border-2 border-amber-400">
            <div className="w-full h-full rounded-full bg-emerald-950 flex flex-col items-center justify-center text-center p-1">
              <span className="text-[10px] font-bold text-amber-400 tracking-tighter leading-none">মোগলা</span>
              <span className="text-[9px] font-bold text-white tracking-tighter leading-none">বাজার</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-emerald-900 dark:text-emerald-300 tracking-tight leading-none group-hover:text-emerald-700 transition-colors">
                ভিজিবেল মোগলাবাজার
              </h1>
              <span className="hidden lg:inline-block text-[11px] bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-700 px-1.5 py-0.5 rounded font-semibold">
                সিলেট
              </span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-300 mt-0.5 font-medium">
              মোগলাবাজার ইউনিয়ন ও থানার ডিজিটাল জনসেবা ও তথ্য পোর্টাল
            </p>
          </div>
        </div>

        {/* Action Button: Citizen Complaint (Quick highlight) */}
        <div className="hidden lg:flex items-center gap-2.5">
          <button
            onClick={() => handleTabClick('complaint')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm ${
              activeTab === 'complaint'
                ? 'bg-amber-600 text-white ring-2 ring-amber-400'
                : 'bg-amber-500 hover:bg-amber-600 text-white hover:shadow'
            }`}
          >
            <MessageSquareWarning className="w-4 h-4 animate-bounce" />
            <span>আপনার এলাকার সমস্যা জানান</span>
          </button>
        </div>

        {/* Mobile Hamburger toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => handleTabClick('complaint')}
            className="p-2 text-xs bg-amber-500 hover:bg-amber-600 text-white rounded-md font-semibold flex items-center gap-1"
            title="সমস্যা জানান"
          >
            <MessageSquareWarning className="w-4 h-4" />
            <span className="hidden xs:inline">সমস্যা জানান</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200 hover:bg-emerald-50 dark:hover:bg-emerald-950"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Main Desktop Navigation bar */}
      <nav className="hidden lg:block bg-emerald-800 dark:bg-emerald-950 text-white border-t border-emerald-700/50">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between overflow-x-auto scrollbar-none">
          <div className="flex items-center space-x-1 py-1">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleTabClick(link.id)}
                  className={`px-3 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                      : 'text-emerald-100 hover:bg-emerald-700/70 hover:text-white'
                  }`}
                >
                  {langEnglish ? link.labelEn : link.labelBn}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 px-4 pt-2 pb-6 max-h-[80vh] overflow-y-auto shadow-xl">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleTabClick(link.id)}
                  className={`p-2.5 text-left text-sm rounded-lg font-medium transition-colors ${
                    isActive
                      ? 'bg-emerald-800 text-white font-bold'
                      : 'bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-emerald-100 dark:hover:bg-emerald-950'
                  }`}
                >
                  {langEnglish ? link.labelEn : link.labelBn}
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-stone-200 dark:border-stone-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openPrayerTimes();
              }}
              className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 text-sm font-semibold"
            >
              <Clock className="w-4 h-4 text-amber-500" />
              আজকের নামাজের সময়সূচি দেখুন
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openAdminModal();
              }}
              className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-amber-500 text-white text-sm font-semibold"
            >
              <UserCheck className="w-4 h-4" />
              অ্যাডমিন প্যানেল প্রবেশ
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
