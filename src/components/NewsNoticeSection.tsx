import React, { useState } from 'react';
import {
  Bell,
  Newspaper,
  Calendar,
  Share2,
  FileText,
  Clock,
  ArrowRight,
  X,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { Notice, NewsItem } from '../types';
import { formatBnDate, shareOnFacebook, shareOnWhatsApp } from '../utils/helpers';

interface NewsNoticeProps {
  notices: Notice[];
  news: NewsItem[];
}

export const NewsNoticeSection: React.FC<NewsNoticeProps> = ({ notices, news }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'notices' | 'news'>('all');
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  const upcomingEvents = [
    {
      date: '১৫ অক্টোবর, ২০২৬',
      title: 'স্মার্ট জাতীয় পরিচয়পত্র (NID) বিতরণ ১ম পর্যায়',
      place: 'মোগলাবাজার ইউপি কমপ্লেক্স'
    },
    {
      date: '২৮ অক্টোবর, ২০২৬',
      title: 'উন্মুক্ত বাজেট অধিবেশন ও বার্ষিক জনশুনানি',
      place: 'ইউনিয়ন পরিষদ অডিটোরিয়াম'
    },
    {
      date: '০৫ নভেম্বর, ২০২৬',
      title: 'মোগলাবাজার আন্তঃওয়ার্ড গোল্ডকাপ ফুটবল টুর্নামেন্ট উদ্বোধনী',
      place: 'মোগলাবাজার হাইস্কুল মাঠ'
    }
  ];

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-widest bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 rounded-full">
            তথ্য প্রবাহ ও আপডেট
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-100 mt-2">
            সর্বশেষ খবর ও নোটিশ বোর্ড
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 mt-2">
            সরকারি প্রজ্ঞাপন, ইউপি নোটিশ, উন্নয়ন সংবাদ এবং আসন্ন সামাজিক ইভেন্টের হালনাগাদ তথ্য।
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 rounded-xl bg-stone-200 dark:bg-stone-800">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-stone-700 dark:text-stone-300 hover:text-emerald-700'
              }`}
            >
              সবকিছু এক সাথে
            </button>
            <button
              onClick={() => setActiveTab('notices')}
              className={`px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'notices'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-stone-700 dark:text-stone-300 hover:text-emerald-700'
              }`}
            >
              নোটিশ বোর্ড
            </button>
            <button
              onClick={() => setActiveTab('news')}
              className={`px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'news'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-stone-700 dark:text-stone-300 hover:text-emerald-700'
              }`}
            >
              সংবাদ ও প্রতিবেদন
            </button>
          </div>
        </div>

        {/* Main Grid: Notices & News & Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left/Main Column: News or Combined */}
          {(activeTab === 'all' || activeTab === 'news') && (
            <div className={`${activeTab === 'all' ? 'lg:col-span-7' : 'lg:col-span-8'} space-y-6`}>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <Newspaper className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                  মোগলাবাজারের সংবাদ
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {news.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedNews(item)}
                    className="bg-white dark:bg-stone-800 rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-700 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-44 overflow-hidden relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-2.5 left-2.5 bg-emerald-800 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                          {item.category}
                        </span>
                      </div>
                      <div className="p-4">
                        <div className="text-[11px] text-stone-500 dark:text-stone-400 mb-1">
                          {formatBnDate(item.date)} • {item.author}
                        </div>
                        <h4 className="font-bold text-sm sm:text-base text-stone-900 dark:text-stone-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                          {item.title}
                        </h4>
                        <p className="text-xs text-stone-600 dark:text-stone-400 mt-2 line-clamp-2">
                          {item.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="px-4 pb-4 pt-1 flex items-center justify-between text-xs font-bold text-emerald-700 dark:text-emerald-400">
                      <span>বিস্তারিত পড়ুন</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Right Column: Notices & Upcoming Events */}
          {(activeTab === 'all' || activeTab === 'notices') && (
            <div className={`${activeTab === 'all' ? 'lg:col-span-5' : 'lg:col-span-8 lg:col-start-3'} space-y-6`}>
              {/* Notices */}
              <div className="bg-white dark:bg-stone-800 p-6 rounded-3xl border border-stone-200 dark:border-stone-700 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-amber-500 animate-pulse" />
                    জরুরি নোটিশ বোর্ড
                  </h3>
                  <span className="text-xs text-stone-400">সর্বশেষ ৫টি</span>
                </div>

                <div className="space-y-3">
                  {notices.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => setSelectedNotice(n)}
                      className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-700/80 hover:border-emerald-600 dark:hover:border-emerald-500 transition-colors cursor-pointer group bg-stone-50/50 dark:bg-stone-750"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950 px-2 py-0.5 rounded">
                          {n.category}
                        </span>
                        <span className="text-[10px] text-stone-500">
                          {formatBnDate(n.date)}
                        </span>
                      </div>
                      <h4 className="font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                        {n.title}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Event Calendar */}
              <div className="bg-linear-to-br from-emerald-900 to-stone-900 text-white p-6 rounded-3xl shadow-sm border border-emerald-800/40">
                <h4 className="text-base font-bold text-amber-300 mb-4 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  আসন্ন কর্মসূচি ও ইভেন্ট ক্যালেন্ডার
                </h4>

                <div className="space-y-3">
                  {upcomingEvents.map((evt, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10"
                    >
                      <div className="text-[11px] text-amber-300 font-bold mb-0.5">
                        {evt.date}
                      </div>
                      <div className="font-bold text-sm text-white">{evt.title}</div>
                      <div className="text-[11px] text-emerald-200 mt-1">
                        স্থান: {evt.place}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal: Read News */}
        {selectedNews && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white dark:bg-stone-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 dark:border-stone-700 relative">
              <button
                onClick={() => setSelectedNews(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-200 z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="h-64 sm:h-72 overflow-hidden">
                <img
                  src={selectedNews.image}
                  alt={selectedNews.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-2">
                  <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2.5 py-0.5 rounded font-bold">
                    {selectedNews.category}
                  </span>
                  <span>{formatBnDate(selectedNews.date)}</span>
                  <span>•</span>
                  <span>প্রতিবেদক: {selectedNews.author}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100 mb-4 leading-snug">
                  {selectedNews.title}
                </h3>

                <div className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed space-y-4">
                  <p className="font-semibold text-stone-900 dark:text-stone-100">
                    {selectedNews.excerpt}
                  </p>
                  <p>{selectedNews.content}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-200 dark:border-stone-700 flex items-center justify-between">
                  <span className="text-xs text-stone-500">ভিজিবেল মোগলাবাজার নিউজ ডেস্ক</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => shareOnFacebook(undefined, selectedNews.title)}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      ফেসবুক শেয়ার
                    </button>
                    <button
                      onClick={() => shareOnWhatsApp(selectedNews.title)}
                      className="px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      হোয়াটসঅ্যাপ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Read Notice */}
        {selectedNotice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white dark:bg-stone-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 dark:border-stone-700 relative">
              <button
                onClick={() => setSelectedNotice(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-200"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-4">
                <span className="text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 px-3 py-1 rounded-full">
                  {selectedNotice.category} নোটিশ
                </span>
                <span className="text-xs text-stone-400 ml-2">
                  প্রকাশ: {formatBnDate(selectedNotice.date)}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 mb-4 leading-snug">
                {selectedNotice.title}
              </h3>

              <div className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed mb-6 bg-stone-50 dark:bg-stone-750 p-4 rounded-2xl border border-stone-200 dark:border-stone-700">
                {selectedNotice.content}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-500">মোগলাবাজার ইউনিয়ন পরিষদ তথ্য বাতায়ন</span>
                <button
                  onClick={() => setSelectedNotice(null)}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2 rounded-xl text-xs font-bold transition-colors"
                >
                  ঠিক আছে
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
