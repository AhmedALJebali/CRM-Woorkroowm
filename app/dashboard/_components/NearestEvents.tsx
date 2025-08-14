import React from "react";
import EventCard from "./cards/EventCard";
import { EEvent } from "@/types";



interface NearestEventsProps {
  events: EEvent[];
  limit?: number;
}

const NearestEvents: React.FC<NearestEventsProps> = ({ events, limit }) => {
  const displayedEvents = limit ? events.slice(0, limit) : events;

  return (
    <>
      <div className="flex flex-col gap-2">
        {displayedEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </>
  );
};

export default NearestEvents;
