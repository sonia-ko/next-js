import { createContext, useState } from "react";

const FavoritesContext = createContext({
  favorites: [],
  totalFavorites: 0,
  addFavorite: (meetup) => {},
  removeFavorite: (id) => {},
  itemIsFavorite: (id) => {},
});

export function FavoritesContextProvider(props) {
  const [favorites, setFavorites] = useState([]);

  function addFavoriteHandler(meetup) {
    setFavorites((prevState) => prevState.concat(meetup));
  }

  function removeFavoriteHandler(id) {
    // setFavorites(favorites.filter((item) => item.id !== id));
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  }

  function itemIsFavoriteHandler(id) {
    return favorites.some((meetup) => meetup.id === id);
  }

  const context = {
    favorites: favorites,
    totalFavorites: favorites.length,
    addFavorite: addFavoriteHandler,
    removeFavorite: removeFavoriteHandler,
    itemIsFavorite: itemIsFavoriteHandler,
  };

  return (
    <FavoritesContext.Provider value={context}>
      {props.children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContext;
