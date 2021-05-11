import React from "react";

import { useAuth0 } from "@auth0/auth0-react";

const MyFavorites = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div>
      <div>favorites</div>
    </div>
  );
};

export default MyFavorites;
