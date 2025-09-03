


//statistcs.d.ts
declare type  ExamReport = {
  id: number;
  exam_id: number;
  user_id: number;
  ended_at: string;
  final_grade: number;
  is_success: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  exam_name: string;
  exam_start_date: string;
  exam_end_date: string;
};

declare type  ApiResponse = {
  current_page: number;
  data: ExamReport[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: { url: string | null; label: string; active: boolean }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
};
