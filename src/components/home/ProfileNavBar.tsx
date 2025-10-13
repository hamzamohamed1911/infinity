"use client";
import { FaCog, FaSignOutAlt } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { avatar } from "../../../public";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { GetProfileData } from "@/lib/apis/profile.api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/actions/auth";
import { signOut } from "next-auth/react";
import { useState } from "react";

const ProfileNavBar = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { data: profileData, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => GetProfileData(),
  });
  const profile =
    profileData && "data" in profileData
      ? profileData?.data?.profile
      : undefined;
  const handleLogout = async () => {
    try {
      await logout();
      await signOut({ redirect: false });
      setIsLogoutModalOpen(false);
      router.refresh();
      router.push("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطأ غير معروف");
    }
  };
  return (
    <>
      {isLoading ? (
        <div className="flex   h-20 gap-2 items-center">
          <Skeleton className="size-10 bg-gray-300 rounded-full animate-pulse" />
        </div>
      ) : (
        <div className="md:ml-4 ml-0 lg:ml-6 flex  justify-center items-center">
          <DropdownMenu>
            <DropdownMenuTrigger
              className="focus:bg-transparent hover:bg-transparent focus:border-none"
              asChild
            >
              <Button
                variant="ghost"
                className="flex items-center gap-4 shrink-0"
              >
                <Image
                  src={profile?.avatar || avatar}
                  alt="صورة المستخدم"
                  width={32}
                  height={32}
                  className="md:h-10 h-8 md:w-10 w-8 rounded-full object-top object-cover"
                />
                <span className="hidden md:flex text-white text-md  flex-col gap-1">
                  <p className="text-lg font-medium text-start">
                    {profile?.name || "مستخدم"}
                  </p>
                  <span>
                    نظام :{" "}
                    <span className="text-secondary-300 text-lg">
                      {profile?.status === "1"
                        ? "أونلاين"
                        : profile?.status === "2"
                        ? "سنتر"
                        : "غير مشترك"}
                    </span>
                  </span>
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 mt-4">
              <DropdownMenuLabel className="!text-end">حسابي</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link
                  href="/profile"
                  className="flex items-center justify-evenly w-full"
                >
                  <FaCog className="h-4 w-4 mr-2" />
                  الملف الشخصي
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => setIsLogoutModalOpen(true)}
              >
                <span className="flex items-center justify-evenly w-full">
                  <FaSignOutAlt className="h-4 w-4 mr-2" />
                  تسجيل الخروج
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
      <Dialog open={isLogoutModalOpen} onOpenChange={setIsLogoutModalOpen}>
        <DialogContent className="sm:max-w-sm flex flex-col gap-8 items-center text-center">
          <DialogHeader className="flex flex-col gap-4">
            <DialogTitle className="text-center">
              تأكيد تسجيل الخروج
            </DialogTitle>
            <DialogDescription>
              {error || "هل أنت متأكد أنك تريد تسجيل الخروج؟"}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2">
            <Button className="text-white bg-primary" onClick={handleLogout}>
              تسجيل الخروج
            </Button>
            <Button
              className="border-[var(--primary-color)] border-2 text-primary hover:bg-primary hover:text-white bg-transparent"
              onClick={() => setIsLogoutModalOpen(false)}
            >
              إلغاء
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileNavBar;
