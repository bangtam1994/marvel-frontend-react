import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const SearchComics = ({ setData }) => {
  const [searchInput, setSearchInput] = useState("");
  const handleSubmit = async event => {
    event.preventDefault();
    const response = await axios.get(
      `https://marvel-backend-bt.herokuapp.com/comics?search=${searchInput}`
    );
    console.log("SEARCH INPUT COMICS", searchInput);
    setData(response.data.data);
  };

  return (
    <div className="search container">
      <input
        className="search-input"
        onChange={event => {
          setSearchInput(event.target.value);
        }}
        placeholder="What are you looking for?"
        type="text"
      />
      <FontAwesomeIcon
        className="icon-search"
        icon="search"
        onClick={handleSubmit}
      />
    </div>
  );
};

export default SearchComics;
