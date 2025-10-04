"use client";

import { FaWhatsapp, FaFacebookF, FaTelegramPlane } from "react-icons/fa";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const CallSupport = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="fixed z-50 lg:left-20 md:left-10 left-5 bottom-20 text-primary flex p-4 justify-center items-center text-2xl font-semibold bg-white shadow-xl gap-2 rounded-full transition-all hover:translate-y-1 duration-700">
          تواصل معنا
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl rounded-xl max-h-[95%] overflow-auto">
        <div className="grid grid-cols-2 2xl:gap-8 md:gap-6 gap-4">
          <div className="flex flex-col items-start justify-start gap-4 py-4 ">
            <h2 className="text-lg font-bold  text-[#8E8E8E]">دعم المدرس</h2>
            <p className=" text-md font-semibold  text-neural-800">
              ممكن تتواصل مع المدرس من هنا!
            </p>
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
          <div className="flex flex-col items-start justify-start gap-4 py-4 ">
            <h2 className="text-lg font-bold  text-[#8E8E8E]">تيم السنتر</h2>

            <p className=" text-md font-semibold  text-neural-800">
              كلم تيم السنتر من هنا
            </p>
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
        <div className="grid grid-cols-2 2xl:gap-10 md:gap-6 gap-4">
          <div className="flex flex-col items-start justify-start gap-4 py-4 ">
            <h2 className="text-lg font-bold  text-[#8E8E8E]">
              دعم الفني للمنصة
            </h2>
            <p className=" text-md font-semibold  text-neural-800">
              لو عندك مشكلة فنية تقدر تتواصل مع الفريق التقني من هنا
            </p>
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
          <div className="flex flex-col items-start justify-start gap-4 py-4 ">
            <h2 className="text-lg font-bold  text-[#8E8E8E]">
              فريق الاونلاين
            </h2>
            <p className=" text-md font-semibold  text-neural-800">
              ممكن تتواصل مع فريق الاونلاين من هنا!
            </p>
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
