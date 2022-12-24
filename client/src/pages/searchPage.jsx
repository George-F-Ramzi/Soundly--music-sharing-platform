import React from "react";
import NavBar from "../elements/navBar";
import "../css/search.css";
import ArtistCard from "../elements/artistCard";

const SearchPage = () => {
  return (
    <div>
      <NavBar />
      <div className="search-section">
        <div className="filter-btns">
          <button className="filter active">Users</button>
          <button className="filter">Songs</button>
        </div>
        <div className="result-section">
          <ArtistCard />
          <ArtistCard />
          <ArtistCard />
          <ArtistCard />
          <ArtistCard />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;