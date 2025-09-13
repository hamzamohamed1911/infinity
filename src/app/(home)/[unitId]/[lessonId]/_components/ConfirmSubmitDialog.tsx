import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmSubmitDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmSubmitDialog({
  open,
  onClose,
  onConfirm,
}: ConfirmSubmitDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="flex flex-col gap-4 text-start">
          <DialogTitle className="text-xl font-semibold text-start my-2">
            تأكيد إنهاء الامتحان
          </DialogTitle>
          <DialogDescription className="text-start">
            هل أنت متأكد أنك تريد إنهاء الامتحان؟ لن تتمكن من تعديل الإجابات بعد
            الإنهاء.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="w-full flex gap-2">
          <Button
            variant="outline"
            className="!text-primary w-full h-10 md:text-xl text-lg"
            onClick={onClose}
          >
            إلغاء
          </Button>
          <Button
            className="text-white w-full hover:bg-primary-400 h-10 shadow-md hover:shadow-lg md:text-xl text-lg"
            onClick={onConfirm}
          >
            تأكيد الإنهاء
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
