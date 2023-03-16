import { useRouter } from "next/router";
import { getEventById } from "../../../dummy-data";
import EventSummary from "@/components/event-detail/event-summary";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventContent from "@/components/event-detail/event-content";
import ErrorAlert from "@/components/icons/error-alert";

function EventDetailPage() {
  const router = useRouter();

  const eventID = router.query.eventId;

  const event = getEventById(eventID);

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found</p>
      </ErrorAlert>
    );
  }
  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        imageAlt={event.title}
        image={event.image}
        address={event.location}
        date={event.date}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
}

export default EventDetailPage;
