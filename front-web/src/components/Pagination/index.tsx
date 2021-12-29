import React from "react";
import "./styles.css";
import seta from "../../assets/right.png";

type Props = {
  totalPages?: number;
  goToPage: Function;
  activePage: number;
  goToNext: Function;
};

const Pagination = ({
  totalPages = 0,
  goToPage,
  activePage,
  goToNext,
}: Props) => {
  let x = totalPages <= 10 ? totalPages : 10;
  const paginationItems = Array.from(Array(x).keys());

  return (
    <div className="pagination-container">
      {paginationItems.map((item) => (
        <button
          key={item}
          className={`pagination-item ${
            activePage === item ? "active" : "inactive"
          }`}
          onClick={() => goToPage(item)}
        >
          {item + 1}
        </button>
      ))}
      {activePage >= 9 ? (
        <button
          className={`pagination-item ${
            activePage >= 10 ? "active" : "inactive"
          }`}
          onClick={() => goToNext(activePage + 1)}
        >
          {activePage >= 10 ? activePage + 1 : ">>"}
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default Pagination;
