import React, { useState } from 'react';
import {
  X,
  Lock,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  FileText,
  Newspaper,
  Image,
  AlertTriangle,
  RotateCcw,
  LogOut,
  Layers,
  Save
} from 'lucide-react';
import { Notice, NewsItem, CitizenComplaint, GalleryPhoto } from '../types';

interface AdminProps {
  isOpen: boolean;
  onClose: () => void;
  notices: Notice[];
  news: NewsItem[];
  complaints: CitizenComplaint[];
  photos: GalleryPhoto[];
  onAddNotice: (notice: Notice) => void;
  onDeleteNotice: (id: string) => void;
  onAddNews: (item: NewsItem) => void;
  onDeleteNews: (id: string) => void;
  onUpdateComplaintStatus: (id: string, status: CitizenComplaint['status'], reply?: string) => void;
  onDeleteComplaint: (id: string) => void;
  onResetAllData: () => void;
}

export const AdminModal: React.FC<AdminProps> = ({
  isOpen,
  onClose,
  notices,
  news,
  complaints,
  photos,
  onAddNotice,
  onDeleteNotice,
  onAddNews,
  onDeleteNews,
  onUpdateComplaintStatus,
  onDeleteComplaint,
  onResetAllData
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [adminTab, setAdminTab] = useState<'notices' | 'news' | 'complaints'>('complaints');

  // Form states for adding notice
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeCategory, setNewNoticeCategory] = useState<Notice['category']>('ইউনিয়ন');
  const [newNoticeContent, setNewNoticeContent] = useState('');

  // Form states for adding news
  const [newNewsTitle, setNewNewsTitle] = useState('');
  const [newNewsCategory, setNewNewsCategory] = useState<NewsItem['category']>('উন্নয়ন');
  const [newNewsExcerpt, setNewNewsExcerpt] = useState('');
  const [newNewsContent, setNewNewsContent] = useState('');
  const [newNewsImage, setNewNewsImage] = useState('');

  // Complaint reply edit states
  const [editingComplaintId, setEditingComplaintId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123' || password === 'admin' || password === '1234') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('ভুল পাসওয়ার্ড! সঠিক পাসওয়ার্ড দিন (ডেমো পাসওয়ার্ড: admin123)');
    }
  };

  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeTitle || !newNoticeContent) return;
    const item: Notice = {
      id: `notice-${Date.now()}`,
      title: newNoticeTitle,
      category: newNoticeCategory,
      date: new Date().toISOString().split('T')[0],
      important: true,
      content: newNoticeContent
    };
    onAddNotice(item);
    setNewNoticeTitle('');
    setNewNoticeContent('');
  };

  const handleCreateNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNewsTitle || !newNewsContent) return;
    const item: NewsItem = {
      id: `news-${Date.now()}`,
      title: newNewsTitle,
      category: newNewsCategory,
      date: new Date().toISOString().split('T')[0],
      excerpt: newNewsExcerpt || newNewsTitle,
      content: newNewsContent,
      image: newNewsImage || 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=800&q=80',
      author: 'অ্যাডমিন প্যানেল'
    };
    onAddNews(item);
    setNewNewsTitle('');
    setNewNewsExcerpt('');
    setNewNewsContent('');
    setNewNewsImage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs">
      <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl border border-stone-200 dark:border-stone-700">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-stone-950 flex items-center justify-center font-bold">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg">ভিজিবেল মোগলাবাজার - অ্যাডমিন কন্ট্রোল প্যানেল</h3>
              <p className="text-[11px] text-stone-400">তথ্য হালনাগাদ ও নাগরিক অভিযোগ ব্যবস্থাপনা</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {!isAuthenticated ? (
          /* Login Screen */
          <div className="p-8 sm:p-12 max-w-md mx-auto text-center my-auto">
            <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-2">
              প্রশাসক পাসওয়ার্ড লিখুন
            </h4>
            <p className="text-xs text-stone-500 mb-6">
              পাসওয়ার্ড: <code className="bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded font-mono font-bold text-amber-600">admin123</code>
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="পাসওয়ার্ড লিখুন..."
                className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-sm outline-none focus:border-amber-500 text-center tracking-widest text-stone-900 dark:text-white"
              />

              {authError && (
                <div className="text-xs text-red-500 font-medium">
                  {authError}
                </div>
              )}

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold py-2.5 rounded-xl text-sm transition-colors cursor-pointer"
                >
                  প্রবেশ করুন
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPassword('admin123');
                    setIsAuthenticated(true);
                  }}
                  className="px-4 py-2.5 bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 text-xs font-semibold rounded-xl cursor-pointer"
                >
                  ডেমো লগইন
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Nav Tabs */}
            <div className="p-3 bg-stone-100 dark:bg-stone-800/60 border-b border-stone-200 dark:border-stone-700 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAdminTab('complaints')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    adminTab === 'complaints'
                      ? 'bg-amber-500 text-stone-950'
                      : 'bg-white dark:bg-stone-700 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  নাগরিক অভিযোগ ({complaints.length})
                </button>
                <button
                  onClick={() => setAdminTab('notices')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    adminTab === 'notices'
                      ? 'bg-amber-500 text-stone-950'
                      : 'bg-white dark:bg-stone-700 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  নোটিশ ব্যবস্থাপনা ({notices.length})
                </button>
                <button
                  onClick={() => setAdminTab('news')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    adminTab === 'news'
                      ? 'bg-amber-500 text-stone-950'
                      : 'bg-white dark:bg-stone-700 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  সংবাদ ব্যবস্থাপনা ({news.length})
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (window.confirm('আপনি কি সকল ডেটা মূল ডিফল্ট অবস্থায় ফিরিয়ে নিতে চান?')) {
                      onResetAllData();
                    }
                  }}
                  className="px-2.5 py-1 rounded-lg bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 text-[11px] text-stone-700 dark:text-stone-300 flex items-center gap-1 cursor-pointer"
                  title="ফ্যাক্টরি রিসেট"
                >
                  <RotateCcw className="w-3 h-3" />
                  রিসেট
                </button>
                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="px-2.5 py-1 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <LogOut className="w-3 h-3" />
                  লগআউট
                </button>
              </div>
            </div>

            {/* Scrollable View Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {/* COMPLAINTS TAB */}
              {adminTab === 'complaints' && (
                <div className="space-y-4">
                  <h4 className="font-bold text-stone-900 dark:text-stone-100 text-base">
                    নাগরিকদের প্রেরিত সমস্যা ও প্রতিক্রিয়া তালিকা
                  </h4>

                  {complaints.length === 0 ? (
                    <div className="text-center py-10 text-stone-400 text-xs">
                      বর্তমানে কোনো জমা হওয়া অভিযোগ নেই।
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {complaints.map((c) => (
                        <div
                          key={c.id}
                          className="bg-stone-50 dark:bg-stone-800 p-4 rounded-2xl border border-stone-200 dark:border-stone-700 space-y-3"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 px-2.5 py-0.5 rounded">
                                {c.trackingId}
                              </span>
                              <span className="text-xs font-semibold text-stone-500">
                                {c.ward} • {c.category}
                              </span>
                            </div>

                            {/* Status changer */}
                            <div className="flex items-center gap-2">
                              <select
                                value={c.status}
                                onChange={(e) =>
                                  onUpdateComplaintStatus(
                                    c.id,
                                    e.target.value as CitizenComplaint['status']
                                  )
                                }
                                className="px-2.5 py-1 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 text-xs font-bold"
                              >
                                <option value="অপেক্ষমান">অপেক্ষমান</option>
                                <option value="তদন্তাধীন">তদন্তাধীন</option>
                                <option value="সমাধানকৃত">সমাধানকৃত</option>
                              </select>

                              <button
                                onClick={() => onDeleteComplaint(c.id)}
                                className="p-1 rounded bg-red-100 text-red-600 hover:bg-red-200"
                                title="মুছে ফেলুন"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <h5 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                            {c.title}
                          </h5>
                          <p className="text-xs text-stone-600 dark:text-stone-300">
                            {c.details}
                          </p>

                          <div className="text-[11px] text-stone-500">
                            আবেদনকারী: {c.name} • ফোন: {c.phone} • তারিখ: {c.date}
                          </div>

                          {/* Official reply editor */}
                          <div className="pt-2 border-t border-stone-200 dark:border-stone-700">
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                defaultValue={c.officialReply || ''}
                                placeholder="অফিসিয়াল উত্তর / গৃহীত পদক্ষেপ লিখুন..."
                                onBlur={(e) => {
                                  onUpdateComplaintStatus(c.id, c.status, e.target.value);
                                }}
                                className="flex-1 px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 text-xs"
                              />
                              <span className="text-[10px] text-stone-400">লিখলেই স্বয়ংক্রিয় সেভ</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* NOTICES TAB */}
              {adminTab === 'notices' && (
                <div className="space-y-6">
                  {/* Create notice form */}
                  <div className="bg-stone-50 dark:bg-stone-800 p-4 sm:p-5 rounded-2xl border border-stone-200 dark:border-stone-700">
                    <h5 className="font-bold text-sm text-stone-900 dark:text-stone-100 mb-3 flex items-center gap-1.5">
                      <Plus className="w-4 h-4 text-emerald-600" />
                      নতুন নোটিশ যোগ করুন
                    </h5>
                    <form onSubmit={handleCreateNotice} className="space-y-3">
                      <input
                        type="text"
                        required
                        value={newNoticeTitle}
                        onChange={(e) => setNewNoticeTitle(e.target.value)}
                        placeholder="নোটিশের শিরোনাম..."
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 text-xs sm:text-sm"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <select
                          value={newNoticeCategory}
                          onChange={(e) =>
                            setNewNoticeCategory(e.target.value as Notice['category'])
                          }
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 text-xs font-semibold"
                        >
                          <option value="ইউনিয়ন">ইউনিয়ন</option>
                          <option value="সরকারি">সরকারি</option>
                          <option value="স্বাস্থ্য">স্বাস্থ্য</option>
                          <option value="শিক্ষা">শিক্ষা</option>
                          <option value="জরুরি">জরুরি</option>
                        </select>
                        <span className="text-xs text-stone-400 self-center">
                          তারিখ: আজকের তারিখ
                        </span>
                      </div>
                      <textarea
                        required
                        rows={3}
                        value={newNoticeContent}
                        onChange={(e) => setNewNoticeContent(e.target.value)}
                        placeholder="নোটিশের বিস্তারিত বক্তব্য..."
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 text-xs"
                      ></textarea>
                      <button
                        type="submit"
                        className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl text-xs"
                      >
                        নোটিশ প্রকাশ করুন
                      </button>
                    </form>
                  </div>

                  {/* List existing notices */}
                  <div className="space-y-2">
                    <h5 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                      বিদ্যমান নোটিশসমূহ ({notices.length})
                    </h5>
                    {notices.map((n) => (
                      <div
                        key={n.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700"
                      >
                        <div className="min-w-0 pr-3">
                          <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded mr-2">
                            {n.category}
                          </span>
                          <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 truncate">
                            {n.title}
                          </span>
                        </div>
                        <button
                          onClick={() => onDeleteNotice(n.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                          title="মুছে ফেলুন"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* NEWS TAB */}
              {adminTab === 'news' && (
                <div className="space-y-6">
                  {/* Create news form */}
                  <div className="bg-stone-50 dark:bg-stone-800 p-4 sm:p-5 rounded-2xl border border-stone-200 dark:border-stone-700">
                    <h5 className="font-bold text-sm text-stone-900 dark:text-stone-100 mb-3 flex items-center gap-1.5">
                      <Plus className="w-4 h-4 text-emerald-600" />
                      নতুন সংবাদ প্রকাশ করুন
                    </h5>
                    <form onSubmit={handleCreateNews} className="space-y-3">
                      <input
                        type="text"
                        required
                        value={newNewsTitle}
                        onChange={(e) => setNewNewsTitle(e.target.value)}
                        placeholder="সংবাদের শিরোনাম..."
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 text-xs sm:text-sm"
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <select
                          value={newNewsCategory}
                          onChange={(e) =>
                            setNewNewsCategory(e.target.value as NewsItem['category'])
                          }
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 text-xs font-semibold"
                        >
                          <option value="উন্নয়ন">উন্নয়ন</option>
                          <option value="সামাজিক">সামাজিক</option>
                          <option value="প্রশাসন">প্রশাসন</option>
                          <option value="কৃষি">কৃষি</option>
                          <option value="খেলাধুলা">খেলাধুলা</option>
                        </select>
                        <input
                          type="text"
                          value={newNewsImage}
                          onChange={(e) => setNewNewsImage(e.target.value)}
                          placeholder="ছবির লিংক (URL, ঐচ্ছিক)"
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 text-xs"
                        />
                      </div>
                      <input
                        type="text"
                        value={newNewsExcerpt}
                        onChange={(e) => setNewNewsExcerpt(e.target.value)}
                        placeholder="সংক্ষিপ্ত সারসংক্ষেপ (Excerpt)..."
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 text-xs"
                      />
                      <textarea
                        required
                        rows={4}
                        value={newNewsContent}
                        onChange={(e) => setNewNewsContent(e.target.value)}
                        placeholder="পূর্ণাঙ্গ সংবাদ বিবরণ..."
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 text-xs"
                      ></textarea>
                      <button
                        type="submit"
                        className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl text-xs"
                      >
                        সংবাদ প্রকাশ করুন
                      </button>
                    </form>
                  </div>

                  {/* List existing news */}
                  <div className="space-y-2">
                    <h5 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                      বিদ্যমান সংবাদসমূহ ({news.length})
                    </h5>
                    {news.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700"
                      >
                        <div className="min-w-0 pr-3">
                          <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded mr-2">
                            {item.category}
                          </span>
                          <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 truncate">
                            {item.title}
                          </span>
                        </div>
                        <button
                          onClick={() => onDeleteNews(item.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                          title="মুছে ফেলুন"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
