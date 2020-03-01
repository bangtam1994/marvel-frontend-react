import React, { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";

import { useParams } from "react-router-dom";

function Character(props) {
  // const location = useLocation();
  // console.log(location);
  // const { name } = location.state;
  // console.log(props.location.infoCharacter);
  const { id } = useParams();

  const [infoCharacter, setInfoCharacter] = useState({});
  const [comicsCharacter, setComicsCharacter] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const myLinkForComics =
    "https://marvel-backend-bt.herokuapp.com/character/" + id;
  const myLinkForCharacter =
    "https://marvel-backend-bt.herokuapp.com/character/info/" + id;

  const fetchData = async () => {
    try {
      const response = await axios.get(myLinkForComics);
      setComicsCharacter(response.data.data);

      const response2 = await axios.get(myLinkForCharacter);
      setInfoCharacter(response2.data.data);

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
          <div className="characterBloc card">
            {infoCharacter.results.map(info => {
              return (
                <div key={info.id} className="d-flex">
                  <Helmet>
                    <title>Marvel | {info.name}</title>
                  </Helmet>
                  <img
                    src={
                      info.thumbnail.path +
                      "/portrait_xlarge." +
                      info.thumbnail.extension
                    }
                    alt={info.name}
                    className="character-comic-image"
                  />
                  <div className="character-comic-description">
                    <h3> {info.name}</h3>
                    <div> {info.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
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
                  {comic.description}
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
