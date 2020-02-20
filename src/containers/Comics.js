import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import Pagination from "../components/Pagination";
import sad from "../assets/images/hulk-sad.jpg";

function Comics() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [numberPage, setNumberPage] = useState(1);

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

  return (
    <>
      <div className="banner">
        <div className="banner-comics">
          <h1>COMICS </h1>
          <h2>Decades of art and passion.</h2>
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
                // const LinkToComics = `/comics/${result.id}`;
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
                    {/* <Link
                  to={{
                    pathname: LinkToCharacter,
                    infoCharacter: {
                      name: "Hello"
                    }
                  }}
                  style={{ textDecoration: "none", color: "black" }}
                  id={result.id}
                > */}
                    <img
                      src={
                        result.thumbnail.path +
                        "/standard_xlarge." +
                        result.thumbnail.extension
                      }
                      alt={result.title}
                      className="card-image"
                    />
                    <div className="card-details">
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
