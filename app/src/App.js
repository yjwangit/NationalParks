import React, { useState } from "react";

import axios from "axios";

//import * as apiClient from "./apiClient";
import Results from "./components/Results";
import Search from "./components/Search";

function App() {
  const [state, setState] = useState({
    searchValue: "",
    results: [],
    selected: {},
  });

  const apiUrl = `http://localhost:4000/api/tasks/parks?q=${state.searchValue}`;

  const searchrequest = (e) => {
    if (e.key === "Enter") {
      axios(apiUrl).then((data) => {
        console.log(data);
        window.data = data;
        setState((prevState) => {
          return {
            ...prevState,
            results: data.data.data,
          };
        });
      });
    }
  };

  const handleInput = (e) => {
    let searchValue = e.target.value;

    setState((prevState) => {
      return { ...prevState, searchValue: searchValue };
    });
  };

  return (
    <div className="App">
      <header>
        <h1>National Park Finder</h1>
      </header>
      <main>
        <Search handleInput={handleInput} searchrequest={searchrequest} />
        <Results results={state.results} />
      </main>
    </div>
  );
}

export default App;
