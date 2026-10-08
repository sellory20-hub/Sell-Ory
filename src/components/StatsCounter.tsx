import React from 'react';
import { Users, MapPin, School, Building2, Droplet, Layers } from 'lucide-react';
import { toBnNumber } from '../utils/helpers';

export const StatsCounter: React.FC = () => {
  const stats = [
    {
      label: 'মোট জনসংখ্যা (আনুমানিক)',
      value: '৪২,৫০০+',
      icon: Users,
      desc: '৩৪টি গ্রাম ও ৯টি ওয়ার্ডের নাগরিক',
      color: 'text-emerald-700 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/40'
    },
    {
      label: 'প্রশাসনিক ওয়ার্ড',
      value: `${toBnNumber(9)}টি`,
      icon: Layers,
      desc: 'সমন্বিত স্থানীয় সরকার ব্যবস্থাপনা',
      color: 'text-amber-700 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/40'
    },
    {
      label: 'মোট আয়তন',
      value: '২১.৫ বর্গ কিমি',
      icon: MapPin,
      desc: 'দক্ষিণ সুরমা, সিলেট জেলা',
      color: 'text-blue-700 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-950/40'
    },
    {
      label: 'শিক্ষা প্রতিষ্ঠান',
      value: '২৭টি+',
      icon: School,
      desc: 'কলেজ, হাইস্কুল, মাদ্রাসা ও প্রাথমিক',
      color: 'text-indigo-700 dark:text-indigo-400',
      bg: 'bg-indigo-50 dark:bg-indigo-950/40'
    },
    {
      label: 'ধর্মীয় ও সামাজিক প্রতিষ্ঠান',
      value: '৪৫টি+',
      icon: Building2,
      desc: 'মসজিদ, মন্দির, ঈদগাহ ও ক্লাব',
      color: 'text-teal-700 dark:text-teal-400',
      bg: 'bg-teal-50 dark:bg-teal-950/40'
    },
    {
      label: 'নিবন্ধিত স্বেচ্ছাসেবী রক্তদাতা',
      value: '১৫০+',
      icon: Droplet,
      desc: '২৪ ঘণ্টা জরুরি রক্ত প্রদানে প্রস্তুত',
      color: 'text-rose-700 dark:text-rose-400',
      bg: 'bg-rose-50 dark:bg-rose-950/40'
    }
  ];

  return (
    <section className="py-12 bg-stone-100 dark:bg-stone-900 border-y border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-widest bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 rounded-full">
            এক নজরে মোগলাবাজার
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 mt-2">
            এলাকার গুরুত্বপূর্ণ পরিসংখ্যান ও তথ্য
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-2">
            একটি ঐতিহ্যবাহী জনপদ, যেখানে সম্প্রীতি, বাণিজ্য ও আধুনিক প্রশাসনিক সেবার এক অনন্য মেলবন্ধন।
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-stone-800 p-5 rounded-2xl shadow-sm hover:shadow-md border border-stone-200/80 dark:border-stone-700/60 text-center flex flex-col items-center justify-between transition-all hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-stone-800 dark:text-stone-200 mt-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-stone-600 dark:text-stone-300 mt-1 leading-tight">
                  {stat.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
