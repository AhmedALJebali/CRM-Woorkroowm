import { Timestamp, UUID } from ".";
interface Activity {
  id: number;
  company_id: UUID; // FK -> companies.id
  user_id: UUID; // FK -> users.id
  target_type: "project" | "task" | "event" | "company";
  target_id: number | UUID;
  message: string;
  type:
    | "add"
    | "attach"
    | "edit"
    | "remove"
    | "comment"
    | "finish"
    | "invite"
    | "assign"
    | "unassign"
    | "reopen"
    | "block"
    | "start"
    | "complete"
    | "archive"
    | "reschedule"
    | "cancel";
  created_at: Timestamp;
}
export type { Activity };
