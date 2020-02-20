import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function Favorites({
  myFavCharacters,
  setMyFavCharacters,
  myFavComics,
  setMyFavComics
}) {
  let history = useHistory();

  // const [isLoading, setIsLoading] = useState(true);

  //Requête au backend : j'envoie mon cookie favCharac ?

  // const fetchData = async cookie => {
  //   try {
  //     const response = await axios.get(
  //       `https://marvel-backend-bt.herokuapp.com/favorites?fav=${cookie}`
  //     );
  //     setDataFav(response);
  //     console.log("REPONSE DU BACKEND !!");
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  //J'appelle fetchData si j'ai un state avec un cookie

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // Je transforme la cookie (string) de myFavCharacters et myFavComics en un tableau d'ID pour mapper par la suite dessus
  let newFavCharacter;
  let newFavComics;

  if (myFavCharacters !== null) {
    newFavCharacter = JSON.parse("[" + myFavCharacters + "]");
  }

  if (myFavComics !== null) {
    newFavComics = JSON.parse("[" + myFavComics + "]");
  }

  return (
    <>
      <div className="banner">
        <div className="banner-favorites">
          <h1>FAVORITES </h1>
          <h2>Keep them close to you.</h2>
        </div>
      </div>

      <div className="container d-flex space-between">
        <div className="favBloc">
          <h2>My favorites characters</h2>
          {myFavCharacters === null ? (
            <div className="empty">No Favorites Characters added for now</div>
          ) : (
            <div>
              {newFavCharacter.map((fav, index) => {
                return (
                  <div
                    className="favorites-list"
                    key={index}
                    onClick={() => {
                      history.push(`/character/${fav}`);
                    }}
                  >
                    {fav}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="favBloc">
          <h2>My favorites comics</h2>
          {myFavComics === null ? (
            <div className="empty">No Favorites Comics added for now</div>
          ) : (
            <div>
              {newFavComics.map((fav, index) => {
                return (
                  <div
                    className="favorites-list"
                    key={index}
                    onClick={() => {
                      history.push(`/comics`);
                    }}
                  >
                    {fav}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Favorites;
