"use client";

import { useState } from "react";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { UpdateProfilePicture } from "@/lib/apis/profile.api";
import { Camera } from "lucide-react";
import { motion } from "framer-motion";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

export const avatarList = [
  { id: "a1", src: "/avatars/avatar1.png" },
  { id: "a2", src: "/avatars/avatar2.png" },
  { id: "a3", src: "/avatars/avatar3.png" },
  { id: "a4", src: "/avatars/avatar4.png" },
  { id: "a5", src: "/avatars/avatar5.png" },
  { id: "a6", src: "/avatars/avatar6.png" },
  { id: "a7", src: "/avatars/avatar7.png" },
  { id: "a8", src: "/avatars/avatar8.png" },
  { id: "a9", src: "/avatars/avatar9.png" },
  { id: "a10", src: "/avatars/avatar10.png" },
  { id: "a11", src: "/avatars/avatar11.png" },
  { id: "a12", src: "/avatars/avatar12.png" },
  { id: "a13", src: "/avatars/avatar13.png" },
  { id: "a14", src: "/avatars/avatar14.png" },
  { id: "a15", src: "/avatars/avatar15.png" },
  { id: "a16", src: "/avatars/avatar16.png" },
  { id: "a17", src: "/avatars/avatar17.png" },
  { id: "a18", src: "/avatars/avatar18.png" },
  { id: "a19", src: "/avatars/avatar19.png" },
  { id: "a20", src: "/avatars/avatar20.png" },
  { id: "a21", src: "/avatars/avatar21.png" },
  { id: "a22", src: "/avatars/avatar22.png" },
];

const UpdateImage = ({ imgUrl }: { imgUrl: string }) => {
  const [preview, setPreview] = useState<string>(imgUrl || avatarList[0].src);
  const [selectedAvatar, setSelectedAvatar] = useState<{
    id: string;
    src: string;
  } | null>(null);
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: UpdateProfilePicture,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("تم تحديث الصورة بنجاح", {
        className: "!bg-primary !text-white",
      });
      setOpen(false);
    },
    onError: (error: Error) => {
      toast.error(error.message || "حدث خطأ أثناء تحديث الصورة", {
        className: "!bg-red-500 !text-white",
      });
    },
  });

  const handleAvatarSelect = (id: string, src: string) => {
    setSelectedAvatar({ id, src });
    setPreview(src);
  };

  const handleSubmit = async () => {
    if (!selectedAvatar) {
      toast.error("من فضلك اختر صورة أولاً");
      return;
    }

    try {
      const response = await fetch(selectedAvatar.src);
      const blob = await response.blob();
      const file = new File([blob], "avatar.jpg", { type: blob.type });
      const formData = new FormData();
      formData.append("image", file);
      mutation.mutate(formData);
    } catch (err) {
      toast.error(`حدث خطأ أثناء تحميل الصورة: ${(err as Error).message}`);
    }
  };

  return (
    <div className="lg:col-span-4 col-span-2 flex flex-col items-start gap-4 relative">
      {/* صورة البروفايل */}
      <div className="relative lg:w-40 md:w-36 w-32  md:h-52 h-44">
        <div className="w-full h-full overflow-hidden rounded-md">
          <Image
            key={preview}
            src={preview}
            alt="Profile Picture"
            fill
            className="object-contain rounded-md"
            unoptimized
          />
        </div>

        {/* Popover لعرض الصور */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="absolute -bottom-3 left-0 z-20 bg-black/60 p-2 rounded-full cursor-pointer text-white text-sm hover:bg-black/80 transition"
            >
              <Camera className="w-5 h-5" />
            </button>
          </PopoverTrigger>

          <PopoverContent className=" z-50 w-auto ms-4 p-3 bg-white rounded-2xl shadow-lg grid grid-cols-4 gap-3">
            {avatarList.map((a) => (
              <motion.button
                key={a.id}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleAvatarSelect(a.id, a.src)}
                className={`w-14 h-14 rounded-md overflow-hidden border-2 transition ${
                  selectedAvatar?.id === a.id
                    ? "border-primary scale-110"
                    : "border-transparent"
                }`}
                type="button"
              >
                <Image
                  src={a.src}
                  alt={`Avatar ${a.id}`}
                  width={56}
                  height={56}
                  unoptimized
                  className="object-cover rounded-md"
                />
              </motion.button>
            ))}
          </PopoverContent>
        </Popover>
      </div>

      {/* زر تأكيد التحديث */}
      <Button
        type="button"
        onClick={handleSubmit}
        disabled={!selectedAvatar || mutation.isPending}
        className={`text-white w-auto h-9 shadow-md hover:shadow-lg text-md transition 
          ${
            !selectedAvatar || mutation.isPending
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-primary-400"
          }`}
      >
        {mutation.isPending ? "جاري التحديث..." : "تغيير الصورة الشخصية"}
      </Button>
    </div>
  );
};

export default UpdateImage;
