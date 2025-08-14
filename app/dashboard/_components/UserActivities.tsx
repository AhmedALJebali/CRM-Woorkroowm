import { Activity, Profile } from "@/types";
import ActivityItem from "./ActivityItem";

interface UserActivitiesProps {
  profile: Profile;
  activities: Activity[];
}

export default function UserActivities({ profile, activities }: UserActivitiesProps) {
  return (
    <div className="border-b border-gray-200 pb-2">
      <div className="flex items-center gap-2 mb-2">
        <img
          src={profile.avatar_url}
          alt={`${profile.first_name} ${profile.last_name}`}
          className="w-12 h-12 rounded-full"
        />
        <span className="font-semibold text-lg">{profile.first_name} {profile.last_name}</span>
      </div>
      <div className="flex flex-col gap-1">
        {activities.map(activity => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
}
