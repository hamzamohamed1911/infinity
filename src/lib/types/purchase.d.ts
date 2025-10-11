declare type Teacher = {
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
  created_at: string;
  updated_at: string;
  image: string;
  thumbnail?: string | null;
  token: string | null;
  isVerified: boolean;
  academy: Academy;
  features: [];
};

// بيانات المنتج
declare type Product = {
  id: number;
  name: string;
  created_at: string;
  ended_at: string;
  product_id: number;
  product_type: string | null;
  product_section_id: number | null;
  product_name: string;
  description: string | null;
  content: string | null;
  price: number;
  product_thumbnail: string;
  product_image: string;
  image: string;
  thumbnail?: string | null;
  teacher: Teacher;
  section_id?: number;
};

// عملية الشراء نفسها
declare type StudentPurchase = {
  id: number;
  product_id: number;
  product_type: string | null;
  amount: number | null;
  currency: string | null;
  purchase_date: string;
  product: Product;
};
declare type MyPurchases = {
  lesson: Product[];
  bundle: Product[];
  exam: Product[];
  book: Product[];
};
// الـ Response كله
declare type StudentPurchaseResponse = {
  current_page: number;
  data: StudentPurchase[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
};
