import { Button } from "@/components/ui/button";
interface FawryFormProps {
  model_type: string;
  model_id: string | number;
}

const VisaForm = ({ model_type, model_id }: FawryFormProps) => {
  console.log("model_id", model_id);
  console.log("model_type", model_type);
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
