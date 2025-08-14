import { Timestamp } from "@/types";
interface Stage {
  id: number;
  project_id: number; // FK -> projects.id
  name: string;
  description: string;
  order: number;
  start_date: string;
  end_date: string;
  status: "planned" | "in_progress" | "completed" | "archived";
  created_at: Timestamp;
  updated_at: Timestamp;
}
export type { Stage };
