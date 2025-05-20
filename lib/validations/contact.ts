import { z } from "zod";

export const ContactFormSchema = z.object({
  name: z.string().min(2, { message: "الاسم يجب أن يحتوي على حرفين على الأقل" }),
  email: z.string().email({ message: "البريد الإلكتروني غير صالح" }),
  subject: z.string().min(3, { message: "الموضوع يجب أن يحتوي على ثلاثة أحرف على الأقل" }),
  message: z.string().min(10, { message: "الرسالة يجب أن تحتوي على 10 أحرف على الأقل" })
});

export type ContactFormType = z.infer<typeof ContactFormSchema>;
