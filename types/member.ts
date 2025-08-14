import { Timestamp, UUID } from "@/types";

interface Member {
  id: number;
  user_id: UUID; // FK -> users.id
  role: "Admin" | "Manager" | "Member";
  level: "Junior" | "Mid" | "Senior";
  position: string;
  company_id: UUID; // FK -> companies.id
  created_at: Timestamp;
  updated_at: Timestamp;
}
export type { Member };
