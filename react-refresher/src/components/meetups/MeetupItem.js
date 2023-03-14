import classes from "./MeetupItem.module.css";
import Card from "../ui/Card";
import { useContext } from "react";
import FavoritesContext from "../../store/favorites-context";

function MeetupItem({ title, id, image, address, description }) {
  const favoritesContext = useContext(FavoritesContext);

  const isFavorite = favoritesContext.itemIsFavorite(id);
  console.log(isFavorite);

  const toggleFavoriteStatusHandler = () => {
    if (isFavorite) {
      favoritesContext.removeFavorite(id);
    } else {
      favoritesContext.addFavorite({
        id,
        image,
        title,
        description,
        address,
      });
    }
  };

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
          <button onClick={toggleFavoriteStatusHandler}>
            {isFavorite ? "Remove from Favorites" : "To Favorites"}
          </button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
