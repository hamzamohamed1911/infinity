// Main Exam type
declare type ExamDetails = {
  section_id?: number;
  lesson_id?: number;
  id: number;
  name: string;
  description: string | null;
  show_dates_and_times: number;
  start_date: string;
  end_date: string;
  period: number;
  remaining_period: number;
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
  assessment_type: string;
  questions: Question[];
  questions_count: number;
  user_exams_retries: UserExamRetry[];
  answers: QuestionAnswer[];
  questions: Question[];
  is_attempted: boolean;
  image?: string;
  section_name: string;
};
// السؤال الواحد
declare type Question = {
  id: number;
  title: string;
  type_id: string;
  url: string | null;
  degree: number;
  category_id: number | null;
  description: string | null;
  options?: Option[];
  sub_questions?: Question[];
};
declare type UserExamRetry = {
  id: number;
  started_at: string;
  ended_at: string;
  final_grade: number;
  is_success: number;
  message: string;
};
declare type Option = {
  id: number;
  title: string;
  is_correct?: boolean;
  url: string | null;
};
type SaveAnswerPayload = {
  answer: {
    question_id: number;
    question_type: string;
    answer: string | number;
    url?: string;
  };
};

declare type QuestionAnswer = {
  question_id: number;
  question_type: "text" | "radio" | string;
  answer: string | number;
  url?: string;
};
declare type Question = {
  id: number;
  title: string;
  url?: string;
  type_id: string;
  options?: Option[];
};
