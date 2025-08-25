import { Button } from "@/components/ui/button";

const VisaForm = () => {
  return (
    <form>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 text-[#606060]">
          <label className="text-lg font-medium">رقم البطاقة</label>
          <input
            type="number"
            className="h-12  py-3 rounded-lg border-[1px] focus:ring-primary"
          />
        </div>
        <div className="flex gap-4 w-full">
          <div className="flex flex-col gap-3 text-[#606060] w-full">
            <label className="text-lg font-medium">CCV</label>
            <input
              type="number"
              className="h-12  py-3 rounded-lg border-[1px] focus:ring-primary"
            />
          </div>
          <div className="flex flex-col gap-3 text-[#606060] w-full">
            <label className="text-lg font-medium">تاريخ انتهاء البطاقة</label>
            <input
              type="number"
              className="h-12  py-3 rounded-lg border-[1px] focus:ring-primary"
            />
          </div>
        </div>
        <Button
          type="submit"
          className="text-white w-full hover:bg-primary-400 h-14 shadow-md  hover:shadow-lg text-xl"
        >
          متابعة
        </Button>
      </div>
    </form>
  );
};

export default VisaForm;
