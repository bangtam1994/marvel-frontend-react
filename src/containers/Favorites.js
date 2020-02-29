import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Favorites({
  myFavCharacters,
  favCharacFromCookie,
  myFavComics,
  favComicFromCookie,
  favCharacFromUser,
  user
}) {
  let history = useHistory();
  const [dataCharacFav, setDataCharacFav] = useState([]); //Favoris cookies
  const [isCookieCharacLoading, setIsCookieCharacLoading] = useState(true);

  const [dataComicFav, setDataComicFav] = useState([]); //Favoris cookies
  const [isCookieComicLoading, setIsCookieComicLoading] = useState(true);

  const [dataFavUser, setDataFavUser] = useState([]); //Favoris User
  const [isUserLoading, setIsUserLoading] = useState(true);

  // FAVORIS CHARAC EN COOKIE : Requête au backend
  const fetchData = async cookie => {
    try {
      const response = await axios.get(
        `https://marvel-backend-bt.herokuapp.com/favorites/charac?fav=${cookie}`
      );
      // console.log("LA REPONSE DU BACKEND EST : ", response.data);
      setDataCharacFav(response.data);
      // console.log("MON DATA FAV NOUVEAU EST", dataFav);
      setIsCookieCharacLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  // FAVORIS COMIC EN COOKIE : Requête au backend
  const fetchData2 = async cookie => {
    try {
      const response = await axios.get(
        `http://localhost:4000/favorites/comics?fav=${cookie}`
      );
      // console.log("LA REPONSE DU BACKEND EST : ", response.data);
      setDataComicFav(response.data);
      // console.log("MON DATA FAV NOUVEAU EST", dataFav);
      setIsCookieComicLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  // // -------  FAVORIS EN USER : Requête au backend -----
  // const fetchDataFromUser = async info => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:4000/user/favorites?fav=${info}`
  //     );
  //     console.log("LA REPONSE DU BACKEND USER : ", response.data);
  //     setDataFavUser(response.data);
  //     console.log("MON DATAFAVUSER  EST", dataFavUser);
  //     setIsUserLoading(false);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // ----- APPEL DE LA FONCTION FETCHDATA ----
  // Pas connecté : fetchdata cookie
  useEffect(() => {
    fetchData(favCharacFromCookie);
    console.log(favComicFromCookie);
    fetchData2(favComicFromCookie);
    console.log(">>", dataComicFav);
  }, []);

  // // Je suis connecté : j'appelle fetchDataFromUser pour récupérer les infos du User
  // useEffect(() => {
  //   fetchDataFromUser(favCharacFromUser.toString());
  // }, []);

  return (
    <>
      <div className="banner">
        <div className="banner-favorites">
          <h1>FAVORITES </h1>
          <h2>Keep them close to you.</h2>
        </div>
      </div>

      <div className="container d-flex space-between">
        {/* BLOC CHARACTERS FAVORITES  */}
        <div className="favBloc">
          {/* USER Pas connecté ----> FAVORIS EN COOKIE  */}
          {user === null ? (
            <div>
              <h2>My favorites characters (COOKIE)</h2>
              {myFavCharacters === null ? (
                <div className="empty">
                  No Favorites Characters added for now
                </div>
              ) : (
                <div>
                  {isCookieComicLoading ? (
                    <div>Loading...</div>
                  ) : (
                    <div>
                      {dataCharacFav.map(data => {
                        return (
                          <div
                            className="favorites-card"
                            onClick={() => {
                              history.push(`/character/${data.id}`);
                            }}
                          >
                            <img src={data.urlPicture} alt={data.name} />
                            <div>
                              <h3> {data.name}</h3>
                              <div className=""> {data.description}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            //  User connecté: favoris en BACKEND
            <div>
              <h2> My Favorites characters (User)</h2>
              {dataFavUser.map(data => {
                return (
                  <div
                    className="favorites-card"
                    key={data.id}
                    onClick={() => {
                      history.push(`/character/${data.id}`);
                    }}
                  >
                    <img src={data.urlPicture} alt={data.name} />
                    <div>
                      <h3> {data.name}</h3>
                      <div className=""> {data.description}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* BLOC COMICS FAVORITES  */}

        <div className="favBloc">
          {/* USER Pas connecté ----> FAVORIS EN COOKIE  */}
          {user === null ? (
            <div>
              <h2>My favorites Comics (COOKIE)</h2>
              {myFavComics === null ? (
                <div className="empty">No Favorites Comics added for now</div>
              ) : (
                <>
                  {isCookieComicLoading ? (
                    <div> Loading...</div>
                  ) : (
                    <div>
                      {dataComicFav.map(data => {
                        return (
                          <div
                            className="favorites-card"
                            onClick={() => {
                              history.push(`/comics`);
                            }}
                          >
                            <img src={data.urlPicture} alt={data.name} />
                            <div>
                              <h3> {data.name}</h3>
                              <div className=""> {data.description}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </div>
          ) : (
            //  User connecté: favoris en BACKEND
            <div>
              <h2> My Favorites Comics (User)</h2>
              {dataFavUser.map(data => {
                return (
                  <div
                    className="favorites-card"
                    key={data.id}
                    onClick={() => {
                      history.push(`/comics`);
                    }}
                  >
                    <img src={data.urlPicture} alt={data.name} />
                    <div>
                      <h3> {data.name}</h3>
                      <div className=""> {data.description}</div>
                    </div>
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
