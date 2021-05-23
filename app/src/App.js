import React, { useState } from "react";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Route, useHistory } from "react-router-dom";

import Header from "./components/Header";
import MyFavorites from "./components/MyFavorites";
import Parkdetails from "./components/Parkdetails";
import Results from "./components/Results";
import Search from "./components/Search";
import Selection from "./components/Selection";
import title from "./image/title.png";

const App = () => {
  let history = useHistory();
  const requestUrl = `http://localhost:4000/api/tasks/parks`;
  const [state, setState] = useState({
    searchValue: "",
    results: [],
  });
  const [apiUrl, setApiUrl] = useState("");

  const searchrequest = (e) => {
    setApiUrl(`${requestUrl}?q=${state.searchValue}`);
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
        <div className="title">
          <img src={title} alt="title" />
        </div>
        <Route exact path="/">
          <Container className="search-section">
            <Row xs={1} md={2} lg={2}>
              <Col>
                <Selection handleAreaSearch={handleAreaSearch} />
              </Col>
              <Col>
                <Search
                  to="/searchResults"
                  handleInput={handleInput}
                  handleClick={searchrequest}
                />
              </Col>
            </Row>
          </Container>
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
// <div className="container">
//   <div className="row">
//     <div className="col-sm">
//       <div className="search-state">
//         <Selection handleAreaSearch={handleAreaSearch} />
//       </div>
//     </div>
//     <div class="col-sm">
//       <div className="search-keywords">
//         <Search
//           to="/searchResults"
//           handleInput={handleInput}
//           handleClick={searchrequest}
//         />
//       </div>
//     </div>
//   </div>
// </div>;
