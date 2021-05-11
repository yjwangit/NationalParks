import React from "react";

import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
function Park({ park }) {
  const { user, isAuthenticated } = useAuth0();
  // <img src={park.images[0] || ""} />;
  console.log(park, user);
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
      });
  };
  return (
    <div className="park">
      <img
        className="imgStyle"
        alt={safePark.title}
        src={safePark.images.length > 0 ? safePark.images[0]["url"] : ""}
      />
      <h3>{safePark.fullName}</h3>
      <button onClick={addFavorite}>save</button>
    </div>
  );
}

export default Park;
