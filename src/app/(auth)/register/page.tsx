"use client";

import Link from "next/link";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { useQuery, useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  fetchTeachers,
  registerUser,
  registerWithSubscribe,
} from "@/app/api/register";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BasicFormData,
  basicSchema,
  SubscribeFormData,
  subscribeSchema,
} from "@/lib/schemes/authSchema";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Dropdown } from "@/components/Dropdown";
import { GetClassroomsList, GetStateList } from "@/lib/apis/auth";
import "react-international-phone/style.css";
import OtpDialog from "../_authComponent/OtpDialog";
import { useTheme } from "@/context/theme-context";
type ApiError = {
  message: string;
  errors?: string[];
};
const Register = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [openDialog, setOpenDialog] = useState(false); // هنا
  const [activeStep, setActiveStep] = useState(1);
  const theme = useTheme();

  const [showAlternateContent, setShowAlternateContent] = useState(false);
  const { data: statesResponse } = useQuery({
    queryKey: ["states"],
    queryFn: GetStateList,
  });
  const { data: classRoomResponse } = useQuery({
    queryKey: ["classroom"],
    queryFn: GetClassroomsList,
  });
  const states =
    statesResponse && "data" in statesResponse ? statesResponse.data : [];
  const classroom =
    classRoomResponse && "data" in classRoomResponse
      ? classRoomResponse.data
      : [];
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

  // Fetch teacher count
  const { data: teacherCountResponse } = useQuery({
    queryKey: ["teachers"],
    queryFn: fetchTeachers,
  });

  const teacherCount = teacherCountResponse?.data?.length || 0;
  // const teacherCount = 3;

  // React Hook Form setup
  const basicForm = useForm<BasicFormData>({
    resolver: zodResolver(basicSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      parent_phone: "",
      password: "",
      password_confirmation: "",
      state_id: "",
      classroom_id: "",
    },
  });

  const subscribeForm = useForm<SubscribeFormData>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      parent_phone: "",
      password: "",
      password_confirmation: "",
      state_id: "",
      classroom_id: "",
    },
  });

  // Mutations for API calls
  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      setOpenDialog(true);
    },
    onError: (error: ApiError) => {
      setErrors(error.errors || [error.message || "حدث خطأ"]);
    },
  });

  const registerWithSubscribeMutation = useMutation({
    mutationFn: registerWithSubscribe,
    onSuccess: () => {
      setOpenDialog(true);
      setActiveStep(2); // Move to confirmation step
    },
    onError: (error: ApiError) => {
      setErrors(error.errors || [error.message || "حدث خطأ"]);
    },
  });
  const phone =
    teacherCount <= 1
      ? basicForm.watch("phone") // أو basicForm.getValues("phone")
      : subscribeForm.watch("phone");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (activeStep === 1) {
      if (teacherCount <= 1) {
        // Validate basic form
        const isValid = await basicForm.trigger();
        if (isValid) {
          const data = basicForm.getValues();
          registerMutation.mutate({
            ...data,
            email: data.email ?? "",
            phone: "+2" + data.phone,
            parent_phone: "+2" + data.parent_phone,
          });
        }
      } else {
        if (!showAlternateContent) {
          // Validate basic fields first
          const basicFields = [
            "name",
            "email",
            "phone",
            "parent_phone",
            "password",
            "password_confirmation",
          ] as const;
          const isValid = await subscribeForm.trigger(basicFields);
          if (isValid) {
            setShowAlternateContent(true); // Show alternate content
          }
        } else {
          // Validate entire subscribe form
          const isValid = await subscribeForm.trigger();
          if (isValid) {
            const data = subscribeForm.getValues();
            registerWithSubscribeMutation.mutate({
              ...data,
              email: data.email ?? "",
              phone: "+2" + data.phone,
              parent_phone: "+2" + data.parent_phone,
            });
          }
        }
      }
    }
  };

  return (
    <>
      <div className="flex flex-col justify-between h-full lg:m-8 md:m-6 m-2">
        <header className="flex flex-col gap-6">
          <div className=" text-center flex flex-col gap-2 mt-2">
            <h2 className=" lg:text-3xl text-2xl font-bold text-[#606060]">
              سجل معانا دلوقتي
            </h2>
            <p className="font-medium text-xl text-[#606060 mt-2">
              إبدأ معانا رحلتك في التعلم وتجيب أعلى الدرجات
            </p>
          </div>
        </header>

        <div className="my-4 text-right w-full">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 my-4 text-right justify-end items-start w-full"
          >
            <div className="w-full h-full">
              <div className="w-full">
                {teacherCount > 1 && showAlternateContent ? (
                  <div className="flex flex-col gap-3 text-[#606060] my-4">
                    <div className="flex flex-col gap-3 text-[#606060] my-3">
                      <Label className="text-lg font-medium">المحافظه</Label>
                      <Controller
                        control={subscribeForm.control}
                        name="state_id"
                        render={({ field }) => (
                          <Dropdown
                            placeholder="اختر المحافظه"
                            data={states ?? []}
                            value={Number(field.value)}
                            onChange={(value) => field.onChange(String(value))}
                          />
                        )}
                      />
                      {subscribeForm.formState.errors.state_id && (
                        <p className="text-red-500">
                          {subscribeForm.formState.errors.state_id.message}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-3 text-[#606060] w-full my-3">
                      <Label className="text-lg font-medium">المدرس</Label>
                      <Input
                        {...subscribeForm.register("teacher_id")}
                        className="!h-12 rounded-lg border-[1px]"
                      />
                      {subscribeForm.formState.errors.teacher_id && (
                        <p className="text-red-500">
                          {subscribeForm.formState.errors.teacher_id.message}
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col gap-3 text-[#606060] my-4">
                      <Label className="text-lg font-medium">الاسم</Label>
                      <Input
                        {...(teacherCount <= 1
                          ? basicForm.register("name")
                          : subscribeForm.register("name"))}
                        className="!h-12 rounded-lg border-[1px]"
                      />
                      {teacherCount <= 1
                        ? basicForm.formState.errors.name && (
                            <p className="text-red-500">
                              {basicForm.formState.errors.name.message}
                            </p>
                          )
                        : subscribeForm.formState.errors.name && (
                            <p className="text-red-500">
                              {subscribeForm.formState.errors.name.message}
                            </p>
                          )}
                    </div>
                    <div className="flex flex-col gap-3 text-[#606060] my-4">
                      <Label className="text-lg font-medium">
                        البريد الإلكتروني
                      </Label>
                      <Input
                        {...(teacherCount <= 1
                          ? basicForm.register("email")
                          : subscribeForm.register("email"))}
                        className="!h-12 rounded-lg border-[1px]"
                      />
                      {teacherCount <= 1
                        ? basicForm.formState.errors.email && (
                            <p className="text-red-500">
                              {basicForm.formState.errors.email.message}
                            </p>
                          )
                        : subscribeForm.formState.errors.email && (
                            <p className="text-red-500">
                              {subscribeForm.formState.errors.email.message}
                            </p>
                          )}
                    </div>
                    <div className="flex md:flex-row flex-col gap-2 w-full my-4">
                      <div className="flex flex-col gap-3 text-[#606060] w-full">
                        <Label className="text-lg font-medium">
                          رقم هاتف الطالب
                        </Label>
                        <Input
                          type="text"
                          {...(teacherCount <= 1
                            ? basicForm.register("phone")
                            : subscribeForm.register("phone"))}
                          className="!h-12 rounded-lg border-[1px]"
                        />
                        {teacherCount <= 1
                          ? basicForm.formState.errors.phone && (
                              <p className="text-red-500">
                                {basicForm.formState.errors.phone.message}
                              </p>
                            )
                          : subscribeForm.formState.errors.phone && (
                              <p className="text-red-500">
                                {subscribeForm.formState.errors.phone.message}
                              </p>
                            )}
                      </div>

                      <div className="flex flex-col gap-3 text-[#606060] w-full">
                        <Label className="text-lg font-medium">
                          {theme.phoneLabel}
                        </Label>
                        <Input
                          type="text"
                          {...(teacherCount <= 1
                            ? basicForm.register("parent_phone")
                            : subscribeForm.register("parent_phone"))}
                          className="!h-12 rounded-lg border-[1px]"
                        />
                        {teacherCount <= 1
                          ? basicForm.formState.errors.parent_phone && (
                              <p className="text-red-500">
                                {
                                  basicForm.formState.errors.parent_phone
                                    .message
                                }
                              </p>
                            )
                          : subscribeForm.formState.errors.parent_phone && (
                              <p className="text-red-500">
                                {
                                  subscribeForm.formState.errors.parent_phone
                                    .message
                                }
                              </p>
                            )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 text-[#606060] w-full my-4 relative">
                      <Label className="text-lg font-medium">كلمة المرور</Label>

                      <div className="relative">
                        <Input
                          type={showFields.password ? "text" : "password"}
                          {...(teacherCount <= 1
                            ? basicForm.register("password")
                            : subscribeForm.register("password"))}
                          className="!h-12 rounded-lg border-[1px]"
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
                      {teacherCount <= 1
                        ? basicForm.formState.errors.password && (
                            <p className="text-red-500">
                              {basicForm.formState.errors.password.message}
                            </p>
                          )
                        : subscribeForm.formState.errors.password && (
                            <p className="text-red-500">
                              {subscribeForm.formState.errors.password.message}
                            </p>
                          )}
                    </div>
                    <div className="flex flex-col gap-3 text-[#606060] w-full my-4">
                      <Label className="text-lg font-medium">
                        تأكيد كلمة المرور
                      </Label>
                      <div className="relative">
                        <Input
                          type={
                            showFields.passwordConfirmation
                              ? "text"
                              : "password"
                          }
                          {...(teacherCount <= 1
                            ? basicForm.register("password_confirmation")
                            : subscribeForm.register("password_confirmation"))}
                          className="!h-12 rounded-lg border-[1px]"
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
                      {teacherCount <= 1
                        ? basicForm.formState.errors.password_confirmation && (
                            <p className="text-red-500">
                              {
                                basicForm.formState.errors.password_confirmation
                                  .message
                              }
                            </p>
                          )
                        : subscribeForm.formState.errors
                            .password_confirmation && (
                            <p className="text-red-500">
                              {
                                subscribeForm.formState.errors
                                  .password_confirmation.message
                              }
                            </p>
                          )}
                    </div>
                    {teacherCount <= 1 && (
                      <>
                        <div className="flex flex-col gap-3 text-[#606060] w-full my-3">
                          <Label className="text-lg font-medium">المدينة</Label>
                          <Controller
                            control={basicForm.control}
                            name="state_id"
                            render={({ field }) => (
                              <Dropdown
                                placeholder="اختر المدينة"
                                data={states ?? []}
                                value={Number(field.value)}
                                onChange={(value) =>
                                  field.onChange(String(value))
                                }
                              />
                            )}
                          />
                          {basicForm.formState.errors.state_id && (
                            <p className="text-red-500">
                              {basicForm.formState.errors.state_id.message}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col gap-3 text-[#606060] w-full my-3">
                          <Label className="text-lg font-medium">الصف</Label>
                          <Controller
                            control={basicForm.control}
                            name="classroom_id"
                            render={({ field }) => (
                              <Dropdown
                                placeholder="اختر الصف"
                                data={classroom ?? []}
                                value={Number(field.value)}
                                onChange={(value) =>
                                  field.onChange(String(value))
                                }
                              />
                            )}
                          />
                          {basicForm.formState.errors.classroom_id && (
                            <p className="text-red-500">
                              {basicForm.formState.errors.classroom_id.message}
                            </p>
                          )}
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
              {errors.length > 0 && (
                <ul className="text-red-500 my-2">
                  {errors.map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              )}

              <Button
                type="submit"
                className="w-full text-white  hover:bg-primary-400 lg:h-14 h-12  shadow-md  hover:shadow-lg lg:text-xl  rounded-md bg-primary   transition-colors text-lg  font-semibold disabled:opacity-50  "
                disabled={
                  registerMutation.isPending ||
                  registerWithSubscribeMutation.isPending
                }
              >
                {registerMutation.isPending ||
                registerWithSubscribeMutation.isPending
                  ? "جاري التسجيل..."
                  : "متابعة"}
              </Button>
            </div>
          </form>
        </div>

        <div className="flex flex-col gap-4">
          <div className="text-center text-[#606060] flex flex-col gap-2 font-normal md:text-xl text-lg my-4">
            <span className="flex gap-2 justify-center items-center ">
              <p>لديك حساب بالفعل؟</p>
              <Link className="underline text-primary" href="/login">
                تسجيل الدخول
              </Link>
            </span>
            <span className="flex gap-2 justify-center items-center mt-2">
              <p>ممكن تعرف كيفية استخدام المنصة</p>
              <Link className="underline text-primary" href="/login">
                من هنا
              </Link>
            </span>
          </div>
        </div>
      </div>
      <OtpDialog phone={phone} open={openDialog} onOpenChange={setOpenDialog} />
    </>
  );
};

export default Register;
