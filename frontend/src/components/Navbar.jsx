import { Link } from "react-router";

const Navbar = () => {
	return (
		<nav>
			<Link to="/">Home</Link> 
      <Link to="/account">Account</Link>
		</nav>
	);
};

export default Navbar;
