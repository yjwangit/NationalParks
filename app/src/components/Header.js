import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <span>About</span>
      <span>Login</span>
      <span>Signup</span>
    </div>
  );
};
export default Header;
