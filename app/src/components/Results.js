import React, { useEffect, useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

import Park from "./Park";
/**
 *{results.map((park) => (
        <Park park={park} />
      ))}
 */
function Results({ apiUrl }) {
  const { user, isAuthenticated } = useAuth0();
  const [results, setResults] = useState([]);
  const [savedIds, setSavedIds] = useState([]);
  useEffect(() => {
    queryList(apiUrl);
    if (isAuthenticated) {
      getUserAllfavorites();
    }
  }, []);
  const queryList = (url) => {
    axios.get(url).then((data) => {
      //date is an object that is returned from express response (data是后台返回给前端的对象(express中response里返回的))
      //reasign value
      setResults(data.data.data);
    });
  };

  const getUserAllfavorites = (id) => {
    //to query user's saved parks
    axios
      .get(
        `http://localhost:4000/api/tasks/getUserFavorites?userId=${user.sub}`,
      )
      .then((res) => {
        setSavedIds(res.data.data.map((item) => item.park_id)); //update savedIds
      });
  };

  return (
    <div className="results">
      {results.map((park) => (
        //添加点击事件并传入pardid作为参数
        <div aria-hidden="true" className="park">
          <Park
            park={park}
            savedIds={savedIds}
            getUserAllfavorites={getUserAllfavorites}
          />
        </div>
      ))}
    </div>
  );
}

export default Results;
