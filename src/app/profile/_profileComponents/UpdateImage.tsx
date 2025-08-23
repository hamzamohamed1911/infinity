"use client";

import { useState } from "react";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { UpdateProfilePicture } from "@/lib/apis/profile.api";
import { Camera } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// ✅ zod schema للتحقق من الملف
const imageSchema = z.object({
  image: z
    .any()
    .refine(
      (file) =>
        file && ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
      { message: "يجب أن يكون حقل ملفًا من نوع : jpeg, png, jpg." }
    ),
});

type ImageForm = z.infer<typeof imageSchema>;

const UpdateImage = ({ imgUrl }: { imgUrl: string }) => {
  const [preview, setPreview] = useState<string | null>(imgUrl || null);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<ImageForm>({
    resolver: zodResolver(imageSchema),
    mode: "onChange", // ✅ عشان isValid يشتغل مباشرة عند التغيير
  });

  const mutation = useMutation({
    mutationFn: UpdateProfilePicture,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("تم تحديث الصورة بنجاح ", {
        className: "!bg-primary !text-white ",
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || "خطأ أثناء تحديث الصورة", {
        className: "!bg-red-500 !text-white ",
      });
    },
  });

  const onSubmit = (data: ImageForm) => {
    const formData = new FormData();
    formData.append("image", data.image);
    mutation.mutate(formData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setValue("image", file, { shouldValidate: true });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-start gap-4"
    >
      {/* الصورة */}
      <div className="relative w-32 h-32  ">
        <div className="w-full h-full  overflow-hidden  ">
          <Image
            src={preview || "/placeholder.svg"}
            alt="Profile Picture"
            fill
            className="object-cover rounded-full"
          />
        </div>

        <label
          htmlFor="profileImage"
          className="absolute -bottom-3 left-0  z-20 bg-black/60 p-2 rounded-full cursor-pointer text-white text-sm hover:bg-black/80 transition"
        >
          <Camera className="w-5 h-5" />
        </label>
      </div>

      <input
        id="profileImage"
        type="file"
        accept="image/*"
        className="hidden"
        {...register("image")}
        onChange={handleFileChange}
      />

      <p className="text-red-500 text-sm">
        {(errors.image?.message as string) || ""}
      </p>

      <Button
        type="submit"
        disabled={!isValid || mutation.isPending}
        className="text-white w-auto hover:bg-primary-400 h-9 shadow-md hover:shadow-lg text-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {mutation.isPending ? "جاري التحديث..." : "تغيير الصورة الشخصية"}
      </Button>
    </form>
  );
};

export default UpdateImage;
