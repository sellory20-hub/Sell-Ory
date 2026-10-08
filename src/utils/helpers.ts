// Helpers for Bengali numerals, text formatting and local storage

const BENGALI_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export function toBnNumber(val: number | string): string {
  if (val === undefined || val === null) return '';
  return val
    .toString()
    .replace(/[0-9]/g, (digit) => BENGALI_DIGITS[parseInt(digit, 10)]);
}

export function formatBnDate(dateString: string): string {
  if (!dateString) return '';
  // Convert 2026-10-07 to বাংলা ফরম্যাট
  const parts = dateString.split('-');
  if (parts.length === 3) {
    const year = toBnNumber(parts[0]);
    const months = [
      'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
      'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
    ];
    const monthIndex = parseInt(parts[1], 10) - 1;
    const month = months[monthIndex] || parts[1];
    const day = toBnNumber(parseInt(parts[2], 10));
    return `${day} ${month}, ${year}`;
  }
  return toBnNumber(dateString);
}

export function generateTrackingId(): string {
  const random = Math.floor(1000 + Math.random() * 9000);
  return `MB-${random}`;
}

export function shareOnFacebook(url?: string, text?: string) {
  const currentUrl = encodeURIComponent(url || window.location.href);
  const shareText = encodeURIComponent(text || 'ভিজিবেল মোগলাবাজার - ডিজিটাল তথ্য পোর্টাল');
  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}&quote=${shareText}`;
  window.open(fbUrl, '_blank', 'width=600,height=500');
}

export function shareOnWhatsApp(text?: string, url?: string) {
  const currentUrl = url || window.location.href;
  const msg = encodeURIComponent(`${text || 'ভিজিবেল মোগলাবাজার'}: ${currentUrl}`);
  window.open(`https://api.whatsapp.com/send?text=${msg}`, '_blank');
}

export function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text).then(() => true).catch(() => false);
  }
  return Promise.resolve(false);
}

// Local Storage Helper with fallbacks
export function getStorageItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage:`, e);
    return defaultValue;
  }
}

export function setStorageItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage:`, e);
  }
}
