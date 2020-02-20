import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Pagination({ data, setData, fetchData, setIsLoading }) {
  const totalPages = Math.ceil(data.total / 100);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination container d-flex">
      {/* <FontAwesomeIcon icon="chevron-left" className="chevron" /> */}

      {pageNumbers.map((number, index) => {
        return (
          <div
            key={index}
            className="pagination-number"
            onClick={() => {
              setIsLoading(true);
              fetchData(number);
            }}
          >
            {number}
          </div>
        );
      })}
      {/* <FontAwesomeIcon icon="chevron-right" className="chevron" /> */}
    </div>
  );
}

export default Pagination;
