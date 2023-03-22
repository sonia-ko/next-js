// import { getEventById } from "../../../dummy-data";
import { getEventById, getFeaturedEvents } from "@/helpers/api-utils";
import EventSummary from "@/components/event-detail/event-summary";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventContent from "@/components/event-detail/event-content";
import ErrorAlert from "@/components/icons/error-alert";
import Button from "@/components/UI/Button";
import Head from "next/head";

function EventDetailPage(props) {
  const event = props?.selectedEvent;

  if (props.hasError) {
    return (
      <>
        <ErrorAlert>
          <p>Event not found</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events/"> Show all</Button>
        </div>
      </>
    );
  }

  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>

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

export async function getStaticProps(context) {
  const eventId = context.params.eventId;

  const event = await getEventById(eventId);

  if (!event) {
    return {
      props: {
        notFound: true,
        hasError: true,
      },
    };
  }

  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths,
    fallback: true,
  };
}

export default EventDetailPage;
