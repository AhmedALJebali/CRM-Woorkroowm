// Projects.tsx
import { Member, Profile, Project, ProjectMember, Stage, Task } from "@/types";
import React from "react";
import ProjectCard from "./cards/ProjectCard";

interface ProjectsProps {
  projects: Project[];
  tasks: Task[];
  profiles: Profile[];
  projectMembers: ProjectMember[];
  members: Member[];
  stages: Stage[];
  limit?: number;
}

const Projects: React.FC<ProjectsProps> = ({
  projects,
  limit,
  tasks,
  profiles,
  projectMembers,
  members,
  stages,
}) => {
  const displayedProjects = limit ? projects.slice(0, limit) : projects;

  return (
    <div className="grid grid-cols-1 ">
      {displayedProjects.map((project) => {
        // ====== Get stages for this project ======
        // هنا بنجيب كل الـ stages اللي مرتبطة بالمشروع الحالي عن طريق project_id
        const projectStages = stages.filter(
          (stage) => stage.project_id === project.id
        );

        // ====== Get tasks for this project via stages ======
        // بعد كده بنجيب كل الـ tasks اللي مرتبطة بأي stage من الـ stages الخاصة بالمشروع
        const projectTasks = tasks.filter((task) =>
          projectStages.some((stage) => stage.id === task.stage_id)
        );

        // ====== Get members of this project ======
        // هنا بنجيب الـ member_id لكل عضو مرتبط بالمشروع عن طريق ProjectMember
        const projectMemberIds = projectMembers
          .filter((pm) => pm.project_id === project.id)
          .map((pm) => pm.member_id);

        // ====== Get full member objects ======
        // بعد كده بنحول الـ member_id لبيانات العضو الكاملة من مصفوفة members
        const projectMembersProfiles = projectMemberIds
          .map((id) => members.find((m) => m.id === id))
          .filter(Boolean) as Member[];

        // ====== Get profiles of members ======
        // وأخيرًا بنجيب الـ profile لكل عضو بناءً على user_id من الـ members
        const projectProfiles = projectMembersProfiles
          .map((member) => profiles.find((p) => p.user_id === member.user_id))
          .filter(Boolean) as Profile[];

        return (
          <ProjectCard
            key={project.id}
            project={project}
            tasks={projectTasks}
            members={projectMembersProfiles}
            profiles={projectProfiles}
            stages={projectStages}
          />
        );
      })}
    </div>
  );
};

export default Projects;
