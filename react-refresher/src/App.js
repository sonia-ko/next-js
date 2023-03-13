import { Routes, Route } from "react-router-dom";
import FavoritesPage from "./pages/Favourites";
import NewMeetupsPage from "./pages/NewMeetup";
import AllMeetupsPage from "./pages/AllMeetups";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AllMeetupsPage />} />
        <Route path="/new-meetup" element={<NewMeetupsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="*" element={<AllMeetupsPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
