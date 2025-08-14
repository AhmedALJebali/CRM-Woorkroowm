import React from "react";
import { FaArrowDown, FaArrowUp, FaClock } from "react-icons/fa";
import { EEvent } from "@/types";
// Event colors
const eventColors: Record<string, string> = {
  meeting: "bg-amber-500",
  presentation: "bg-blue-500",
  workshop: "bg-green-500",
  deadline: "bg-red-500",
  birthday: "bg-pink-500",
  anniversary: "bg-purple-500",
  movie: "bg-yellow-500",
  product_launch: "bg-indigo-500",
  conference: "bg-gray-500",
};

// Check if the event is upcoming
const isUpcoming = (event: EEvent) => {
  const eventDateTime = new Date(`${event.date}T${event.time}`);
  return eventDateTime > new Date();
};

interface EventCardProps {
  event: EEvent;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="flex bg-white h-20 rounded ">
      {/* Sidebar color based on event type */}
      <div
        className={`w-1  ${eventColors[event.event_type] || "bg-gray-500"}`}
      ></div>

      {/* Main content */}
      <div className="flex-1 px-3 py-1 flex flex-col justify-between">
        {/* Title and arrow indicating upcoming or past */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-gray-800">{event.title}</span>
          {isUpcoming(event) ? (
            <FaArrowUp className="w-3.5 h-3.5 text-green-500" />
          ) : (
            <FaArrowDown className="w-3.5 h-3.5 text-red-500" />
          )}
        </div>

        {/* Date & time, and duration */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {new Date(`${event.date}T${event.time}`).toLocaleString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </span>
          <span className="flex items-center gap-1 text-xs bg-gray-200 rounded px-2 py-1">
            <FaClock className="w-3 h-3" />
            {event.duration > 60
              ? Math.floor(event.duration / 60) + " H"
              : event.duration + " M"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
