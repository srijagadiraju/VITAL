import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import "./searchbar.css";

const SearchBar = ({query, setQuery}) => {
    //const [query, setQuery] = useState("");
    const onInput = evt => {
      setQuery(evt.target.value);  
      console.log("Search bar on input", evt.target.value); // calls function on input 
    };

    return (
      <div>
        Search: <input className="input-control" type="text" onInput={onInput} value={query} /> 
      </div>
    );
  };

  export default SearchBar; 

  SearchBar.propTypes = {
    query: PropTypes.string.isRequired, 
    setQuery: PropTypes.func.isRequired,
  }