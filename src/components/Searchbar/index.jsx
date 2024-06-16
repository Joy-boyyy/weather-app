import { useState } from "react";
import { CiSearch } from "react-icons/ci";

import "./index.css";
// const weatherKey='aceebc76eda61735507da2b2ba35677a';

const SearchComponent = (props) => {
  const [searchTxtHolder, fillSearchFun] = useState("");


  const btnClicked = () => {
    const { recDataFromSearch } = props;

    recDataFromSearch(searchTxtHolder);

    fillSearchFun("");

  };

  return (
    <div className="searchDiv">
      <input
        className="inputTag"
        type="search"
        value={searchTxtHolder}
        placeholder="Search: city"
        onChange={(event) => {
          fillSearchFun(event.target.value);
        }}
      />

      <button className="searchBtn" type="button" onClick={btnClicked}>
        <CiSearch size={20} /> Search{" "}
      </button>
    </div>
  );
};

export default SearchComponent;
