import React from "react";

function Park({ park }) {
  // <img src={park.images[0] || ""} />;
  console.log(park);
  const safePark = park || {};
  return (
    <div className="park">
      <img
        className="imgStyle"
        alt={safePark.title}
        src={safePark.images.length > 0 ? safePark.images[0]["url"] : ""}
      />
      <h3>{safePark.fullName}</h3>
    </div>
  );
}

export default Park;
