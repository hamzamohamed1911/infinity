/* eslint-disable react-hooks/exhaustive-deps */
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
import { Dropdown } from "@/components/Dropdown";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTeachers } from "@/app/api/register";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import {unsubscrip } from "@/lib/apis/profile.api";
import { useEffect } from "react";

interface FormValues {
  teacher: number;
}

const UnsubscripDialog = () => {
  const queryClient = useQueryClient();

  const { data: teachersResponse } = useQuery({
    queryKey: ["teachers"],
    queryFn: fetchTeachers,
  });

  const teachers = teachersResponse?.data || [];

  const { handleSubmit, control, setValue } = useForm<FormValues>();

  useEffect(() => {
    if (teachers.length === 1) {
      setValue("teacher", teachers[0].id);
    }
  }, [teachers, setValue]);

  const mutation = useMutation({
    mutationFn: unsubscrip,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("تم الفاء الاشتراك بنجاح ", {
        className: "!bg-primary !text-white ",
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || "حدث خطأ أثناء الفاء الاشتراك ❌", {
        className: "!bg-red-500 !text-white ",
      });
    },
  });

  const onSubmit = (data: FormValues) => {
    mutation.mutate({
      teacher_id: data.teacher,
      type: 1,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-[#2087EE] underline">الغاء الاشتراك</button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-start text-[#8E8E8E] mt-2">
            خد بالك!
          </DialogTitle>
        </DialogHeader>

        <div className="my-2 text-center">
          <p className="text-[#8E8E8E] text-md font-medium  text-start">
            انت دلوقتي هتلغى نظامك
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {teachers.length > 1 && (
            <Controller
              control={control}
              name="teacher"
              render={({ field }) => (
                <Dropdown
                  label="المدرسين"
                  placeholder="اختر المدرس"
                  data={teachers}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          )}

          <DialogFooter className="w-full flex gap-2">
            <DialogClose asChild>
              <Button variant="outline" className="!text-primary w-full h-10">
                إلغاء
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="text-white w-full hover:bg-primary-400 h-12 shadow-md  hover:shadow-lg text-xl"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "جاري الحفظ..." : "متابعة"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UnsubscripDialog;
