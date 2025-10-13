"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import Barcode from "react-barcode";

interface Props {
  code: string;
}

const BarcodeDialog = ({ code }: Props) => {
  const barcodeRef = useRef<HTMLDivElement>(null);

  const downloadBarcode = () => {
    const svg = barcodeRef.current?.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "barcode.svg";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-1/2 flex flex-col gap-2 cursor-pointer hover:underline ">
          <label className="text-lg font-medium ">الباركود</label>
          <p className="font-semibold md:text-xl text-lg text-blue-600">
            {code}
          </p>
        </div>
      </DialogTrigger>

      <DialogContent className="flex flex-col items-center gap-4">
        <DialogTitle className="text-lg font-bold">باركود الطالب</DialogTitle>

        <div ref={barcodeRef}>
          <Barcode
            value={code}
            format="CODE39"
            width={3}
            height={100}
            displayValue={true}
            lineColor="#000000"
            fontSize={14}
          />
        </div>

        <Button
          className="text-white w-full hover:bg-primary-400 h-10 shadow-md  hover:shadow-lg text-xl"
          onClick={downloadBarcode}
        >
          تحميل الباركود
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default BarcodeDialog;
