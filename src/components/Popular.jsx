import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/global";

function Popular({ rendered }) {
  const { popularManga, isSearch, searchResults } = useGlobalContext();
  const conditionalRender = () => {
    if (!isSearch && rendered === "popular") {
      return popularManga.map((manga) => {
        return (
          <Link to={`/manga/${manga.mal_id}`} key={manga.mal_id}>
            <img
              src={manga.images.jpg.large_image_url}
              alt={"Manga cover of " + manga.title}
            />
          </Link>
        );
      });
    } else {
      return searchResults?.map((manga) => {
        return (
          <Link to={`/manga/${manga.mal_id}`} key={manga.mal_id}>
            <img
              src={manga.images.jpg.large_image_url}
              alt={"Manga cover of " + manga.title}
            />
          </Link>
        );
      });
    }
  };
  return (
    <section className="main-pg">
      <div className="popular-manga">{conditionalRender()}</div>
    </section>
  );
}

export default Popular;
