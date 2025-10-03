// landing.d.ts
export interface MobileConfig {
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

export type HeroConfig = {
  desc: string;
  title: string;
  active: string;
  courses_count: string;
  students_count: string;
};

export interface AboutConfig {
  desc: string;
  title: string;
  active: string;
}

export interface VideoConfig {
  desc: string;
  link: string;
  title: string;
  active: string;
}

export interface FooterConfig {
  active: string;
}

export interface HeaderConfig {
  email: string | null;
  phone: string | null;
  active: string;
  book_store: string;
  twitter_link: string | null;
  youtube_link: string | null;
  facebook_link: string | null;
  linkedin_link: string | null;
  instagram_link: string | null;
}

export interface CoursesConfig {
  desc: string;
  title: string;
  active: string;
}

declare type WebConfig = {
  hero: HeroConfig;
  about: AboutConfig;
  theme: string;
  video: VideoConfig;
  footer: FooterConfig;
  header: HeaderConfig;
  courses: CoursesConfig;
  general: {
    primary_color: string;
    secondary_color: string;
  };
};

export interface Academy {
  id: number;
  name: string;
  subdomain: string;
  logo: string;
  desc: string;
  mobile_config: MobileConfig;
  web_config: WebConfig;
}
export type Product = {
  id: number;
  name: string;
  description?: string | null;
  content?: string | null;
  price?: string | number | null;
  discount?: string | number | null;
  image?: string | null;
  thumbnail?: string | null;
  type?: string;
};
export type ProductsResponse = {
  lessons: Product[];
  exams: Product[];
  bundles: Product[];
  books: Product[];
};
export interface TopStudent {
  id: number;
  name: string;
  description: string;
  image: string;
  grade: string;
  teacher_id: number;
  active: 0 | 1;
  order: number;
  created_at: string;
  updated_at: string;
}

declare type LandingPageData = {
  id: number;
  name: string;
  email: string | null;
  rank: string | null;
  national_id: string | null;
  sticky: string | null;
  sub_subject_id: string | null;
  code: string;
  image: string;
  top_student: TopStudent[];
  academy: Academy;
  classes: classes[];
  courses: CourseDetails[];
  products: ProductsResponse;
};
export interface classes {
  id: number;
  name: string;
  description: string | null;
  content: string | null;
  price: string | null | number;
  image: string | null;
  thumbnail: string | null;
}
export interface LandingPageResponse {
  data: LandingPageData;
  success: boolean;
  message: string | null;
  errors: null;
  status: number;
}
