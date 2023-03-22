import { getAllEvents } from "@/helpers/api-utils";
import { useRouter } from "next/router";
import EvenList from "@/components/events/event-list";
import EventSearch from "@/components/events/events-search";
import Head from "next/head";

function AllEventsPage(props) {
  const events = props.events;

  const router = useRouter();

  function filterEvents(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }
  return (
    <>
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="Find a lot of great events that will help you to evolve"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <h1>All Events</h1>
        <EventSearch onSearch={filterEvents} />
        <EvenList items={events} />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events,
    },
    revalidate: 3000,
  };
}
export default AllEventsPage;
