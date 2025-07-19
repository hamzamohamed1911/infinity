import { GetProfileData } from "@/lib/apis/profile.api";
import ChangeSystemDialog from "./_profileComponents/ChangeSystemDialog";
import ChangePasswordDialog from "./_profileComponents/ChangePasswordDialog";
import ProfileSkeleton from "./_profileComponents/ProfileSkeleton";
import { Suspense } from "react";

async function ProfileContent() {
  const Profile = await GetProfileData();
  const profileData =
    Profile && "data" in Profile ? Profile.data.profile : undefined;
  return (
    <section className="min-h-screen w-full">
      <h1 className="font-bold md:text-4xl text-3xl text-secondary my-4">
        الملف الشخصي
      </h1>
      <div className="w-[80%] mx-auto bg-[#E8E8E8] h-[0.5px] my-8" />
      <div className="flex flex-col gap-6 text-secondary my-8">
        <div className="w-full flex md:flex-row flex-col gap-4 justify-between">
          <div className="md:w-1/2 flex flex-col gap-2">
            <label className="text-lg font-medium">الاسم</label>
            <p className="font-semibold md:text-xl text-lg">
              {profileData?.name}
            </p>
          </div>
          <div className="md:w-1/2 flex flex-col gap-2">
            <label className="text-lg font-medium"> البريد الالكتروني</label>
            <p className="font-semibold md:text-xl text-lg">
              {profileData?.email}
            </p>
          </div>
        </div>
        <div className="w-full flex md:flex-row flex-col gap-4 justify-between">
          <div className="md:w-1/2 flex flex-col gap-2">
            <div className="text-lg font-medium flex gap-2">
              نظامك <ChangeSystemDialog />
            </div>
            <span className="text-[#509319] font-semibold md:text-xl text-lg">
              أونلاين
            </span>
          </div>

          <div className="md:w-1/2 flex flex-col gap-2">
            <label className="text-lg font-medium">الباركود</label>
            <p className="font-semibold md:text-xl text-lg">
              {profileData?.code}
            </p>
          </div>
        </div>
        <div className="w-full flex md:flex-row flex-col gap-4 justify-between">
          <div className="md:w-1/2 flex flex-col gap-2">
            <label className="text-lg font-medium">رقم هاتف الطالب</label>
            <p className="font-semibold md:text-xl text-lg">
              {profileData?.phone}
            </p>
          </div>
          <div className="md:w-1/2 flex flex-col gap-2">
            <label className="text-lg font-medium">رقم هاتف ولي الأمر</label>
            <p className="font-semibold md:text-xl text-lg">3555556545</p>
          </div>
        </div>
        <div className=" flex flex-col gap-2">
          <div className="text-lg font-medium flex gap-2">
            كلمة السر
            <ChangePasswordDialog />
          </div>
          <span className=" font-semibold md:text-xl text-lg">********</span>
        </div>
      </div>
    </section>
  );
}

export default function page() {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfileContent />
    </Suspense>
  );
}
