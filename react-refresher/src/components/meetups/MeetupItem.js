import classes from "./MeetupItem.module.css";
import Card from "../ui/Card";

function MeetupItem({ title, image, address, description }) {
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img alt="" src={image} />
        </div>
        <div className={classes.content}>
          <h3>{title}</h3>
          <address>{address}</address>
          <p>{description}</p>
        </div>
        <div className={classes.actions}>
          <button>To Favorites</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
