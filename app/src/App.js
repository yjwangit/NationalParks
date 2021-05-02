import React, { useState } from "react";

import axios from "axios";

//import * as apiClient from "./apiClient";
import Results from "./components/Results";
import Search from "./components/Search";
import Selection from "./components/Selection";
function App() {
  const [state, setState] = useState({
    searchValue: "",
    results: [],
  });

  const apiUrl = `http://localhost:4000/api/tasks/parks`;

  const queryList = (url) => {
    axios.get(url).then((data) => {
      //date is an object that is returned from express response (data是后台返回给前端的对象(express中response里返回的))
      console.log(data);
      window.data = data;
      //reasign value
      setState((prevState) => {
        return {
          ...prevState,
          //searchValue: state.searchValue,
          //results:state.results,
          results: data.data.data,
        };
      });
    });
  };

  const searchrequest = (e) => {
    const url = `${apiUrl}?q=${state.searchValue}`;
    queryList(url);
  };

  const handleInput = (e) => {
    let searchValue = e.target.value;

    setState((prevState) => {
      return {
        ...prevState,
        searchValue: searchValue,
      };
    });
  };

  const handleAreaSearch = (statecode) => {
    console.log(statecode, "statecode");
    const url = `${apiUrl}?statecode=${statecode}`;
    queryList(url);
  };

  return (
    <div className="App">
      <header>
        <h1>National Park Finder</h1>
      </header>
      <main>
        <Selection handleAreaSearch={handleAreaSearch} />
        <Search handleInput={handleInput} handleClick={searchrequest} />

        <Results results={state.results} />
      </main>
    </div>
  );
}

export default App;
