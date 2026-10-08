import React from 'react';
import { MapPin, Compass, Landmark, Users, Award, BookOpen, Globe2 } from 'lucide-react';
import { toBnNumber } from '../utils/helpers';

export const AboutSection: React.FC = () => {
  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-widest bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 rounded-full">
            ঐতিহ্য ও পরিচিতি
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-100 mt-2">
            আমাদের প্রিয় মোগলাবাজার
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 mt-2">
            পুণ্যভূমি সিলেটের দক্ষিণ সুরমা অঞ্চলের অন্যতম সমৃদ্ধশালী বাণিজ্যিক ও ঐতিহ্যবাহী প্রশাসনিক জনপদ।
          </p>
        </div>

        {/* Narrative & Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Main History & Heritage */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white dark:bg-stone-800 p-6 sm:p-8 rounded-3xl shadow-sm border border-stone-200 dark:border-stone-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
                  <Landmark className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                    ঐতিহাসিক পটভূমি ও নামকরণ
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400">শতাব্দীর সমৃদ্ধ ইতিহাস ও ঐতিহ্য</p>
                </div>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed">
                <p>
                  সিলেট জেলার দক্ষিণ সুরমা অঞ্চলে অবস্থিত <strong>মোগলাবাজার</strong> এক সুপ্রাচীন ও ঐতিহ্যমণ্ডিত জনপদ। লোকশ্রুতি ও ঐতিহাসিক বিবরণ অনুযায়ী, মুঘল আমলে স্থানীয় ব্যবসা-বাণিজ্যের বিস্তৃতি এবং নদীতীরবর্তী বাণিজ্য কেন্দ্র হিসেবে এই এলাকাটি ‘মোগলাবাজার’ নামে পরিচিতি লাভ করে।
                </p>
                <p>
                  শতাব্দী ধরে মোগলাবাজার হাট ছিল সিলেট ও পার্শ্ববর্তী অঞ্চলের অন্যতম প্রধান খাদ্যশস্য, পাট, মিষ্টান্ন ও দৈনন্দিন পণ্যের পাইকারি আড়ত। বর্তমান সময়েও প্রতি রবিবার ও বৃহস্পতিবার এখানে জেলার অন্যতম বৃহত্তম সাপ্তাহিক হাট বসে, যেখানে সহস্রাধিক পাইকার ও খুচরা ক্রেতা-বিক্রেতার মেলবন্ধন ঘটে।
                </p>
                <p>
                  ১৯৭১ সালের মহান মুক্তিযুদ্ধে মোগলাবাজারের বীর সন্তানরা অসীম সাহসিকতার সাথে মুক্তিযুদ্ধে ঝাঁপিয়ে পড়েছিলেন। স্বাধীনতাত্তোর বাংলাদেশে এটি আধুনিক থানা এবং স্বয়ংসম্পূর্ণ একটি প্রশাসনিক ইউনিয়নে রূপান্তরিত হয়।
                </p>
              </div>
            </div>

            {/* Geographical details cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-stone-800 p-5 rounded-2xl border border-stone-200 dark:border-stone-700 shadow-xs">
                <div className="flex items-center gap-2.5 text-emerald-700 dark:text-emerald-400 font-bold mb-2">
                  <Compass className="w-5 h-5 text-amber-500" />
                  <h4>ভৌগোলিক অবস্থান ও সীমানা</h4>
                </div>
                <ul className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 space-y-1.5">
                  <li><strong>উত্তরে:</strong> কুচাই ও দাউদপুর ইউনিয়ন</li>
                  <li><strong>দক্ষিণে:</strong> ফেঞ্চুগঞ্জ উপজেলা ও বালাগঞ্জ সীমান্ত</li>
                  <li><strong>পূর্বে:</strong> গোলাপগঞ্জ উপজেলা</li>
                  <li><strong> পশ্চিমে:</strong> লালাবাজার ও সিলাম ইউনিয়ন</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-stone-800 p-5 rounded-2xl border border-stone-200 dark:border-stone-700 shadow-xs">
                <div className="flex items-center gap-2.5 text-emerald-700 dark:text-emerald-400 font-bold mb-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  <h4>অর্থনীতি ও প্রবাসীদের অবদান</h4>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  মোগলাবাজারের বিরাট সংখ্যক রেমিট্যান্স যোদ্ধা যুক্তরাজ্য (UK), যুক্তরাষ্ট্র, মধ্যপ্রাচ্য ও ইউরোপের বিভিন্ন দেশে কর্মরত। তাঁদের পাঠানো রেমিট্যান্স এলাকার শিক্ষা, স্বাস্থ্য ও অবকাঠামো উন্নয়নে অবিস্মরণীয় অবদান রেখে চলেছে।
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Map & Quick Fact Sheet */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-stone-800 p-6 rounded-3xl shadow-sm border border-stone-200 dark:border-stone-700">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-stone-900 dark:text-stone-100 font-bold">
                  <MapPin className="w-5 h-5 text-red-600" />
                  <span>ম্যাপে মোগলাবাজার</span>
                </div>
                <span className="text-[11px] bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded font-semibold">
                  লাইভ গুগল ম্যাপ
                </span>
              </div>

              {/* Responsive Google Maps Embed for Moglabazar Sylhet */}
              <div className="w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-700 shadow-inner relative">
                <iframe
                  title="মোগলাবাজার ম্যাপ"
                  src="https://maps.google.com/maps?q=Mogla%20Bazar,%20Sylhet,%20Bangladesh&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="mt-4 pt-4 border-t border-stone-100 dark:border-stone-700/60 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                <span>উপজেলা: দক্ষিণ সুরমা</span>
                <span>জেলা: সিলেট</span>
                <span>বিভাগ: সিলেট</span>
              </div>
            </div>

            {/* Quick Facts List */}
            <div className="bg-linear-to-br from-emerald-900 to-emerald-950 text-white p-6 rounded-3xl shadow-md">
              <h4 className="text-base font-bold text-amber-300 mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                এক নজরে প্রশাসনিক পরিকাঠামো
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="bg-white/10 p-2.5 rounded-xl">
                  <div className="text-emerald-300 text-[11px]">ইউনিয়ন প্রতিষ্ঠা</div>
                  <div className="font-bold text-white mt-0.5">১৯৬০-এর দশক</div>
                </div>
                <div className="bg-white/10 p-2.5 rounded-xl">
                  <div className="text-emerald-300 text-[11px]">গ্রামের সংখ্যা</div>
                  <div className="font-bold text-white mt-0.5">{toBnNumber(34)}টি গ্রাম</div>
                </div>
                <div className="bg-white/10 p-2.5 rounded-xl">
                  <div className="text-emerald-300 text-[11px]">মৌজা সংখ্যা</div>
                  <div className="font-bold text-white mt-0.5">{toBnNumber(18)}টি মৌজা</div>
                </div>
                <div className="bg-white/10 p-2.5 rounded-xl">
                  <div className="text-emerald-300 text-[11px]">প্রধান নদী/শাখা</div>
                  <div className="font-bold text-white mt-0.5">সুরমা অববাহিকা</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
