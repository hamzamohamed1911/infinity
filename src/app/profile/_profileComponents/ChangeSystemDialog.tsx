"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ChangeSystemDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-[#2087EE] underline">تغيير</button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-start text-secondary mt-2">
            خد بالك!
          </DialogTitle>
        </DialogHeader>
        <div className="my-2 text-center">
          <p className="text-secondary text-md font-semibold  text-start">
            {" "}
            انت دلوقتي هتغير نظامك من{" "}
            <span className="text-[#509319] ">السنتر</span> لنظام{" "}
            <span className="text-[#509319] ">الأونلاين</span>{" "}
          </p>
          {/* محتوى تغيير النظام */}
        </div>
        <DialogFooter className="w-full flex gap-2">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="!text-primary w-full h-10 "
            >
              إلغاء
            </Button>
          </DialogClose>
          <Button
            variant="default"
            className="text-white h-10 shadow-md  w-full"
          >
            متباعة
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeSystemDialog;
