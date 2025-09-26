"use client";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"; // shadcn/ui dialog
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import FawryForm from "./FawryForm";
import VisaForm from "./VisaForm";
import CodeForm from "./CodeForm";
import WalletForm from "./WalletForm";

interface DialogTabsProps {
  model_type: string;
  model_id: string | number;
  name?: string;
}
const PaymentDialog = ({ model_type, model_id, name }: DialogTabsProps) => {
  return (
    <DialogContent className="md:max-w-3xl max-w-[90%]">
      <DialogHeader className="text-center w-full flex justify-center items-center gap-4">
        <DialogTitle>اختيار وسيلة الدفع</DialogTitle>
        <DialogDescription className="flex flex-col gap-2 ">
          {model_type && (
            <span className="text-center">النوع: {model_type}</span>
          )}

          <span className="truncate">{name || model_id}</span>
        </DialogDescription>
      </DialogHeader>

      <Tabs dir="rtl" defaultValue="fawry" className="w-full">
        <TabsList className="w-full grid grid-cols-4 gap-2 bg-transparent h-18 p-3 rounded-md overflow-x-auto">
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
            <FawryForm model_type={model_type} model_id={model_id} />
          </TabsContent>
          <TabsContent value="visa">
            <VisaForm model_type={model_type} model_id={model_id} />
          </TabsContent>
          <TabsContent value="code">
            <CodeForm model_type={model_type} model_id={model_id} />
          </TabsContent>
          <TabsContent value="wallet">
            <WalletForm model_type={model_type} model_id={model_id} />
          </TabsContent>
        </div>
      </Tabs>
    </DialogContent>
  );
};

export default PaymentDialog;
