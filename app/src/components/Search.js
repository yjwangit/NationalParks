import React from "react";

import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";

function Search({ handleInput, handleClick }) {
  return (
    <div>
      <InputGroup onChange={handleInput}>
        <FormControl
          placeholder="search for parks"
          aria-label="search for parks"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Append>
          <Button variant="light" onClick={handleClick}>
            Search
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
    // <section className="searchbox-wrap">
    //   <input
    //     type="text"
    //     placeholder="search for parks"
    //     className="searchbox"
    //     onChange={handleInput}
    //   />
    //   <button className="search-btn" onClick={handleClick}>
    //     search
    //   </button>
    // </section>
  );
}

export default Search;
