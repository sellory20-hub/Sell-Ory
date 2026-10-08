import React, { useState } from 'react';
import {
  ShieldAlert,
  Phone,
  FileText,
  AlertTriangle,
  Send,
  CheckCircle,
  HelpCircle,
  ShieldCheck,
  Search,
  BadgeAlert
} from 'lucide-react';
import { ThanaOfficer } from '../types';

interface ThanaProps {
  officers: ThanaOfficer[];
}

export const ThanaSection: React.FC<ThanaProps> = ({ officers }) => {
  const [complaintSubmitted, setComplaintSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    nid: '',
    address: '',
    incidentType: 'চুরি / ছিনতাই',
    incidentDate: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.description) return;
    setComplaintSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: '',
        phone: '',
        nid: '',
        address: '',
        incidentType: 'চুরি / ছিনতাই',
        incidentDate: '',
        description: ''
      });
    }, 4000);
  };

  const cautions = [
    {
      title: 'মোটরসাইকেল ও গাড়ি পার্কিংয়ে সতর্কতা',
      desc: 'মোগলাবাজার হাটে বা দোকানের সামনে গাড়ি পার্ক করার সময় ডাবল লক ও জিপিএস ট্র্যাকার নিশ্চিত করুন।'
    },
    {
      title: 'অনলাইন প্রতারণা ও বিকাশ/নগদ পিন শেয়ারিং',
      desc: 'কোনো পুলিশ কর্মকর্তা বা লটারি কর্তৃপক্ষ কখনো ফোনে ওটিপি (OTP) বা পিন নম্বর চায় না। সতর্ক থাকুন।'
    },
    {
      title: 'মাদক ও কিশোর অপরাধমুক্ত সমাজ গঠন',
      desc: 'এলাকায় কোনো মাদক ব্যবসায়ী বা সন্দেহভাজন ব্যক্তির আনাগোনা দেখলে তাৎক্ষণিক থানায় গোপন সূত্রে খবর দিন।'
    },
    {
      title: 'অনলাইন জিডি (General Diary) করার নিয়ম',
      desc: 'জাতীয় পরিচয়পত্র, ড্রাইভিং লাইসেন্স বা মোবাইল ফোন হারিয়ে গেলে অনলাইনে বা থানায় এসে সাথে সাথে জিডি করুন।'
    }
  ];

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Banner */}
        <div className="bg-linear-to-r from-blue-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 mb-10 shadow-xl border border-blue-800/40 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 text-xs px-3 py-1 rounded-full font-bold uppercase mb-3 backdrop-blur-xs border border-blue-400/30">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              আইনশৃঙ্খলা, নাগরিক সেবা ও নিরাপত্তা
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
              মোগলাবাজার থানা
            </h2>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed mb-6">
              "পুলিশই জনতা, জনতাই পুলিশ" - মোগলাবাজার থানার অফিসারবৃন্দ দিনরাত ২৪ ঘণ্টা নাগরিকদের জান-মালের সার্বিক নিরাপত্তা, শান্তি রক্ষা ও অপরাধ দমনে সার্বক্ষণিক প্রতিশ্রুতিবদ্ধ।
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="tel:01713373150"
                className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold px-4 py-2.5 rounded-xl text-sm transition-colors shadow-md"
              >
                <Phone className="w-4 h-4" />
                <span>ওসি হটলাইন: ০১৭১৩-৩৭৩১৫০</span>
              </a>
              <a
                href="tel:999"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors shadow-md"
              >
                <BadgeAlert className="w-4 h-4" />
                <span>জরুরি: ৯৯৯ (টোল-ফ্রি)</span>
              </a>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 opacity-10 translate-x-8 translate-y-8 pointer-events-none hidden md:block">
            <ShieldAlert className="w-80 h-80 text-white" />
          </div>
        </div>

        {/* Officers Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-blue-600" />
                থানার দায়িত্বপ্রাপ্ত কর্মকর্তাবৃন্দ
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
                যেকোনো নিরাপত্তা পরামর্শ, মামলা তদন্ত বা জরুরি প্রয়োজনে সরাসরি যোগাযোগ করুন
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {officers.map((officer) => (
              <div
                key={officer.id}
                className="bg-white dark:bg-stone-800 rounded-2xl p-5 border border-stone-200 dark:border-stone-700 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={officer.photo}
                      alt={officer.name}
                      className="w-16 h-16 rounded-xl object-cover border-2 border-blue-500/40 shrink-0"
                    />
                    <div>
                      <span className="text-[11px] font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded">
                        {officer.designation}
                      </span>
                      <h4 className="font-bold text-stone-900 dark:text-stone-100 text-sm mt-1">
                        {officer.name}
                      </h4>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed mb-4">
                    {officer.role}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-stone-100 dark:border-stone-700">
                  <a
                    href={`tel:${officer.mobile}`}
                    className="w-full flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-xs font-bold transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    মোবাইল: {officer.mobile}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cautions and Online Report Form in 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cautions & Lost/Found Guide */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-stone-800 p-6 rounded-3xl border border-stone-200 dark:border-stone-700 shadow-sm">
              <h4 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                নিরাপত্তা সতর্কতা ও হারানো-প্রাপ্তি নোটিশ
              </h4>

              <div className="space-y-3.5">
                {cautions.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-750 border-l-4 border-amber-500"
                  >
                    <h5 className="font-bold text-sm text-stone-900 dark:text-stone-100 mb-1">
                      {item.title}
                    </h5>
                    <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Online Police Assistance / Feedback Form */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-stone-800 p-6 sm:p-8 rounded-3xl border border-stone-200 dark:border-stone-700 shadow-sm">
              <div className="mb-6">
                <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-950 px-2.5 py-1 rounded">
                  নাগরিক পুলিশ হেল্পডেস্ক
                </span>
                <h4 className="text-xl font-bold text-stone-900 dark:text-stone-100 mt-2">
                  অনলাইন পুলিশ অভিযোগ ও তথ্য প্রেরণ ফর্ম
                </h4>
                <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
                  আপনার নাম ও পরিচয় গোপন রাখতে চাইলে তা বিবরণে উল্লেখ করতে পারেন।
                </p>
              </div>

              {complaintSubmitted ? (
                <div className="bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-800 p-6 rounded-2xl text-center">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <h5 className="text-lg font-bold text-green-900 dark:text-green-200">
                    তথ্য সফলভাবে মোগলাবাজার থানায় প্রেরিত হয়েছে!
                  </h5>
                  <p className="text-xs sm:text-sm text-green-800 dark:text-green-300 mt-2">
                    দায়িত্বপ্রাপ্ত ডিউটি অফিসার শীঘ্রই আপনার সাথে যোগাযোগ করবেন। যেকোনো তাৎক্ষণিক ঘটনায় সরাসরি ৯৯৯ অথবা ডিউটি অফিসারের নম্বরে কল করুন।
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                        আপনার পূর্ণ নাম *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="যেমন: মো. কামরুল হাসান"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 text-stone-900 dark:text-white text-sm outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                        যোগাযোগ মোবাইল নম্বর *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="০১৭১১-xxxxxx"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 text-stone-900 dark:text-white text-sm outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                        ঘটনার বিষয় / ক্যাটাগরি
                      </label>
                      <select
                        value={formData.incidentType}
                        onChange={(e) => setFormData({ ...formData, incidentType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 text-stone-900 dark:text-white text-sm outline-none focus:border-blue-500"
                      >
                        <option value="চুরি / ছিনতাই">চুরি / ছিনতাই</option>
                        <option value="হারানো ডায়েরি (মোবাইল / ডকুমেন্ট)">হারানো ডায়েরি (মোবাইল / ডকুমেন্ট)</option>
                        <option value="ইভটিজিং ও হয়রানি">ইভটিজিং ও হয়রানি</option>
                        <option value="মাদক সংক্রান্ত গোপন তথ্য">মাদক সংক্রান্ত গোপন তথ্য</option>
                        <option value="জায়গা-জমি সংক্রান্ত বিরোধ">জায়গা-জমি সংক্রান্ত বিরোধ</option>
                        <option value="অন্যান্য অভিযোগ">অন্যান্য অভিযোগ</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                        এলাকা / গ্রামের নাম
                      </label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="যেমন: পশ্চিমপাড়া, মোগলাবাজার"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 text-stone-900 dark:text-white text-sm outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      ঘটনা বা অভিযোগের বিস্তারিত বিবরণ *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="কখন, কোথায় এবং কী ঘটেছে তা পরিষ্কারভাবে লিখুন..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 text-stone-900 dark:text-white text-sm outline-none focus:border-blue-500"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>থানা হেল্পডেস্কে তথ্য পাঠান</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
