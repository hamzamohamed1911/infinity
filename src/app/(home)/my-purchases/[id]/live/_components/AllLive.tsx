"use client";

import { Card, CardContent } from "@/components/ui/card";
import { IoIosArrowBack } from "react-icons/io";
import { FaPlay } from "react-icons/fa"; // أيقونة البث
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import PaymentDialog from "@/app/(home)/[unitId]/payments/_components/PaymentDialog";

const AllLive = ({ liveData }: { liveData: LiveItem[] }) => {
  console.log(liveData);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {liveData.map((live) => (
        <Card
          key={live.id}
          className="overflow-hidden  rounded-xl border border-gray-200 relative"
        >
          <div className="relative group">
            <Image
              src={live.image || live.thumbnail || "/placeholder.png"}
              alt={live.name}
              width={600}
              height={600}
              className="w-full h-60 object-cover"
            />

            {(live.booking_status || live.price === 0) && (
              <Link
                href={`/${live.section_id}/live/${live.id}`}
                className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <FaPlay className="text-white text-4xl" />
              </Link>
            )}
          </div>

          <CardContent className="p-4 space-y-3 text-start">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-neural-800">
                {live.name}
              </h3>
            </div>

            <p className="text-sm text-neural-800">{live.section_name}</p>
            <div className="flex absolute top-2 left-2">
              {live.price > 0 && (
                <div className=" text-sm font-medium p-2 w-fit self-end text-end bg-primary-500 text-white rounded-full">
                  {live.discount > 0 ? (
                    <>
                      <span className="line-through text-white ">
                        {live.price} ج.م
                      </span>{" "}
                      <span className="text-green-400">
                        {live.price - live.discount} ج.م
                      </span>
                    </>
                  ) : (
                    <span className="text-white ">{live.price} ج.م</span>
                  )}
                </div>
              )}
            </div>
            {live.booking_status || live.price === 0 ? (
              <Link
                href={`/${live.section_id}/live/${live.id}`}
                className="group flex items-center justify-center gap-2 w-full h-12 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
              >
                اتفرج دلوقتي
                <IoIosArrowBack
                  size={20}
                  className="transform transition-all duration-300 group-hover:-translate-x-2 group-hover:scale-110"
                />
              </Link>
            ) : (
              <Dialog key={live.id}>
                <DialogTrigger asChild>
                  <Button className="group flex items-center justify-center gap-2 w-full h-12 rounded-lg bg-primary text-white hover:bg-primary-700 transition-all duration-300">
                    اشترى الآن
                    <IoIosArrowBack
                      size={20}
                      className="transform transition-all duration-300 group-hover:-translate-x-2 group-hover:scale-110"
                    />
                  </Button>
                </DialogTrigger>
                <PaymentDialog
                  name={live.name}
                  model_type="lesson"
                  model_id={live.id}
                />
              </Dialog>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AllLive;
