import { z } from "zod";

export const loginSchema = z.object({
  phone: z.string({
    required_error: "رقم الهاتف مطلوب",
  }), // مجرد يكون موجود
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
