 interface Teacher {
  id: number;
  name: string;
  email: string;
  image: string;
  national_id: string | null;
  code: string;
  blocked: boolean;
  rank: string | null;
  sticky: string | null;
  sub_subject_id: string | null;
  subscribed: boolean;
  subscrip_status: number;
  subscrip_type: number;
  features: {
    platform: boolean;
    center: boolean;
    book_store: boolean;
    question_bank: boolean;
    personal_assistant: boolean;
    [key: string]: boolean;
  };
}
 interface TeachersResponse {
  data: Teacher[];
  success: boolean;
  status: number;
  message: string | null;
  errors: null;
}
