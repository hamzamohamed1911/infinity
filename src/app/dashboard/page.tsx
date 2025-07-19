import { GetProfileData } from "@/lib/apis/profile.api";
import DashboardTabs from "./_dashboardComponents/DashboardTabs";

export default async function page() {
  const Profile = await GetProfileData();
  const profileData =
    Profile && "data" in Profile ? Profile.data.profile : undefined;
  return (
    <section>
      <h1 className="font-bold md:text-4xl text-3xl text-secondary my-4">
        {profileData?.classroom_name}
      </h1>

      <DashboardTabs />
    </section>
  );
}
