import { FaArrowRight, FaCalendar } from "react-icons/fa6";
import ActivityStream from "./_components/ActivityStream";
import NearestEvents from "./_components/NearestEvents";
import Projects from "./_components/Projects";
import Workload from "./_components/Workload";
import Link from "next/link";
import {
  activities,
  companies,
  events,
  members,
  profiles,
  projectMembers,
  projects,
  stages,
  tasks,
} from "./data";
const Eevents = events;
const Eactivities = activities;
const Eprofiles = profiles;
const Emembers = members;
const Ecompanies = companies;

const Page = () => {
  return (
    <div className="w-full pl-1 text-foreground text-sm ">
      {/* Header */}
      <div className="w-full mt-4 flex justify-between items-center">
        <div>
          <span className="text-xs text-gray-500">Welcome back, Evan!</span>
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <button className="flex items-center gap-1 text-xs py-1 px-2 border rounded-md hover:bg-gray-100">
          <FaCalendar className="w-3 h-3" />
          Nov 16, 2020 - Dec 16, 2020
        </button>
      </div>

      {/* Workload & Nearest Events */}
      <div className="w-full flex mt-3 justify-between gap-4">
        {/* Workload */}
        <div className="w-[70%] bg-white rounded-lg shadow p-4">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-bold">Workload</h2>
            <button className="text-sm text-blue-500 flex items-center gap-1">
              View all <FaArrowRight className="w-3 h-3" />
            </button>
          </div>
          <Workload members={members} profiles={profiles} limit={8} />
        </div>

        {/* Nearest Events */}
        <div className="w-[30%] bg-white rounded-lg shadow p-4">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-bold">Nearest Events</h2>
            <Link href={"/dashboard/events"} className="text-sm text-blue-500 flex items-center gap-1 hover:underline">
              View all <FaArrowRight className="w-3 h-3" />
            </Link >
          </div>
          <NearestEvents events={events} limit={4} />
        </div>
      </div>

      {/* Projects & Activity Stream */}
      <div className="w-full flex mt-3 justify-between gap-4">
        {/* Projects */}
        <div className="w-[70%]">
          <div className="flex justify-between mb-4 ">
            <h2 className="text-2xl font-bold">Projects</h2>
            <button className="text-sm text-blue-500 flex items-center gap-1">
              View all <FaArrowRight className="w-3 h-3" />
            </button>
          </div>
          <Projects
            projects={projects}
            limit={3}
            profiles={profiles}
            projectMembers={projectMembers}
            tasks={tasks}
            members={members}
            stages={stages}
          />
        </div>

        {/* Activity Stream */}
        <div className="w-[30%] bg-white rounded-lg shadow p-4 overflow-y-auto max-h-[460px]">
          <h2 className="text-xl font-bold mb-4">Activity Stream</h2>
          <ActivityStream activities={activities} profiles={profiles} />
        </div>
      </div>
    </div>
  );
};

export default Page;
