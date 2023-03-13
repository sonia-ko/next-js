import MeetupItem from "./MeetupItem";
import classes from "./MeetupList.module.css";

function MeetupList({ items }) {
  return (
    <ul className={classes.list}>
      {items.map((item) => {
        return (
          <MeetupItem
            address={item.address}
            description={item.description}
            key={item.id}
            title={item.title}
            image={item.image}
          />
        );
      })}
    </ul>
  );
}

export default MeetupList;
