// lib/server/getServerWebConfig.ts
import { getWebConfig } from "@/lib/apis/webconfig.api";
// types/webconfig.ts
export interface WebConfigResponse {
  data: {
    id: number;
    name: string;
    subdomain: string;
    logo: string;
    desc: string;
    details: {
      support_phone: string;
      center_team_phone: string;
      online_team_phone: string;
      scientific_support_phone: string;
    };
    settings: {
      options: string[];
      show_mode: string | null;
      wallet_code_img: string;
      welcome_message: string;
      curriculum_label: string;
      instructor_label: string;
      another_phone_label: string;
      wallet_code_background: string;
    };
    mobile_config: {
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
    };
    web_config: {
      theme: string;
      hero: {
        desc: string;
        title: string;
        active: string;
        courses_count: string;
        students_count: string;
      };
      about: {
        desc: string;
        title: string;
        active: string;
      };
      video: {
        desc: string;
        title: string;
        link: string;
        active: string;
      };
      footer: {
        active: string;
      };
      header: {
        email: string;
        phone: string;
        active: string;
        book_store: string;
        twitter_link: string;
        youtube_link: string;
        facebook_link: string;
        linkedin_link: string;
        instagram_link: string;
      };
      courses: {
        desc: string;
        title: string;
        active: string;
      };
      general: {
        primary_color: string;
        secondary_color: string;
      };
    };
  };
  version: string;
  success: boolean;
  status: number;
}

export async function getServerWebConfig(): Promise<WebConfigResponse["data"]> {
  try {
    const res = await getWebConfig();
    const data = res?.data as WebConfigResponse["data"];
    return data;
  } catch (error) {
    console.error("❌ Failed to fetch web config:", error);
    throw new Error("Failed to fetch web config");
  }
}
