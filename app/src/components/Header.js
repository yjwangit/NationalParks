import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

import LoginButton from "./Login";
import LogoutButton from "./Logout";
const Header = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  // <h3>National Park Finder</h3>
  return (
    <div className="header">
      <div>
        <Link to="/">Home</Link>&nbsp;&nbsp;
        <Link to="/favorite">My Saved Parks</Link>
      </div>
      <div></div>
      <div>
        {isAuthenticated ? (
          <span>
            <img className="user-img" src={user.picture} alt="" />
            <span className="user-name">{user.email}</span>
            <LogoutButton />
          </span>
        ) : (
          <LoginButton />
        )}
      </div>
    </div>
  );
};
export default Header;
