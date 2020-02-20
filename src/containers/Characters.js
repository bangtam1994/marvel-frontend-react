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
  favCharacFromCookie
}) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  let history = useHistory();

  // Fonction pour récupérer les data
  const fetchData = async numberPage => {
    try {
      const response = await axios.get(
        `http://localhost:4000/characters?page=${numberPage}`
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

  //Fonction pour mettre en favori

  const handleFav = id => {
    if (!favCharacFromCookie) {
      console.log("Il considère que favCharacfromCookie est null ! ");

      //Si je n'ai renseigné aucun cookie jusque là
      Cookies.set("favCharac", id, { expires: 2 }); // favCharac, 1233112
      setMyFavCharacters(favCharacFromCookie);
      console.log(">><<<<<<<<<>", myFavCharacters);
    } else {
      console.log("Il considère que fav est déjà rempli ! ");

      Cookies.set("favCharac", favCharacFromCookie + "," + id, { expires: 2 });
      setMyFavCharacters(favCharacFromCookie);
      console.log(">>>>>>", myFavCharacters);
      console.log(typeof myFavCharacters);
    }
  };

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
                    <FontAwesomeIcon
                      className="icon-heart"
                      icon="heart"
                      onClick={e => {
                        e.stopPropagation();
                        handleFav(result.id);
                        alert("Booked as Fav !");
                      }}
                    />

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
