import { JSX } from "react";
import { Activity } from "@/types";
import { activityActionIcon } from "./ActivityIcons";
import useActivityMessage from "@/hooks/useActivityMessage";

interface ActivityItemProps {
  activity: Activity;
}

export default function ActivityItem({ activity }: ActivityItemProps) {
  const actionInfo = activityActionIcon[activity.type];
  const message = useActivityMessage(activity);

  return (
    <div className="flex items-start gap-2 rounded-2xl bg-gray-100 p-2">
      <span className={`flex items-center justify-center p-2 rounded ${actionInfo.color}`}>
        {actionInfo.icon}
      </span>
      <div className="flex flex-col py-2">
        <span className="text-lg font-semibold">{message}</span>
        <span className="text-gray-400 text-[10px]">
          {new Date(activity.created_at).toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </span>
      </div>
    </div>
  );
}
