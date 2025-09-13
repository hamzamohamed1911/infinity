"use client";

import Link from "next/link";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { PhoneInput } from "react-international-phone";

const Register = () => {
  const steps = [{ id: "signup" }, { id: "interest" }, { id: "knowledge" }];
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(
    new Array(steps.length).fill(false)
  );
  const [formType, setFormType] = useState<"basic" | "secondary">("basic");
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
      teacher_id: "",
      type: "1",
      center_id: "",
      group_id: "",
    },
  });

  // Mutations for API calls
  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      setActiveStep(2); // Move to confirmation step
      setCompletedSteps((prev) => prev.map((_, i) => (i <= 2 ? true : false)));
    },
    onError: (error) => {
      console.error("Registration failed:", error);
      // Handle error (e.g., show toast notification)
    },
  });

  const registerWithSubscribeMutation = useMutation({
    mutationFn: registerWithSubscribe,
    onSuccess: () => {
      setActiveStep(2); // Move to confirmation step
      setCompletedSteps((prev) => prev.map((_, i) => (i <= 2 ? true : false)));
    },
    onError: (error) => {
      console.error("Registration with subscribe failed:", error);
      // Handle error (e.g., show toast notification)
    },
  });

  const handleNext = async () => {
    if (activeStep === 0 && teacherCount > 1) {
      // Validate formType selection
      const isValid = await subscribeForm.trigger("type");
      if (!isValid) {
        return;
      }
    }
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
      const updatedCompletedSteps = completedSteps.map((completed, i) =>
        i <= activeStep + 1 ? true : completed
      );
      setCompletedSteps(updatedCompletedSteps);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (activeStep === 1) {
      if (teacherCount <= 1) {
        // Validate basic form
        const isValid = await basicForm.trigger();
        if (isValid) {
          const data = basicForm.getValues();
          registerMutation.mutate(data);
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
            registerWithSubscribeMutation.mutate(data);
          }
        }
      }
    }
  };

  return (
    <div className="flex flex-col justify-between h-full lg:m-8 md:m-6 m-2">
      <header className="flex flex-col gap-6">
        <nav className="flex items-center justify-center w-full max-w-md mx-auto">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center ${
                index === steps.length - 1 ? "flex-0" : "flex-1"
              }`}
            >
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-full font-medium text-lg shrink-0 z-10 ${
                  index === activeStep || completedSteps[index]
                    ? "bg-primary text-white"
                    : "border-2 border-primary text-primary"
                }`}
                aria-current={index === activeStep ? "step" : undefined}
              >
                {index + 1}
              </div>
              {index !== steps.length - 1 && (
                <div
                  className={`flex-1 h-[1px] lg:mx-8 md:mx-6 mx-4 bg-primary`}
                />
              )}
            </div>
          ))}
        </nav>

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
          {activeStep === 0 && (
            <>
              <p className="mb-4  lg:text-2xl text-xl font-bold text-[#606060]">
                اختار نظامك
              </p>
              <RadioGroup
                defaultValue="basic"
                className="flex flex-col gap-6"
                onValueChange={(value) => {
                  setFormType(value as "basic" | "secondary");
                  subscribeForm.setValue("type", value === "basic" ? "2" : "1");
                }}
              >
                <div className="flex items-start justify-center gap-4">
                  <p className="text-lg text-[#606060]">
                    أنت مشترك مع المدرس في سنتر وعايز تنضم للحصص بتاعته لإستفادة
                    أكبر
                  </p>
                  <div className="flex items-center justify-end gap-2 shrink-0">
                    <Label
                      htmlFor="basic"
                      className="text-primary  lg:text-xl text-lg !font-[700]"
                    >
                      : السنتر
                    </Label>
                    <RadioGroupItem
                      value="basic"
                      id="basic"
                      className="border-primary text-primary size-5"
                    />
                  </div>
                </div>
                <div className="flex items-start justify-center gap-4">
                  <p className="text-lg text-[#606060]">
                    أنت مشترك مع المدرس أونلاين وعايز تنضم للحصص بتاعته
                  </p>
                  <div className="flex items-center justify-end gap-2 shrink-0">
                    <Label
                      htmlFor="secondary"
                      className="text-primary  lg:text-xl text-lg !font-[700]"
                    >
                      : الأونلاين
                    </Label>
                    <RadioGroupItem
                      value="secondary"
                      id="secondary"
                      className="border-primary text-primary size-5"
                    />
                  </div>
                </div>
              </RadioGroup>
              <Button
                type="button"
                onClick={handleNext}
                className="w-full text-white  hover:bg-primary-400 lg:h-14 h-12  shadow-md  hover:shadow-lg lg:text-xl  rounded-md bg-primary   transition-colors text-lg  font-semibold disabled:opacity-50  "
              >
                متابعة
              </Button>
            </>
          )}

          {activeStep === 1 && (
            <div className="w-full h-full">
              <div className="w-full">
                {teacherCount > 1 && showAlternateContent ? (
                  <div className="flex flex-col gap-3 text-[#606060] my-4">
                    <div className="flex flex-col gap-3 text-[#606060] my-3">
                      <Label className="text-lg font-medium">المدينة</Label>
                      <Controller
                        control={subscribeForm.control}
                        name="state_id"
                        render={({ field }) => (
                          <Dropdown
                            placeholder="اختر المدينة"
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
                    {formType === "basic" && (
                      <div className="flex md:flex-row flex-col gap-2 w-full my-3">
                        <div className="flex flex-col gap-3 text-[#606060] w-full">
                          <Label className="text-lg font-medium">السنتر</Label>
                          <Input
                            {...subscribeForm.register("center_id")}
                            className="!h-12 rounded-lg border-[1px]"
                          />
                          {subscribeForm.formState.errors.center_id && (
                            <p className="text-red-500">
                              {subscribeForm.formState.errors.center_id.message}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col gap-3 text-[#606060] w-full">
                          <Label className="text-lg font-medium">
                            المجموعة
                          </Label>
                          <Input
                            {...subscribeForm.register("group_id")}
                            className="!h-12 rounded-lg border-[1px]"
                          />
                          {subscribeForm.formState.errors.group_id && (
                            <p className="text-red-500">
                              {subscribeForm.formState.errors.group_id.message}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                    <div className="flex flex-col gap-3 text-[#606060] w-full my-3">
                      <Label className="text-lg font-medium">الصف</Label>
                      <Input
                        {...subscribeForm.register("classroom_id")}
                        className="!h-12 rounded-lg border-[1px]"
                      />
                      <Controller
                        control={subscribeForm.control}
                        name="classroom_id"
                        render={({ field }) => (
                          <Dropdown
                            placeholder="اختر الصف"
                            data={classroom ?? []}
                            value={Number(field.value)}
                            onChange={(value) => field.onChange(String(value))}
                          />
                        )}
                      />

                      {subscribeForm.formState.errors.classroom_id && (
                        <p className="text-red-500">
                          {subscribeForm.formState.errors.classroom_id.message}
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

                        {/* داخل JSX */}
                        {teacherCount <= 1 ? (
                          <Controller
                            control={basicForm.control}
                            name="phone"
                            render={({ field }) => (
                              <PhoneInput
                                defaultCountry="EG"
                                value={field.value || ""}
                                onChange={field.onChange}
                                className="flex items-center gap-2 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-primary border text-start"
                                inputClassName="flex-1 bg-transparent outline-none border-none text-start"
                              />
                            )}
                          />
                        ) : (
                          <Controller
                            control={subscribeForm.control}
                            name="phone"
                            render={({ field }) => (
                              <PhoneInput
                                defaultCountry="EG"
                                value={field.value || ""}
                                onChange={(val) => {
                                  field.onChange(val);
                                }}
                                className="flex items-center gap-2 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-primary border text-start"
                                inputClassName="flex-1 bg-transparent outline-none border-none text-start"
                              />
                            )}
                          />
                        )}

                        {/* <Input
                          {...(teacherCount <= 1
                            ? basicForm.register("phone")
                            : subscribeForm.register("phone"))}
                          className="!h-12 rounded-lg border-[1px]"
                        /> */}
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
                          رقم هاتف ولي الأمر
                        </Label>
                        <Input
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
          )}
          {activeStep === 2 && (
            <div className="max-w-lg h-full flex flex-col xl:gap-8 lg:gap-6  gap-4">
              <p className="text-[#606060]  lg:text-xl text-lg !leading-snug">
                هيتم مراجعة تسجيلك من فريق المدرس ويتم الرد عليك خلال 24 ساعة
              </p>
              <p className="text-[#606060]  lg:text-xl text-lg !leading-snug">
                ممكن تعرف كيفية استخدام المنصة من{" "}
                <Link
                  className="text-primary underline hover:text-primarydark"
                  href="#"
                >
                  هنا
                </Link>
              </p>
            </div>
          )}
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
  );
};

export default Register;
