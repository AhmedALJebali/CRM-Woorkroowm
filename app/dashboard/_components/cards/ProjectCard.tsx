import { Member, Profile, Project, Stage, Task } from "@/types";
import { FaArrowDown, FaArrowUp, FaCalendar } from "react-icons/fa";

interface ProjectCardProps {
  project: Project;
  tasks: Task[];
  members: Member[];
  profiles: Profile[];
  stages: Stage[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  tasks,
  members,
  profiles,
  stages,
}) => {
  const createdDate = new Date(project.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const capitalizedPriority =
    project.priority.charAt(0).toUpperCase() + project.priority.slice(1);

  const PriorityIcon = project.priority === "high" ? FaArrowUp : FaArrowDown;
  const priorityColor =
    project.priority === "high"
      ? "text-red-500"
      : project.priority === "medium"
      ? "text-yellow-500"
      : "text-green-500";

  // ====== Project's tasks ======
  const projectStages = stages.filter(
    (stage) => stage.project_id === project.id
  );
  const projectTasks = tasks.filter((task) =>
    projectStages.some((stage) => stage.id === task.stage_id)
  );

  const activeTasksCount = projectTasks.filter(
    (task) => task.status === "to_do" || task.status === "in_progress"
  ).length;


  return (
    <div className="mb-4 bg-white rounded-xl hover:shadow-lg transition-shadow duration-200 grid grid-cols-2 gap-2">
      {/* Left section */}
      <div className="border-r border-gray-200 pr-3 flex flex-col justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
            <img
              src={project.image_url}
              alt={project.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-gray-400 text-xs">{project.code}</span>
            <h3 className="text-lg font-bold text-gray-800">{project.name}</h3>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3 text-xs text-gray-600">
          <span className="flex items-center gap-1">
            <FaCalendar className="w-3.5 h-3.5 text-gray-500" /> Created{" "}
            {createdDate}
          </span>
          <span
            className={`flex items-center gap-1 ${priorityColor} font-semibold`}
          >
            <PriorityIcon className="w-4 h-4" />
            {capitalizedPriority}
          </span>
        </div>
      </div>

      {/* Right section */}
      <div className="pl-3 flex flex-col justify-between p-4">
        <h1 className="text-xl font-bold mb-2">Project Data</h1>
        <div className="grid grid-cols-3 gap-2">
          <span className="text-[11px] text-gray-500 flex flex-col gap-1">
            All Tasks
            <span className="text-base font-bold text-blue-500">
              {projectTasks.length}
            </span>
          </span>
          <span className="text-[11px] text-gray-500 flex flex-col gap-1">
            Active Tasks
            <span className="text-base font-bold text-blue-500">
              {activeTasksCount}
            </span>
          </span>
          <span className="text-[11px] text-gray-500 flex flex-col gap-1">
            Assignees
            {/* Avatars of members */}
            {members.length > 0 && (
              <div className="flex  -space-x-2">
                {members.map((member, idx) => {
                  const profile = profiles.find(
                    (p) => p.user_id === member.user_id
                  );
                  return (
                    <img
                      key={idx}
                      src={profile?.avatar_url || "/default-avatar.png"}
                      alt={
                        profile
                          ? `${profile.first_name} ${profile.last_name}`
                          : "member"
                      }
                      className="w-8 h-8 rounded-full border-2 border-white object-cover"
                      title={
                        profile
                          ? `${profile.first_name} ${profile.last_name}`
                          : ""
                      }
                    />
                  );
                })}
              </div>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
