// useActivityMessage.ts
import { Activity } from "@/types";

export default function useActivityMessage(activity: Activity): string {
  const { target_type, type } = activity;

  switch (target_type) {
    case "task":
      switch (type) {
        case "add":
          return `Added new task `;
        case "edit":
          return `Updated task `;
        case "attach":
          return `Attached file to task `;
        case "comment":
          return `Commented on task `;
        case "finish":
          return `Finished task `;
        case "invite":
          return `Sent task  for review`;
        case "remove":
          return `Removed task `;
        case "assign":
          return `Assigned task `;
        case "unassign":
          return `Unassigned task `;
        case "reopen":
          return `Reopened task `;
        case "block":
          return `Blocked task `;
        default:
          return `${type} task `;
      }

    case "project":
      switch (type) {
        case "add":
          return `Created project `;
        case "edit":
          return `Edited project `;
        case "attach":
          return `Attached file to project `;
        case "comment":
          return `Commented on project `;
        case "remove":
          return `Removed project `;
        case "start":
          return `Started project `;
        case "complete":
          return `Completed project `;
        case "archive":
          return `Archived project `;
        default:
          return `${type} project `;
      }

    case "event":
      switch (type) {
        case "add":
          return `Created event `;
        case "edit":
          return `Edited event `;
        case "invite":
          return `Invited members to event `;
        case "attach":
          return `Attached file to event `;
        case "comment":
          return `Commented on event `;
        case "remove":
          return `Removed event `;
        case "reschedule":
          return `Rescheduled event `;
        case "cancel":
          return `Cancelled event `;
        default:
          return `${type} event `;
      }

    case "company":
      switch (type) {
        case "add":
          return `Created company `;
        case "edit":
          return `Updated company info for `;
        case "attach":
          return `Attached file to company `;
        case "comment":
          return `Commented on company `;
        case "remove":
          return `Removed company `;
        default:
          return `${type} company `;
      }

    default:
      return `${type} ${target_type} `;
  }
}
