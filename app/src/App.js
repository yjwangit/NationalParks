import React, { useState } from "react";

import { Route, useHistory } from "react-router-dom";

import Header from "./components/Header";
import MyFavorites from "./components/MyFavorites";
import Parkdetails from "./components/Parkdetails";
import Results from "./components/Results";
import Search from "./components/Search";
import Selection from "./components/Selection";
import coverImg from "./image/cover.jpg";
const App = () => {
  let history = useHistory();
  const requestUrl = `http://localhost:4000/api/tasks/parks`;
  const [state, setState] = useState({
    searchValue: "",
    results: [],
  });
  const [apiUrl, setApiUrl] = useState("");

  const searchrequest = (e) => {
    setApiUrl(`${requestUrl}?q=${state.searchValue}&limit=10`);
    history.push({
      pathname: `/searchResults`,
    });
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
    //search by satecode
    setApiUrl(`${requestUrl}?statecode=${statecode}&limit=10`);
    history.push({
      pathname: `/searchResults`,
    });
  };

  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <main>
        <Route exact path="/">
          <div className="search-section">
            <div>
              <Selection handleAreaSearch={handleAreaSearch} />
            </div>
            <div>
              <Search
                to="/searchResults"
                handleInput={handleInput}
                handleClick={searchrequest}
              />
            </div>
          </div>

          <div>
            <img className="main-img" src={coverImg} alt="cover" />
          </div>
        </Route>
        <Route exact path="/searchResults">
          <Results apiUrl={apiUrl} />
        </Route>
        <Route exact path="/parkDetails/:id">
          <Parkdetails requestUrl={requestUrl} />
        </Route>
        <Route exact path="/favorite">
          <MyFavorites />
        </Route>
      </main>
    </div>
  );
};

export default App;
