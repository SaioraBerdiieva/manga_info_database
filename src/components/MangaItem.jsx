import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
function MangaItem() {
  const { id } = useParams();
  //==========MANGA STATE======
  const [manga, setManga] = useState({});
  const [characters, setCaracters] = useState([]);
  const [showMore, setShowMore] = useState(false);
  //================GETTING MANGA(by id)===================
  const getMangaById = async (manga) => {
    const response = await fetch(`https://api.jikan.moe/v4/manga/${manga}`);
    const data = await response.json();
    setManga(data.data);
  };
  //====================GETTING CHARACTERS===========================
  const getCharacters = async (manga) => {
    const response = await fetch(
      `https://api.jikan.moe/v4/manga/${manga}/characters`
    );
    const data = await response.json();
    setCaracters(data.data);
  };
  //=====================GETTING DATA==================================
  useEffect(() => {
    getMangaById(id);
    getCharacters(id);
  }, []);
  //====================DESTRUCTURING MANGA OBJ======================
  //=============================
  const {
    title,
    authors,
    genres,
    status,
    published,
    score,
    volumes,
    chapters,
    scored_by,
    background,
    images,
    titles,
    popularity,
    synopsis,
  } = manga;
  const genresList = genres?.map((genre) => genre.name).join(", ");
  const titlesList = titles?.map((title) => title.title).join(", ");
  return (
    <div className="manga-box">
      <h1 className="title">{title}</h1>
      <div className="details">
        <div className="detail">
          <div className="image">
            <img src={images?.jpg.large_image_url} alt={"Cover of " + title} />
          </div>
          <div className="manga-details">
            <p>
              <span className="manga-info">Other titles: </span>
              <span>{titlesList}</span>
            </p>
            <p>
              <span>Author: </span>
              <span>{authors?.[0]?.name || "Unknown"}</span>
            </p>
            <p>
              <span>Published: </span>
              <span>{published?.string}</span>
            </p>
            <p>
              <span>Status: </span>
              <span>{status}</span>
            </p>
            {volumes && (
              <p>
                <span>Volumes: </span>
                <span>{volumes}</span>
              </p>
            )}
            {chapters && (
              <p>
                <span>Chapters: </span>
                <span>{chapters}</span>
              </p>
            )}
            <p>
              <span>Genres: </span>
              <span>{genresList}</span>
            </p>
            <p>
              <span>Score: </span>
              <span>{score}</span>
            </p>
            <p>
              <span>Scored By: </span>
              <span className="info-cont">{scored_by}</span>
            </p>
            <p>
              <span>Popularity: </span>
              <span>{popularity}</span>
            </p>
          </div>
        </div>
        <h3>Description: </h3>{" "}
        <p className="descriprion">
          {showMore ? synopsis : synopsis?.substring(0, 450) + "..."}
          <button
            onClick={() => {
              setShowMore((prevShowMore) => !prevShowMore);
            }}
            style={{
              // color: showMore ? "#80f992" : "#ff8ba7",
              color: showMore ? "#a786df" : "#ff8ba7",
            }}
          >
            {showMore ? "Show Less" : "Read More"}
          </button>
        </p>
      </div>
      <h3 className="title">Characters</h3>
      <section className="characters">
        {characters && characters.length > 0 ? (
          characters.map((character, index) => {
            const { role } = character;
            const { images, name, mal_id } = character.character;
            const imageUrl =
              images?.jpg?.image_url || "path/to/placeholder-image.jpg";

            return (
              <Link to={`/character/${mal_id}/${name}`} key={index}>
                <div className="character">
                  <img src={imageUrl} alt={"Illustration of " + name} />
                  <h4>{name}</h4>
                  <p>{role}</p>
                </div>
              </Link>
            );
          })
        ) : (
          <p>No information available</p>
        )}
      </section>
    </div>
  );
}
export default MangaItem;
