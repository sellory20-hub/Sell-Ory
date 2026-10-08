/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { NavTab, Notice, NewsItem, CouncilMember, ThanaOfficer, HealthProvider, BloodDonor, Institution, BusinessItem, ReligiousPlace, GalleryPhoto, CitizenComplaint, CitizenServiceCharter } from './types';
import {
  INITIAL_NOTICES,
  INITIAL_NEWS,
  INITIAL_COUNCIL,
  INITIAL_THANA_OFFICERS,
  INITIAL_INSTITUTIONS,
  INITIAL_HEALTH,
  INITIAL_BLOOD_DONORS,
  INITIAL_BUSINESSES,
  INITIAL_RELIGIOUS,
  INITIAL_SERVICES_CHARTER,
  INITIAL_GALLERY,
  INITIAL_COMPLAINTS
} from './data/initialData';
import { getStorageItem, setStorageItem } from './utils/helpers';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsCounter } from './components/StatsCounter';
import { QuickEmergency } from './components/QuickEmergency';
import { AboutSection } from './components/AboutSection';
import { UnionParishadSection } from './components/UnionParishadSection';
import { ThanaSection } from './components/ThanaSection';
import { HealthSection } from './components/HealthSection';
import { EducationSection } from './components/EducationSection';
import { BusinessSection } from './components/BusinessSection';
import { ReligiousSection } from './components/ReligiousSection';
import { NewsNoticeSection } from './components/NewsNoticeSection';
import { GallerySection } from './components/GallerySection';
import { CitizenComplaintSection } from './components/CitizenComplaintSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminModal } from './components/AdminModal';
import { SearchModal } from './components/SearchModal';
import { PrayerTimesModal } from './components/PrayerTimesModal';
import { FloatingActions } from './components/FloatingActions';
import { ArrowRight, ShieldCheck, HeartPulse, GraduationCap, ChevronRight, Phone } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [isDark, setIsDark] = useState<boolean>(() => {
    return getStorageItem('mb_theme_dark', false);
  });

  // Persistent States
  const [notices, setNotices] = useState<Notice[]>(() =>
    getStorageItem('mb_notices', INITIAL_NOTICES)
  );
  const [news, setNews] = useState<NewsItem[]>(() =>
    getStorageItem('mb_news', INITIAL_NEWS)
  );
  const [bloodDonors, setBloodDonors] = useState<BloodDonor[]>(() =>
    getStorageItem('mb_blood_donors', INITIAL_BLOOD_DONORS)
  );
  const [complaints, setComplaints] = useState<CitizenComplaint[]>(() =>
    getStorageItem('mb_complaints', INITIAL_COMPLAINTS)
  );
  const [photos] = useState<GalleryPhoto[]>(INITIAL_GALLERY);
  const [council] = useState<CouncilMember[]>(INITIAL_COUNCIL);
  const [officers] = useState<ThanaOfficer[]>(INITIAL_THANA_OFFICERS);
  const [health] = useState<HealthProvider[]>(INITIAL_HEALTH);
  const [institutions] = useState<Institution[]>(INITIAL_INSTITUTIONS);
  const [businesses] = useState<BusinessItem[]>(INITIAL_BUSINESSES);
  const [religious] = useState<ReligiousPlace[]>(INITIAL_RELIGIOUS);
  const [charter] = useState<CitizenServiceCharter[]>(INITIAL_SERVICES_CHARTER);

  // Modals state
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPrayerModalOpen, setIsPrayerModalOpen] = useState(false);

  // Sync dark class on document root
  useEffect(() => {
    setStorageItem('mb_theme_dark', isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Persist edits
  useEffect(() => {
    setStorageItem('mb_notices', notices);
  }, [notices]);

  useEffect(() => {
    setStorageItem('mb_news', news);
  }, [news]);

  useEffect(() => {
    setStorageItem('mb_blood_donors', bloodDonors);
  }, [bloodDonors]);

  useEffect(() => {
    setStorageItem('mb_complaints', complaints);
  }, [complaints]);

  // Handlers for Admin & User Actions
  const handleAddNotice = (n: Notice) => {
    setNotices([n, ...notices]);
  };

  const handleDeleteNotice = (id: string) => {
    setNotices(notices.filter((n) => n.id !== id));
  };

  const handleAddNews = (item: NewsItem) => {
    setNews([item, ...news]);
  };

  const handleDeleteNews = (id: string) => {
    setNews(news.filter((item) => item.id !== id));
  };

  const handleAddBloodDonor = (donor: BloodDonor) => {
    setBloodDonors([donor, ...bloodDonors]);
  };

  const handleAddComplaint = (c: CitizenComplaint) => {
    setComplaints([c, ...complaints]);
  };

  const handleUpdateComplaintStatus = (
    id: string,
    status: CitizenComplaint['status'],
    reply?: string
  ) => {
    setComplaints(
      complaints.map((c) => {
        if (c.id === id) {
          return {
            ...c,
            status,
            officialReply: reply !== undefined ? reply : c.officialReply
          };
        }
        return c;
      })
    );
  };

  const handleDeleteComplaint = (id: string) => {
    setComplaints(complaints.filter((c) => c.id !== id));
  };

  const handleResetAllData = () => {
    setNotices(INITIAL_NOTICES);
    setNews(INITIAL_NEWS);
    setBloodDonors(INITIAL_BLOOD_DONORS);
    setComplaints(INITIAL_COMPLAINTS);
    localStorage.removeItem('mb_notices');
    localStorage.removeItem('mb_news');
    localStorage.removeItem('mb_blood_donors');
    localStorage.removeItem('mb_complaints');
  };

  const handleSearchFromHero = (q: string) => {
    setSearchQuery(q);
    setIsSearchOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-stone-950 text-stone-800 dark:text-stone-100 transition-colors">
      {/* Main Sticky Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDark={isDark}
        setIsDark={setIsDark}
        openAdminModal={() => setIsAdminOpen(true)}
        openSearchModal={() => setIsSearchOpen(true)}
        openPrayerTimes={() => setIsPrayerModalOpen(true)}
      />

      {/* Main Body Content based on activeTab */}
      <main className="flex-1">
        {/* HOMEPAGE VIEW */}
        {activeTab === 'home' && (
          <div className="space-y-4">
            {/* 1. Hero with Slider, Ticker and Action Grid */}
            <Hero
              notices={notices}
              setActiveTab={setActiveTab}
              onSearchQuery={handleSearchFromHero}
            />

            {/* 2. Interactive Area Statistics Counter */}
            <div className="pt-8">
              <StatsCounter />
            </div>

            {/* 3. Emergency Dialers & Hotlines Highlight */}
            <QuickEmergency />

            {/* 4. Union & Police Leadership Summary Teaser */}
            <section className="py-8 bg-white dark:bg-stone-900 border-y border-stone-200 dark:border-stone-800">
              <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Union Parishad Teaser */}
                  <div className="p-6 rounded-3xl bg-linear-to-br from-emerald-900 to-emerald-950 text-white flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-bold text-amber-300 uppercase tracking-widest bg-amber-400/20 px-3 py-1 rounded-full">
                        স্থানীয় সরকার প্রশাসন
                      </span>
                      <h3 className="text-2xl font-black mt-3 mb-2">
                        মোগলাবাজার ইউনিয়ন পরিষদ
                      </h3>
                      <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed mb-6">
                        নাগরিক সনদপত্র, জন্ম ও মৃত্যু নিবন্ধন, ওয়ারিশান সনদ এবং টেকসই গ্রামীণ অবকাঠামো উন্নয়নে জনগণের পাশে পরিষদ।
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-emerald-800">
                      <span className="text-xs text-emerald-300 font-medium">চেয়ারম্যান ও ৯ ওয়ার্ড মেম্বার</span>
                      <button
                        onClick={() => {
                          setActiveTab('union');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="inline-flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-stone-950 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        <span>বিস্তারিত দেখুন</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Thana Teaser */}
                  <div className="p-6 rounded-3xl bg-linear-to-br from-blue-900 to-slate-950 text-white flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-bold text-blue-300 uppercase tracking-widest bg-blue-500/20 px-3 py-1 rounded-full">
                        জননিরাপত্তা ও পুলিশ
                      </span>
                      <h3 className="text-2xl font-black mt-3 mb-2">
                        মোগলাবাজার থানা পুলিশ
                      </h3>
                      <p className="text-xs sm:text-sm text-blue-100 leading-relaxed mb-6">
                        ২৪ ঘণ্টা জরুরি টহল, অনলাইন জিডি তথ্য, আইনশৃঙ্খলা সুরক্ষা ও জাতীয় জরুরি হেল্পলাইন ৯৯৯ সমন্বয়।
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-blue-900">
                      <span className="text-xs text-blue-300 font-medium">ওসি ও ডিউটি অফিসার হটলাইন</span>
                      <button
                        onClick={() => {
                          setActiveTab('thana');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="inline-flex items-center gap-1.5 bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        <span>থানা হেল্পডেস্ক</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 5. Latest News and Notices */}
            <NewsNoticeSection notices={notices} news={news} />

            {/* 6. Photo Gallery Preview */}
            <GallerySection photos={photos} />

            {/* 7. Citizen Complaint Call to Action Banner */}
            <div className="max-w-7xl mx-auto px-4 py-6">
              <div className="bg-linear-to-r from-amber-500 via-amber-600 to-yellow-600 text-stone-950 p-6 sm:p-10 rounded-3xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-widest bg-stone-950 text-amber-300 px-3 py-1 rounded-full">
                    নাগরিক অধিকার ও সমস্যা
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black mt-2 mb-1">
                    আপনার ওয়ার্ডের সমস্যা ছবি সহ সরাসরি জানান
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-900 font-medium">
                    ভাঙা রাস্তা, বিদ্যুৎ বিভ্রাট বা সুপেয় পানির সমস্যা থাকলে সরাসরি ইউনিয়ন পরিষদে রিপোর্ট করুন এবং অনলাইনে ট্র্যাকিং নম্বর দিয়ে অগ্রগতি দেখুন।
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActiveTab('complaint');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-stone-950 hover:bg-stone-800 text-white font-bold px-6 py-3.5 rounded-2xl text-sm transition-transform hover:scale-105 shadow-xl shrink-0 cursor-pointer"
                >
                  সমস্যা রিপোর্ট করুন
                </button>
              </div>
            </div>
          </div>
        )}

        {/* INDIVIDUAL SUBPAGE VIEWS */}
        {activeTab === 'about' && <AboutSection />}

        {activeTab === 'union' && (
          <UnionParishadSection
            councilMembers={council}
            servicesCharter={charter}
          />
        )}

        {activeTab === 'thana' && <ThanaSection officers={officers} />}

        {activeTab === 'emergency' && <QuickEmergency />}

        {activeTab === 'health' && (
          <HealthSection
            healthProviders={health}
            bloodDonors={bloodDonors}
            onAddBloodDonor={handleAddBloodDonor}
          />
        )}

        {activeTab === 'education' && (
          <EducationSection institutions={institutions} />
        )}

        {activeTab === 'business' && (
          <BusinessSection businesses={businesses} />
        )}

        {activeTab === 'religious' && (
          <ReligiousSection places={religious} />
        )}

        {activeTab === 'news' && (
          <NewsNoticeSection notices={notices} news={news} />
        )}

        {activeTab === 'gallery' && <GallerySection photos={photos} />}

        {activeTab === 'complaint' && (
          <CitizenComplaintSection
            complaints={complaints}
            onSubmitComplaint={handleAddComplaint}
          />
        )}

        {activeTab === 'contact' && <ContactSection />}
      </main>

      {/* Floating Speed Actions (WhatsApp, Dial, Back to top) */}
      <FloatingActions onOpenComplaint={() => setActiveTab('complaint')} />

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        openAdminModal={() => setIsAdminOpen(true)}
      />

      {/* Modals */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        notices={notices}
        news={news}
        complaints={complaints}
        photos={photos}
        onAddNotice={handleAddNotice}
        onDeleteNotice={handleDeleteNotice}
        onAddNews={handleAddNews}
        onDeleteNews={handleDeleteNews}
        onUpdateComplaintStatus={handleUpdateComplaintStatus}
        onDeleteComplaint={handleDeleteComplaint}
        onResetAllData={handleResetAllData}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        query={searchQuery}
        setQuery={setSearchQuery}
        onSelectTab={setActiveTab}
        notices={notices}
        news={news}
        council={council}
        officers={officers}
        health={health}
        institutions={institutions}
        businesses={businesses}
      />

      <PrayerTimesModal
        isOpen={isPrayerModalOpen}
        onClose={() => setIsPrayerModalOpen(false)}
      />
    </div>
  );
}
