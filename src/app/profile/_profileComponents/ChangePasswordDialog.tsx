"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { changePassword } from "@/lib/apis/profile.api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const changePasswordSchema = z
  .object({
    old_password: z.string().nonempty("كلمة المرور القديمة مطلوبة"),
    new_password: z
      .string()
      .min(8, "كلمة المرور الجديدة يجب أن تكون 8 أحرف على الأقل")
      .regex(/[A-Z]/, "يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل")
      .regex(/[a-z]/, "يجب أن تحتوي كلمة المرور على حرف صغير واحد على الأقل")
      .regex(/\d/, "يجب أن تحتوي كلمة المرور على رقم واحد على الأقل")
      .regex(/[^A-Za-z0-9]/, "يجب أن تحتوي كلمة المرور على رمز واحد على الأقل"),
    new_password_confirmation: z.string(),
  })
  .refine((data) => data.new_password === data.new_password_confirmation, {
    message: "كلمة المرور الجديدة وتأكيدها غير متطابقين",
    path: ["new_password_confirmation"],
  });

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

const ChangePasswordDialog = () => {
  const mutation = useMutation({
    mutationFn: (payload: ChangePasswordFormData) =>
      changePassword({
        ...payload,
        old_password: payload.old_password ?? "",
      }),
    onSuccess: () => {
      toast.success("تم تغيير كلمة المرور بنجاح ", {
        className: "!bg-primary !text-white ",
      });
      reset();
    },
    onError: (error: Error) => {
      toast.error(error.message || "حدث خطأ أثناء تغيير كلمة المرور", {
        className: "!bg-red-500 !text-white",
      });
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const [showFields, setShowFields] = useState({
    old_password: false,
    new_password: false,
    new_password_confirmation: false,
  });
  const toggleFieldVisibility = (
    field: "new_password" | "new_password_confirmation" | "old_password"
  ) => {
    setShowFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };
  const onSubmit = (data: ChangePasswordFormData) => {
    mutation.mutate(data);
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="py-4 ">
            <div className="flex flex-col gap-3 text-[#606060] my-4 ">
              <div>
                <label className="text-lg font-medium block my-2">
                  كلمة المرور القديمة
                </label>
                <div className="relative">
                  <input
                    type={showFields.old_password ? "text" : "password"}
                    {...register("old_password")}
                    placeholder="أدخل كلمة المرور القديمة"
                    className="py-3 px-4 rounded-lg border-[1px] border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all text-right w-full"
                  />

                  <button
                    type="button"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary"
                    onClick={() => toggleFieldVisibility("old_password")}
                  >
                    {showFields.old_password ? (
                      <FaEye className="h-6 w-6" />
                    ) : (
                      <FaEyeSlash className="h-6 w-6" />
                    )}
                  </button>
                </div>
              </div>
              {errors.old_password && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.old_password.message}
                </p>
              )}
              <div>
                <label className="text-lg font-medium block my-2">
                  كلمة المرور الجديدة
                </label>
                <div className="relative">
                  <input
                    type={showFields.new_password ? "text" : "password"}
                    {...register("new_password")}
                    placeholder="أدخل كلمة المرور الجديدة"
                    className="py-3 px-4 rounded-lg border-[1px] border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all text-right w-full"
                  />

                  <button
                    type="button"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary"
                    onClick={() => toggleFieldVisibility("new_password")}
                  >
                    {showFields.new_password ? (
                      <FaEye className="h-6 w-6" />
                    ) : (
                      <FaEyeSlash className="h-6 w-6" />
                    )}
                  </button>
                </div>
              </div>
              {errors.new_password && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.new_password.message}
                </p>
              )}
              <div>
                <label className="text-lg font-medium block my-2">
                  تأكيد كلمة المرور
                </label>
                <div className="relative">
                  <input
                    type={
                      showFields.new_password_confirmation ? "text" : "password"
                    }
                    {...register("new_password_confirmation")}
                    placeholder="تأكيد كلمة المرور"
                    className="py-3 px-4 rounded-lg border-[1px] border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all text-right w-full"
                  />
                  <button
                    type="button"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary"
                    onClick={() =>
                      toggleFieldVisibility("new_password_confirmation")
                    }
                  >
                    {showFields.new_password_confirmation ? (
                      <FaEye className="h-6 w-6" />
                    ) : (
                      <FaEyeSlash className="h-6 w-6" />
                    )}
                  </button>
                </div>
              </div>
              {errors.new_password_confirmation && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.new_password_confirmation.message}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={isSubmitting || mutation.isPending}
              variant="default"
              className="text-white w-full hover:bg-primary-400 lg:h-12 h-10 shadow-md hover:shadow-lg text-xl"
            >
              {isSubmitting || mutation.isPending ? "جاري الحفظ..." : "تمام"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordDialog;
