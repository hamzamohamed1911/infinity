import { Suspense } from "react";
import { GetBook } from "@/lib/apis/books.api";
import UnitSkeleton from "@/components/UnitSkeleton";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import PaymentDialog from "../../[unitId]/payments/_components/PaymentDialog";

async function BookContent({ id }: { id: string }) {
  const Book = await GetBook({ id: id });
  const BookData = Book && "data" in Book ? Book.data : undefined;
  console.log("BookData", BookData);
  if (!BookData || !BookData.item) {
    return <div className="text-center text-red-500 py-16">Book not found</div>;
  }

  const { item } = BookData;

  return (
    <section className="min-h-screen ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
              {item.name}
            </h1>
            <div
              className="prose prose-xl text-gray-600 dark:text-gray-300"
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
            {item.price > 0 && (
              <p className="text-2xl font-semibold text-secondary-900 dark:text-secondary-800">
                ${item.price}
              </p>
            )}
            {item.price > 0 && (
              <Dialog key={item.id}>
                <DialogTrigger asChild>
                  <div className="w-full flex justify-end items-end">
                    <Button
                      className="bg-primary text-white px-6 py-4 rounded-full hover:bg-primary-400    transition-all duration-300"
                      asChild
                    >
                      <a href="#purchase" className="flex items-center gap-2">
                        اشترى الان
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </DialogTrigger>
                <PaymentDialog
                  name={item.name}
                  model_type={item.type ? item.type : "book"}
                  model_id={item.id}
                />
              </Dialog>
            )}
          </div>
          <div className="relative w-full h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense fallback={<UnitSkeleton />}>
      <BookContent id={id} />
    </Suspense>
  );
}
