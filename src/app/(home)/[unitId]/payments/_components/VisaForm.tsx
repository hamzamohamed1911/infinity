import { Button } from "@/components/ui/button";
import { chargeCode } from "@/lib/apis/payments";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface FawryFormProps {
  model_type: string;
  model_id: number;
}

const VisaForm = ({ model_type, model_id }: FawryFormProps) => {
  const { handleSubmit, reset } = useForm();
  const router = useRouter();
  const { mutate, isPending, error } = useMutation({
    mutationFn: chargeCode,
    onSuccess: async (data) => {
      reset();
      if (data?.data?.page) {
        // نحفظ الـ HTML في الـ API route
        await fetch("/api/payments/store-html", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ html: data.data.page }),
        });

        // نروح للصفحة الجديدة
        router.push("/payment");
      } else {
        alert("تم الدفع بنجاح");
      }
    },
    onError: (err) => {
      console.error("Form submission error:", err);
    },
  });

  const onSubmit = () => {
    mutate({
      model_type: model_type,
      model_id: model_id,
      provider: "paymob",
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <p className="text-red-600 text-sm my-2">{(error as Error).message}</p>
      )}
      <div className="flex flex-col gap-6">
        <Button
          type="submit"
          disabled={isPending}
          className="text-white w-full hover:bg-primary-400 h-14 shadow-md hover:shadow-lg text-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "جار التحميل ..." : "متابعة"}
        </Button>
      </div>
    </form>
  );
};

export default VisaForm;
