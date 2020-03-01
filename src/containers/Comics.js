import React, { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import SearchComics from "../components/SearchComics";
import Pagination from "../components/Pagination";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import sad from "../assets/images/hulk-sad.jpg";

function Comics({
  myFavComics,
  setMyFavComics,
  favComicFromCookie,
  setFavAdded,
  favComicFromUser,
  setFavComicFromUser,
  user,
  token,
  setFavRemoved
}) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Fonction pour récupérer les data
  const fetchData = async numberPage => {
    try {
      const response = await axios.get(
        `https://marvel-backend-bt.herokuapp.com/comics?page=${numberPage}`
      );
      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  //Fonction pour mettre en favori COOKIE

  const handleFav = id => {
    if (!favComicFromCookie) {
      //Si je n'ai renseigné aucun cookie jusque là
      Cookies.set("favComic", id, { expires: 2 }); // favComic, 1233112
      setMyFavComics(favComicFromCookie);
    } else {
      Cookies.set("favComic", favComicFromCookie + "," + id, { expires: 2 });
      setMyFavComics(favComicFromCookie);
    }
  };

  // Fonction pour remove des favoris Cookies
  const handleRemoveFav = id => {
    let fav = Cookies.get("favComic");
    let tabFav = JSON.parse("[" + fav + "]");
    let index = tabFav.indexOf(id);
    if (index > -1) {
      tabFav.splice(index, 1);
    }
    Cookies.set("favComic", tabFav.toString(), { expires: 2 });
  };

  // Fonction pour mettre en favori MONGODB

  const handleFavUser = async id => {
    try {
      const response = await axios.post(
        `https://marvel-backend-bt.herokuapp.com/user/add/favorites`,
        {
          marvelId: id,
          type: "comic"
        },
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  // Fonction pour remove des favori MONGODB
  const handleRemoveFavUser = async id => {
    try {
      const response = await axios.post(
        `https://marvel-backend-bt.herokuapp.com/user/delete/favorites`,
        {
          marvelId: id,
          type: "comic"
        },

        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      if (response.data === "Favorite deleted") {
        setFavComicFromUser(response.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //Checker les favoris du User
  const fetchFavUser = async () => {
    try {
      const response = await axios.get(
        "https://marvel-backend-bt.herokuapp.com/user/favorites/check",
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      setFavComicFromUser(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
    fetchFavUser();
  }, []);

  return (
    <>
      <Helmet>
        <title>Marvel characters</title>
      </Helmet>
      <div className="banner">
        <div className="banner-comics">
          <h1>COMICS </h1>
          <h2>Decades of art and passion.</h2>
        </div>
      </div>

      <SearchComics setData={setData} />

      {isLoading === true ? (
        <div className="container loading"> Loading ... </div>
      ) : (
        <>
          {data.results.length !== 0 ? (
            <div className="characters-list container">
              {data.results.map(result => {
                let iconStatus = false;
                if (user) {
                  //Si je suis connecté, je vais chercher les favoris de User
                  for (let i = 0; i < favComicFromUser.length; i++) {
                    if (favComicFromUser[i].marvelId === result.id) {
                      iconStatus = true;
                      break;
                    }
                  }
                } else {
                  // Si je ne suis pas connecté
                  if (
                    favComicFromCookie &&
                    favComicFromCookie
                      .split(",")
                      .indexOf(result.id.toString()) !== -1
                  ) {
                    //Si j'ai trouvé mon id dans mes cookies
                    iconStatus = true;
                  }
                }
                return (
                  <div key={result.id} className="comic-bloc">
                    <img
                      src={
                        result.thumbnail.path +
                        "/portrait_fantastic." +
                        result.thumbnail.extension
                      }
                      alt={result.title}
                      className="card-image"
                    />
                    {user ? (
                      //User connecté  ---> MONGODB

                      <>
                        {iconStatus === true ? (
                          <FontAwesomeIcon
                            className={"icon-2-heart-active"}
                            icon="heart"
                            onClick={e => {
                              e.stopPropagation();
                              handleRemoveFavUser(result.id);
                              setFavRemoved(true);
                              setTimeout(() => {
                                setFavRemoved(false);
                              }, 2000);
                            }}
                          />
                        ) : (
                          <FontAwesomeIcon
                            className="icon-2-heart"
                            icon="heart"
                            onClick={e => {
                              e.stopPropagation();
                              handleFavUser(result.id);
                              setFavAdded(true);
                              setTimeout(() => {
                                setFavAdded(false);
                              }, 2000);
                            }}
                          />
                        )}
                      </>
                    ) : (
                      // Si pas connecté : favoris en cookie
                      <>
                        {iconStatus === true ? (
                          <FontAwesomeIcon
                            className={
                              // favActivated === true
                              //   ? "icon-heart activated" :
                              "icon-2-heart-active"
                            }
                            icon="heart"
                            onClick={e => {
                              e.stopPropagation();
                              handleRemoveFav(result.id);
                              setFavRemoved(true);
                              setTimeout(() => {
                                setFavRemoved(false);
                              }, 2000);
                            }}
                          />
                        ) : (
                          <FontAwesomeIcon
                            className="icon-2-heart"
                            icon="heart"
                            onClick={e => {
                              e.stopPropagation();
                              handleFav(result.id);
                              setFavAdded(true);
                              setTimeout(() => {
                                setFavAdded(false);
                              }, 2000);
                            }}
                          />
                        )}
                      </>
                    )}

                    <div className="comic-details">
                      <h2>{result.title} </h2>
                      <p>{result.description} </p>
                    </div>
                  </div>
                );
              })}

              <Pagination
                data={data}
                setData={setData}
                fetchData={fetchData}
                setIsLoading={setIsLoading}
              />
            </div>
          ) : (
            <div className="container loading">
              <span> Sorry, can't find any results ! </span>
              <img src={sad} alt="no-search-found" className="sad" />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Comics;
