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
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

const ChangePasswordDialog = () => {
  const [showFields, setShowFields] = useState({
    oldpassword: false,
    password: false,
    passwordConfirmation: false,
  });
  const toggleFieldVisibility = (
    field: "password" | "passwordConfirmation" | "oldpassword"
  ) => {
    setShowFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-[#2087EE] underline">تغيير</button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center text-[#8E8E8E]">
            تغيير كلمة المرور
          </DialogTitle>
        </DialogHeader>
        <form>
          <div className="py-4 ">
            <div className="flex flex-col gap-3 text-[#606060] my-4 ">
              <div>
                <label className="text-lg font-medium block my-2">
                  كلمة المرور القديمة
                </label>
                <div className="relative">
                  <input
                    type={showFields.oldpassword ? "text" : "password"}
                    placeholder="أدخل كلمة المرور القديمة"
                    className="py-3 px-4 rounded-lg border-[1px] border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all text-right w-full"
                  />

                  <button
                    type="button"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary"
                    onClick={() => toggleFieldVisibility("oldpassword")}
                  >
                    {showFields.oldpassword ? (
                      <FaEye className="h-6 w-6" />
                    ) : (
                      <FaEyeSlash className="h-6 w-6" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label className="text-lg font-medium block my-2">
                  كلمة المرور الجديدة
                </label>
                <div className="relative">
                  <input
                    type={showFields.password ? "text" : "password"}
                    placeholder="أدخل كلمة المرور الجديدة"
                    className="py-3 px-4 rounded-lg border-[1px] border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all text-right w-full"
                  />

                  <button
                    type="button"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary"
                    onClick={() => toggleFieldVisibility("password")}
                  >
                    {showFields.password ? (
                      <FaEye className="h-6 w-6" />
                    ) : (
                      <FaEyeSlash className="h-6 w-6" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label className="text-lg font-medium block my-2">
                  تأكيد كلمة المرور
                </label>
                <div className="relative">
                  <input
                    type={showFields.passwordConfirmation ? "text" : "password"}
                    placeholder="تأكيد كلمة المرور"
                    className="py-3 px-4 rounded-lg border-[1px] border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all text-right w-full"
                  />
                  <button
                    type="button"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary"
                    onClick={() =>
                      toggleFieldVisibility("passwordConfirmation")
                    }
                  >
                    {showFields.passwordConfirmation ? (
                      <FaEye className="h-6 w-6" />
                    ) : (
                      <FaEyeSlash className="h-6 w-6" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="default"
              className="text-whitew-full hover:bg-primary-400 h-12 shadow-md  hover:shadow-lg text-xl"
              >
                تمام
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordDialog;
