import React, { useState } from 'react';
import {
  Moon,
  Clock,
  Building,
  Phone,
  MapPin,
  Calendar,
  Sparkles,
  Users
} from 'lucide-react';
import { ReligiousPlace } from '../types';

interface ReligiousProps {
  places: ReligiousPlace[];
}

export const ReligiousSection: React.FC<ReligiousProps> = ({ places }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'মসজিদ' | 'ঈদগাহ' | 'মন্দির' | 'সামাজিক ক্লাব ও যুব সংঘ'>('all');

  // Realistic prayer schedule for Sylhet region (in Bengali)
  const prayerTimes = [
    { name: 'ফজর', azan: '৪:৪৮ মি.', jamat: '৫:১৫ মি.', note: 'সাহরি শেষ: ৪:৪২' },
    { name: 'জোহর', azan: '১১:৫৮ মি.', jamat: '১:১৫ মি.', note: 'দুপুর' },
    { name: 'আসর', azan: '৪:০৮ মি.', jamat: '৪:৩০ মি.', note: 'বিকাল' },
    { name: 'মাগরিব', azan: '৫:৪৩ মি.', jamat: '৫:৪৮ মি.', note: 'সূর্যাস্ত' },
    { name: 'এশা', azan: '৭:০২ মি.', jamat: '৭:৩০ মি.', note: 'তারাবীহ/তাহাজ্জুদ' },
    { name: 'জুমুআ (শুক্রবার)', azan: '১২:৩০ মি.', jamat: '১:১৫ মি.', note: 'কেন্দ্রীয় জামাত' }
  ];

  const filtered = places.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.type === activeFilter;
  });

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-teal-800 dark:text-teal-400 uppercase tracking-widest bg-teal-100 dark:bg-teal-950/60 px-3 py-1 rounded-full">
            আধ্যাত্মিকতা ও সম্প্রীতি
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-100 mt-2">
            ধর্মীয় ও সামাজিক প্রতিষ্ঠান
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 mt-2">
            মসজিদ, শাহী ঈদগাহ ময়দান, মন্দির এবং সমাজকল্যাণমূলক যুব সংঘের মিলনমেলা।
          </p>
        </div>

        {/* Prayer times schedule card */}
        <div className="bg-linear-to-br from-emerald-900 via-teal-900 to-stone-900 text-white rounded-3xl p-6 sm:p-8 mb-10 shadow-xl border border-emerald-700/50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-400/20 rounded-2xl text-amber-300">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  আজকের নামাজের সময়সূচি (সিলেট অঞ্চল)
                </h3>
                <p className="text-xs text-emerald-200">
                  মোগলাবাজার কেন্দ্রীয় জামে মসজিদ ভিত্তিক আদর্শ সময়সূচি
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 bg-emerald-800/80 px-3 py-1.5 rounded-xl text-xs text-emerald-100 self-start sm:self-auto">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              দৈনিক আপডেট
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {prayerTimes.map((prayer, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10 hover:border-amber-400/50 transition-colors text-center"
              >
                <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  {prayer.name}
                </div>
                <div className="text-lg font-black text-white mt-1">
                  {prayer.jamat}
                </div>
                <div className="text-[11px] text-emerald-200 mt-0.5">
                  আজান: {prayer.azan}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-4 scrollbar-none">
          {(['all', 'মসজিদ', 'ঈদগাহ', 'মন্দির', 'সামাজিক ক্লাব ও যুব সংঘ'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                activeFilter === filter
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-50'
              }`}
            >
              {filter === 'all' ? 'সকল প্রতিষ্ঠান' : filter}
            </button>
          ))}
        </div>

        {/* Grid of institutions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((place) => (
            <div
              key={place.id}
              className="bg-white dark:bg-stone-800 rounded-2xl p-5 border border-stone-200 dark:border-stone-700 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <span className="inline-block text-[11px] font-bold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950 px-2.5 py-0.5 rounded mb-2">
                  {place.type}
                </span>

                <h3 className="font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100 mb-2">
                  {place.name}
                </h3>

                <div className="space-y-1.5 text-xs text-stone-600 dark:text-stone-400 mb-4 bg-stone-50 dark:bg-stone-750 p-3 rounded-xl">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>{place.address}</span>
                  </div>
                  <div className="flex items-center gap-2 font-medium text-stone-800 dark:text-stone-200">
                    <Users className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>দায়িত্বশীল: {place.contactPerson}</span>
                  </div>
                </div>
              </div>

              <a
                href={`tel:${place.phone}`}
                className="w-full flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 text-white py-2 rounded-xl text-xs font-bold transition-colors shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                যোগাযোগ: {place.phone}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
