import { z } from "zod";

export const contactSchema = z.object({
  Name: z.string().min(2, "Completează numele."),
  Company: z.string().optional(),
  "E-mail": z.string().email("Completează un e-mail valid."),
  Phone: z.string().min(6, "Completează un număr de telefon."),
  ProjectType: z.string().optional(),
  Budget: z.string().optional(),
  Message: z.string().min(10, "Spune-ne câteva detalii despre proiect."),
});

export type ContactForm = z.infer<typeof contactSchema>;
