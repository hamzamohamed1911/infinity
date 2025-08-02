declare interface SubLesson {
  id: number;
  lesson_id: number | null;
  name: string;
  video_provider: string;
  encrypted_video_url: string;
  encrypted_url: string;
  encrypted_embed_url: string;
}

declare interface Attachment {
  id: number;
  name: string;
  file_url: string;
}

declare interface Video {
  id: number;
  title: string;
  url: string;
  provider: string;
}

declare interface Url {
  id: number;
  label: string;
  link: string;
}

declare interface Quiz {
  id: number;
}

declare interface LessonDetails {
  id: number;
  name: string;
  video_provider: string;
  encrypted_video_link: string;
  web_video_provider: string;
  vimeo_id: string | null;
  video_killer_id: string | null;
  google_drive: string | null;
  google_drive_id: string | null;
  price: number | null;
  price2: number | null;
  start_date: string | null;
  end_date: string | null;
  content: string | null;
  course: string;
  teacher: string;
  available_today: boolean;
  remaining_days: number;
  booking_status: number;
  exceed_percentage: number;
  views: number;
  remaining_views: number;
  sub_lessons: SubLesson[];
  discount: number;
  thumbnail: string;
  image: string;
  attachments: Attachment[];
  videos: Video[];
  urls: Url[];
  quiz: Quiz;
  enable_video: number;
  enable_assessments: number;

  // 👇 علشان ازرار المحاضرة السابقة والتالية
  next_lesson_id?: number | null;
  prev_lesson_id?: number | null;
}
