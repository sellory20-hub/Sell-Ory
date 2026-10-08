import React, { useState } from 'react';
import {
  HeartPulse,
  Droplet,
  Phone,
  Clock,
  MapPin,
  Ambulance,
  PlusCircle,
  Search,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { HealthProvider, BloodDonor } from '../types';
import { toBnNumber } from '../utils/helpers';

interface HealthProps {
  healthProviders: HealthProvider[];
  bloodDonors: BloodDonor[];
  onAddBloodDonor: (donor: BloodDonor) => void;
}

export const HealthSection: React.FC<HealthProps> = ({
  healthProviders,
  bloodDonors,
  onAddBloodDonor
}) => {
  const [selectedBloodGroup, setSelectedBloodGroup] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'providers' | 'blood' | 'ambulance'>('providers');
  const [showDonorModal, setShowDonorModal] = useState(false);
  const [donorForm, setDonorForm] = useState({
    name: '',
    bloodGroup: 'A+' as BloodDonor['bloodGroup'],
    phone: '',
    area: '',
    lastDonationDate: ''
  });
  const [donorSuccess, setDonorSuccess] = useState(false);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const filteredDonors = bloodDonors.filter((donor) => {
    if (selectedBloodGroup === 'all') return true;
    return donor.bloodGroup === selectedBloodGroup;
  });

  const ambulanceServices = healthProviders.filter(
    (h) => h.name.includes('অ্যাম্বুলেন্স') || h.specialty?.includes('অ্যাম্বুলেন্স')
  );

  const handleDonorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorForm.name || !donorForm.phone) return;

    const newDonor: BloodDonor = {
      id: `bd-${Date.now()}`,
      name: donorForm.name,
      bloodGroup: donorForm.bloodGroup,
      phone: donorForm.phone,
      area: donorForm.area || 'মোগলাবাজার',
      lastDonationDate: donorForm.lastDonationDate || undefined,
      available: true
    };

    onAddBloodDonor(newDonor);
    setDonorSuccess(true);
    setTimeout(() => {
      setDonorSuccess(false);
      setShowDonorModal(false);
      setDonorForm({
        name: '',
        bloodGroup: 'A+',
        phone: '',
        area: '',
        lastDonationDate: ''
      });
    }, 2000);
  };

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-rose-800 dark:text-rose-400 uppercase tracking-widest bg-rose-100 dark:bg-rose-950/60 px-3 py-1 rounded-full">
            জনস্বাস্থ্য ও রক্তদান
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-100 mt-2">
            স্বাস্থ্যসেবা ও ব্লাড ব্যাংক নেটওয়ার্ক
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 mt-2">
            মোগলাবাজার ইউনিয়ন উপস্বাস্থ্য কেন্দ্র, বিশেষজ্ঞ ডাক্তার, সার্বক্ষণিক ফার্মেসি ও জীবন রক্ষাকারী রক্তদাতা ডিরেক্টরি।
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 rounded-xl bg-stone-200 dark:bg-stone-800">
            <button
              onClick={() => setActiveTab('providers')}
              className={`px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'providers'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-stone-700 dark:text-stone-300 hover:text-rose-600'
              }`}
            >
              হাসপাতাল ও ফার্মেসি ({toBnNumber(healthProviders.length)})
            </button>
            <button
              onClick={() => setActiveTab('blood')}
              className={`px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'blood'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-stone-700 dark:text-stone-300 hover:text-rose-600'
              }`}
            >
              রক্তদাতার তালিকা ({toBnNumber(bloodDonors.length)})
            </button>
            <button
              onClick={() => setActiveTab('ambulance')}
              className={`px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'ambulance'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-stone-700 dark:text-stone-300 hover:text-rose-600'
              }`}
            >
              জরুরি অ্যাম্বুলেন্স
            </button>
          </div>
        </div>

        {/* 1. HEALTH PROVIDERS TAB */}
        {activeTab === 'providers' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {healthProviders.map((provider) => (
              <div
                key={provider.id}
                className="bg-white dark:bg-stone-800 rounded-2xl p-5 border border-stone-200 dark:border-stone-700 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950 px-2 py-0.5 rounded">
                      {provider.type}
                    </span>
                    {provider.isOpen24Hours && (
                      <span className="text-[10px] font-bold bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300 px-2 py-0.5 rounded animate-pulse">
                        ২৪ ঘণ্টা খোলা
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100 mb-1">
                    {provider.name}
                  </h3>

                  {provider.doctorName && (
                    <div className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 mb-1">
                      {provider.doctorName}
                    </div>
                  )}

                  {provider.specialty && (
                    <div className="text-xs text-stone-600 dark:text-stone-300 mb-3 bg-stone-50 dark:bg-stone-750 p-2 rounded-lg">
                      {provider.specialty}
                    </div>
                  )}

                  <div className="space-y-1.5 text-xs text-stone-500 dark:text-stone-400 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>{provider.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>{provider.timing}</span>
                    </div>
                  </div>
                </div>

                <a
                  href={`tel:${provider.phone}`}
                  className="w-full flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white py-2.5 rounded-xl text-xs font-bold transition-colors shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  সরাসরি যোগাযোগ: {provider.phone}
                </a>
              </div>
            ))}
          </div>
        )}

        {/* 2. BLOOD DONOR DIRECTORY TAB */}
        {activeTab === 'blood' && (
          <div className="space-y-6">
            {/* Top Filter and Register Donor CTA */}
            <div className="bg-linear-to-r from-rose-900 to-rose-950 text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Droplet className="w-5 h-5 text-red-400 fill-red-400" />
                  রক্তের গ্রুপ অনুযায়ী খুঁজুন
                </h3>
                <p className="text-xs sm:text-sm text-rose-200 mt-1">
                  রক্ত দিন, জীবন বাঁচান। জরুরি রক্ত প্রয়োজনে সরাসরি রক্তদাতার সাথে কথা বলুন।
                </p>
              </div>

              <button
                onClick={() => setShowDonorModal(true)}
                className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-colors shrink-0 shadow-md cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                রক্তদাতা হিসেবে নাম যুক্ত করুন
              </button>
            </div>

            {/* Blood group pill filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                onClick={() => setSelectedBloodGroup('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shrink-0 cursor-pointer ${
                  selectedBloodGroup === 'all'
                    ? 'bg-rose-600 text-white'
                    : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                }`}
              >
                সব গ্রুপ ({toBnNumber(bloodDonors.length)})
              </button>
              {bloodGroups.map((group) => {
                const count = bloodDonors.filter((d) => d.bloodGroup === group).length;
                return (
                  <button
                    key={group}
                    onClick={() => setSelectedBloodGroup(group)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shrink-0 cursor-pointer ${
                      selectedBloodGroup === group
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-300'
                    }`}
                  >
                    {group} ({toBnNumber(count)})
                  </button>
                );
              })}
            </div>

            {/* Donors list cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredDonors.map((donor) => (
                <div
                  key={donor.id}
                  className="bg-white dark:bg-stone-800 rounded-2xl p-4 border border-stone-200 dark:border-stone-700 shadow-xs flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-stone-900 dark:text-stone-100 text-sm">
                        {donor.name}
                      </h4>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                        {donor.area}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400 font-black text-sm flex items-center justify-center border border-rose-300 dark:border-rose-800 shrink-0">
                      {donor.bloodGroup}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-100 dark:border-stone-700/60">
                    <span className="text-[10px] text-stone-400 block mb-2">
                      {donor.available ? '● রক্তদানে প্রস্তুত' : '○ সাম্প্রতিক সময়ে রক্ত দিয়েছেন'}
                    </span>
                    <a
                      href={`tel:${donor.phone}`}
                      className="w-full flex items-center justify-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white py-1.5 rounded-lg text-xs font-bold transition-colors"
                    >
                      <Phone className="w-3 h-3" />
                      কল: {donor.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. AMBULANCE TAB */}
        {activeTab === 'ambulance' && (
          <div className="bg-white dark:bg-stone-800 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-700 shadow-sm max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                <Ambulance className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                  ২৪ ঘণ্টা মোগলাবাজার জরুরি রোগী পরিবহন ও অ্যাম্বুলেন্স
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  অক্সিজেন সুবিধাসহ অভিজ্ঞ ড্রাইভার ও তাৎক্ষণিক রেসপন্স
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-750 border border-stone-200 dark:border-stone-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                    মোগলাবাজার সেন্ট্রাল অ্যাম্বুলেন্স (ড্রাইভার: মো. জিলানী মিয়া)
                  </h4>
                  <p className="text-xs text-stone-500">স্ট্যান্ড: মোগলাবাজার থানা মোড় ও হাসপাতাল রোড</p>
                </div>
                <a
                  href="tel:01715778899"
                  className="inline-flex items-center justify-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors shrink-0"
                >
                  <Phone className="w-3.5 h-3.5" />
                  ০১৭১৫-৭৭৮৮৯৯
                </a>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-750 border border-stone-200 dark:border-stone-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                    সিলেট ওসমানী মেডিকেল অ্যাম্বুলেন্স কন্ট্রোল রুম
                  </h4>
                  <p className="text-xs text-stone-500">সরকারি রেটে সিলেট ও দেশের যেকোনো প্রান্তে রোগী পরিবহন</p>
                </div>
                <a
                  href="tel:01712000000"
                  className="inline-flex items-center justify-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors shrink-0"
                >
                  <Phone className="w-3.5 h-3.5" />
                  ০২৯৯৬৬৩xxxx
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Register as blood donor */}
        {showDonorModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white dark:bg-stone-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-stone-200 dark:border-stone-700">
              <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-1">
                রক্তদাতা নিবন্ধন ফরম
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mb-6">
                আপনার একটু রক্ত পারে একজন মুমূর্ষু রোগীকে নতুন জীবন দিতে।
              </p>

              {donorSuccess ? (
                <div className="text-center py-6">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
                  <p className="font-bold text-emerald-700 dark:text-emerald-300">
                    আপনার নাম সফলভাবে রক্তদাতা তালিকায় যুক্ত হয়েছে!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleDonorSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      আপনার নাম *
                    </label>
                    <input
                      type="text"
                      required
                      value={donorForm.name}
                      onChange={(e) => setDonorForm({ ...donorForm, name: e.target.value })}
                      placeholder="যেমন: তানভীর আহমেদ"
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                        রক্তের গ্রুপ *
                      </label>
                      <select
                        value={donorForm.bloodGroup}
                        onChange={(e) =>
                          setDonorForm({
                            ...donorForm,
                            bloodGroup: e.target.value as BloodDonor['bloodGroup']
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 text-sm font-bold text-rose-600"
                      >
                        {bloodGroups.map((g) => (
                          <option key={g} value={g}>
                            {g}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                        মোবাইল নম্বর *
                      </label>
                      <input
                        type="tel"
                        required
                        value={donorForm.phone}
                        onChange={(e) => setDonorForm({ ...donorForm, phone: e.target.value })}
                        placeholder="০১৭১১-xxxxxx"
                        className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      গ্রাম / ওয়ার্ড
                    </label>
                    <input
                      type="text"
                      value={donorForm.area}
                      onChange={(e) => setDonorForm({ ...donorForm, area: e.target.value })}
                      placeholder="যেমন: ওয়ার্ড নং ০২, মোগলাবাজার"
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 text-sm"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowDonorModal(false)}
                      className="flex-1 py-2.5 rounded-xl bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-bold"
                    >
                      বাতিল
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
                    >
                      নিবন্ধন সম্পন্ন করুন
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
