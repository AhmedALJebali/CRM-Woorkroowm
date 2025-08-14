import {z} from "zod";

export const eventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  date: z.string().nonempty("Date is required"),
  time: z.string().nonempty("Time is required"),
  duration: z.number().min(1, "Duration must be at least 1 hour"),
  location: z.string().optional(),
  event_type: z.enum([
    "meeting",
    "presentation",
    "workshop",
    "deadline",
    "birthday",
    "anniversary",
    "movie",
    "product_launch",
    "conference",
  ]),
  visibility: z.enum(["private", "company_only"]),
});

export type EventFormValues = z.infer<typeof eventSchema>;