"use client";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"; 

export default function DashboardTabs() {
  return (
    <Tabs dir="rtl" defaultValue="all" className="w-full">
      <TabsList className="grid grid-cols-4 w-full bg-transparent gap-2">
        <TabsTrigger
          value="all"
          className="data-[state=active]:bg-primary text-xl data-[state=active]:text-white bg-white text-secondary rounded-md py-2"
        >
          الكل
        </TabsTrigger>
            <TabsTrigger
          value="recent"
          className="data-[state=active]:bg-primary text-xl data-[state=active]:text-white bg-white text-secondary rounded-md py-2"
        >
          آخر المشاهدات
        </TabsTrigger>
        <TabsTrigger
          value="ending"
          className="data-[state=active]:bg-primary text-xl data-[state=active]:text-white bg-white text-secondary rounded-md py-2"
        >
          هتخلص قريب
        </TabsTrigger>
    
        <TabsTrigger
          value="deadlines"
          className="data-[state=active]:bg-primary text-xl data-[state=active]:text-white bg-white text-secondary rounded-md py-2"
        >
          ديدلاينز
        </TabsTrigger>
      </TabsList>

      <div className="mt-6">
        <TabsContent value="all">محتوى الكل</TabsContent>
        <TabsContent value="ending">محتوى هتخلص قريب</TabsContent>
        <TabsContent value="recent">محتوى آخر المشاهدات</TabsContent>
        <TabsContent value="deadlines">محتوى ديدلاينز</TabsContent>
      </div>
    </Tabs>
  );
}
