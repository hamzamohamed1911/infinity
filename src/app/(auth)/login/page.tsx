//login
"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginFormData, loginSchema } from "@/lib/schemas/authSchema";
const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    try {
      const result = await signIn("credentials", {
        phone: data.phone,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/my-classes");
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "خطأ في الاتصال بالخادم";
      throw new Error(message);
    }
  };

  return (
    <section>
      <div className="text-[#8E8E8E] text-center flex flex-col gap-2">
        <h2 className="lg:text-4xl text-3xl font-bold"> تسجيل الدخول</h2>
        <p className="font-medium text-xl mt-2">كمل رحلتك يا بطل</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 max-w-lg mx-auto">
          <div className="flex flex-col gap-3 text-[#8E8E8E]">
            <label className="text-lg font-medium">رقم التليفون</label>
            <input
              {...register("phone")}
              name="phone"
              type="tel"
              className="py-4 px-4 rounded-lg border-[1px] focus:ring-primary"
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
          <div className="flex flex-col gap-3 text-[#8E8E8E]">
            <label className="text-lg font-medium">كلمة السر</label>
            <input
              {...register("password")}
              name="password"
              className="py-4 px-4 rounded-lg border-[1px] focus:ring-primary"
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <Link
            className="underline text-primary text-xl my-4 font-normal"
            href="/forgot-password"
          >
            نسيت كلمة السر
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full lg:h-14 h-12  rounded-md bg-primary text-white  transition-colors lg:text-2xl  font-semibold disabled:opacity-50  hover:bg-primary-400  shadow-md  hover:shadow-lg text-xl"
          >
            {isSubmitting ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </button>
        </div>
      </form>
      <div className="text-center text-[#8E8E8E] flex flex-col gap-2 font-normal text-xl my-4">
        <span className="flex gap-2 justify-center items-center">
          <p> جديد في المنصة؟ </p>
          <Link className="underline text-primary" href="/register">
            تسجيل حساب
          </Link>
        </span>
        <span className="flex gap-2 justify-center items-center flex-wrap">
          <p>ممكن تعرف كيفية استخدام المنصة</p>
          <Link className="underline text-primary" href="/login">
            من هنا
          </Link>
        </span>
      </div>
    </section>
  );
};

export default Login;
