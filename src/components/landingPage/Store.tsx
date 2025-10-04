import { Card } from "@/components/ui/card";
import Image from "next/image";
import { placeholder } from "../../../public";
import Link from "next/link";
import { Button } from "../ui/button";
import { ShoppingBag } from "lucide-react";
import { Badge } from "../ui/badge";
import { ProductsResponse } from "@/lib/types/landing";

const Store = ({ products }: { products: ProductsResponse }) => {
  const books = (products?.books || []).slice(0, 8).map((item) => ({
    ...item,
    type: "كتاب",
  }));

  const allItems = [...books];

  return (
    <section id="store" className="py-16 ">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-primary">
        متجر الكتب
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {allItems.map((item) => (
          <Card
            key={`${item.type}-${item.id}`}
            className="overflow-hidden text-right bg-white rounded-2xl group relative cursor-pointer"
          >
            {/* الصورة */}
            <div className="w-full h-96 relative">
              <Image
                src={item.thumbnail || item.image || placeholder}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* المحتوى يظهر عند الـ hover */}
            <div
              className="absolute bottom-0 left-0 w-full h-full bg-black/70 
              translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 
              transition-all duration-500 ease-in-out p-4 text-white flex flex-col justify-between"
            >
              <div className="text-center flex flex-col justify-center items-center h-full gap-3">
                <h3 className="text-lg font-bold mb-1">{item.name}</h3>
                {item.description && (
                  <p className="text-sm mb-2 line-clamp-3">
                    {item.description}
                  </p>
                )}
                {(() => {
                  const price = Number(item?.price) || 0; // يحول price لرقم
                  const discount = Number(item?.discount) || 0; // يحول discount لرقم

                  // لو مفيش سعر أصلاً أو السعر <= 0 مش هيعرض أي حاجة خالص
                  if (price <= 0)
                    return (
                      <Badge className="absolute  top-3 left-3 bg-secondary-700 text-white text-sm px-3 py-1 rounded-full shadow-md">
                        {item.type}
                      </Badge>
                    );

                  // لو فيه خصم
                  if (discount > 0) {
                    return (
                      <div className="flex gap-2 absolute top-3 left-3">
                        <div className=" text-sm font-medium px-2 w-fit self-end text-end bg-primary-500 text-white rounded-full">
                          <Badge className="bg-primary text-white text-sm px-3 py-1 rounded-full shadow-md ">
                            <span className="line-through">{price} ج.م</span>
                            <span className="text-secondary ms-2">
                              {price - discount} ج.م
                            </span>
                          </Badge>
                        </div>
                        <Badge className=" bg-secondary-700 text-white text-sm px-3 py-1 rounded-full shadow-md">
                          {item.type}
                        </Badge>
                      </div>
                    );
                  }

                  // لو مفيش خصم بس فيه سعر
                  return (
                    <div className="absolute flex gap-2 top-3 left-3">
                      <Badge className=" text-sm font-medium p-2 w-fit self-end text-end bg-primary-500 text-white  px-3 py-1 rounded-full shadow-md">
                        <span>{price} ج.م</span>
                      </Badge>
                      <Badge className=" bg-secondary-700 text-white text-sm px-3 py-1 rounded-full shadow-md">
                        {item.type}
                      </Badge>
                    </div>
                  );
                })()}
              </div>

              <div className="flex gap-2 justify-center items-center w-full group/card">
                <Link
                  href="/my-classes"
                  className="bg-primary-600 flex justify-center items-center rounded-md text-center text-white w-full md:h-12 h-10 shadow-md text-xl transition-all duration-300 group-hover/card:bg-primary-500 group-hover/card:shadow-lg"
                >
                  اشترك الآن
                </Link>
                <Button className="bg-primary-600   w-12 h-12 text-white shadow-md transition-all duration-300 group-hover/card:bg-primary-500 group-hover/card:shadow-lg flex items-center justify-center">
                  <ShoppingBag size={28} className="md:size-10 size-8" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-center items-center mt-8">
        <Link
          href="/my-classes"
          className="btn-link bg-primary-500 rounded-md group "
        >
          <svg
            width="180"
            height="60"
            viewBox="0 0 180 60"
            className="absolute top-0 left-0 w-full h-full border-svg"
          >
            <polyline
              points="179,1 179,59 1,59 1,1 179,1"
              className="stroke-white"
            />
            <polyline
              points="179,1 179,59 1,59 1,1 179,1"
              className="stroke-white"
            />
          </svg>
          <span className="relative z-10 text-white text-lg font-medium">
            عرض المزيد
          </span>
        </Link>
      </div>
    </section>
  );
};

export default Store;
