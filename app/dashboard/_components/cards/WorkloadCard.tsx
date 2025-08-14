import { Member, Profile } from "@/types";

interface WorkloadCardProps {
  member: Member;
  profile: Profile;
}

const WorkloadCard: React.FC<WorkloadCardProps> = ({ member, profile }) => {
  return (
    <div className="bg-gray-100 rounded-xl p-4 flex flex-col items-center gap-3  hover:shadow-md transition-shadow duration-200">
      
      {/* Avatar */}
      <img
        src={profile.avatar_url || "/default-avatar.png"}
        alt={`${profile.first_name} ${profile.last_name}`}
        className="w-12 h-12 rounded-full object-cover border-2 border-gray-300"
      />

      {/* Member info */}
      <div className="flex flex-col items-center gap-1 text-center">
        <span className="font-semibold text-gray-800">
          {profile.first_name} {profile.last_name}
        </span>
        <span className="text-sm text-gray-500">{member.position}</span>
        <span className="text-xs text-gray-700 px-2 py-1 border rounded-lg border-gray-300">
          {member.level}
        </span>
      </div>
    </div>
  );
};

export default WorkloadCard;
