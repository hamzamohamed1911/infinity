// profile.d.ts
declare type UserProfile = {
  name: string;
  code: string;
  wallet: number;
  gender: "m" | "f";
  status:string | undefined;
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
declare type Dclasses = {
  id: string; 
  name: string;
  rank: number | null; 
  description: string | null;
  content: string | null;
  thumbnail: string | null; 
  image: string | null;
  date: string | null;
};
declare type ChangePasswordPayload = {
  old_password: string;
  new_password: string;
  new_password_confirmation: string;
}