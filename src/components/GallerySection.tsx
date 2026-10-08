import React, { useState } from 'react';
import {
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Calendar,
  Layers
} from 'lucide-react';
import { GalleryPhoto } from '../types';
import { formatBnDate } from '../utils/helpers';

interface GalleryProps {
  photos: GalleryPhoto[];
}

export const GallerySection: React.FC<GalleryProps> = ({ photos }) => {
  const [selectedAlbum, setSelectedAlbum] = useState<string>('all');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const albums = [
    'all',
    'প্রাকৃতিক সৌন্দর্য',
    'ঐতিহ্য ও ইতিহাস',
    'উন্নয়ন কর্মকাণ্ড',
    'ইউনিয়ন পরিষদ কার্যক্রম'
  ];

  const filteredPhotos = photos.filter((p) => {
    if (selectedAlbum === 'all') return true;
    return p.album === selectedAlbum;
  });

  const openLightbox = (index: number) => {
    setActivePhotoIndex(index);
  };

  const closeLightbox = () => {
    setActivePhotoIndex(null);
  };

  const nextPhoto = () => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % filteredPhotos.length);
    }
  };

  const prevPhoto = () => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex(
        (activePhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length
      );
    }
  };

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-widest bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 rounded-full">
            চিত্রশালা ও স্মৃতিকথা
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-100 mt-2">
            মোগলাবাজার ফটো ও ভিডিও গ্যালারি
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 mt-2">
            এলাকার নৈসর্গিক রূপ, ঐতিহাসিক হাটের চালচিত্র, সামাজিক উৎসব ও উন্নয়ন প্রকল্পের আলোকচিত্র।
          </p>
        </div>

        {/* Album filter tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {albums.map((album) => (
            <button
              key={album}
              onClick={() => setSelectedAlbum(album)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                selectedAlbum === album
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-50'
              }`}
            >
              {album === 'all' ? 'সকল অ্যালবাম' : album}
            </button>
          ))}
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(index)}
              className="bg-white dark:bg-stone-800 rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-700 shadow-sm hover:shadow-xl transition-all cursor-pointer group"
            >
              <div className="h-60 overflow-hidden relative">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white">
                    <Maximize2 className="w-6 h-6" />
                  </div>
                </div>
                <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg">
                  {photo.album}
                </span>
              </div>

              <div className="p-5">
                <div className="text-[11px] text-stone-500 dark:text-stone-400 mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatBnDate(photo.date)}
                </div>
                <h3 className="font-bold text-base text-stone-900 dark:text-stone-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  {photo.title}
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 line-clamp-2">
                  {photo.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activePhotoIndex !== null && filteredPhotos[activePhotoIndex] && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white z-20 cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev button */}
            <button
              onClick={prevPhoto}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white z-20 hidden sm:block cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next button */}
            <button
              onClick={nextPhoto}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white z-20 hidden sm:block cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="max-w-4xl w-full flex flex-col items-center">
              <div className="max-h-[75vh] rounded-2xl overflow-hidden mb-4 shadow-2xl">
                <img
                  src={filteredPhotos[activePhotoIndex].imageUrl}
                  alt={filteredPhotos[activePhotoIndex].title}
                  className="max-h-[75vh] w-auto object-contain mx-auto"
                />
              </div>

              <div className="text-center text-white max-w-xl">
                <span className="text-xs text-amber-300 font-bold bg-amber-900/60 px-3 py-0.5 rounded-full">
                  {filteredPhotos[activePhotoIndex].album}
                </span>
                <h4 className="text-lg font-bold mt-2">
                  {filteredPhotos[activePhotoIndex].title}
                </h4>
                <p className="text-xs text-stone-300 mt-1">
                  {filteredPhotos[activePhotoIndex].description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
