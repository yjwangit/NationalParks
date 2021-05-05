import React, { useState } from "react";

import { Route, useHistory } from "react-router-dom";

//import * as apiClient from "./apiClient";
import Header from "./components/Header";
import Login from "./components/Login";
import Parkdetails from "./components/Parkdetails";
import Results from "./components/Results";
import Search from "./components/Search";
import Selection from "./components/Selection";
import Signup from "./components/Signup";
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
    //通过statecode搜索时设置请求url
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
          <Selection handleAreaSearch={handleAreaSearch} />
          <Search
            to="/searchResults"
            handleInput={handleInput}
            handleClick={searchrequest}
          />
        </Route>
        <Route exact path="/searchResults">
          <Results apiUrl={apiUrl} />
        </Route>
        <Route exact path="/parkDetails/:id">
          <Parkdetails requestUrl={requestUrl} />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
      </main>
    </div>
  );
};

export default App;
