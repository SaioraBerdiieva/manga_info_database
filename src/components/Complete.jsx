import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/global";

function Finished({ rendered }) {
  const { finishedManga, isSearch, loading, error } = useGlobalContext();

  const conditionalRender = () => {
    if (loading) {
      return <p>Loading...</p>;
    }
    if (error) {
      return <p>Error loading manga. Please try again later.</p>;
    }
    if (
      Array.isArray(finishedManga) &&
      finishedManga.length > 0 &&
      !isSearch &&
      rendered === "finished"
    ) {
      return finishedManga.map((manga) => (
        <Link to={`/manga/${manga.mal_id}`} key={manga.mal_id}>
          <img
            src={manga.images.jpg.large_image_url}
            alt={"Manga cover of " + manga.title}
          />
        </Link>
      ));
    }
    return <p>No complete manga found</p>;
  };

  return (
    <section className="main-pg">
      <div className="popular-manga">{conditionalRender()}</div>
    </section>
  );
}

export default Finished;
