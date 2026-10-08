import React, { useState } from 'react';
import {
  Store,
  Calendar,
  Clock,
  Phone,
  MapPin,
  Search,
  Building,
  ShoppingBag,
  CreditCard,
  Truck
} from 'lucide-react';
import { BusinessItem } from '../types';

interface BusinessProps {
  businesses: BusinessItem[];
}

export const BusinessSection: React.FC<BusinessProps> = ({ businesses }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'all',
    'ব্যাংক ও এজেন্ট',
    'মুদি ও সুপারশপ',
    'ফার্মেসি',
    'রেস্টুরেন্ট',
    'ইলেকট্রনিক্স ও হার্ডওয়্যার',
    'পরিবহন সেবা'
  ];

  const filtered = businesses.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-widest bg-amber-100 dark:bg-amber-950/60 px-3 py-1 rounded-full">
            বাণিজ্য ও বাজার
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-100 mt-2">
            মোগলাবাজার হাট ও ব্যবসা ডিরেক্টরি
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 mt-2">
            দক্ষিণ সুরমার শতবর্ষী ঐতিহাসিক বাণিজ্যিক কেন্দ্র, হাটবার সূচি ও স্থানীয় সেবা প্রতিষ্ঠানের পরিচিতি।
          </p>
        </div>

        {/* Moglabazar Haat Special Feature Card */}
        <div className="bg-linear-to-r from-amber-600 via-yellow-600 to-amber-700 text-white rounded-3xl p-6 sm:p-8 mb-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-black/20 text-white text-xs px-3 py-1 rounded-full font-bold">
              <Calendar className="w-4 h-4 text-amber-200" />
              সাপ্তাহিক হাটবার সময়সূচি
            </div>
            <h3 className="text-2xl sm:text-3xl font-black">
              মোগলাবাজারের ঐতিহ্যবাহী হাট: প্রতি রবিবার ও বৃহস্পতিবার
            </h3>
            <p className="text-amber-100 text-xs sm:text-sm max-w-2xl leading-relaxed">
              সকাল ৭:০০টা থেকে রাত ১০:০০টা পর্যন্ত এই দুই দিন বিশাল হাট বসে। আশেপাশের কয়েকটি উপজেলা ও গ্রাম থেকে শাক-সবজি, মাছ, গবাদি পশু, কৃষি সরঞ্জাম ও ঐতিহ্যবাহী লালমোহন মিষ্টির বিপুল কেনাবেচা হয়।
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center shrink-0 w-full sm:w-auto">
            <div className="text-xs text-amber-200 uppercase font-bold tracking-wider">প্রধান হাটের দিন</div>
            <div className="text-xl sm:text-2xl font-black mt-1">রবিবার ও বৃহস্পতিবার</div>
            <div className="text-xs text-amber-200 mt-1">প্রতিদিন সাধারণ বাজার খোলা থাকে</div>
          </div>
        </div>

        {/* Filter and Search */}
        <div className="bg-white dark:bg-stone-800 p-4 rounded-2xl border border-stone-200 dark:border-stone-700 shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === c
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
                }`}
              >
                {c === 'all' ? 'সকল ব্যবসা' : c}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="দোকান বা ব্যাংকের নাম খুঁজুন..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 text-xs sm:text-sm outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-stone-800 rounded-2xl p-5 border border-stone-200 dark:border-stone-700 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-amber-800 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-2.5 py-0.5 rounded">
                    {item.category}
                  </span>
                </div>

                <h3 className="font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100 mb-1">
                  {item.name}
                </h3>

                <p className="text-xs text-stone-600 dark:text-stone-400 mb-3">
                  স্বত্বাধিকারী / ইনচার্জ: <strong>{item.owner}</strong>
                </p>

                <div className="space-y-1.5 text-xs text-stone-500 dark:text-stone-400 mb-4 bg-stone-50 dark:bg-stone-750 p-2.5 rounded-xl">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{item.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>{item.timing}</span>
                  </div>
                </div>
              </div>

              <a
                href={`tel:${item.phone}`}
                className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-xl text-xs font-bold transition-colors shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                যোগাযোগ: {item.phone}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
