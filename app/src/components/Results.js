import React, { useEffect, useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Park from "./Park";
import Popup from "./Popup";
/**
 *{results.map((park) => (
        <Park park={park} />
      ))}
 */
function Results({ apiUrl }) {
  const { user, isAuthenticated } = useAuth0();
  const [results, setResults] = useState([]);
  const [savedIds, setSavedIds] = useState([]);
  const [show, setShow] = useState(false);
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
    axios.get(`/api/tasks/getUserFavorites?userId=${user.sub}`).then((res) => {
      console.log(res);
      setSavedIds(res.data.data.map((item) => item.park_id)); //update savedIds
    });
  };
  const closePopup = () => {
    setShow(false);
  };
  const openPopup = () => {
    setShow(true);
  };
  return (
    <div className="results">
      <Row xs={1} md={2} lg={4}>
        {results.map((park) => (
          //添加点击事件并传入pardid作为参数
          <Col>
            <div aria-hidden="true" className="park">
              <Park
                park={park}
                savedIds={savedIds}
                getUserAllfavorites={getUserAllfavorites}
                openPopup={openPopup}
              />
            </div>
          </Col>
        ))}
      </Row>
      <Popup show={show} closePopup={closePopup}></Popup>
    </div>
  );
}

export default Results;
