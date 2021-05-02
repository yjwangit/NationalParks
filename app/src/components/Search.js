import React from "react";

function Search({ handleInput, handleClick }) {
  return (
    <section className="searchbox-wrap">
      <input
        type="text"
        placeholder="search for parks"
        className="searchbox"
        onChange={handleInput}
      />
      <button onClick={handleClick}>search</button>
    </section>
  );
}

export default Search;
