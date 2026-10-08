import React, { useState } from 'react';
import {
  MessageSquareWarning,
  Send,
  Upload,
  CheckCircle2,
  Clock,
  Search,
  AlertCircle,
  FileQuestion,
  Image as ImageIcon
} from 'lucide-react';
import { CitizenComplaint } from '../types';
import { generateTrackingId, formatBnDate } from '../utils/helpers';

interface ComplaintProps {
  complaints: CitizenComplaint[];
  onSubmitComplaint: (complaint: CitizenComplaint) => void;
}

export const CitizenComplaintSection: React.FC<ComplaintProps> = ({
  complaints,
  onSubmitComplaint
}) => {
  const [activeTab, setActiveTab] = useState<'submit' | 'track'>('submit');
  const [form, setForm] = useState({
    title: '',
    category: 'রাস্তা ও সেতু' as CitizenComplaint['category'],
    ward: 'ওয়ার্ড ০১',
    details: '',
    name: '',
    phone: '',
    image: ''
  });
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [trackQuery, setTrackQuery] = useState('');
  const [foundComplaint, setFoundComplaint] = useState<CitizenComplaint | null | false>(null);

  const categories: CitizenComplaint['category'][] = [
    'রাস্তা ও সেতু',
    'বিদ্যুৎ সমস্যা',
    'পানি ও নিষ্কাশন',
    'আইনশৃঙ্খলা ও নিরাপত্তা',
    'পরিবেশ ও বর্জ্য',
    'অন্যান্য'
  ];

  const wards = [
    'ওয়ার্ড ০১',
    'ওয়ার্ড ০২',
    'ওয়ার্ড ০৩',
    'ওয়ার্ড ০৪',
    'ওয়ার্ড ০৫',
    'ওয়ার্ড ০৬',
    'ওয়ার্ড ০৭',
    'ওয়ার্ড ০৮',
    'ওয়ার্ড ০৯'
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.details || !form.name || !form.phone) return;

    const newTrackingId = generateTrackingId();
    const newComplaint: CitizenComplaint = {
      id: `c-${Date.now()}`,
      trackingId: newTrackingId,
      title: form.title,
      category: form.category,
      ward: form.ward,
      details: form.details,
      name: form.name,
      phone: form.phone,
      date: new Date().toISOString().split('T')[0],
      status: 'অপেক্ষমান',
      image: form.image || undefined,
      officialReply: 'আপনার সমস্যাটি ইউপি সংশ্লিষ্ট সেলে রেজিস্টার্ড হয়েছে। দ্রুত ব্যবস্থা গ্রহণ করা হবে।'
    };

    onSubmitComplaint(newComplaint);
    setSubmittedId(newTrackingId);
    setForm({
      title: '',
      category: 'রাস্তা ও সেতু',
      ward: 'ওয়ার্ড ০১',
      details: '',
      name: '',
      phone: '',
      image: ''
    });
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackQuery.trim()) return;
    const clean = trackQuery.trim().toUpperCase();
    const matched = complaints.find((c) => c.trackingId.toUpperCase() === clean);
    setFoundComplaint(matched || false);
  };

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-widest bg-amber-100 dark:bg-amber-950/60 px-3 py-1 rounded-full">
            নাগরিক প্রতিক্রিয়া ও সমস্যা নিরসন
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-100 mt-2">
            আপনার এলাকার সমস্যা জানান
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 mt-2">
            রাস্তাঘাট ভাঙা, নষ্ট স্ট্রিট লাইট, সুপেয় পানির সংকট বা জলাবদ্ধতা—ছবি সহ সরাসরি ইউনিয়ন পরিষদে অভিযোগ দাখিল করুন।
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 rounded-xl bg-stone-200 dark:bg-stone-800">
            <button
              onClick={() => setActiveTab('submit')}
              className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'submit'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-stone-700 dark:text-stone-300 hover:text-amber-600'
              }`}
            >
              নতুন সমস্যা জানান
            </button>
            <button
              onClick={() => setActiveTab('track')}
              className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'track'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-stone-700 dark:text-stone-300 hover:text-amber-600'
              }`}
            >
              অগ্রগতি ট্র্যাক করুন
            </button>
          </div>
        </div>

        {/* 1. SUBMIT TAB */}
        {activeTab === 'submit' && (
          <div className="max-w-2xl mx-auto">
            {submittedId ? (
              <div className="bg-white dark:bg-stone-800 rounded-3xl p-8 border border-emerald-500 shadow-xl text-center">
                <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto mb-4 animate-bounce" />
                <h3 className="text-2xl font-black text-stone-900 dark:text-stone-100 mb-2">
                  আপনার সমস্যাটি সফলভাবে জমা হয়েছে!
                </h3>
                <p className="text-sm text-stone-600 dark:text-stone-300 mb-6">
                  ইউনিয়ন পরিষদ ও সংশ্লিষ্ট ওয়ার্ড মেম্বার মহোদয়ের কাছে আপনার অভিযোগ বার্তা পৌঁছে গেছে।
                </p>

                <div className="bg-emerald-50 dark:bg-emerald-950/60 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800 max-w-sm mx-auto mb-6">
                  <div className="text-xs text-emerald-800 dark:text-emerald-300">আপনার ট্র্যাকিং কোড</div>
                  <div className="text-2xl font-mono font-black text-emerald-900 dark:text-emerald-100 tracking-wider mt-1">
                    {submittedId}
                  </div>
                  <div className="text-[11px] text-stone-500 mt-1">
                    এই কোডটি সংরক্ষণ করুন, পরবর্তীতে অগ্রগতি দেখতে কাজে লাগবে
                  </div>
                </div>

                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setSubmittedId(null);
                    }}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer"
                  >
                    আরেকটি সমস্যা জানান
                  </button>
                  <button
                    onClick={() => {
                      setTrackQuery(submittedId);
                      setActiveTab('track');
                      const matched = complaints.find((c) => c.trackingId === submittedId);
                      setFoundComplaint(matched || null);
                    }}
                    className="bg-stone-100 dark:bg-stone-700 hover:bg-stone-200 text-stone-800 dark:text-stone-200 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer"
                  >
                    স্ট্যাটাস দেখুন
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-stone-800 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-700 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      সমস্যার শিরোনাম *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      placeholder="যেমন: ৩নং ওয়ার্ডে রাস্তা ভেঙে বড় গর্ত সৃষ্টি"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 text-sm outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                        সমস্যার ধরন *
                      </label>
                      <select
                        value={form.category}
                        onChange={(e) =>
                          setForm({ ...form, category: e.target.value as CitizenComplaint['category'] })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 text-sm outline-none focus:border-amber-500 font-medium"
                      >
                        {categories.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                        ওয়ার্ড নম্বর *
                      </label>
                      <select
                        value={form.ward}
                        onChange={(e) => setForm({ ...form, ward: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 text-sm outline-none focus:border-amber-500 font-medium"
                      >
                        {wards.map((w) => (
                          <option key={w} value={w}>
                            {w}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      সমস্যার বিস্তারিত বিবরণ ও অবস্থান *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.details}
                      onChange={(e) => setForm({ ...form, details: e.target.value })}
                      placeholder="সমস্যাটি ঠিক কোন স্থানে, কতদিন ধরে চলছে এবং কী ধরনের ক্ষতি হচ্ছে তা পরিষ্কারভাবে লিখুন..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 text-sm outline-none focus:border-amber-500"
                    ></textarea>
                  </div>

                  {/* Photo upload attachment */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      সমস্যার ছবি সংযুক্ত করুন (ঐচ্ছিক)
                    </label>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-stone-300 dark:border-stone-600 hover:border-amber-500 cursor-pointer bg-stone-50 dark:bg-stone-700 text-xs font-semibold text-stone-600 dark:text-stone-300">
                        <Upload className="w-4 h-4 text-amber-500" />
                        <span>ছবি আপলোড করুন</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                      {form.image && (
                        <div className="w-12 h-12 rounded-lg overflow-hidden border border-amber-500 relative shrink-0">
                          <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                        আপনার নাম *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="আপনার পূর্ণ নাম"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 text-sm outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                        মোবাইল নম্বর *
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="০১৭১১-xxxxxx"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 text-sm outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3.5 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer mt-4"
                  >
                    <Send className="w-4 h-4" />
                    <span>ইউনিয়ন পরিষদে অভিযোগ জমা দিন</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {/* 2. TRACK TAB */}
        {activeTab === 'track' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-white dark:bg-stone-800 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-700 shadow-sm">
              <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-2">
                অভিযোগের সমাধান স্ট্যাটাস ট্র্যাক করুন
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mb-6">
                আপনার অভিযোগের ট্র্যাকিং কোডটি লিখুন (যেমন: <strong>MB-4821</strong> বা <strong>MB-3190</strong>)
              </p>

              <form onSubmit={handleTrack} className="flex gap-2">
                <input
                  type="text"
                  required
                  value={trackQuery}
                  onChange={(e) => setTrackQuery(e.target.value)}
                  placeholder="ট্র্যাকিং আইডি লিখুন (উদা: MB-4821)"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 text-sm font-mono outline-none focus:border-amber-500 uppercase"
                />
                <button
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors shrink-0 cursor-pointer"
                >
                  খুঁজুন
                </button>
              </form>
            </div>

            {/* Result display */}
            {foundComplaint === false && (
              <div className="bg-red-50 dark:bg-red-950/40 p-5 rounded-2xl border border-red-200 text-center text-xs sm:text-sm text-red-800 dark:text-red-300">
                <AlertCircle className="w-6 h-6 mx-auto mb-1 text-red-600" />
                এই কোডের কোনো অভিযোগ পাওয়া যায়নি। অনুগ্রহ করে সঠিক ট্র্যাকিং নম্বরটি পরীক্ষা করুন।
              </div>
            )}

            {foundComplaint && (
              <div className="bg-white dark:bg-stone-800 rounded-3xl p-6 border border-stone-200 dark:border-stone-700 shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono font-bold text-sm bg-stone-100 dark:bg-stone-700 px-3 py-1 rounded-lg">
                    {foundComplaint.trackingId}
                  </span>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      foundComplaint.status === 'সমাধানকৃত'
                        ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300'
                        : foundComplaint.status === 'তদন্তাধীন'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}
                  >
                    ● {foundComplaint.status}
                  </span>
                </div>

                <h4 className="font-bold text-lg text-stone-900 dark:text-stone-100 mb-2">
                  {foundComplaint.title}
                </h4>

                <div className="text-xs text-stone-500 mb-4">
                  ক্যাটাগরি: {foundComplaint.category} • স্থান: {foundComplaint.ward} • তারিখ: {formatBnDate(foundComplaint.date)}
                </div>

                <div className="p-3.5 bg-stone-50 dark:bg-stone-750 rounded-xl text-xs sm:text-sm text-stone-700 dark:text-stone-300 mb-4">
                  <strong>অভিযোগ বিবরণ:</strong> {foundComplaint.details}
                </div>

                {foundComplaint.image && (
                  <div className="mb-4">
                    <img
                      src={foundComplaint.image}
                      alt="Complaint attachment"
                      className="max-h-48 rounded-xl object-cover"
                    />
                  </div>
                )}

                {foundComplaint.officialReply && (
                  <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs sm:text-sm text-emerald-900 dark:text-emerald-200">
                    <strong>ইউনিয়ন পরিষদ উত্তর:</strong> {foundComplaint.officialReply}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
