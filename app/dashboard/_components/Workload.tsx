import WorkloadCard from "./cards/WorkloadCard";
import { Member, Profile } from "@/types";
interface WorkloadProps {
  members: Member[];
  profiles: Profile[];
  limit?: number;
}

const Workload: React.FC<WorkloadProps> = ({ members, profiles, limit }) => {
  const displayedMembers = limit ? members.slice(0, limit) : members;

  return (
    <div>
      <div className="grid grid-cols-4 gap-5">
        {displayedMembers.map((member) => {
          const profile = profiles.find((p) => p.user_id === member.user_id);
          if (!profile) return null; // skip if profile not found

          return <WorkloadCard key={member.id} member={member} profile={profile} />;
        })}
      </div>
    </div>
  );
};

export default Workload;
