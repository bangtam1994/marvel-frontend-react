import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchComics from "../components/SearchComics";
import Pagination from "../components/Pagination";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import sad from "../assets/images/hulk-sad.jpg";

function Comics({ myFavComics, setMyFavComics, favComicFromCookie }) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Fonction pour récupérer les data
  const fetchData = async numberPage => {
    try {
      const response = await axios.get(
        `http://localhost:4000/comics?page=${numberPage}`
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
    if (!favComicFromCookie) {
      console.log("Il considère que favComicfromCookie est null ! ");

      //Si je n'ai renseigné aucun cookie jusque là
      Cookies.set("favComic", id, { expires: 2 }); // favComic, 1233112
      setMyFavComics(favComicFromCookie);
      console.log(">><<<<<<<<<>", myFavComics);
    } else {
      console.log("Il considère que fav est déjà rempli ! ");

      Cookies.set("favComic", favComicFromCookie + "," + id, { expires: 2 });
      setMyFavComics(favComicFromCookie);
      console.log(">>>>>>", myFavComics);
      console.log(typeof myFavComics);
    }
  };

  return (
    <>
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
                // const LinkToComics = `/comics/${result.id}`;
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

                    <FontAwesomeIcon
                      className="icon-2-heart"
                      icon="heart"
                      onClick={() => {
                        handleFav(result.id);
                        console.log(result.id);
                        alert("Booked as Fav !");
                      }}
                    />

                    <div className="comic-details">
                      <h2>{result.title} </h2>
                      <p>{result.description} </p>
                    </div>
                    {/* </Link> */}
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
