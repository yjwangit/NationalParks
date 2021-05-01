import React from "react";

function Search({ handleInput, searchrequest }) {
  return (
    <section className="searchbox-wrap">
      <input
        type="text"
        placeholder="search for parks"
        className="searchbox"
        onChange={handleInput}
        onKeyPress={searchrequest}
      />
    </section>
  );
}

export default Search;
