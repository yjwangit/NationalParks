import { useEffect } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

import LoginButton from "./Login";
import LogoutButton from "./Logout";
const Header = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  // <h3>National Park Finder</h3>
  return (
    // <div className="header">
    //   <div>
    //     <Link className="white" to="/">
    //       Home
    //     </Link>
    //     &nbsp;&nbsp;
    //     {isAuthenticated ? (
    //       <Link className="white" to="/favorite">
    //         My Saved Parks
    //       </Link>
    //     ) : null}
    //   </div>
    //   <div></div>
    //   <div>
    //     {isAuthenticated ? (
    //       <span>
    //         <img className="user-img" src={user.picture} alt="" />
    //         <span className="user-name white">{user.email}</span>
    //         <LogoutButton />
    //       </span>
    //     ) : (
    //       <LoginButton />
    //     )}
    //   </div>
    // </div>
    <Navbar collapseOnSelect className="header" expand="sm">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/" className="white">
            Home
          </Link>
          {isAuthenticated ? (
            <Link className="white mr-l" to="/favorite">
              My saved Parks
            </Link>
          ) : null}
        </Nav>
        <Nav>
          <div>
            {isAuthenticated ? (
              <span>
                <img className="user-img" src={user.picture} alt="" />
                <span className="user-name white">{user.email}</span>
                <LogoutButton />
              </span>
            ) : (
              <LoginButton />
            )}
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Header;
