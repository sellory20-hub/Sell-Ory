import React, { useState } from 'react';
import {
  GraduationCap,
  School,
  BookOpen,
  Phone,
  MapPin,
  Users,
  Search,
  Award
} from 'lucide-react';
import { Institution } from '../types';
import { toBnNumber } from '../utils/helpers';

interface EducationProps {
  institutions: Institution[];
}

export const EducationSection: React.FC<EducationProps> = ({ institutions }) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const types = ['all', 'কলেজ', 'মাধ্যমিক বিদ্যালয়', 'প্রাথমিক বিদ্যালয়', 'মাদ্রাসা', 'কারিগরি'];

  const filtered = institutions.filter((inst) => {
    const matchesType = filterType === 'all' || inst.type === filterType;
    const matchesSearch =
      inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.headPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-indigo-800 dark:text-indigo-400 uppercase tracking-widest bg-indigo-100 dark:bg-indigo-950/60 px-3 py-1 rounded-full">
            জ্ঞান ও আলো
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-100 mt-2">
            মোগলাবাজারের শিক্ষা প্রতিষ্ঠানসমূহ
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 mt-2">
            উচ্চ শিক্ষা কলেজ, মাধ্যমিক বিদ্যালয়, ঐতিহ্যবাহী মাদ্রাসা ও প্রাথমিক বিদ্যাপীঠের সমন্বিত তালিকা।
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white dark:bg-stone-800 p-4 rounded-2xl border border-stone-200 dark:border-stone-700 shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  filterType === t
                    ? 'bg-indigo-700 text-white shadow-xs'
                    : 'bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
                }`}
              >
                {t === 'all' ? 'সকল প্রতিষ্ঠান' : t}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="প্রতিষ্ঠানের নাম বা প্রধান খুঁজুন..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 text-xs sm:text-sm outline-none focus:border-indigo-600"
            />
          </div>
        </div>

        {/* Institutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((inst) => (
            <div
              key={inst.id}
              className="bg-white dark:bg-stone-800 rounded-2xl p-5 border border-stone-200 dark:border-stone-700 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2.5 py-0.5 rounded">
                    {inst.type}
                  </span>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400">
                    স্থাপিত: {toBnNumber(inst.established)} খ্রি.
                  </span>
                </div>

                <h3 className="font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100 mb-2 leading-snug">
                  {inst.name}
                </h3>

                <div className="p-3 bg-stone-50 dark:bg-stone-750 rounded-xl space-y-1.5 text-xs text-stone-700 dark:text-stone-300 mb-4">
                  <div className="font-semibold text-stone-900 dark:text-stone-100">
                    প্রধান: {inst.headPerson}
                  </div>
                  <div className="flex items-center gap-1.5 text-stone-500">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{inst.address}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center text-xs mb-4">
                  <div className="bg-indigo-50/50 dark:bg-indigo-950/30 p-2 rounded-lg">
                    <div className="text-stone-500 text-[10px]">শিক্ষার্থী</div>
                    <div className="font-bold text-indigo-700 dark:text-indigo-300">
                      {toBnNumber(inst.studentsCount)}+
                    </div>
                  </div>
                  <div className="bg-indigo-50/50 dark:bg-indigo-950/30 p-2 rounded-lg">
                    <div className="text-stone-500 text-[10px]">শিক্ষকমণ্ডলী</div>
                    <div className="font-bold text-indigo-700 dark:text-indigo-300">
                      {toBnNumber(inst.teachersCount)} জন
                    </div>
                  </div>
                </div>
              </div>

              <a
                href={`tel:${inst.phone}`}
                className="w-full flex items-center justify-center gap-2 bg-indigo-700 hover:bg-indigo-800 text-white py-2 rounded-xl text-xs font-bold transition-colors shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                যোগাযোগ: {inst.phone}
              </a>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-stone-500">
            কোনো প্রতিষ্ঠান পাওয়া যায়নি। অনুগ্রহ করে অন্য নাম অনুসন্ধান করুন।
          </div>
        )}
      </div>
    </div>
  );
};
