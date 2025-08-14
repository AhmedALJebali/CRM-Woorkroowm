import { z } from "zod";

export const companySchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  companyEmail: z.string().email("Invalid email address"),
  companyPhone: z
    .string()
    .regex(/^\+?[0-9\s-]{7,15}$/, "Invalid phone number"),
  companyCountry: z.string().min(1, "Country is required"),
  companyCity: z.string().min(1, "City is required"),
  companyLogo: z.string().url("Invalid URL format").or(z.literal("")),
  businessDirection: z.string().optional(),
  teamSize: z.string().optional(),
})
.superRefine((data, ctx) => {
  if (!data.companyEmail && !data.companyPhone ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "At least email or phone is required",
      path: ["companyEmail"],
    });
  }
});

export type CompanyFormData = z.infer<typeof companySchema>;
