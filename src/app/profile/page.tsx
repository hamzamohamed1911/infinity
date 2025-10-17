import { GetProfileData, GetStatistics } from "@/lib/apis/profile.api";
import ChangeSystemDialog from "./_profileComponents/ChangeSystemDialog";
import ChangePasswordDialog from "./_profileComponents/ChangePasswordDialog";
import ProfileSkeleton from "./_profileComponents/ProfileSkeleton";
import { Suspense } from "react";
import BarcodeDialog from "./_profileComponents/BarcodeDialog";
import ChangeOnlineDialog from "./_profileComponents/ChangeOnlineDialog";
import UnsubscripDialog from "./_profileComponents/UnsubscripDialog";
import UpdateImage from "./_profileComponents/UpdateImage";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { redirect } from "next/navigation";
import ProfileCharts from "./_profileComponents/ProfileCharts";
import { cookies } from "next/headers";

async function ProfileContent() {
  const cookieStore = await cookies();
  const selectedId = cookieStore.get("selected_course_id")?.value;

  if (!selectedId || selectedId === "undefined") {
    redirect("/my-classes");
    return;
  }
  const Statistics = await GetStatistics(selectedId);
  const dataList = [
    {
      value:
        (Statistics.data.lessons.sub / Statistics.data.lessons.total) * 100,
      total: Statistics.data.lessons.total,
      completed: Statistics.data.lessons.sub,
      color: "#AE5DEB",
      label: "عدد الدروس اللي درستها",
      type: "درس",
    },
    {
      value: (Statistics.data.books.sub / Statistics.data.books.total) * 100,
      total: Statistics.data.books.total,
      completed: Statistics.data.books.sub,
      color: "#769FE5",
      label: "عدد الكتب اللي حملتها",
      type: "كتاب",
    },
    {
      value: (Statistics.data.exams.sub / Statistics.data.exams.total) * 100,
      total: Statistics.data.exams.total,
      completed: Statistics.data.exams.sub,
      color: "#F39C12",
      label: "عدد الاختبارات اللي خلصتها",
      type: "اختبار",
    },
    {
      value:
        (Statistics.data.courses.sub / Statistics.data.courses.total) * 100,
      total: Statistics.data.courses.total,
      completed: Statistics.data.courses.sub,
      color: "#1ABC9C",
      label: "عدد الكورسات اللي سجلتها",
      type: "كورسات",
    },
    {
      value:
        (Statistics.data.homeWork.sub / Statistics.data.homeWork.total) * 100,
      total: Statistics.data.homeWork.total,
      completed: Statistics.data.homeWork.sub,
      color: "#00B8D9",
      label: "عدد الواجبات اللي سجلتها",
      type: "واجبات",
    },
  ];
  const Profile = await GetProfileData();
  const profileData =
    Profile && "data" in Profile ? Profile?.data?.profile : undefined;

  if (profileData?.status === "-") {
    redirect("/my-classes");
  }
  return (
    <section className="min-h-screen w-full text-neural-800">
      <h1 className="font-bold  md:text-4xl text-3xl  my-4">الملف الشخصي</h1>
      <div className="w-[80%] mx-auto bg-[#E8E8E8] h-[0.5px] my-8" />
      <div className="flex flex-col gap-6  my-8">
        <div className=" grid lg:grid-cols-12 grid-cols-2 gap-4">
          {profileData?.avatar && <UpdateImage imgUrl={profileData?.avatar} />}
          <div className="lg:col-span-8 col-span-2 flex md:flex-row flex-col gap-4">
            <div className="w-full  flex md:flex-col flex-col gap-4 justify-evenly">
              <div className="md:w-1/2 flex flex-col gap-2">
                <label className="md:text-lg text-base font-medium">
                  الاسم
                </label>
                <p className="font-semibold md:text-xl text-lg">
                  {profileData?.name}
                </p>
              </div>
              <div className="md:w-1/2 flex flex-col gap-2">
                <label className="md:text-lg text-base font-medium whitespace-nowrap">
                  البريد الالكتروني
                </label>
                <p className="font-semibold md:text-xl text-lg">
                  {profileData?.email}
                </p>
              </div>
            </div>
            <div className="w-full flex md:flex-col flex-col gap-4 justify-evenly">
              <div className="md:w-1/2 flex flex-col gap-2">
                <label className="md:text-lg text-basefont-medium whitespace-nowrap">
                  رقم هاتف الطالب
                </label>
                <p className="font-semibold md:text-xl text-lg">
                  {profileData?.phone}
                </p>
              </div>
              <div className="md:w-1/2 flex flex-col gap-2">
                <label className="md:text-lg text-basefont-medium whitespace-nowrap">
                  رقم هاتف ولي الأمر
                </label>
                <p className="font-semibold md:text-xl text-lg">
                  {" "}
                  {profileData?.parent_phone}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-4 justify-between">
          <div className="w-1/2 flex flex-col gap-2">
            <div className="lg:text-lg text-base font-medium flex gap-2">
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

        <div className=" flex flex-col gap-2">
          <div className="md:text-lg text-base font-medium flex gap-2 shrink-0">
            كلمة السر
            <ChangePasswordDialog />
          </div>
          <span className=" font-semibold md:text-xl text-lg">********</span>
        </div>
      </div>
      <h1 className="font-bold  md:text-4xl text-3xl  my-4">الاحصائيات </h1>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 ">
        {dataList.map((item, index) => (
          <ProfileCharts key={index} {...item} />
        ))}
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
