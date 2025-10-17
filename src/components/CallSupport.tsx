"use client";

import { FaWhatsapp } from "react-icons/fa";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/theme-context";

const CallSupport = () => {
  const { callSupport } = useTheme();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="fixed z-50 lg:left-20 md:left-10 left-5 lg:bottom-14 md:bottom-16 bottom-20 text-primary flex p-4 justify-center items-center text-2xl font-semibold bg-white shadow-xl gap-2 rounded-full transition-all hover:translate-y-1 duration-700">
          تواصل معنا
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl rounded-xl max-h-[95%] overflow-auto">
        <div className="grid grid-cols-2 2xl:gap-8 md:gap-6 gap-4">
          <div className="flex flex-col items-start justify-start gap-4 py-4">
            <h2 className="text-lg font-bold text-neural-600">دعم المدرس</h2>
            <p className="text-md font-semibold text-neural-800">
              ممكن تتواصل مع المدرس من هنا!
            </p>
            <a
              href={`https://wa.me/${callSupport.support_phone?.replace(
                "+",
                ""
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-[#3187FF] underline"
            >
              <FaWhatsapp className="bg-green-600 text-white size-10 p-2 rounded-full" />
              {callSupport.support_phone}
            </a>
          </div>

          {/* 🏫 تيم السنتر */}
          <div className="flex flex-col items-start justify-start gap-4 py-4">
            <h2 className="text-lg font-bold text-neural-600">تيم السنتر</h2>
            <p className="text-md font-semibold text-neural-800">
              كلم تيم السنتر من هنا
            </p>
            <a
              href={`https://wa.me/${callSupport.center_team_phone?.replace(
                "+",
                ""
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-[#3187FF] underline"
            >
              <FaWhatsapp className="bg-green-600 text-white size-10 p-2 rounded-full" />
              {callSupport.center_team_phone}
            </a>
          </div>
        </div>

        {/* ⚙️ الدعم الفني & 💻 الاونلاين */}
        <div className="grid grid-cols-2 2xl:gap-10 md:gap-6 gap-4">
          <div className="flex flex-col items-start justify-start gap-4 py-4">
            <h2 className="text-lg font-bold text-neural-600">الدعم الفني</h2>
            <p className="text-md font-semibold text-neural-800">
              لو عندك مشكلة فنية تقدر تتواصل مع الفريق التقني من هنا
            </p>
            <a
              href={`https://wa.me/${callSupport.scientific_support_phone?.replace(
                "+",
                ""
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-[#3187FF] underline"
            >
              <FaWhatsapp className="bg-green-600 text-white size-10 p-2 rounded-full" />
              {callSupport.scientific_support_phone}
            </a>
          </div>

          <div className="flex flex-col items-start justify-start gap-4 py-4">
            <h2 className="text-lg font-bold text-neural-600">
              فريق الأونلاين
            </h2>
            <p className="text-md font-semibold text-neural-800">
              ممكن تتواصل مع فريق الأونلاين من هنا!
            </p>
            <a
              href={`https://wa.me/${callSupport.online_team_phone?.replace(
                "+",
                ""
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-[#3187FF] underline"
            >
              <FaWhatsapp className="bg-green-600 text-white size-10 p-2 rounded-full" />
              {callSupport.online_team_phone}
            </a>
          </div>
        </div>

        <DialogFooter className="flex justify-center">
          <DialogClose asChild>
            <Button
              variant="default"
              className="text-white w-full hover:bg-primary-400 h-12 shadow-md hover:shadow-lg text-xl"
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
