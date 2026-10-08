import React, { useState } from 'react';
import {
  Users,
  Award,
  Phone,
  FileCheck,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Download,
  Building,
  Mail,
  CheckCircle2
} from 'lucide-react';
import { CouncilMember, CitizenServiceCharter } from '../types';
import { toBnNumber } from '../utils/helpers';

interface UnionProps {
  councilMembers: CouncilMember[];
  servicesCharter: CitizenServiceCharter[];
}

export const UnionParishadSection: React.FC<UnionProps> = ({
  councilMembers,
  servicesCharter
}) => {
  const [activeTab, setActiveTab] = useState<'members' | 'charter' | 'projects'>('members');
  const [expandedCharterId, setExpandedCharterId] = useState<string | null>(servicesCharter[0]?.id || null);

  const chairman = councilMembers.find((m) => m.designation.includes('চেয়ারম্যান'));
  const secretary = councilMembers.find((m) => m.designation.includes('সচিব'));
  const wardMembers = councilMembers.filter(
    (m) => !m.designation.includes('চেয়ারম্যান') && !m.designation.includes('সচিব')
  );

  const projects = [
    {
      id: 'p1',
      title: 'মোগলাবাজার-রেঙ্গা পাকা সড়ক টেকসই বিটুমিনাস কার্পেটিং',
      budget: '২ কোটি ৫০ লাখ টাকা',
      ward: 'ওয়ার্ড ০১, ০২ ও ০৩ সংযোগ',
      progress: 85,
      status: 'চলমান',
      agency: 'LGED ও ইউপি সমন্বিত'
    },
    {
      id: 'p2',
      title: 'ইউনিয়নের ৯টি ওয়ার্ডে সৌরচালিত এলইডি স্ট্রিট লাইট স্থাপন',
      budget: '৩৫ লাখ টাকা',
      ward: 'সকল ওয়ার্ড (১-৯)',
      progress: 100,
      status: 'সম্পন্ন',
      agency: 'গ্রামীণ অবকাঠামো সংস্কার (TR)'
    },
    {
      id: 'p3',
      title: 'পশ্চিমপাড়া ও নদীপাড় সংলগ্ন বন্যা প্রতিরোধী আরসিসি ড্রেন নির্মাণ',
      budget: '৪৫ লাখ টাকা',
      ward: 'ওয়ার্ড ০১ ও ০৪',
      progress: 60,
      status: 'চলমান',
      agency: 'কাবিটা প্রকল্প'
    },
    {
      id: 'p4',
      title: 'মোগলাবাজার কমিউনিটি ক্লিনিক সম্প্রসারণ ও মা-শিশু কর্নার নির্মাণ',
      budget: '১৮ লাখ ৫০ হাজার টাকা',
      ward: 'ওয়ার্ড ০৫',
      progress: 90,
      status: 'চলমান',
      agency: 'স্বাস্থ্য প্রকৌশল অধিদপ্তর'
    }
  ];

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-widest bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 rounded-full">
            জনপ্রতিনিধি ও সেবা
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-100 mt-2">
            মোগলাবাজার ইউনিয়ন পরিষদ
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 mt-2">
            স্বচ্ছ ও জবাবদিহিতামূলক নাগরিক সেবা, জনকল্যাণ এবং টেকসই গ্রামীণ উন্নয়নের প্রতিশ্রুতি।
          </p>
        </div>

        {/* Sub-navigation tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 rounded-xl bg-stone-200 dark:bg-stone-800">
            <button
              onClick={() => setActiveTab('members')}
              className={`px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'members'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-stone-700 dark:text-stone-300 hover:text-emerald-700 dark:hover:text-emerald-400'
              }`}
            >
              জনপ্রতিনিধি ও পরিষদ
            </button>
            <button
              onClick={() => setActiveTab('charter')}
              className={`px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'charter'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-stone-700 dark:text-stone-300 hover:text-emerald-700 dark:hover:text-emerald-400'
              }`}
            >
              নাগরিক সনদ ও সেবাসমূহ
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'projects'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-stone-700 dark:text-stone-300 hover:text-emerald-700 dark:hover:text-emerald-400'
              }`}
            >
              বাজেট ও উন্নয়ন প্রকল্প
            </button>
          </div>
        </div>

        {/* 1. MEMBERS TAB */}
        {activeTab === 'members' && (
          <div className="space-y-8">
            {/* Top leadership (Chairman & Secretary) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {chairman && (
                <div className="bg-linear-to-br from-emerald-900 to-emerald-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center gap-6 border-2 border-amber-400/60">
                  <img
                    src={chairman.photo}
                    alt={chairman.name}
                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-4 border-amber-400 shadow-md shrink-0"
                  />
                  <div className="text-center sm:text-left flex-1">
                    <span className="inline-block bg-amber-400 text-stone-950 text-xs font-extrabold px-3 py-1 rounded-full mb-2">
                      {chairman.designation}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white">{chairman.name}</h3>
                    <p className="text-emerald-200 text-xs sm:text-sm mt-1 mb-4">
                      {chairman.responsibilities}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                      <a
                        href={`tel:${chairman.phone}`}
                        className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-stone-950 px-4 py-2 rounded-lg text-xs font-bold transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        {chairman.phone}
                      </a>
                      {chairman.email && (
                        <a
                          href={`mailto:${chairman.email}`}
                          className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-emerald-100 px-3 py-2 rounded-lg text-xs transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          ইমেইল
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {secretary && (
                <div className="bg-white dark:bg-stone-800 p-6 sm:p-8 rounded-3xl shadow-sm border border-stone-200 dark:border-stone-700 flex flex-col sm:flex-row items-center gap-6">
                  <img
                    src={secretary.photo}
                    alt={secretary.name}
                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-4 border-emerald-600/30 shadow-md shrink-0"
                  />
                  <div className="text-center sm:text-left flex-1">
                    <span className="inline-block bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold px-3 py-1 rounded-full mb-2">
                      {secretary.designation}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
                      {secretary.name}
                    </h3>
                    <p className="text-stone-500 dark:text-stone-400 text-xs sm:text-sm mt-1 mb-4">
                      {secretary.responsibilities}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                      <a
                        href={`tel:${secretary.phone}`}
                        className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        {secretary.phone}
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Ward Members Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                  ওয়ার্ড সদস্যবৃন্দ (সাধারণ ও সংরক্ষিত)
                </h4>
                <span className="text-xs text-stone-500 dark:text-stone-400">
                  মোট {toBnNumber(wardMembers.length)} জন প্রতিনিধি
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {wardMembers.map((member) => (
                  <div
                    key={member.id}
                    className="bg-white dark:bg-stone-800 p-4 sm:p-5 rounded-2xl border border-stone-200 dark:border-stone-700 shadow-xs hover:shadow-md transition-all flex items-start gap-4"
                  >
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 border border-stone-200 dark:border-stone-700"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 block truncate">
                        {member.ward}
                      </span>
                      <h5 className="font-bold text-stone-900 dark:text-stone-100 text-sm truncate">
                        {member.name}
                      </h5>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 mb-2 truncate">
                        {member.designation}
                      </p>
                      <a
                        href={`tel:${member.phone}`}
                        className="inline-flex items-center gap-1.5 bg-stone-100 dark:bg-stone-700 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 text-stone-800 dark:text-stone-200 px-2.5 py-1 rounded-md text-xs font-semibold transition-colors"
                      >
                        <Phone className="w-3 h-3 text-emerald-600 group-hover:text-white" />
                        {member.phone}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. CITIZEN CHARTER TAB */}
        {activeTab === 'charter' && (
          <div className="space-y-6">
            <div className="bg-emerald-50 dark:bg-emerald-950/40 p-4 sm:p-6 rounded-2xl border border-emerald-200 dark:border-emerald-800/50 flex items-start gap-3">
              <FileCheck className="w-6 h-6 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-emerald-950 dark:text-emerald-200 text-base">
                  মোগলাবাজার ইউনিয়ন পরিষদ নাগরিক সনদ নির্দেশিকা
                </h4>
                <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 mt-1">
                  ইউনিয়ন ডিজিটাল সেন্টারে সেবা গ্রহণের ক্ষেত্রে সরকার নির্ধারিত ফি ও নিয়মাবলী মেনে চলুন। কোনো প্রকার অতিরিক্ত অর্থ বা দালালের খপ্পরে পড়বেন না। সরাসরি ইউপি সচিব বা চেয়ারম্যান মহোদয়ের দৃষ্টি আকর্ষণ করুন।
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {servicesCharter.map((item) => {
                const isExpanded = expandedCharterId === item.id;
                return (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 overflow-hidden shadow-xs"
                  >
                    <button
                      onClick={() => setExpandedCharterId(isExpanded ? null : item.id)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between hover:bg-stone-50 dark:hover:bg-stone-750 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold text-xs">
                          <Building className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-bold text-stone-900 dark:text-stone-100 text-sm sm:text-base">
                            {item.title}
                          </h4>
                          <div className="flex items-center gap-3 text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                            <span>শাখা: {item.department}</span>
                            <span>•</span>
                            <span>সময়: {item.duration}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="hidden sm:inline-block bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-2.5 py-1 rounded text-xs font-bold border border-amber-300 dark:border-amber-700">
                          ফি: {item.fee}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-stone-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-stone-400" />
                        )}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="p-4 sm:p-5 bg-stone-50/80 dark:bg-stone-850 border-t border-stone-100 dark:border-stone-700 text-sm">
                        <div className="font-bold text-stone-800 dark:text-stone-200 mb-2 flex items-center gap-1.5 text-xs uppercase tracking-wide">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          প্রয়োজনীয় কাগজপত্র ও শর্তাবলী:
                        </div>
                        <ul className="space-y-1.5 text-xs sm:text-sm text-stone-600 dark:text-stone-300 pl-5 list-disc mb-4">
                          {item.requirements.map((req, rIdx) => (
                            <li key={rIdx}>{req}</li>
                          ))}
                        </ul>
                        <div className="flex items-center justify-between pt-2 border-t border-stone-200 dark:border-stone-700 text-xs">
                          <span className="text-stone-500">
                            অনলাইনে আবেদনের জন্য সরাসরি ইউপি ডিজিটাল সেন্টারে আসুন অথবা জন্ম নিবন্ধন পোর্টালে ভিজিট করুন।
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. BUDGET & PROJECTS TAB */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-white dark:bg-stone-800 p-5 rounded-2xl border border-stone-200 dark:border-stone-700 shadow-xs"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2.5 py-0.5 rounded">
                      {proj.ward}
                    </span>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded ${
                        proj.status === 'সম্পন্ন'
                          ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}
                    >
                      {proj.status}
                    </span>
                  </div>

                  <h4 className="font-bold text-stone-900 dark:text-stone-100 text-base mb-2">
                    {proj.title}
                  </h4>

                  <div className="flex items-center justify-between text-xs text-stone-600 dark:text-stone-400 mb-3">
                    <span>প্রাক্কলিত বাজেট: <strong>{proj.budget}</strong></span>
                    <span>অর্থায়ন: {proj.agency}</span>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1 text-stone-700 dark:text-stone-300">
                      <span>বাস্তবায়ন অগ্রগতি</span>
                      <span>{toBnNumber(proj.progress)}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-linear-to-r from-emerald-600 to-amber-500 rounded-full transition-all duration-500"
                        style={{ width: `${proj.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
