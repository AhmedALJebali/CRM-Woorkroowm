import { Timestamp, UUID } from "@/types";

interface Project {
  id: number;
  name: string;
  code: string;
  description: string;
  owner_id: UUID; // FK -> users.id
  company_id: UUID; // FK -> companies.id
  start_date: Timestamp;
  end_date: Timestamp;
  deadline: Timestamp;
  budget?: number;
  currency?: string;
  priority: "low" | "medium" | "high";
  status: "planned" | "active" | "completed" | "archived";
  image_url: string;
  created_at: Timestamp;
  updated_at: Timestamp;
}
export type { Project };
