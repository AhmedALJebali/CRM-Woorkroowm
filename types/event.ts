import { Timestamp, UUID } from "./";
interface EEvent {
  id: number;
  title: string;
  description: string;
  company_id: UUID;
  created_by: UUID;
  date: string;
  time: string;
  duration: number;
  location: string;

  event_type:
    | "meeting"
    | "presentation"
    | "workshop"
    | "deadline"
    | "birthday"
    | "anniversary"
    | "movie"
    | "product_launch"
    | "conference";
  visibility: "private" | "company_only";
  created_at: Timestamp;
  updated_at: Timestamp;
}
export type{ EEvent };
