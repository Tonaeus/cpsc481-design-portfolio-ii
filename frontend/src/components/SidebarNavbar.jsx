import { useState } from "react";
import { Link } from "react-router";
import { Anchor, Button, Drawer, Stack } from "@mantine/core";
import {
	PanelLeft,
	BookOpen,
	History,
	CreditCard,
	BarChart3,
	FileText,
} from "lucide-react";

const SidebarNavbar = () => {
	const [sidebarOpened, setSidebarOpened] = useState(false);

	return (
		<>
			<nav className="h-14 flex items-center px-4 border-b border-gray-200 relative">
				<Button
					variant="subtle"
					px={0}
					py={0}
					style={{
						aspectRatio: "1 / 1",
					}}
					onClick={() => setSidebarOpened(true)}
				>
					<PanelLeft />
				</Button>

				<div className="absolute left-1/2 transform -translate-x-1/2">
					<Anchor component={Link} to="/" underline={false}>
						<h1 className="text-2xl text-nowrap">
							{import.meta.env.VITE_APP_NAME}
						</h1>
					</Anchor>
				</div>
			</nav>

			<Drawer
				opened={sidebarOpened}
				onClose={() => setSidebarOpened(false)}
				// title="Menu"
				padding="md"
				size="xs"
				position="left"
			>
				<div>
					<Button component={Link} to="/browse" fullWidth variant="subtle">
						<div className="flex gap-4 items-center absolute left-4">
							<BookOpen size={18} />
							Browse
						</div>
					</Button>
					<Button component={Link} to="/history" fullWidth variant="subtle">
						<div className="flex gap-4 items-center absolute left-4">
							<History size={18} />
							History
						</div>
					</Button>
					<Button component={Link} to="/payment" fullWidth variant="subtle">
						<div className="flex gap-4 items-center absolute left-4">
							<CreditCard size={18} />
							Payment
						</div>
					</Button>
					<Button component={Link} to="/report" fullWidth variant="subtle">
						<div className="flex gap-4 items-center absolute left-4">
							<BarChart3 size={18} />
							Report
						</div>
					</Button>
					<Button component={Link} to="/transaction" fullWidth variant="subtle">
						<div className="flex gap-4 items-center absolute left-4">
							<FileText size={18} />
							Transaction
						</div>
					</Button>
				</div>
			</Drawer>
		</>
	);
};

export default SidebarNavbar;
