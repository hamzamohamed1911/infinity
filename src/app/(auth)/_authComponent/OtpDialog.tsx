"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendCode, ResendCode } from "@/lib/apis/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CodeFormData {
  code: string;
}

const codeSchema = z.object({
  code: z
    .string()
    .min(1, "كود التحقق مطلوب")
    .length(6, "كود التحقق يجب أن يكون 6 أرقام"),
});

type OtpDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  phone: string; // مرر رقم الهاتف اللى اتسجل بيه من الـ Register
  onSuccess?: () => void; // لو عايز تنفذ حاجة بعد نجاح التحقق
};

const OtpDialog = ({
  open,
  onOpenChange,
  phone,
  onSuccess,
}: OtpDialogProps) => {
  // form
  const codeForm = useForm<CodeFormData>({
    mode: "onChange",
    resolver: zodResolver(codeSchema),
    defaultValues: { code: "" },
  });
  const Router = useRouter();
  // mutations
  const sendCodeMutation = useMutation({
    mutationFn: ({ phone, code }: { phone: string; code: string }) =>
      sendCode(phone, code),
    onSuccess: () => {
      toast.success("تم التحقق من الكود بنجاح", {
        className: "!bg-primary !text-white !border-primary",
      });
      codeForm.reset();
      onSuccess?.();
      Router.push("/login");
      onOpenChange(false); // يقفل الـ dialog
    },
    onError: (error: Error) => {
      toast.error(error.message || "خطأ أثناء التحقق من الكود", {
        className: "!bg-red-500 !text-white ",
      });
    },
  });

  const resendCodeMutation = useMutation({
    mutationFn: ResendCode,
    onSuccess: () => {
      toast.success("تم إعادة إرسال الكود بنجاح!", {
        className: "!bg-primary !text-white !border-primary",
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || "خطأ أثناء إعادة إرسال الكود", {
        className: "!bg-red-500 !text-white ",
      });
    },
  });

  const onSubmit = (data: CodeFormData) => {
    sendCodeMutation.mutate({ phone, code: data.code });
  };

  const otpValue = codeForm.watch("code");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-6 max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-primary">
            تحقق من الكود
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={codeForm.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3 text-neural-800 my-4">
            <p className="text-center">
              لقد تم ارسال كود التحقق لهذا الرقم :{" "}
              <span className="text-sm text-primary font-semibold">
                {phone}
              </span>
            </p>
            <label className="text-lg font-medium">كود التحقق</label>
            <div className="flex items-center justify-center gap-2">
              <InputOTP
                maxLength={6}
                value={otpValue}
                dir="rtl"
                onChange={(value) => codeForm.setValue("code", value)}
              >
                <InputOTPGroup className="flex lg:gap-4 md:gap-3 gap-2 !justify-between items-center text-xl flex-row-reverse">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <InputOTPSlot
                      key={i}
                      className="border-primary border-2 lg:!h-16 lg:!w-16 md:!h-14 md:!w-14 h-12 w-12 text-xl text-primary"
                      index={i}
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>
            {codeForm.formState.errors.code && (
              <p className="text-red-500 text-sm">
                {codeForm.formState.errors.code.message}
              </p>
            )}
            <button
              type="submit"
              disabled={sendCodeMutation.isPending}
              className="w-full text-white hover:bg-primary-400 lg:h-14 h-12 shadow-md hover:shadow-lg lg:text-xl rounded-md bg-primary transition-colors text-lg font-semibold disabled:opacity-50"
            >
              {sendCodeMutation.isPending
                ? "جاري المعالجة..."
                : "التحقق من الكود"}
            </button>
            <button
              type="button"
              onClick={() => resendCodeMutation.mutate(phone)}
              disabled={resendCodeMutation.isPending}
              className="w-full py-3 rounded-lg bg-transparent border-[1px] border-primary text-primary hover:bg-primary hover:text-white transition-colors text-lg font-medium disabled:opacity-50"
            >
              {resendCodeMutation.isPending
                ? "جاري إعادة الإرسال..."
                : "إعادة إرسال الكود"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OtpDialog;
