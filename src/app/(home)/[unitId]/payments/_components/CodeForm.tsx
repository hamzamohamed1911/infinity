/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { chargeCode } from "@/lib/apis/payments";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";

const CodeSchema = z.object({
  code: z.string().min(1, "الكود مطلوب"),
});

type CodeFormType = z.infer<typeof CodeSchema>;
interface FawryFormProps {
  model_type: string;
  model_id: number;
}
const CodeForm = ({ model_type, model_id }: FawryFormProps) => {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CodeFormType>({
    resolver: zodResolver(CodeSchema),
    mode: "onChange",
  });
  const router = useRouter();

  const { mutate, isPending, error } = useMutation({
    mutationFn: chargeCode,
    onSuccess: async (data) => {
      reset();
      setServerError(null);
      if (data?.data?.page) {
        const newWindow = window.open("", "_self");
        newWindow?.document.write(data.data.page);
        newWindow?.document.close();
        // await fetch("/api/payments/store-html", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({ html: data.data.page }),
        // });
      } else if (data?.success) {
        toast.success("تم الدفع بنجاح", {
          className: "!bg-primary !text-white !border-primary",
        });
        router.refresh();
      } else {
        setServerError(data?.message || "حدث خطأ، يرجى المحاولة مرة أخرى");

        toast.error(data?.message, {
          className: "!bg-red-500 !text-white",
        });
      }
    },
    onError: (err: any) => {
      setServerError(err?.message || "حدث خطأ، يرجى المحاولة مرة أخرى");
    },
  });

  const onSubmit = (data: CodeFormType) => {
    mutate({
      code: data.code,
      model_type: model_type,
      model_id: model_id,
      provider: "code",
    });
  };
  const hasError = !!errors.code || !!error;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 text-neural-800">
          <label className="text-lg font-medium">ادخل الكود</label>
          <input
            className={`h-12 py-3 rounded-lg border-[1px] focus:ring-primary px-4 ${
              hasError
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-primary"
            }`}
            {...register("code")}
          />
          {errors.code && (
            <p className="text-red-500 text-sm">{errors.code.message}</p>
          )}
          {serverError && <p className="text-red-500 text-sm">{serverError}</p>}
        </div>

        {/* ✅ Errors من السيرفر */}
        {error && (
          <p className="text-red-600 text-sm my-2">
            {(error as Error).message}
          </p>
        )}

        <Button
          type="submit"
          disabled={isPending}
          className="text-white w-full hover:bg-primary-400 h-14 shadow-md hover:shadow-lg text-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "جار التحميل ..." : "متابعة"}
        </Button>
      </div>
    </form>
  );
};

export default CodeForm;
