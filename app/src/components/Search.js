import React from "react";

function Search({ handleInput }) {
  return (
    <section className="searchbox-wrap">
      <input
        type="text"
        placeholder="search for parks"
        className="searchbox"
        onChange={ handleInput }
      />
    </section>
  )
}

export default Search
