import React from "react";

import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Button from "react-bootstrap/Button";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button variant="light" size="sm" onClick={() => loginWithRedirect()}>
      Log In
    </Button>
  );
};

export default LoginButton;
