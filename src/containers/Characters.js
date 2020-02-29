import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import SearchCharacter from "../components/SearchCharacter";
import Pagination from "../components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";

import sad from "../assets/images/hulk-sad.jpg";

function Characters({
  myFavCharacters,
  setMyFavCharacters,
  favCharacFromCookie,
  // favCharacFromUser,
  // setFavCharacFromUser,
  user,
  setFavAdded,
  setFavRemoved
}) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [favActive, setFavActive] = useState(false);
  let history = useHistory();

  // Fonction pour récupérer les data et afficher tous les personnages
  const fetchData = async numberPage => {
    try {
      const response = await axios.get(
        `https://marvel-backend-bt.herokuapp.com/characters?page=${numberPage}`
      );
      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //Fonction pour mettre en favori COOKIE

  const handleFav = id => {
    if (!favCharacFromCookie) {
      //Si je n'ai renseigné aucun cookie jusque là
      Cookies.set("favCharac", id, { expires: 2 }); // favCharac, 1233112
      setMyFavCharacters(favCharacFromCookie);
    } else {
      Cookies.set("favCharac", favCharacFromCookie + "," + id, { expires: 2 });
      setMyFavCharacters(favCharacFromCookie);
    }
  };

  // Fonction pour remove des favoris Cookies
  const handleRemoveFav = id => {
    let fav = Cookies.get("favCharac");
    let tabFav = JSON.parse("[" + fav + "]");
    let index = tabFav.indexOf(id);
    if (index > -1) {
      tabFav.splice(index, 1);
    }
    Cookies.set("favCharac", tabFav.toString(), { expires: 2 });
  };

  // Fonction pour mettre en favori MONGODB

  // const handleFavUser = async id => {
  //   try {
  //     const response = await axios.post(
  //       `http://localhost:4000/user/add/favorites`,
  //       {
  //         marvelId: id
  //       },

  //       {
  //         headers: {
  //           Authorization: "Bearer " + token
  //         }
  //       }
  //     );
  //     console.log("réponse de l'API pour le Fav USER:", response.data);
  //     alert("Booked in backend !");
  //     setFavCharacFromUser(response.data.user.favorites); //Les favoris (tableau) sont une clé dans l'objet user du backend.
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  return (
    <>
      <div className="banner">
        <div className="banner-characters">
          <h1>CHARACTERS </h1>
          <h2>Get hook on em!</h2>
        </div>
      </div>

      <SearchCharacter setData={setData} />

      {isLoading === true ? (
        <div className="container loading"> Loading ... </div>
      ) : (
        <>
          {data.results.length !== 0 ? (
            <div className="characters-list container">
              {data.results.map(result => {
                const LinkToCharacter = `/character/${result.id}`;
                let iconStatus = false;
                if (
                  favCharacFromCookie &&
                  favCharacFromCookie
                    .split(",")
                    .indexOf(result.id.toString()) !== -1
                ) {
                  //Si j'ai trouvé mon id dans mes cookies
                  iconStatus = true;
                }

                return (
                  <div
                    key={result.id}
                    className="card"
                    onClick={() => {
                      history.push(LinkToCharacter);
                    }}
                  >
                    <img
                      src={
                        result.thumbnail.path +
                        "/standard_xlarge." +
                        result.thumbnail.extension
                      }
                      alt={result.name}
                      className="card-image"
                    />
                    {/* Si connecté : favoris en backend  */}
                    {/* {user ? (
                      <FontAwesomeIcon
                        className={
                          // favActivated === true
                          //   ? "icon-heart activated" :
                          "icon-heart"
                        }
                        icon="heart"
                        onClick={e => {
                          e.stopPropagation();
                          handleFavUser(result.id);
                          alert("Booked as Fav!");
                        }}
                      />
                    ) : ( */}
                    {/* // Si pas connecté : favoris en cookie */}
                    <>
                      {iconStatus === true ? (
                        <FontAwesomeIcon
                          className={"icon-heart-active"}
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
                          className="icon-heart"
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
                    }
                    <div className="card-details">
                      <h2>{result.name} </h2>
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

export default Characters;
