import { Activity, Profile } from "@/types";
import UserActivities from "./UserActivities";

interface ActivityStreamProps {
  activities: Activity[];
  profiles: Profile[];
  maxUsers?: number;
}

export default function ActivityStream({ activities, profiles, maxUsers = 10 }: ActivityStreamProps) {
  const activitiesByUser = profiles
    .map(profile => ({
      profile,
      userActivities: activities.filter(act => act.user_id === profile.user_id),
    }))
    .filter(group => group.userActivities.length > 0)
    .slice(0, maxUsers);

  return (
    <div className="flex flex-col gap-4 text-xs">
      {activitiesByUser.map(({ profile, userActivities }) => (
        <UserActivities key={profile.user_id} profile={profile} activities={userActivities} />
      ))}
    </div>
  );
}
