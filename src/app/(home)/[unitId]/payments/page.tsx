import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import FawryForm from "./_components/FawryForm";
import VisaForm from "./_components/VisaForm";
import CodeForm from "./_components/CodeForm";
import WalletForm from "./_components/WalletForm";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const page = () => {
  return (
    <div className="grid grid-cols-12 md:gap-6 gap-4 my-8">
      <Tabs dir="rtl" defaultValue="fawry" className="w-full  col-span-7">
        <TabsList
          className="w-full  gap-2 
            grid-cols-4 grid  overflo-x-auto  whitespace-nowrap bg-transparent h-18  p-3 rounded-md"
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
      <div className="w-full col-span-5 bg-[#408BFC0D] rounded-[30px]  ">
        <div className="m-8 flex flex-col  gap-4">
          <Card className=" rounded-[8px] p-4">test</Card>
          <Card className=" rounded-[8px] p-4">
            <h2 className="text-xl text-[#606060] ">تفاصيل الدفع</h2>
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
    </div>
  );
};

export default page;
