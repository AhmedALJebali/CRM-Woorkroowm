// app/events/page.tsx
import EventCard from "../_components/cards/EventCard";
import { events } from "../data";
import AddEventButton from "./_components/AddEventButton"; 
const EventsPage = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold ">Events</h1>
        
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white p-5 rounded-2xl">
            <EventCard event={event} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
