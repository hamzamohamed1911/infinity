// config الخاص بالموبايل
interface MobileConfig {
  academy_name: string;
  app_name: string;
  primary_color: string;
  secondary_color: string;
  background_color: string;
  tap_button_color: string;
  support_phone: string;
  academy_logo: string;
  logo: string;
  privacy_policy: string;
}

// الأكاديمية
interface Academy {
  id: number;
  name: string;
  subdomain: string;
  logo: string;
  desc: string;
  mobile_config: MobileConfig;
}

// الـ Features
interface Features {
  platform: boolean;
  center: boolean;
  book_store: boolean;
  question_bank: boolean;
  personal_assistant: boolean;
  managing_assistants: boolean;
  students: boolean;
  accounting: boolean;
  webapp: boolean;
  demands: boolean;
  reports: boolean;
  settings: boolean;
}

// المدرس
interface Teacher {
  id: number;
  code: string;
  name: string;
  email: string | null;
  phone: string | null;
  parent_phone: string | null;
  avatar: string | null;
  wallet: number;
  device_id: string | null;
  national_id: string | null;
  created_at: string; // ISO date
  updated_at: string; // ISO date
  image: string;
  token: string | null;
  isVerified: boolean;
  academy: Academy;
  features: Features;
}

// الكتاب
declare type Book = {
  id: number;
  name: string;
  image?: string;
  description: string | null;
  content: string | null;
  price: string;
  image?: string;
  teacher: Teacher;
};

// Pagination info
interface Pagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

// الـ API Response الأساسى
declare type BooksApiResponse = {
  data: {
    items: Book[];
    pagination: Pagination;
  };
  success: boolean;
  status: number;
};
