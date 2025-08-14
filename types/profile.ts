import { Timestamp, UUID } from "@/types";

interface Profile {
  id: number;
  user_id: UUID; // FK -> users.id
  first_name: string;
  last_name: string;
  avatar_url: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  email: string;
  phone: string;
  account_type: "member" | "individual" | "company_owner";
  country: string;
  city: string;
  company_id: UUID | null; // FK -> companies.id
  created_at: Timestamp;
  updated_at: Timestamp;
}

export type { Profile };
