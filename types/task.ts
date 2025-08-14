import { Timestamp, UUID } from "@/types";
interface Task {
  id: number;
  stage_id: number; // FK -> stages.id

  group: string;
  reporter_id: UUID; // FK -> users.id
  name: string;
  description: string;
  assignee_id: UUID; // FK -> users.id
  create_by_id: UUID; // FK -> users.id
  estimated_time: number; // minutes
  spent_time: number; // minutes
  due_date: string;
  priority: "low" | "medium" | "high";
  status: "to_do" | "in_progress" | "completed" | "backlog" | "review";
  progress?: number; // 0–100 %
  created_at: Timestamp;
  updated_at: Timestamp;
}
export type { Task };