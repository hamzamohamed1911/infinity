declare type Attachment = string;

declare type Lesson = {
  id: number;
  name: string;
  booking_status: number;
  price: number | string | null;
  sticky: string | number | null;
  description: string | null;
  attachments: Attachment[];
  display_mode: string;
  is_purchased_before: boolean;
  thumbnail?: string;
  image?: string;
  section_id?: number;
};

declare type Section = {
  id: number;
  name: string;
  booking_status: number;
  price: string;
  lessons: Lesson[];
  description: string | null;
};
declare type Book = {
  id: number;
  image?: string;
  name: string;
  price: number;
  description: string | null;
  photo: string;
  link: string;
};
declare type BundleLesson = {
  id: number;
  name: string;
};

declare type Exam = {
  id: number;
  name: string;
  description: string | null;
  show_dates_and_times: number;
  start_date: string;
  end_date: string;
  period: number | null;
  remaining_period: number | null;
  retries: number;
  price: string;
  show_mark: number;
  show_answers: number;
  show_correct_answer: number;
  show_help_tools: number;
  available_exam: number;
  available_exam_message: string | null;
  paid_exam: number;
  degree: number;
  user_degree: number | null;
  min_grade: number;
  image: string;
  assessment_type: string;
  questions: unknown[];
  questions_count: number;
  user_exams_retries: unknown[];
  answers: unknown[];
  is_new_homework?: boolean;
  section_id?: number;
};

declare type Bundle = {
  id: number;
  name: string;
  description?: string;
  booking_status: number;
  price: string;
  thumbnail: string;
  exams: Exam[];
  books: Book[];
  lessons: BundleLesson[];
  display_mode: string;
  is_purchased_before: boolean;
};

declare type CourseType = {
  id: number;
  discount?: number;
  price?: number;
  name: string;
  featured: number;
  sticky: unknown;
  teacher: string;
  description: string | null;
  encrypted_video_link: string;
  encrypted_youtube_link: string;
  image: string;
  sections: Section[];
  books: Book[];
  bundles: Bundle[];
  quizzes: unknown[];
  thumbnail?: string;
  exams?: exam[];
  lessons?: Lesson[];
  is_purchased_before: boolean;
};
declare type Lesson = {
  id: number;
  name: string;
  booking_status: number;
  price: number | string | null;
  discount: number | null;
  description: string | null;
  attachments: unknown[];
  display_mode: string;
  is_purchased_before: boolean;
};

declare type CourseDetails = {
  id: number;
  type?: string;
  section_id: number;
  name: string;
  booking_status: number;
  lessons: Lesson[];
  description: string | null;
  lessons_count: number;
  image: string | null;
  exams_count: number;
  homeworks_count: number;
  thumbnail?: string;
  price: number;
  price2: number;
  discount: number;
  available_today: boolean;
};
declare type UnitsD = {
  id: number;
  name: string;
  booking_status: number;
  price: string;
  lessons: Lesson[];
  description: string | null;
  lessons_count: number;
  exams_count: number;
  homeworks_count: number;
};
declare type BundleDetails = {
  id: number;
  name: string;
  booking_status: number;
  price: string;
  is_purchased_before?: boolean;
  lessons: Lesson[];
  books: Book[];
  description: string | null;
  lessons_count: number;
  image: string | null;
  exams: exam[];
  exams_count: number;
  homeworks_count: number;
  thumbnail?: string;
  type: string;
};
declare type LiveItem = {
  id: number;
  name: string;
  booking_status: number;
  price: number;
  discount: number;
  section_id: number;
  section_name: string;
  description?: string | null;
  attachments: unknown[];
  display_mode: string;
  is_purchased_before: boolean;
  is_viewed: boolean;
  live_link: string;
  image: string;
  thumbnail: string;
};
