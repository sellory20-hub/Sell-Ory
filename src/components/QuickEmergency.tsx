import React from 'react';
import { Phone, ShieldAlert, Flame, Zap, Droplet, Ambulance, AlertCircle, Copy, Check } from 'lucide-react';
import { copyToClipboard } from '../utils/helpers';

export const QuickEmergency: React.FC = () => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const emergencyContacts = [
    {
      id: 'em-national',
      title: 'জাতীয় জরুরি হেল্পলাইন (পুলিশ, অ্যাম্বুলেন্স, ফায়ার)',
      number: '999',
      displayNumber: '৯৯৯ (টোল-ফ্রি)',
      icon: AlertCircle,
      badge: 'টোল ফ্রি - ২৪ ঘণ্টা',
      color: 'bg-red-600',
      description: 'যেকোনো বিপদে পুলিশ, জরুরি আগুন বা অ্যাম্বুলেন্স পেতে বিনামূল্যে ডায়াল করুন।'
    },
    {
      id: 'em-oc',
      title: 'মোগলাবাজার থানা - অফিসার ইনচার্জ (ওসি)',
      number: '01713373150',
      displayNumber: '০১৭১৩-৩৭৩১৫০',
      icon: ShieldAlert,
      badge: 'থানা হটলাইন',
      color: 'bg-blue-600',
      description: 'এলাকায় যেকোনো আইনশৃঙ্খলা বিঘ্ন, তাৎক্ষণিক পুলিশি টহল বা অপরাধ সংক্রান্ত তথ্য জানাতে।'
    },
    {
      id: 'em-duty',
      title: 'মোগলাবাজার থানা - ডিউটি অফিসার',
      number: '01713373152',
      displayNumber: '০১৭১৩-৩৭৩১৫২',
      icon: ShieldAlert,
      badge: '২৪ ঘণ্টা ডিউটি রুম',
      color: 'bg-indigo-600',
      description: 'তাৎক্ষণিক অভিযোগ, হারানো জিডি এবং জরুরি পুলিশ পেট্রোল সহায়তা।'
    },
    {
      id: 'em-fire',
      title: 'ফায়ার সার্ভিস ও সিভিল ডিফেন্স (দক্ষিণ সুরমা স্টেশন)',
      number: '01978255555',
      displayNumber: '০১৯৭৮-২৫৫৫৫৫',
      icon: Flame,
      badge: 'জরুরি অগ্নিনির্বাপণ',
      color: 'bg-orange-600',
      description: 'অগ্নিকাণ্ড, গ্যাস সিলিন্ডার বিস্ফোরণ বা ভারী দুর্ঘটনা উদ্ধার তৎপরতায়।'
    },
    {
      id: 'em-ambulance',
      title: 'মোগলাবাজার জরুরি অ্যাম্বুলেন্স সার্ভিস',
      number: '01715778899',
      displayNumber: '০১৭১৫-৭৭৮৮৯৯',
      icon: Ambulance,
      badge: 'হাসপাতাল পরিবহন',
      color: 'bg-rose-600',
      description: 'অক্সিজেন সুবিধাসহ সিওমেক (ওসমানী মেডিকেল) বা যেকোনো হাসপাতালে রোগী স্থানান্তর।'
    },
    {
      id: 'em-electric',
      title: 'সিলেট পল্লী বিদ্যুৎ সমিতি-১ (মোগলাবাজার অভিযোগ কেন্দ্র)',
      number: '01769400222',
      displayNumber: '০১৭৬৯-৪০০২২২',
      icon: Zap,
      badge: 'বিদ্যুৎ বিভ্রাট',
      color: 'bg-amber-600',
      description: 'বৈদ্যুতিক তার ছিঁড়ে যাওয়া, ট্রান্সফরমার নষ্ট বা এলাকায় দীর্ঘকালীন বিদ্যুৎ বিভ্রাট।'
    },
    {
      id: 'em-hospital',
      title: 'সিলেট এম এ জি ওসমানী মেডিকেল জরুরি বিভাগ',
      number: '01712000000',
      displayNumber: '০২৯৯৬৬৩xxxx / ০১৭১২-xxxxxx',
      icon: Droplet,
      badge: 'টার্শিয়ারি হাসপাতাল',
      color: 'bg-teal-600',
      description: 'সিলেটের প্রধান সরকারি চিকিৎসা কেন্দ্র ও সার্বক্ষণিক ট্রমা সেন্টার।'
    },
    {
      id: 'em-disaster',
      title: 'দুর্যোগের আগাম বার্তা ও তথ্য সেল',
      number: '1090',
      displayNumber: '১০৯০ (টোল-ফ্রি)',
      icon: AlertCircle,
      badge: 'আবহাওয়া ও বন্যা',
      color: 'bg-cyan-600',
      description: 'বন্যা, ভারী বর্ষণ বা প্রাকৃতিক দুর্যোগে করণীয় ও সতর্কতা জানার সরকারি নম্বর।'
    }
  ];

  const handleCopy = (id: string, num: string) => {
    copyToClipboard(num);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="bg-linear-to-r from-red-600 via-rose-700 to-red-800 text-white rounded-3xl p-6 sm:p-10 mb-8 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 bg-white/20 text-white text-xs px-3 py-1 rounded-full font-bold uppercase mb-3 backdrop-blur-xs">
              <AlertCircle className="w-4 h-4 text-amber-300" />
              ২৪ ঘণ্টা তাৎক্ষণিক জরুরি যোগাযোগ
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
              মোগলাবাজার জরুরি সেবা ডিরেক্টরি
            </h2>
            <p className="text-red-100 text-sm sm:text-base leading-relaxed">
              জরুরি মুহূর্তে সময় নষ্ট না করে সরাসরি প্রয়োজনীয় সরকারি বা জরুরি সেবা নম্বরে এক ক্লিকেই কল করুন। নম্বরগুলো আপনার ফোনে সংরক্ষণ করে রাখার পরামর্শ দেওয়া হচ্ছে।
            </p>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 translate-x-10 translate-y-10 pointer-events-none hidden sm:block">
            <ShieldAlert className="w-80 h-80 text-white" />
          </div>
        </div>

        {/* Emergency Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {emergencyContacts.map((contact) => {
            const Icon = contact.icon;
            const isCopied = copiedId === contact.id;

            return (
              <div
                key={contact.id}
                className="bg-white dark:bg-stone-800 rounded-2xl p-5 shadow-md hover:shadow-xl border border-stone-200 dark:border-stone-700 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-12 h-12 rounded-xl ${contact.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300 px-2.5 py-1 rounded-md">
                      {contact.badge}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-stone-900 dark:text-stone-100 mb-1 leading-snug">
                    {contact.title}
                  </h3>

                  <p className="text-xs text-stone-500 dark:text-stone-400 mb-4 line-clamp-2">
                    {contact.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 dark:border-stone-700/60 flex flex-col gap-2">
                  <div className="text-sm font-bold text-stone-800 dark:text-stone-200 text-center bg-stone-50 dark:bg-stone-900/60 py-1.5 rounded-lg border border-stone-200/50 dark:border-stone-700/50 font-mono">
                    {contact.displayNumber}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={`tel:${contact.number}`}
                      className="flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-3 rounded-lg text-xs font-bold transition-colors shadow-xs"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      কল করুন
                    </a>
                    <button
                      onClick={() => handleCopy(contact.id, contact.number)}
                      className="flex items-center justify-center gap-1.5 bg-stone-100 dark:bg-stone-700 hover:bg-stone-200 dark:hover:bg-stone-600 text-stone-700 dark:text-stone-200 py-2 px-3 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          কপি হয়েছে
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          কপি নম্বর
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
