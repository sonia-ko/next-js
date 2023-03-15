import { useContext } from "react";
import MeetupList from "../components/meetups/MeetupList";
import FavoritesContext from "../store/favorites-context";

function FavoritesPage() {
  const favoritesContext = useContext(FavoritesContext);

  let content;

  if (favoritesContext.totalFavorites === 0) {
    content = <p>You have got no favorites yet. Start adding some?</p>;
  } else {
    content = <MeetupList items={favoritesContext.favorites} />;
  }
  return (
    <section>
      <h1>My favorites</h1>
      {content}
    </section>
  );
}

export default FavoritesPage;
