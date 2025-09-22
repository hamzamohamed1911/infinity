import { GetProfileData } from "@/lib/apis/profile.api";
import ChangeSystemDialog from "./_profileComponents/ChangeSystemDialog";
import ChangePasswordDialog from "./_profileComponents/ChangePasswordDialog";
import ProfileSkeleton from "./_profileComponents/ProfileSkeleton";
import { Suspense } from "react";
import BarcodeDialog from "./_profileComponents/BarcodeDialog";
import ChangeOnlineDialog from "./_profileComponents/ChangeOnlineDialog";
import UnsubscripDialog from "./_profileComponents/UnsubscripDialog";
import UpdateImage from "./_profileComponents/UpdateImage";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

async function ProfileContent() {
  const Profile = await GetProfileData();
  const profileData =
    Profile && "data" in Profile ? Profile?.data?.profile : undefined;
  return (
    <section className="min-h-screen w-full text-[#606060]">
      <h1 className="font-bold  md:text-4xl text-3xl  my-4">الملف الشخصي</h1>
      <div className="w-[80%] mx-auto bg-[#E8E8E8] h-[0.5px] my-8" />
      <div className="flex flex-col gap-6  my-8">
        {profileData?.avatar && <UpdateImage imgUrl={profileData?.avatar} />}

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
              {profileData?.status === "1" || profileData?.status === "2"
                ? "نظامك"
                : "اختر نظامك"}
              {profileData?.status === "-" ? (
                <>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="text-[#2087EE] underline">
                        السنتر
                      </button>
                    </DialogTrigger>
                    <ChangeOnlineDialog />
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="text-[#2087EE] underline">
                        الأونلاين
                      </button>
                    </DialogTrigger>
                    <ChangeSystemDialog />
                  </Dialog>
                </>
              ) : profileData?.status === "1" || profileData?.status === "2" ? (
                <UnsubscripDialog />
              ) : (
                " غير مشترك "
              )}
            </div>
            <span className="text-secondary-500 font-semibold md:text-xl text-lg">
              {profileData?.status === "1"
                ? "أونلاين"
                : profileData?.status === "2"
                ? "سنتر"
                : "غير مشترك"}
            </span>
          </div>
          {profileData?.code && (
            <BarcodeDialog code={profileData?.code || ""} />
          )}
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
            <p className="font-semibold md:text-xl text-lg">
              {" "}
              {profileData?.parent_phone}
            </p>
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
