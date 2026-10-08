import React from 'react';
import { X, Clock, Sun, Moon, Sparkles, MapPin } from 'lucide-react';

interface PrayerTimesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrayerTimesModal: React.FC<PrayerTimesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const prayers = [
    { name: 'ফজর', azan: '৪:৪৮ মি.', jamat: '৫:১৫ মি.', note: 'সাহরি শেষ: ৪:৪২' },
    { name: 'ইশরাক ও চাশত', azan: 'সূর্যোদয়ের ১৫ মিনিট পর', jamat: 'সকাল ৬:৩০ - ১০:৩০', note: 'নফল নামাজ' },
    { name: 'জোহর', azan: '১১:৫৮ মি.', jamat: '১:১৫ মি.', note: 'দুপুর' },
    { name: 'আসর', azan: '৪:০৮ মি.', jamat: '৪:৩০ মি.', note: 'বিকাল' },
    { name: 'মাগরিব', azan: '৫:৪৩ মি.', jamat: '৫:৪৮ মি.', note: 'ইফতার ও সূর্যাস্ত' },
    { name: 'এশা', azan: '৭:০২ মি.', jamat: '৭:৩০ মি.', note: 'রাত্রি' },
    { name: 'জুমুআ (শুক্রবার)', azan: '১২:৩০ মি.', jamat: '১:১৫ মি.', note: 'সাপ্তাহিক প্রধান জামাত' },
    { name: 'তাহাজ্জুদ', azan: 'রাতের শেষ তৃতীয়াংশ', jamat: 'রাত ৩:৩০ - ৪:৩০', note: 'বিশেষ নফল' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 dark:border-stone-700 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">
              নামাজের সময়সূচি
            </h3>
            <div className="text-xs text-stone-500 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>মোগলাবাজার ও দক্ষিণ সুরমা অঞ্চল, সিলেট</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 mb-6 max-h-[60vh] overflow-y-auto pr-1">
          {prayers.map((p, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center justify-between"
            >
              <div>
                <span className="font-bold text-sm text-stone-900 dark:text-stone-100">
                  {p.name}
                </span>
                <span className="text-[11px] text-stone-500 block">
                  {p.note}
                </span>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400 block font-mono">
                  জামাত: {p.jamat}
                </span>
                <span className="text-[11px] text-stone-400">
                  আজান: {p.azan}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-stone-200 dark:border-stone-700 flex items-center justify-between text-xs text-stone-500">
          <span>কেন্দ্রীয় জামে মসজিদ অনুযায়ী সমন্বিত</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
