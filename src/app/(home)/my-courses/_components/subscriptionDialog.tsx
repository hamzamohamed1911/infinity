"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

type Teacher = {
  id: number;
  name: string;
  code: string;
  image: string;
  subscribed: boolean;
  subscrip_type: number;
  subscrip_status: number;
};

interface SubscriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teacher: Teacher | null;
}

const SubscriptionDialog: React.FC<SubscriptionDialogProps> = ({
  open,
  onOpenChange,
  teacher,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">تفاصيل الاشتراك</DialogTitle>
        </DialogHeader>

        {teacher && (
          <Tabs defaultValue="online" className="w-full">
            <TabsList className="grid grid-cols-2 w-full mb-4 bg-transparent shadow-none p-0">
              <TabsTrigger
                value="online"
                className="
      bg-transparent
      data-[state=active]:bg-transparent
      data-[state=active]:text-primary-500
      data-[state=active]:font-bold
      font-semibold
      shadow-none
      ring-0
    "
              >
                نظام الاونلاين
              </TabsTrigger>

              <TabsTrigger
                value="center"
                className="
      bg-transparent
      data-[state=active]:bg-transparent
      data-[state=active]:text-primary-500
      data-[state=active]:font-bold
      font-semibold
      shadow-none
      ring-0
    "
              >
                نظام السنتر
              </TabsTrigger>
            </TabsList>

            <TabsContent value="online">
              <div className="space-y-4 text-center">
                <p>أنت على وشك الاشتراك أونلاين مع {teacher.name}</p>
                <Button className="text-white w-full bg-primary-500 hover:bg-primary-400 h-10 shadow-md  hover:shadow-lg text-xl">
                  تأكيد الاشتراك أونلاين
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="center">
              <div className="space-y-4 text-center">
                <p>يمكنك الاشتراك من خلال مراكزنا</p>
                <Button className="text-white w-full bg-primary-500 hover:bg-primary-400 h-10 shadow-md  hover:shadow-lg text-xl">
                  عرض المراكز
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionDialog;
