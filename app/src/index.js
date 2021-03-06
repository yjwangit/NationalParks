import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";
import App from "./App";
//import reportWebVitals from "./reportWebVitals";

// const domain = "dev-m1so.us.auth0.com";
// const clientID = "BTb7r8IKJVu9BnKFll6N19bjBfa8heqw";
// const auth0CallbackUrl = "http://localhost:3000/"; // window.location.origin

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-m1so.us.auth0.com"
      clientId="BTb7r8IKJVu9BnKFll6N19bjBfa8heqw"
      redirectUri={window.location.origin}
    >
      <Router>
        <App />
      </Router>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
