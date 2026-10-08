import React, { useState } from 'react';
import { Search, X, ArrowRight, ExternalLink } from 'lucide-react';
import { NavTab, Notice, NewsItem, CouncilMember, ThanaOfficer, HealthProvider, Institution, BusinessItem } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  query: string;
  setQuery: (q: string) => void;
  onSelectTab: (tab: NavTab) => void;
  notices: Notice[];
  news: NewsItem[];
  council: CouncilMember[];
  officers: ThanaOfficer[];
  health: HealthProvider[];
  institutions: Institution[];
  businesses: BusinessItem[];
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  query,
  setQuery,
  onSelectTab,
  notices,
  news,
  council,
  officers,
  health,
  institutions,
  businesses
}) => {
  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Search matches
  const matchCouncil = q ? council.filter(c => c.name.toLowerCase().includes(q) || c.designation.toLowerCase().includes(q) || c.ward.toLowerCase().includes(q)) : [];
  const matchOfficers = q ? officers.filter(o => o.name.toLowerCase().includes(q) || o.designation.toLowerCase().includes(q) || o.role.toLowerCase().includes(q)) : [];
  const matchHealth = q ? health.filter(h => h.name.toLowerCase().includes(q) || (h.doctorName && h.doctorName.toLowerCase().includes(q)) || (h.specialty && h.specialty.toLowerCase().includes(q))) : [];
  const matchInstitutions = q ? institutions.filter(i => i.name.toLowerCase().includes(q) || i.headPerson.toLowerCase().includes(q) || i.type.toLowerCase().includes(q)) : [];
  const matchBusinesses = q ? businesses.filter(b => b.name.toLowerCase().includes(q) || b.owner.toLowerCase().includes(q) || b.category.toLowerCase().includes(q)) : [];
  const matchNotices = q ? notices.filter(n => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)) : [];
  const matchNews = q ? news.filter(nw => nw.title.toLowerCase().includes(q) || nw.excerpt.toLowerCase().includes(q)) : [];

  const totalResults = matchCouncil.length + matchOfficers.length + matchHealth.length + matchInstitutions.length + matchBusinesses.length + matchNotices.length + matchNews.length;

  const handleSelect = (tab: NavTab) => {
    onSelectTab(tab);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/70 backdrop-blur-xs">
      <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-2xl w-full shadow-2xl border border-stone-200 dark:border-stone-700 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search header input */}
        <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="পোর্টালের যেকোনো কিছু খুঁজুন (উদা: চেয়ারম্যান, ওসি, হাসপাতাল, রক্ত, স্কুল)..."
            className="w-full text-sm sm:text-base bg-transparent outline-none text-stone-900 dark:text-white"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-stone-400 hover:text-stone-600">
              <X className="w-4 h-4" />
            </button>
          )}
          <button onClick={onClose} className="p-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {!q ? (
            <div className="py-8 text-center text-stone-400 text-xs">
              সার্চ করতে শব্দ লিখুন (যেমন: চেয়ারম্যান, ওসি, ডাক্তার, ব্লাড, হাইস্কুল, হাটবার)
            </div>
          ) : totalResults === 0 ? (
            <div className="py-8 text-center text-stone-400 text-xs">
              "{query}" সম্পর্কিত কোনো তথ্য পাওয়া যায়নি। অন্য শব্দ দিয়ে চেষ্টা করুন।
            </div>
          ) : (
            <div className="space-y-4">
              {matchCouncil.length > 0 && (
                <div>
                  <h5 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">
                    ইউনিয়ন পরিষদ প্রতিনিধি
                  </h5>
                  <div className="space-y-1.5">
                    {matchCouncil.map(item => (
                      <div
                        key={item.id}
                        onClick={() => handleSelect('union')}
                        className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div>
                          <div className="font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100">{item.name}</div>
                          <div className="text-[11px] text-stone-500">{item.designation} • {item.ward}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-stone-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {matchOfficers.length > 0 && (
                <div>
                  <h5 className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-2">
                    মোগলাবাজার থানা কর্মকর্তা
                  </h5>
                  <div className="space-y-1.5">
                    {matchOfficers.map(item => (
                      <div
                        key={item.id}
                        onClick={() => handleSelect('thana')}
                        className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div>
                          <div className="font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100">{item.name}</div>
                          <div className="text-[11px] text-stone-500">{item.designation} • {item.mobile}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-stone-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {matchHealth.length > 0 && (
                <div>
                  <h5 className="text-xs font-bold text-rose-700 uppercase tracking-wider mb-2">
                    স্বাস্থ্য ও চিকিৎসা সেবা
                  </h5>
                  <div className="space-y-1.5">
                    {matchHealth.map(item => (
                      <div
                        key={item.id}
                        onClick={() => handleSelect('health')}
                        className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div>
                          <div className="font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100">{item.name}</div>
                          <div className="text-[11px] text-stone-500">{item.doctorName || item.specialty || item.address}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-stone-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {matchInstitutions.length > 0 && (
                <div>
                  <h5 className="text-xs font-bold text-indigo-700 uppercase tracking-wider mb-2">
                    শিক্ষা প্রতিষ্ঠান
                  </h5>
                  <div className="space-y-1.5">
                    {matchInstitutions.map(item => (
                      <div
                        key={item.id}
                        onClick={() => handleSelect('education')}
                        className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div>
                          <div className="font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100">{item.name}</div>
                          <div className="text-[11px] text-stone-500">{item.type} • প্রধান: {item.headPerson}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-stone-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {matchBusinesses.length > 0 && (
                <div>
                  <h5 className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">
                    ব্যবসা ও প্রতিষ্ঠান
                  </h5>
                  <div className="space-y-1.5">
                    {matchBusinesses.map(item => (
                      <div
                        key={item.id}
                        onClick={() => handleSelect('business')}
                        className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 hover:bg-amber-50 dark:hover:bg-amber-950/40 cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div>
                          <div className="font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100">{item.name}</div>
                          <div className="text-[11px] text-stone-500">{item.category} • {item.address}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-stone-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {matchNotices.length > 0 && (
                <div>
                  <h5 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">
                    নোটিশ বোর্ড
                  </h5>
                  <div className="space-y-1.5">
                    {matchNotices.map(item => (
                      <div
                        key={item.id}
                        onClick={() => handleSelect('news')}
                        className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div>
                          <div className="font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100">{item.title}</div>
                          <div className="text-[11px] text-stone-500">{item.category} নোটিশ</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-stone-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
