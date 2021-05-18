import React, { useEffect, useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
const MyFavorites = () => {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }
    getUserFavorites();
  }, []);
  const getUserFavorites = () => {
    axios
      .get(
        `http://localhost:4000/api/tasks/getUserFavorites?userId=${user.sub}`, //getUserFavorites接口
      )
      .then((res) => {
        console.log(res, "userData");
        setFavorites(res.data.data);
      });
  };
  const delFavorite = (fav) => {
    console.log(fav);
    axios
      .delete(
        `http://localhost:4000/api/tasks/delUserFavorite?userId=${user.sub}&parkId=${fav.park_id}`,
      )
      .then((res) => {
        console.log(res);
        if (res.data.code === 201) {
          getUserFavorites();
        }
      });
  };
  return (
    <div className="favorites-list">
      {favorites.map((fav) => {
        return (
          <Alert variant="warning">
            <div className="favorites-item">
              <div className="favorites-img">
                <img src={fav.park_cover} alt={fav.park_name} />
                <div className="favorites-name">
                  <Link to={`/parkDetails/${fav.park_id}`}>
                    {fav.park_name}
                  </Link>
                </div>
              </div>

              <div className="favorites-handle">
                <Button variant="light" onClick={() => delFavorite(fav)}>
                  Delete
                </Button>
              </div>
            </div>
          </Alert>
        );
      })}
    </div>
  );
};

export default MyFavorites;
