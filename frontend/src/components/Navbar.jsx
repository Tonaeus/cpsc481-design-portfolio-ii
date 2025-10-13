import { Link } from "react-router";
import { Anchor } from "@mantine/core";
import { Button } from "@mantine/core";
import { User } from "lucide-react";

const Navbar = () => {
	return (
		<nav className="h-14 flex justify-between items-center px-4 border-b border-gray-200">
			<Anchor component={Link} to="/" underline={false}>
				<h1 className="text-2xl">{import.meta.env.VITE_APP_NAME}</h1>
			</Anchor>
			<Button component={Link} to="/account" variant="subtle" radius="xl">
				<User />
			</Button>
		</nav>
	);
};

export default Navbar;
