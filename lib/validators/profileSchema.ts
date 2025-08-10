import { z } from "zod";

export const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),

  age: z.preprocess((val) => {
    if (val === "" || val === null || val === undefined) {
      return undefined;
    }
    const num = Number(val);
    return isNaN(num) ? NaN : num;
  }, z.number({ invalid_type_error: "Age must be a number" }).int("Age must be an integer").min(1, "Age must be at least 1").max(120, "Age must be less than or equal to 120")),

  gender: z.enum(["male", "female", "other"], {
    required_error: "Gender is required",
    invalid_type_error: "Gender must be one of 'male', 'female' or 'other'",
  }),
  country: z.string().min(1, "Country is required"),

  phoneNumber: z
    .string()
    .min(5, "Phone number is too short")
    .max(20, "Phone number is too long")
    .regex(/^[0-9+\-\s()]+$/, "Phone number contains invalid characters"),

  avatarUrl: z.string().url("Invalid URL format").or(z.literal("")),
  countryCode: z.number().min(1, "Country code is required"),
  // companyStatus: z.enum(["existing", "new"], {
  //   required_error: "Company status is required",
  // }),

  // selectedCompany: z.string().optional(),

  // companyName: z.string().optional(),

  // companySize: z.string().optional(),

  // teamMembers: z
  //   .array(
  //     z.object({
  //       email: z.string().email("Invalid email address"),
  //     })
  //   )
  //   .optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
