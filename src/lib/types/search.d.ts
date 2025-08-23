declare type SearchApiData = {
  lessons: Lesson[];
  bundles: Bundle[];
  exams: Exam[];
  units: Unit[];
}

declare type Lesson ={
  id: number;
  name: string;
  booking_status?: number;
  price?: number | string | null;
  discount?: number | null;
  description?: string | null;
  attachments?: string[];
  display_mode?: string;
  is_purchased_before?: boolean;
  is_viewed?: boolean;
}

declare type Bundle = {
  id: number;
  name: string;
  booking_status: number;
  price: string;
  thumbnail: string;
  exams: Exam[];
  books: []; // لو عندك الـ structure بتاع الكتب عرفها هنا
  lessons: Pick<Lesson, "id" | "name">[];
  display_mode: string;
  is_purchased_before: boolean;
}

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
  available_exam_message: string;
  paid_exam: number;
  degree: number;
  user_degree: number | null;
  min_grade: number;
  assessment_type: string;
  questions: [];
  questions_count: number;
  user_exams_retries: [];
  answers: [];
  is_attempted: boolean;
}

declare type Unit ={
  id: number;
  name: string;
  booking_status: number;
  price: string;
  lessons: Lesson[];
  description: string;
  lessons_count: number;
  image: string | null;
  exams_count: number;
  homeworks_count: number;
}
