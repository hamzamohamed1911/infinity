import { Button } from "@/components/ui/button";

const WalletForm = () => {
  return (
    <form>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 text-[#606060]">
          <label className="text-lg font-medium">رقم المحفظة</label>
          <input
            type="number"
            className="h-12  py-3 rounded-lg border-[1px] focus:ring-primary"
          />
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

export default WalletForm;
