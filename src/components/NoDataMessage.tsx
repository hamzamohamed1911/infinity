import Image from "next/image";
import { noDataAvilable } from "../../public";

export default function NoDataMessage({ text }: { text: string }) {
  return (
    <div className="min-h-[60vh] flex flex-col justify-center items-center gap-8">
      <Image
        alt="no data available"
        width={500}
        height={500}
        src={noDataAvilable}
      />
      <p className="text-center lg:text-xl text-lg text-neural-800 mt-10">
        {text}
      </p>
    </div>
  );
}
