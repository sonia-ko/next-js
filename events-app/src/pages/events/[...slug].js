import { useRouter } from "next/router";
import { getFilteredEvents } from "../../../dummy-data";
import EvenList from "@/components/events/event-list";
import ResultsTitle from "@/components/icons/results-title";
import Button from "@/components/UI/button";
import ErrorAlert from "@/components/icons/error-alert";

function FilteredEventsPage() {
  const router = useRouter();
  const filteredData = router.query.slug;

  if (!filteredData) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = filteredData[0];
  const filteredMonth = filteredData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth > 12 ||
    numMonth < 1
  ) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter, please adjust your values</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events"> Show all</Button>
        </div>
      </>
    );
  }

  const filteredEvents = getFilteredEvents({ year: numYear, month: numMonth });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <p>No events found found for the chosen filter</p>
        <div className="centered">
          <Button link="/event">Show all</Button>
        </div>
      </>
    );
  }

  const date = new Date(numYear, numMonth - 1);
  return (
    <>
      <ResultsTitle date={date} />
      <EvenList items={filteredEvents} />
    </>
  );
}

export default FilteredEventsPage;
