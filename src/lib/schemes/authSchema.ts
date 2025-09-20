import { z } from "zod";

export const baseSchema = z.object({
  name: z.string().min(2, "الاسم يجب أن يكون أكثر من حرفين"),
  email: z.string().email("البريد الإلكتروني غير صالح").optional(),
  phone: z.string().min(10, "رقم الهاتف غير صالح"),
  parent_phone: z.string().min(10, "رقم هاتف ولي الأمر غير صالح"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
  password_confirmation: z.string().min(6, "تأكيد كلمة المرور مطلوب"),
  state_id: z.string().min(1, "المدينة مطلوبة"),
  classroom_id: z.string().min(1, "الصف مطلوب"),
});

// Define basic schema with password confirmation refinement
export const basicSchema = baseSchema.refine(
  (data) => data.password === data.password_confirmation,
  {
    message: "كلمة المرور وتأكيد كلمة المرور غير متطابقتين",
    path: ["password_confirmation"],
  }
);

// Define subscribe schema by extending base schema
export const subscribeSchema = baseSchema
  .extend({
    teacher_id: z.string().min(1, "المدرس مطلوب"),
    type: z.enum(["1", "2"], { required_error: "نوع الاشتراك مطلوب" }),
    center_id: z.string().optional(),
    group_id: z.string().optional(),
  })
  .refine(
    (data) =>
      data.type === "1" ||
      (data.type === "2" && data.center_id && data.group_id),
    {
      message: "السنتر والمجموعة مطلوبان للاشتراك في السنتر",
      path: ["center_id"],
    }
  );

export type BasicFormData = z.infer<typeof basicSchema>;
export type SubscribeFormData = z.infer<typeof subscribeSchema>;
