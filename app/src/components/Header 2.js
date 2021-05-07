import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <span>About</span>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    </div>
  );
};
export default Header;
