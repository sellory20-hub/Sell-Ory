import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Facebook,
  Globe,
  Share2
} from 'lucide-react';
import { shareOnFacebook } from '../utils/helpers';

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', phone: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-widest bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 rounded-full">
            যোগাযোগ ও পরামর্শ
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-100 mt-2">
            যোগাযোগ করুন
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 mt-2">
            মোগলাবাজার ইউনিয়ন পরিষদ বা প্রশাসনের সাথে যেকোনো পরামর্শ, তথ্য বা সেবার জন্য সরাসরি যোগাযোগ করুন।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Address & Office Hours */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-stone-800 p-6 sm:p-8 rounded-3xl border border-stone-200 dark:border-stone-700 shadow-sm">
              <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-6">
                ইউনিয়ন পরিষদ ও থানা কার্যালয়
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-stone-900 dark:text-stone-100">ঠিকানা:</strong>
                    মোগলাবাজার ইউনিয়ন পরিষদ কমপ্লেক্স ও থানা মোড়,<br />
                    ডাকঘর: মোগলাবাজার - ৩১০৩,<br />
                    উপজেলা: দক্ষিণ সুরমা, জেলা: সিলেট।
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-stone-900 dark:text-stone-100">টেলিফোন ও মোবাইল:</strong>
                    চেয়ারম্যান: ০১৭০১-১২৩৪৫৬<br />
                    ইউপি সচিব: ০১৭১২-৯৮৭৬৫৪<br />
                    থানা ওসি: ০১৭১৩-৩৭৩১৫০
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-stone-900 dark:text-stone-100">ইমেইল:</strong>
                    info@visiblemoglabazar.org<br />
                    moglabazar.up@sylhet.gov.bd
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-stone-900 dark:text-stone-100">অফিস সময়সূচি:</strong>
                    রবিবার থেকে বৃহস্পতিবার: সকাল ৯:০০ - বিকাল ৫:০০<br />
                    (শুক্রবার ও শনিবার সাপ্তাহিক বন্ধ)
                  </div>
                </div>
              </div>

              {/* Social sharing & official links */}
              <div className="mt-6 pt-6 border-t border-stone-200 dark:border-stone-700 flex items-center justify-between">
                <span className="text-xs font-bold text-stone-700 dark:text-stone-300">সোশ্যাল মিডিয়া:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => shareOnFacebook(undefined, 'ভিজিবেল মোগলাবাজার ওয়েবসাইট')}
                    className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    title="ফেসবুক পেজ / গ্রুপ শেয়ার"
                  >
                    <Facebook className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => shareOnFacebook()}
                    className="p-2 rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 transition-colors"
                    title="শেয়ার পোর্টাল"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-stone-800 p-6 sm:p-8 rounded-3xl border border-stone-200 dark:border-stone-700 shadow-sm">
              <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-2">
                সরাসরি বার্তা বা মতামত পাঠান
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mb-6">
                আপনার যেকোনো প্রশ্ন, পরামর্শ বা মতামত থাকলে নিচে লিখে পাঠান।
              </p>

              {submitted ? (
                <div className="p-8 text-center bg-green-50 dark:bg-green-950/40 border border-green-300 rounded-2xl">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
                  <h4 className="text-lg font-bold text-green-900 dark:text-green-200">
                    ধন্যবাদ! আপনার বার্তাটি গৃহীত হয়েছে।
                  </h4>
                  <p className="text-xs text-green-800 dark:text-green-300 mt-1">
                    ইউনিয়ন পরিষদ তথ্য শাখা থেকে আপনার মোবাইল নম্বরে দ্রুত উত্তর প্রদান করা হবে।
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                        আপনার নাম *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="আপনার নাম"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 text-sm outline-none focus:border-emerald-600"
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
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 text-sm outline-none focus:border-emerald-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      বার্তার বিষয়
                    </label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="যেমন: নাগরিক সনদ সংক্রান্ত জিজ্ঞাসা"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 text-sm outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      বার্তা বা পরামর্শ *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="আপনার বক্তব্য পরিষ্কারভাবে লিখুন..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 text-sm outline-none focus:border-emerald-600"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>বার্তা পাঠান</span>
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
