import React, { useState } from "react";

import { Route, useHistory } from "react-router-dom";

import Header from "./components/Header";
import LoginButton from "./components/Login";
import LogoutButton from "./components/Logout";
import Parkdetails from "./components/Parkdetails";
import Profile from "./components/Profile";
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
        <LoginButton />
      </header>
      <main>
        <Profile />
        <LogoutButton />
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
          <LoginButton />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
      </main>
    </div>
  );
};

export default App;
