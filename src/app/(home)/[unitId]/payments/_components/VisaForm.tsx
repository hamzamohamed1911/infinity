import { Button } from "@/components/ui/button";

const VisaForm = () => {
  return (
    <form>
      <div className="flex flex-col gap-6">
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
