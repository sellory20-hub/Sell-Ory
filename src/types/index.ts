export type NavTab = 
  | 'home'
  | 'about'
  | 'union'
  | 'thana'
  | 'emergency'
  | 'health'
  | 'education'
  | 'business'
  | 'religious'
  | 'news'
  | 'gallery'
  | 'complaint'
  | 'contact';

export interface Notice {
  id: string;
  title: string;
  date: string;
  category: 'সরকারি' | 'ইউনিয়ন' | 'স্বাস্থ্য' | 'শিক্ষা' | 'জরুরি';
  important?: boolean;
  content: string;
  fileUrl?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: 'উন্নয়ন' | 'সামাজিক' | 'কৃষি' | 'খেলাধুলা' | 'প্রশাসন' | 'শিক্ষা';
  excerpt: string;
  content: string;
  image: string;
  author: string;
}

export interface CouncilMember {
  id: string;
  name: string;
  designation: string;
  ward: string;
  phone: string;
  photo: string;
  email?: string;
  responsibilities?: string;
}

export interface ThanaOfficer {
  id: string;
  name: string;
  designation: string;
  phone: string;
  mobile: string;
  photo: string;
  role: string;
}

export interface Institution {
  id: string;
  name: string;
  type: 'কলেজ' | 'মাধ্যমিক বিদ্যালয়' | 'প্রাথমিক বিদ্যালয়' | 'মাদ্রাসা' | 'কারিগরি';
  established: string;
  headPerson: string;
  phone: string;
  address: string;
  studentsCount: string;
  teachersCount: string;
}

export interface HealthProvider {
  id: string;
  name: string;
  type: 'হাসপাতাল' | 'ক্লিনিক' | 'কমিউনিটি ক্লিনিক' | 'ফার্মেসি' | 'ডায়াগনস্টিক' | 'ডাক্তার';
  specialty?: string;
  doctorName?: string;
  address: string;
  phone: string;
  timing: string;
  isOpen24Hours?: boolean;
}

export interface BloodDonor {
  id: string;
  name: string;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  phone: string;
  area: string;
  lastDonationDate?: string;
  available: boolean;
}

export interface BusinessItem {
  id: string;
  name: string;
  category: 'মুদি ও সুপারশপ' | 'ফার্মেসি' | 'ব্যাংক ও এজেন্ট' | 'রেস্টুরেন্ট' | 'ইলেকট্রনিক্স ও হার্ডওয়্যার' | 'পোশাক ও টেইলার্স' | 'পরিবহন সেবা';
  owner: string;
  phone: string;
  address: string;
  timing: string;
}

export interface ReligiousPlace {
  id: string;
  name: string;
  type: 'মসজিদ' | 'মাদ্রাসা ও মক্তব' | 'ঈদগাহ' | 'মন্দির' | 'সামাজিক ক্লাব ও যুব সংঘ';
  address: string;
  contactPerson: string;
  phone: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  album: 'প্রাকৃতিক সৌন্দর্য' | 'ঐতিহ্য ও ইতিহাস' | 'উন্নয়ন কর্মকাণ্ড' | 'ইউনিয়ন পরিষদ কার্যক্রম';
  imageUrl: string;
  description: string;
  date: string;
}

export interface CitizenComplaint {
  id: string;
  trackingId: string;
  title: string;
  category: 'রাস্তা ও সেতু' | 'বিদ্যুৎ সমস্যা' | 'পানি ও নিষ্কাশন' | 'আইনশৃঙ্খলা ও নিরাপত্তা' | 'পরিবেশ ও বর্জ্য' | 'অন্যান্য';
  ward: string;
  details: string;
  name: string;
  phone: string;
  date: string;
  status: 'অপেক্ষমান' | 'তদন্তাধীন' | 'সমাধানকৃত';
  image?: string;
  officialReply?: string;
}

export interface CitizenServiceCharter {
  id: string;
  title: string;
  fee: string;
  duration: string;
  requirements: string[];
  department: string;
}
