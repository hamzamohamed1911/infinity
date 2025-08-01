"use client"
import React, { useState } from "react";
import { useForm, UseFormRegister } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPassword,
  sendCode,
  updatPassword,
  ResendCode,
} from "@/lib/apis/auth";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FieldErrorsImpl } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

interface PasswordFormData {
  password: string;
  confirmPassword: string;
}
// Define form data interfaces
interface PhoneFormData {
  phone: string;
}
interface CodeFormData {
  code: string;
}


// Zod validation schemas
const phoneSchema = z.object({
  phone: z
    .string()
    .min(1, "رقم الهاتف مطلوب")
    .regex(/^\+?\d{10,15}$/, "رقم الهاتف غير صالح"),
});

const codeSchema = z.object({
  code: z
    .string()
    .min(1, "كود التحقق مطلوب")
    .length(6, "كود التحقق يجب أن يكون 6 أرقام"), // Changed to 6 digits
});

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(1, "كلمة المرور مطلوبة")
      .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل"),
    confirmPassword: z.string().min(1, "تأكيد كلمة المرور مطلوب"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمة المرور وتأكيدها غير متطابقتين",
    path: ["confirmPassword"],
  });
// Step 1: Phone Input
const PhoneForm: React.FC<{
  register: UseFormRegister<PhoneFormData>;
  errors: Partial<FieldErrorsImpl<PhoneFormData>>;
  isSubmitting: boolean;
}> = ({ register, errors, isSubmitting }) => (
  <div className="flex flex-col gap-4 text-[#606060] my-4">
    <label className="text-lg font-medium">رقم التليفون</label>
    <input
      type="tel"
      placeholder="أدخل رقم الهاتف"
      className="py-3 px-4 rounded-lg border-[1px] border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all text-right"
      {...register("phone")}
    />
    {errors.phone && (
      <p className="text-red-500 text-sm">{errors.phone.message}</p>
    )}
    <button
      type="submit"
      disabled={isSubmitting}
            className="w-full text-white  hover:bg-primary-400 lg:h-14 h-12  shadow-md  hover:shadow-lg lg:text-xl  rounded-md bg-primary   transition-colors text-lg  font-semibold disabled:opacity-50  "
    >
      {isSubmitting ? "جاري المعالجة..." : "إعادة تعيين كلمة المرور"}
    </button>
  </div>
);
// Step 2: Code Verification
const CodeForm: React.FC<{
  register: UseFormRegister<CodeFormData>;
  errors: Partial<FieldErrorsImpl<CodeFormData>>;
  isSubmitting: boolean;
  phone: string;
  onResend: () => void;
  isResending: boolean;
  setValue: (name: keyof CodeFormData, value: string) => void; // Add setValue
  watch: (name: keyof CodeFormData) => string; // Add watch
}> = ({
  errors,
  isSubmitting,
  phone,
  onResend,
  isResending,
  setValue,
  watch,
}) => {
  const otpValue = watch("code"); // Use "code" field name as per CodeFormData
  return (
    <div className="flex flex-col gap-3 text-[#606060] my-4">
      <p className="text-center">
        لقد تم ارسال كود التحقق لهذا الرقم :{" "}
        <span className="text-sm text-primary font-semibold">{phone}</span>
      </p>
      <label className="text-lg font-medium">كود التحقق</label>
      <div className="flex items-center justify-center gap-2">
        <InputOTP
          maxLength={6}
          value={otpValue}
          dir="rtl"
          onChange={(value) => setValue("code", value)}
        >
          <InputOTPGroup className="flex lg:gap-4 md:gap-3 gap-2 !justify-between items-center text-xl flex-row-reverse">
            <InputOTPSlot
              className="border-primary border-2 lg:!h-16 lg:!w-16 md:!h-14 md:!w-14 h-12 w-12 text-xl text-primary"
              index={0}
            />
            <InputOTPSlot
              className="border-primary border-2 lg:!h-16 lg:!w-16 md:!h-14 md:!w-14 h-12 w-12 text-xl text-primary"
              index={1}
            />
            <InputOTPSlot
              className="border-primary border-2 lg:!h-16 lg:!w-16 md:!h-14 md:!w-14 h-12 w-12 text-xl text-primary"
              index={2}
            />
            <InputOTPSlot
              className="border-primary border-2 lg:!h-16 lg:!w-16 md:!h-14 md:!w-14 h-12 w-12 text-xl text-primary"
              index={3}
            />
            <InputOTPSlot
              className="border-primary border-2 lg:!h-16 lg:!w-16 md:!h-14 md:!w-14 h-12 w-12 text-xl text-primary"
              index={4}
            />
            <InputOTPSlot
              className="border-primary border-2 lg:!h-16 lg:!w-16 md:!h-14 md:!w-14 h-12 w-12 text-xl text-primary"
              index={5}
            />
          </InputOTPGroup>
        </InputOTP>
      </div>
      {errors.code && (
        <p className="text-red-500 text-sm">{errors.code.message}</p>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
            className="w-full text-white  hover:bg-primary-400 lg:h-14 h-12  shadow-md  hover:shadow-lg lg:text-xl  rounded-md bg-primary   transition-colors text-lg  font-semibold disabled:opacity-50  "
      >
        {isSubmitting ? "جاري المعالجة..." : "التحقق من الكود"}
      </button>
      <button
        type="button"
        onClick={onResend}
        disabled={isResending}
        className="w-full py-3 rounded-lg bg-transparent border-[1px] border-primary text-primary hover:bg-primary hover:text-white transition-colors text-lg font-medium disabled:opacity-50"
      >
        {isResending ? "جاري إعادة الإرسال..." : "إعادة إرسال الكود"}
      </button>
    </div>
  );
};
// Step 3: Password Update
const PasswordForm: React.FC<{
  register: UseFormRegister<PasswordFormData>;
  errors: Partial<FieldErrorsImpl<PasswordFormData>>;
  isSubmitting: boolean;
}> = ({ register, errors, isSubmitting }) => {
  const [showFields, setShowFields] = useState({
    password: false,
    passwordConfirmation: false,
  });
  const toggleFieldVisibility = (
    field: "password" | "passwordConfirmation"
  ) => {
    setShowFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };
  return (
    <div className="flex flex-col gap-3 text-[#606060] my-4 ">
      <label className="text-lg font-medium bloack">كلمة المرور الجديدة</label>
      <div className="relative">
        <input
          type={showFields.password ? "text" : "password"}
          placeholder="أدخل كلمة المرور الجديدة"
          className="py-3 px-4 rounded-lg border-[1px] border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all text-right w-full"
          {...register("password")}
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
      {errors.password && (
        <p className="text-red-500 text-sm ">{errors.password.message}</p>
      )}
      <label className="text-lg font-medium">تأكيد كلمة المرور</label>

      <div className="relative">
        <input
          type={showFields.passwordConfirmation ? "text" : "password"}
          placeholder="تأكيد كلمة المرور"
          className="py-3 px-4 rounded-lg border-[1px] border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all text-right w-full"
          {...register("confirmPassword")}
        />
        <button
          type="button"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary"
          onClick={() => toggleFieldVisibility("passwordConfirmation")}
        >
          {showFields.passwordConfirmation ? (
            <FaEye className="h-6 w-6" />
          ) : (
            <FaEyeSlash className="h-6 w-6" />
          )}
        </button>
      </div>
      {errors.confirmPassword && (
        <p className="text-red-500 text-sm ">
          {errors.confirmPassword.message}
        </p>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
            className="w-full text-white  hover:bg-primary-400 lg:h-14 h-12  shadow-md  hover:shadow-lg lg:text-xl  rounded-md bg-primary   transition-colors text-lg  font-semibold disabled:opacity-50  "
      >
        {isSubmitting ? "جاري المعالجة..." : "تحديث كلمة المرور"}
      </button>
    </div>
  );
};

const ForgetPassword: React.FC = () => {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const router = useRouter();
  // Step 1: Phone Form
  const phoneForm = useForm<PhoneFormData>({
    mode: "onChange",
    resolver: zodResolver(phoneSchema),
  });

  // Step 2: Code Form
  const codeForm = useForm<CodeFormData>({
    mode: "onChange",
    resolver: zodResolver(codeSchema),
    defaultValues: { code: "" },
  });

  // Step 3: Password Form
  const passwordForm = useForm<PasswordFormData>({
    mode: "onChange",
    resolver: zodResolver(passwordSchema),
  });

  // Mutations
  const forgotPasswordMutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      setStep(2);
      phoneForm.reset();
    },
    onError: (error: Error) => {
      toast.error(error.message || "خطأ أثناء إرسال رقم الهاتف", {
        className: "!bg-red-500 !text-white ",
      });
    },
  });

  const sendCodeMutation = useMutation({
    mutationFn: ({ phone, code }: { phone: string; code: string }) =>
      sendCode(phone, code),
    onSuccess: () => {
      setStep(3);
      codeForm.reset();
    },
    onError: (error: Error) => {
      toast.error(error.message || "خطأ أثناء التحقق من الكود", {
        className: "!bg-red-500 !text-white ",
      });
    },
  });
  const updatePasswordMutation = useMutation({
    mutationFn: ({ phone, password }: { phone: string; password: string }) =>
      updatPassword(phone, password),
    onSuccess: () => {
      toast.success("تم تحديث كلمة المرور بنجاح!", {
        className: "!bg-primary !text-white !border-primary",
      });

      passwordForm.reset();
      router.push("/login");
    },
    onError: (error: Error) => {
      toast.error(error.message || "خطأ أثناء تحديث كلمة المرور", {
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

  const onPhoneSubmit = (data: PhoneFormData) => {
    setPhone(data.phone);
    forgotPasswordMutation.mutate(data.phone);
  };

  const onCodeSubmit = (data: CodeFormData) => {
    sendCodeMutation.mutate({ phone, code: data.code });
  };

  const onPasswordSubmit = (data: PasswordFormData) => {
    updatePasswordMutation.mutate({ phone, password: data.password });
  };

  const onResendCode = () => {
    resendCodeMutation.mutate(phone);
  };

  const isSubmitting =
    forgotPasswordMutation.isPending ||
    sendCodeMutation.isPending ||
    updatePasswordMutation.isPending;

  return (
    <div className="w-full max-w-lg bg-white rounded-lg p-6 ">
      <h2 className="md:text-2xl text-xl font-bold text-center text-primary mb-6">
        إعادة تعيين كلمة المرور
      </h2>
      {step === 1 && (
        <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)}>
          <PhoneForm
            register={phoneForm.register}
            errors={phoneForm.formState.errors}
            isSubmitting={isSubmitting}
          />
        </form>
      )}
      {step === 2 && (
        <form onSubmit={codeForm.handleSubmit(onCodeSubmit)}>
          <CodeForm
            register={codeForm.register}
            errors={codeForm.formState.errors}
            isSubmitting={isSubmitting}
            phone={phone}
            onResend={onResendCode}
            isResending={resendCodeMutation.isPending}
            setValue={codeForm.setValue}
            watch={codeForm.watch}
          />
        </form>
      )}
      {step === 3 && (
        <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}>
          <PasswordForm
            register={passwordForm.register}
            errors={passwordForm.formState.errors}
            isSubmitting={isSubmitting}
          />
        </form>
      )}
    </div>
  );
};

export default ForgetPassword;
