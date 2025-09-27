"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginFormData, loginSchema } from "@/lib/schemas/authSchema";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "react-international-phone/style.css";
const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const [showFields, setShowFields] = useState({
    password: false,
  });

  const toggleFieldVisibility = (field: "password") => {
    setShowFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

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
        router.refresh();
        router.push("/my-classes");
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "خطأ في الاتصال بالخادم";
      throw new Error(message);
    }
  };

  return (
    <section className="h-[700px] flex flex-col justify-center">
      <div className=" text-center flex flex-col gap-2 mb-4">
        <h2 className="text-neural-800 text-2xl font-bold"> تسجيل الدخول</h2>
        <p className="font-medium text-lg text-neural-800">كمل رحلتك يا بطل</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 max-w-md mx-auto">
          <label className="text-lg font-medium text-neural-800">
            رقم التليفون
          </label>

          <div className="flex flex-col gap-3 text-neural-800">
            <input
              {...register("phone")}
              name="phone"
              type="tel"
              className="py-3 px-4 rounded-lg border-[1px] border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all text-right w-full"
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
          <div className="flex flex-col gap-3 text-neural-800">
            <label className="text-lg font-medium">كلمة السر</label>
            <div className="relative">
              <input
                {...register("password")}
                name="password"
                type={showFields.password ? "text" : "password"}
                className="py-3 px-4 rounded-lg border-[1px] border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all text-right w-full"
              />
              <button
                type="button"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neural-800 hover:text-primary"
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
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
          {error && (
            <p className="text-red-500 text-sm text-center leading-loose">
              {error}
            </p>
          )}
          <Link
            className="underline text-primary-600 hover:text-primary-500 text-lg mb-4 font-normal"
            href="/forgot-password"
          >
            نسيت كلمة السر
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full  bg-primary-600  hover:bg-primary-500  text-white hover:shadow-lg lg:h-14 h-12  shadow-md   lg:text-xl  rounded-md    transition-colors text-lg  font-semibold disabled:opacity-50  "
          >
            {isSubmitting ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </button>
        </div>
      </form>
      <div className="text-center text-neural-800 flex flex-col gap-4 font-normal  md:text-lg text-md my-4">
        <div>
          جديد في المنصة؟
          <Link className="underline text-primary m-2" href="/register">
            تسجيل حساب
          </Link>
        </div>
        <div>
          ممكن تعرف كيفية استخدام المنصة من
          <Link className="underline text-primary m-2" href="/login">
            هنا
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
