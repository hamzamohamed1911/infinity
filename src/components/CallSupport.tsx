"use client";

import { LuMessageCircleQuestion } from "react-icons/lu";
import { FaWhatsapp, FaFacebookF, FaTelegramPlane } from "react-icons/fa";
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

const CallSupport = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="fixed z-50 lg:right-20 md:right-10 right-5 bottom-1/3 text-primary flex p-4 justify-center items-center text-2xl font-semibold bg-white shadow-xl gap-2 rounded-full transition-all hover:translate-y-1 duration-700">
          <span className="md:block hidden">كلم الدعم</span>
          <LuMessageCircleQuestion size={40} />
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center text-secondary">
            تواصل معنا عبر الوسائل التالية
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-start justify-start gap-4 py-6 text-center">
            <a
              href="https://wa.me/201234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-[#3187FF] underline"
            >
              <FaWhatsapp
                className="bg-green-600 text-white size-10 p-2 rounded-full"
                size={30}
              />{" "}
              01234567890
            </a>

            <a
              href="https://facebook.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-[#3187FF] underline"
            >
              <FaFacebookF
                className="bg-blue-600 text-white size-10 p-2 rounded-full"
                size={30}
              />{" "}
              Mr. Mai
            </a>

            <a
              href="https://t.me/yourtelegram"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-[#3187FF] underline"
            >
              <FaTelegramPlane className="bg-[#00B0F2] text-white size-10 p-2 rounded-full" />{" "}
              01234567890
            </a>
          </div>
        </div>

        <DialogFooter className="flex justify-center">
          <DialogClose asChild>
            <Button
              variant="default"
              className="text-white w-full hover:bg-primary-400 h-12 shadow-md  hover:shadow-lg text-xl"
            >
              تمام
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CallSupport;
