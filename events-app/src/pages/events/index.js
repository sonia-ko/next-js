import { getAllEvents } from "../../../dummy-data";
import { useRouter } from "next/router";
import EvenList from "@/components/events/event-list";
import EventSearch from "@/components/events/events-search";

function AllEventsPage() {
  const events = getAllEvents();

  const router = useRouter();

  function filterEvents(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }
  return (
    <div>
      <h1>All Events</h1>
      <EventSearch onSearch={filterEvents} />
      <EvenList items={events} />
    </div>
  );
}

export default AllEventsPage;
