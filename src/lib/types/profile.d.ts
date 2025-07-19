// profile.d.ts
declare type UserProfile = {
  name: string;
  code: string;
  wallet: number;
  gender: "m" | "f";
  email: string;
  type: string; 
  phone: string;
  classroom_name: string;
  avatar: string | null;
}

type ProfileApiData = {
  profile: UserProfile;
  facebook_link: string | null;
  youtube_link: string | null;
  quizzes: unknown[]; // عدّلهم لو عندك type
  assignments: unknown[];
};
