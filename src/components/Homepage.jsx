import { useGlobalContext } from "../context/global";
import Ongoing from "./Ongoing";
import Popular from "./Popular";
import Finished from "./Complete";
import React from "react";
function Homepage() {
  const [rendered, setRendered] = React.useState("popular");
  const {
    handleChange,
    handleSubmit,
    searchManga,
    search,
    getPopularManga,
    getOngoingManga,
    getFinishedManga,
  } = useGlobalContext();

  const switchComponent = () => {
    switch (rendered) {
      case "popular":
        return <Popular rendered={rendered} />;
      case "airing":
        return <Ongoing rendered={rendered} />;
      case "finished":
        return <Finished rendered={rendered} />;
      default:
        return <Popular rendered={rendered} />;
    }
  };

  return (
    <>
      <header>
        <div className="header-cont">
          <div className="logo-hmpage">
            <h1>
              {rendered === "popular"
                ? "Popular Manga"
                : rendered === "airing"
                ? "Ongoing Manga"
                : "Finished Manga"}
            </h1>
          </div>
          <div className="search-container">
            <div className="filter-btn popular-filter">
              <button
                onClick={() => {
                  setRendered("popular");
                  getPopularManga();
                }}
              >
                Popular
              </button>
            </div>
            <form action="" className="search-form" onSubmit={handleSubmit}>
              <div className="input-control">
                <input
                  type="text"
                  placeholder="Search Manga"
                  value={search}
                  onChange={handleChange}
                />
                <button type="submit">Search</button>
              </div>
            </form>
            <div className="filter-btn airing-filter">
              <button
                onClick={() => {
                  setRendered("airing");
                  getOngoingManga();
                }}
              >
                Ongoing
              </button>
            </div>
            <div className="filter-btn finished-filter">
              <button
                onClick={() => {
                  setRendered("finished");
                  getFinishedManga();
                }}
              >
                Finished
              </button>
            </div>
          </div>
        </div>
      </header>
      {switchComponent()}
    </>
  );
}
export default Homepage;
