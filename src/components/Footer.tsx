import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  ChevronUp,
  Facebook,
  ShieldCheck,
  Heart,
  Globe2,
  ExternalLink
} from 'lucide-react';
import { NavTab } from '../types';

interface FooterProps {
  setActiveTab: (tab: NavTab) => void;
  openAdminModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, openAdminModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLink = (tab: NavTab) => {
    setActiveTab(tab);
    scrollToTop();
  };

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 transition-colors">
      {/* Top Banner section */}
      <div className="bg-emerald-950/90 text-emerald-100 py-6 border-b border-emerald-900/60">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-400 text-stone-950 font-black flex items-center justify-center text-sm shadow-md">
              এমবি
            </div>
            <div>
              <h3 className="font-bold text-base text-white">
                ভিজিবেল মোগলাবাজার - ডিজিটাল তথ্য বাতায়ন
              </h3>
              <p className="text-xs text-emerald-300">
                মোগলাবাজারের ঐতিহ্য ও জনগণের সেবায় নিবেদিত উন্মুক্ত পোর্টাল
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleLink('complaint')}
              className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-4 py-2 rounded-xl text-xs transition-colors shadow-sm"
            >
              সমস্যা জানান
            </button>
            <button
              onClick={() => handleLink('emergency')}
              className="bg-red-700 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors shadow-sm"
            >
              জরুরি নম্বর
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: About */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-white text-lg font-bold flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              ভিজিবেল মোগলাবাজার
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              মোগলাবাজার ইউনিয়ন ও থানার নাগরিকদের জীবন সহজ করতে এবং প্রবাসী ভাই-বোনসহ সকল দর্শকের নিকট সঠিক তথ্য পৌঁছে দিতে এই উদ্যোগ। স্বাস্থ্য, শিক্ষা, ব্যবসা, প্রশাসন ও জরুরি সব সেবা এক নজরে।
            </p>
            <div className="text-xs text-stone-400 space-y-1.5 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>মোগলাবাজার, দক্ষিণ সুরমা, সিলেট - ৩১০৩</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>হেল্পলাইন: ৯৯৯ | থানা ওসি: ০১৭১৩-৩৭৩১৫০</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>ইমেইল: info@visiblemoglabazar.org</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">
              গুরুত্বপূর্ণ সেবা
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleLink('union')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  ইউপি নাগরিক সনদ নির্দেশিকা
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('thana')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  মোগলাবাজার থানা ও জিডি
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('health')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  রক্তদাতা সন্ধান ও ক্লিনিক
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('education')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  স্কুল, কলেজ ও মাদ্রাসা
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('business')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  মোগলাবাজার হাটের সময়সূচি
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Community & Culture */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">
              জনকল্যাণ ও যোগাযোগ
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleLink('complaint')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  নাগরিক সমস্যা ও সমাধান
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('religious')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  মসজিদ, মন্দির ও ক্লাবস
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('news')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  সর্বশেষ সরকারি নোটিশ
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('gallery')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  ঐতিহ্যবাহী ফটো গ্যালারি
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('contact')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  সরাসরি যোগাযোগ ফর্ম
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Important Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">
              জাতীয় পোর্টাল লিঙ্ক
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://bangladesh.gov.bd"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>বাংলাদেশ জাতীয় তথ্য বাতায়ন</span>
                  <ExternalLink className="w-3 h-3 text-stone-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://bdris.gov.bd"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>জন্ম ও মৃত্যু নিবন্ধন পোর্টাল</span>
                  <ExternalLink className="w-3 h-3 text-stone-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://services.nidw.gov.bd"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>স্মার্ট এনআইডি উইং</span>
                  <ExternalLink className="w-3 h-3 text-stone-500" />
                </a>
              </li>
              <li>
                <button
                  onClick={openAdminModal}
                  className="text-stone-400 hover:text-amber-400 transition-colors"
                >
                  অ্যাডমিন কন্ট্রোল লগইন
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & back to top */}
        <div className="mt-12 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div>
            © ২০২৬ <strong>ভিজিবেল মোগলাবাজার</strong>। সর্বস্বত্ব সংরক্ষিত।
          </div>

          <div className="flex items-center gap-3">
            <span>ডিজিটাল পরিচয় ও জনসেবা প্ল্যাটফর্ম</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-stone-800 hover:bg-emerald-700 text-stone-200 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
              title="উপরে যান"
            >
              <ChevronUp className="w-4 h-4" />
              <span>শীর্ষে</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
