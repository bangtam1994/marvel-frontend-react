import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

function Favorites({
  myFavCharacters,
  setMyFavCharacters,
  myFavComics,
  setMyFavComics
}) {
  const [dataFav, setDataFav] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  //Requête au backend : j'envoie mon cookie favCharac

  const fetchData = async myFavCharacters => {
    try {
      const response = await axios.get(
        `http://localhost:4000/favorites?fav=${myFavCharacters}`
      );
      setDataFav(response.data);
      console.log("REPONSE DU BACKEND !!", response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  //J'appelle fetchData si j'ai un state avec un cookie

  fetchData();

  //fav = [string, string, string] {id:id, name:name}
  // console.log("Le state fav est : ", myFavCharacters);
  // console.log(typeof myFavCharacters);

  // console.log("Le newFavCHARACT  ", newFavCharacters);

  // Je fais de même pour les cookies de comics

  // console.log("Le newFavCOMICS  ", newFavComics);

  // console.log("LE NEW FAV CHARACTER", newFavCharacter);
  // console.log(typeof newFavCharacter);

  //   console.log("Le newFav  ", fav);
  //   console.log(typeof fav);

  return (
    <>
      <div className="banner">
        <div className="banner-favorites">
          <h1>FAVORITES </h1>
          <h2>Keep them close to you.</h2>
        </div>
      </div>

      {myFavCharacters === null ? (
        <div> No Favorites Characters added for now </div>
      ) : isLoading === true ? (
        <div className="container loading"> Loading ... </div>
      ) : (
        <div className="favorites-characters container">
          <h2>My favorites characters</h2>
          {dataFav.map(elem => {
            return (
              <div key={elem.id}>
                <div> {elem.name}</div>
                <div> {elem.description}</div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Favorites;
