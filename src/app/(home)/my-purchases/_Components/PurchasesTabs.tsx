import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function PurchasesTabs() {
  return (
    < >
      <div className="sm:hidden h-full">
        <Select dir="rtl" defaultValue="all">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="اختر القسم" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">الكل</SelectItem>
            <SelectItem value="recent">آخر المشاهدات</SelectItem>
            <SelectItem value="ending">هتخلص قريب</SelectItem>
            <SelectItem value="deadlines">ديدلاينز</SelectItem>
          </SelectContent>
        </Select>
      </div>

       <Tabs dir="rtl" defaultValue="all" className="w-full my-8 !hidden sm:block">
      <TabsList
        className="w-full bg-transparent gap-2 
      grid-cols-4 lg:grid sm:flex overflo-x-auto  whitespace-nowrap"
      >
        <TabsTrigger
          value="all"
          className="data-[state=active]:bg-primary lg:text-xl md:text-lg text-sm data-[state=active]:text-white bg-white text-[#606060] rounded-md py-2"
        >
          الكل
        </TabsTrigger>
        <TabsTrigger
          value="recent"
          className="data-[state=active]:bg-primary lg:text-xl md:text-lg text-sm data-[state=active]:text-white bg-white text-[#606060] rounded-md py-2"
        >
          آخر المشاهدات
        </TabsTrigger>
        <TabsTrigger
          value="ending"
          className="data-[state=active]:bg-primary lg:text-xl md:text-lg text-sm data-[state=active]:text-white bg-white text-[#606060] rounded-md py-2"
        >
          هتخلص قريب
        </TabsTrigger>
        <TabsTrigger
          value="deadlines"
          className="data-[state=active]:bg-primary lg:text-xl md:text-lg text-sm data-[state=active]:text-white bg-white text-[#606060] rounded-md py-2"
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
    </>
  )
}
