import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import Pagination from "../components/Pagination";

import sad from "../assets/images/hulk-sad.jpg";
function Characters() {
  const [data, setData] = useState({});
  console.log("LE DATA.results EST //////// ", data.results);
  const [isLoading, setIsLoading] = useState(true);
  const [numberPage, setNumberPage] = useState(1);

  // Fonction pour récupérer les data
  const fetchData = async numberPage => {
    try {
      const response = await axios.get(
        `http://localhost:4000/characters?page=${numberPage}`
      );
      setData(response.data.data);
      console.log("mon data est", data);
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
      <div className="banner">
        <div className="banner-characters">
          <h1>CHARACTERS </h1>
          <h2>Get hook on em!</h2>
        </div>
      </div>

      <Search setData={setData} />

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
                    // onClick={() => {
                    //   history.push(LinkToCharacter, {
                    //     name: result.name
                    // picture:
                    //   result.thumbnail.path +
                    //   "/standard_xlarge." +
                    //   result.thumbnail.extension
                    // });
                    // }}
                  >
                    <Link
                      to={{
                        pathname: LinkToCharacter,
                        infoCharacter: {
                          name: "Hello"
                        }
                      }}
                      style={{ textDecoration: "none", color: "black" }}
                      id={result.id}
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
                      <div className="card-details">
                        <h2>{result.name} </h2>
                        <p>{result.description} </p>
                      </div>
                    </Link>
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
