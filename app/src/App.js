import React, { useState } from "react";
//import * as apiClient from "./apiClient";
import Search from "./components/Search";


function App() {

  const [state, setState] = useState({
    searchValue: "",
    results: [],
    selected: {}
  });
  
  const apiUrl = "https://developer.nps.gov/api/v1/parks?api_key=DfbkVVqO5eM8F7cPXqbJVfOmFEHtfmBXsuktlP48";

  const handleInput = (e) => {
    let searchValue = e.target.value;
  
    setState(prevState => {
      return { ...prevState, searchValue: searchValue }
    });

     
     
     
    return (
      <div className="App">
        <header>
          <h1>National Park Finder</h1>
        </header>
        <main>
          <Search handleInput={handleInput} />
        </main>
      </div>
    );
  }
}


export default App
