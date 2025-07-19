import { z } from 'zod';

export const loginSchema = z.object({
  phone: z
    .string()
    .min(12, 'رقم الهاتف يجب أن يكون 12 رقمًا على الأقل')
    .regex(/^\d{12,}$/, 'رقم الهاتف يجب أن يحتوي على أرقام فقط'),
  password: z
    .string()
    .min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
});

export type LoginFormData = z.infer<typeof loginSchema>;