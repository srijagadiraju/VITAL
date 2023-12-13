import PropTypes from "prop-types";
import "./searchbar.css";

const SearchBar = ({ query, setQuery }) => {
  const onInput = (evt) => {
    setQuery(evt.target.value);
    console.log("Search bar on input", evt.target.value);
  };

  return (
    <div>
      <label htmlFor="searchBar">Search: </label>
      <input
        id="searchBar"
        type="text"
        className="input-control"
        onInput={onInput}
        value={query}
      />
    </div>
  );
};

SearchBar.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
};

export default SearchBar;
