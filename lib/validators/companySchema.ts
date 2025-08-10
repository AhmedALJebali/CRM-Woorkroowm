import { z } from "zod";

export const companySchema = z
  .object({
    companyStatus: z.enum(["existing", "new"], {
      required_error: "Please select a status",
    }),
    companyName: z.string().min(1, "Company name is required"),
    businessDirection: z.string().optional(),
    teamSize: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.companyStatus === "new") {
      if (!data.businessDirection) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Business direction is required for new companies",
          path: ["businessDirection"],
        });
      }
      if (!data.teamSize) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Team size is required for new companies",
          path: ["teamSize"],
        });
      }
    }
  });

export type CompanyFormData = z.infer<typeof companySchema>;