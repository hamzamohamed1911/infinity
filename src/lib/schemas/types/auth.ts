import { User, Session } from "next-auth";

interface MobileConfig {
  academy_name: string;
  app_name: string;
  primary_color: string;
  secondary_color: string;
  background_color: string;
  tap_button_color: string;
  support_phone: string;
  academy_logo: string | null;
  logo: string | null;
  privacy_policy: string;
}

export interface Academy {
  id: number;
  name: string;
  subdomain: string;
  logo: string | null;
  desc: string;
  mobile_config: MobileConfig;
  settings: {
    curriculum_label: string;
    another_phone_label?: string;
  };
}
// نوع مخصص للـ User
export interface CustomUser extends User {
  id: string;
  phone: string;
  name?: string | null;
  email?: string | null;
  wallet?: number | null;
  device_id?: string | null;
  national_id?: string | null;
  token: string;
  academy?: Academy;
}

// نوع مخصص للـ Session
export interface CustomSession extends Session {
  user: {
    id: string;
    phone: string;
    name?: string | null;
    email?: string | null;
    wallet?: number | null;
    device_id?: string | null;
    national_id?: string | null;
    token: string;
    academy?: Academy;
  };
}
