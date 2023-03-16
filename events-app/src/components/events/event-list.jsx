import EventItem from "./event-item";
import classes from "./event-list.module.css";

function EvenList({ items }) {
  return (
    <ul>
      {items.map((event) => {
        return (
          <EventItem
            image={event.image}
            date={event.date}
            location={event.location}
            title={event.title}
            key={event.id}
            id={event.id}
          />
        );
      })}
    </ul>
  );
}

export default EvenList;
