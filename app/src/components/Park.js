import React from "react";

import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useHistory } from "react-router-dom";

import LikeImg from "../image/liked.png";
import UnLikeImg from "../image/unliked.png";
function Park({ park, savedIds, getUserAllfavorites }) {
  const { user, isAuthenticated } = useAuth0();
  let history = useHistory(); //The useHistory hook gives you access to the history instance that you may use to navigate.
  // <img src={park.images[0] || ""} />;
  // console.log(park, user);
  const safePark = park || {};
  const addFavorite = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      alert("please login");
      return;
    }
    // parkId, parkName, parkCover, userId;
    const params = {
      parkId: park.id,
      parkName: park.fullName,
      parkCover: park.images.length > 0 ? park.images[0].url : "",
      userId: user.sub,
    };
    axios
      .post("http://localhost:4000/api/tasks/addFavorite", params)
      .then((res) => {
        console.log(res);
        //saved success
        if (res.data.code === 201) {
          getUserAllfavorites();
        }
      });
  };
  const delFavorite = (e) => {
    e.stopPropagation();
    // parkId, parkName, parkCover, userId;
    const params = {
      parkId: park.id,
      userId: user.sub,
    };
    axios
      .delete(
        `http://localhost:4000/api/tasks/delUserFavorite?userId=${params.userId}&parkId=${params.parkId}`,
      )
      .then((res) => {
        console.log(res);
        //saved success
        if (res.data.code === 201) {
          getUserAllfavorites();
        }
      });
  };
  const clickDetail = (id) => {
    //navigate to the park details page 跳转详情页,拼接路由动态参数
    history.push({ pathname: `/parkDetails/${id}` });
  };
  return (
    <div>
      <Card>
        <Card.Img
          className="park-img"
          variant="top"
          src={safePark.images.length > 0 ? safePark.images[0]["url"] : ""}
        />
        <Card.Body>
          <Card.Title className="park-title">{safePark.fullName}</Card.Title>

          <div className="park-handle">
            <Button variant="warning" onClick={() => clickDetail(safePark.id)}>
              Info
            </Button>
            <div
              role="button"
              onMouseDown={
                savedIds.indexOf(safePark.id) === -1 ? addFavorite : delFavorite
              }
              tabIndex={0}
            >
              <img
                src={savedIds.indexOf(safePark.id) > -1 ? LikeImg : UnLikeImg}
                alt=""
              />
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Park;

//<Card.Text className="park-title">{safePark.fullName}</Card.Text>

//https://react-bootstrap.github.io/components/cards/#basic-example
