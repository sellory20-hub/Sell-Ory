import React, { useState, useEffect } from 'react';
import { ChevronUp, Phone, MessageCircle, AlertCircle } from 'lucide-react';
import { NavTab } from '../types';

interface FloatingActionsProps {
  onOpenComplaint: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenComplaint }) => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
      {/* Quick Complaint Float */}
      <button
        onClick={onOpenComplaint}
        className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold px-3.5 py-2.5 rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer text-xs sm:text-sm"
        title="এলাকার সমস্যা জানান"
      >
        <AlertCircle className="w-4 h-4 text-stone-950" />
        <span className="hidden sm:inline">সমস্যা জানান</span>
      </button>

      {/* WhatsApp Floating link */}
      <a
        href="https://wa.me/8801701123456"
        target="_blank"
        rel="noreferrer"
        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all transform hover:scale-110 cursor-pointer"
        title="হোয়াটসঅ্যাপে যোগাযোগ"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      {/* Direct Call Floating button */}
      <a
        href="tel:01713373150"
        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-blue-700 hover:bg-blue-600 text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all transform hover:scale-110 cursor-pointer"
        title="মোগলাবাজার থানা ওসি ফোন"
      >
        <Phone className="w-5 h-5" />
      </a>

      {/* Back to Top */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-stone-900/80 hover:bg-stone-900 text-amber-300 flex items-center justify-center shadow-lg transition-all cursor-pointer backdrop-blur-xs"
          aria-label="Back to top"
          title="উপরে যান"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
