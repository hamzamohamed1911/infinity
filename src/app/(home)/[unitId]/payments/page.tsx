import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import FawryForm from "./_components/FawryForm";
import VisaForm from "./_components/VisaForm";
import CodeForm from "./_components/CodeForm";
import WalletForm from "./_components/WalletForm";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { CourseDetails } from "../../../../../public";
import { BiBookContent } from "react-icons/bi";
import { MdEditNote, MdOndemandVideo } from "react-icons/md";

const page = () => {
  return (
    <section className="grid lg:grid-cols-12 grid-cols-1 md:gap-6 gap-4 my-8 ">
      <Tabs dir="rtl" defaultValue="fawry" className="w-full  col-span-7 md:order-1 order-2 ">
        <TabsList
          className="w-full  gap-2 
            grid-cols-4 md:grid flex  overflo-x-auto  whitespace-nowrap bg-transparent h-18  p-3 rounded-md overflow-x-auto"
        >
          <TabsTrigger
            value="fawry"
            className="data-[state=active]:bg-primary lg:text-xl md:text-lg text-sm data-[state=active]:text-white bg-white text-[#606060] rounded-md py-3"
          >
            فورى
          </TabsTrigger>
          <TabsTrigger
            value="visa"
            className="data-[state=active]:bg-primary lg:text-xl md:text-lg text-sm data-[state=active]:text-white bg-white text-[#606060] rounded-md py-3"
          >
            فيزا
          </TabsTrigger>
          <TabsTrigger
            value="code"
            className="data-[state=active]:bg-primary lg:text-xl md:text-lg text-sm data-[state=active]:text-white bg-white text-[#606060] rounded-md py-3"
          >
            اكواد
          </TabsTrigger>
          <TabsTrigger
            value="wallet"
            className="data-[state=active]:bg-primary lg:text-xl md:text-lg text-sm data-[state=active]:text-white bg-white text-[#606060] rounded-md py-3"
          >
            محافظ الكترونية
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="fawry">
            <FawryForm />
          </TabsContent>
          <TabsContent value="visa">
            <VisaForm />
          </TabsContent>
          <TabsContent value="code">
            <CodeForm />
          </TabsContent>
          <TabsContent value="wallet">
            <WalletForm />
          </TabsContent>
        </div>
      </Tabs>
      <div className="w-full col-span-5 bg-[#408BFC0D] rounded-[30px]  md:order-2 order-1">
        <div className="lg:m-8 md:m-6 m-4 justify-center flex flex-col  gap-4">
          <Card className=" rounded-[8px] shadow-none h-full">
            <CardContent className="m-0 p-0 grid md:grid-cols-12 grid-cols-1 justify-between">
              <div className="md:col-span-8 col-span-1 p-4 flex flex-col gap-2 justify-start md:order-1 order-2">
                <h2 className="font-semibold text-[16px] text-[#606060]">
                  عرض الترم الأول
                </h2>
                <span className="flex gap-2 justify-start items-center">
                  <BiBookContent />4 واجبات
                </span>
                <span className="flex gap-2 justify-start items-center">
                  <MdEditNote />4 إمتحانات
                </span>
                <span className="flex gap-2 justify-start items-center">
                  <MdOndemandVideo />
                  23 فيديو
                </span>
                <div className="flex gap-2 justify-start  items-center">
                  <span> صلاحية الامتحان :</span> <p>30/12/2025</p>
                </div>
              </div>

              <div className="md:col-span-4 col-span-1 relative h-[200px] md:h-auto w-full md:rounded-l-[8px] rounded-l-none md:order-2 order-1">
                <Image
                  src={CourseDetails}
                  alt="course details"
                  fill
                  className="object-cover"
                />
              </div>
            </CardContent>
          </Card>
          <Card className=" rounded-[8px] p-4 h-full">
            <h2 className="text-[16px] text-[#606060] ">تفاصيل الدفع</h2>
            <Separator className="my-4" />
            <div className="flex flex-col gap-4 text-[#606060]">
              <span className="flex justify-between">
                <span>عرض الترم الأول</span>
                <span className=" font-semibold">68.00 EGP</span>
              </span>
              <span className="flex justify-between">
                <span>تخفيض</span>
                <span className=" font-semibold">-8.00 EGP</span>
              </span>
              <span className="flex justify-between">
                <span>إجمالي</span>
                <span className=" font-semibold">68.00 EGP </span>
              </span>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default page;
