import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/global";

function Ongoing({ rendered }) {
  const { ongoingManga, isSearch, searchResults, loading, error } =
    useGlobalContext();

  const conditionalRender = () => {
    if (loading) {
      return <p>Loading...</p>;
    }
    if (error) {
      return <p>Error loading manga. Please try again later.</p>;
    }
    if (
      Array.isArray(ongoingManga) &&
      ongoingManga.length > 0 &&
      !isSearch &&
      rendered === "airing"
    ) {
      return ongoingManga.map((manga) => (
        <Link to={`/manga/${manga.mal_id}`} key={manga.mal_id}>
          <img
            src={manga.images.jpg.large_image_url}
            alt={"Manga cover of " + manga.title}
          />
        </Link>
      ));
    }
    return <p>No ongoing manga found</p>;
  };

  return (
    <section className="main-pg">
      <div className="popular-manga">{conditionalRender()}</div>
    </section>
  );
}

export default Ongoing;
