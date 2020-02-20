import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import { useParams } from "react-router-dom";

function Character(props) {
  // const location = useLocation();
  // console.log(location);
  // const { name } = location.state;
  // console.log(props.location.infoCharacter);
  const { id } = useParams();
  const [comicsCharacter, setComicsCharacter] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const myLink = "http://localhost:4000/character/" + id;

  const fetchData = async () => {
    try {
      console.log(id);
      const response = await axios.get(myLink);
      setComicsCharacter(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {isLoading === true ? (
        <div className=" loading"> Loading ...</div>
      ) : (
        <div className="container characterBloc">
          {comicsCharacter.results.map(comic => {
            return (
              <div key={comic.id} className="characterComicBloc">
                <img
                  src={
                    comic.thumbnail.path +
                    "/portrait_xlarge." +
                    comic.thumbnail.extension
                  }
                  alt={comic.title}
                  className="character-comic-image"
                />

                <h2>{comic.title} </h2>
                <div className="character-comic-description">
                  {comic.description}{" "}
                </div>
                <div className="d-flex column align-items-center">
                  <span className="print-price">Print Price </span>
                  <div className="price">{comic.prices[0].price} € </div>{" "}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Character;
