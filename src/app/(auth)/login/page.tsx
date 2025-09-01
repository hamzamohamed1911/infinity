/* eslint-disable @typescript-eslint/no-unused-vars */
//login
"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginFormData, loginSchema } from "@/lib/schemas/authSchema";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { PhoneInput } from "react-international-phone";
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
    setValue,
    watch,

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
      <div className="text-[#606060] text-center flex flex-col gap-2 mb-4">
        <h2 className=" text-[#606060] text-2xl font-bold"> تسجيل الدخول</h2>
        <p className="font-medium text-lg ">كمل رحلتك يا بطل</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 max-w-lg mx-auto">
          <div className="flex flex-col gap-3 text-[#606060]">
            <label className="text-lg font-medium">رقم التليفون</label>
{/* <PhoneInput
  defaultCountry="EG"
  value={watch("phone") || ""}
  onChange={(phone) => setValue("phone", phone)}
  className="flex items-center gap-2 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-primary border text-start"
  inputClassName="flex-1 bg-transparent outline-none border-none text-start"
/> */}
 <input
              {...register("phone")}
              name="phone"
              type="tel"
              className="py-3 px-4 rounded-lg border-[1px] focus:ring-primary"
            />


          </div>
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
          <div className="flex flex-col gap-3 text-[#606060]">
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
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
          {error && (
            <p className="text-red-500 text-sm text-center leading-loose">
              {error}
            </p>
          )}
          <Link
            className="underline text-primary text-lg my-4 font-normal"
            href="/forgot-password"
          >
            نسيت كلمة السر
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full text-white  hover:bg-primary-400 lg:h-14 h-12  shadow-md  hover:shadow-lg lg:text-xl  rounded-md bg-primary   transition-colors text-lg  font-semibold disabled:opacity-50  "
          >
            {isSubmitting ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </button>
        </div>
      </form>
      <div className="text-center text-[#606060] flex flex-col gap-4 font-normal  md:text-lg text-md my-4">
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
