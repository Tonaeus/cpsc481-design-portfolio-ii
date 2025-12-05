import { Link } from "react-router";
import { Anchor } from "@mantine/core";
import { Button } from "@mantine/core";
import { User } from "lucide-react";

const Header = ({ showUserButton = true }) => {
	return (
		<nav className="h-14 flex items-center px-4 border-b border-gray-200 relative">
			<div className="absolute left-1/2 transform -translate-x-1/2">
				<Anchor component={Link} to="/" underline={false}>
					<h1 className="text-2xl text-nowrap">{import.meta.env.VITE_APP_NAME}</h1>
				</Anchor>
			</div>

			{showUserButton && (
				<div className="ml-auto">
					<Button
						component={Link}
						to="/account"
						variant="subtle"
						px={0}
						py={0}
						style={{
							aspectRatio: "1 / 1",
						}}
					>
						<User />
					</Button>
				</div>
			)}
		</nav>
	);
};

export default Header;
