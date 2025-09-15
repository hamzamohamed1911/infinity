/* eslint-disable @typescript-eslint/no-unused-vars */
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import FawryForm from "./_components/FawryForm";
import VisaForm from "./_components/VisaForm";
import CodeForm from "./_components/CodeForm";
import WalletForm from "./_components/WalletForm";

const page = () => {
  return (
    <section className="grid lg:grid-cols-12 grid-cols-1 md:gap-6 gap-4 my-8 ">
      <Tabs
        dir="rtl"
        defaultValue="fawry"
        className="w-full  col-span-7 md:order-1 order-2 "
      >
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
          <TabsContent value="fawry">{/* <FawryForm /> */}</TabsContent>
          <TabsContent value="visa">{/* <VisaForm /> */}</TabsContent>
          <TabsContent value="code">{/* <CodeForm /> */}</TabsContent>
          <TabsContent value="wallet">{/* <WalletForm /> */}</TabsContent>
        </div>
      </Tabs>
    </section>
  );
};

export default page;
