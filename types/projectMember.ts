import { Timestamp, UUID } from "@/types";

interface ProjectMember {
  id: number;
  project_id: number; // FK -> projects.id
  member_id: number; // FK -> members.id
  joined_at: Timestamp;
}
export type { ProjectMember };
