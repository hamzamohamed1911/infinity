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
import { GetCentersList, GetGroupsList } from "@/lib/apis/listService.api";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { subscribeTeacher } from "@/lib/apis/profile.api";
import { useEffect } from "react";
import { useWatch } from "react-hook-form";
import { GetStateList } from "@/lib/apis/auth";

interface FormValues {
  state: number;
  center: number;
  group: number;
  teacher: number;
  parent_phone?: string;
}

const ChangeOnlineDialog = () => {
  const queryClient = useQueryClient();
  const { data: teachersResponse } = useQuery({
    queryKey: ["teachers"],
    queryFn: fetchTeachers,
  });

  const teachers = teachersResponse?.data || [];

  const { handleSubmit, control, register, setValue } = useForm<FormValues>();
  const selectedTeacherId = useWatch({ control, name: "teacher" });

  const actualTeacherId =
    selectedTeacherId || (teachers.length === 1 ? teachers[0].id : undefined);
  const selectedCenterId = useWatch({ control, name: "center" });
  const { data: centersResponse } = useQuery({
    queryKey: ["centers", actualTeacherId],
    enabled: typeof actualTeacherId === "number",
    queryFn: () => GetCentersList({ teacher_id: actualTeacherId as number }),
  });
  const { data: groupsResponse } = useQuery({
    queryKey: ["groups", selectedCenterId],
    queryFn: () => GetGroupsList({ center_id: selectedCenterId }),
    enabled: !!selectedCenterId,
  });
  const { data: statesResponse, isLoading: loadingstates } = useQuery({
    queryKey: ["states"],
    queryFn: GetStateList,
  });

  const states =
    statesResponse && "data" in statesResponse ? statesResponse.data : [];
  const centers =
    centersResponse && "data" in centersResponse ? centersResponse.data : [];
  const groups =
    groupsResponse && "data" in groupsResponse ? groupsResponse.data : [];

  useEffect(() => {
    if (teachers.length === 1) {
      setValue("teacher", teachers[0].id);
    }
  }, [teachers, setValue]);

  const mutation = useMutation({
    mutationFn: subscribeTeacher,
    onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success("تم الاشتراك بنجاح فى نظام السنتر بنجاح", {
        className: "!bg-primary !text-white ",
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || "حدث خطأ أثناء الاشتراك ❌", {
        className: "!bg-red-500 !text-white ",
      });
    },
  });

  const onSubmit = (data: FormValues) => {
    mutation.mutate({
      teacher_id: data.teacher,
      state_id: data.state,
      type: 2,
      group_id: data.group,
      center_id: data.center,
      parent_phone: data.parent_phone,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-[#2087EE] underline">السنتر</button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-start text-secondary mt-2">
            خد بالك!
          </DialogTitle>
        </DialogHeader>

        <div className="my-2 text-center">
          <p className="text-secondary text-md font-medium text-start">
            انت دلوقتي هتغير نظامك من{" "}
            <span className="text-[#509319]">اونلاين</span> لنظام{" "}
            <span className="text-[#509319]">السنتر</span>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="flex flex-col gap-3 text-secondary">
            <label className="text-md font-medium">رقم هاتف ولي الأمر</label>
            <input
              {...register("parent_phone")}
              name="parent_phone"
              type="tel"
              className="py-3 px-4 rounded-lg border-[1px] focus:ring-primary"
            />
          </div>

          <div className="flex gap-2">
            <Controller
              control={control}
              name="state"
              render={({ field }) => (
                <Dropdown
                  label="المدينة"
                  placeholder="اختر المدينة"
                  data={states}
                  value={field.value}
                  onChange={field.onChange}
                  loading={loadingstates}
                />
              )}
            />

            <Controller
              control={control}
              name="center"
              render={({ field }) => (
                <Dropdown
                  label="السنتر"
                  placeholder="اختر السنتر"
                  data={centers}
                  value={field.value}
                  onChange={field.onChange}
                  loading={
                    typeof actualTeacherId === "number" &&
                    centersResponse === undefined
                  }
                  feedback={
                    typeof actualTeacherId !== "number"
                      ? "يرجى اختيار المدرس أولاً"
                      : undefined
                  }
                />
              )}
            />
          </div>

          <div className="flex gap-2">
            <Controller
              control={control}
              name="group"
              render={({ field }) => (
                <Dropdown
                  label="المجموعة"
                  placeholder="اختر المجموعة"
                  data={groups}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            {/* ✅ فقط أظهر Dropdown لو فيه أكثر من مدرس */}
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
          </div>

          <DialogFooter className="w-full flex gap-2">
            <DialogClose asChild>
              <Button variant="outline" className="!text-primary w-full h-10">
                إلغاء
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="text-white h-10 shadow-md w-full"
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

export default ChangeOnlineDialog;
