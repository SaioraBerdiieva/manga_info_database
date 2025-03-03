import { Link, useParams } from "react-router-dom";
import { useGlobalContext } from "../context/global";
import { useEffect, useState } from "react";

function Gallery() {
  const { getMangaPictures, picture } = useGlobalContext();
  const { id, name } = useParams();
  useEffect(() => {
    getMangaPictures(id);
  }, []);
  const [index, setIndex] = useState(0);
  const handleImageClick = (i) => {
    setIndex(i);
  };

  return (
    <div className="gallery">
      <h1>{name}</h1>
      <div className="back">
        <Link to="/">Back</Link>
        {/* Back link to go to the homepage */}
      </div>
      <div className="big-image">
        <img src={picture[index]?.jpg.image_url} alt="" />
      </div>
      <div className="small-images">
        {picture?.map((pic, i) => {
          return (
            <div
              className="image-con"
              onClick={() => {
                handleImageClick(i);
              }}
              key={i}
            >
              <img
                src={pic?.jpg.image_url}
                style={{
                  border:
                    i === index ? "3px solid #27AE60" : "3px solid #e5e7eb",
                  filter: i === index ? "grayscale(0)" : "grayscale(60%)",
                  transform: i === index ? "scale(1.1)" : "scale(1)",
                  transition: "all .3s ease-in-out",
                }}
                alt=""
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Gallery;
