import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Anchor, Avatar, Button, Card, Drawer } from "@mantine/core";
import {
	PanelLeft,
	LayoutDashboard,
	BookOpen,
	History,
	CreditCard,
	Flag,
	ScanBarcode,
	LogOut,
} from "lucide-react";

const SidebarNavbar = () => {
	const [sidebarOpened, setSidebarOpened] = useState(false);
	const location = useLocation();

	const isActive = (path) => location.pathname === path;

	return (
		<>
			<nav className="h-14 flex items-center px-4 border-b border-gray-200 relative">
				<Button
					variant="subtle"
					px={0}
					py={0}
					style={{ aspectRatio: "1 / 1" }}
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
				padding="md"
				size="xs"
				position="left"
				styles={{
					body: {
						height: "calc(100% - 70px)",
					},
				}}
				title={
					<Card padding={0}>
						<div className="flex items-center gap-4">
							<Avatar color="teal" />
							<div className="flex flex-col">
								<span className="font-semibold leading-tight">Ethan Clark</span>
								<span className="text-xs text-gray-500 leading-tight">
									ethan.clark@example.com
								</span>
							</div>
						</div>
					</Card>
				}
			>
				<div className="h-full flex flex-col justify-between">
					<div>
						<Button
							component={Link}
							to="/dashboard"
							fullWidth
							variant={isActive("/dashboard") ? "light" : "subtle"}
						>
							<div className="flex gap-4 items-center absolute left-4">
								<LayoutDashboard size={18} />
								Dashboard
							</div>
						</Button>
						<Button
							component={Link}
							to="/browse"
							fullWidth
							variant={isActive("/browse") ? "light" : "subtle"}
						>
							<div className="flex gap-4 items-center absolute left-4">
								<BookOpen size={18} />
								Browse
							</div>
						</Button>

						<Button
							component={Link}
							to="/history"
							fullWidth
							variant={isActive("/history") ? "light" : "subtle"}
						>
							<div className="flex gap-4 items-center absolute left-4">
								<History size={18} />
								History
							</div>
						</Button>

						<Button
							component={Link}
							to="/payment"
							fullWidth
							variant={isActive("/payment") ? "light" : "subtle"}
						>
							<div className="flex gap-4 items-center absolute left-4">
								<CreditCard size={18} />
								Payment
							</div>
						</Button>

						<Button
							component={Link}
							to="/report"
							fullWidth
							variant={isActive("/report") ? "light" : "subtle"}
						>
							<div className="flex gap-4 items-center absolute left-4">
								<Flag size={18} />
								Report
							</div>
						</Button>

						<Button
							component={Link}
							to="/transaction"
							fullWidth
							variant={isActive("/transaction") ? "light" : "subtle"}
						>
							<div className="flex gap-4 items-center absolute left-4">
								<ScanBarcode size={18} />
								Transaction
							</div>
						</Button>
					</div>

					<div className="border-t pt-4 border-gray-200">
						<Button
							variant="subtle"
							color="red"
							fullWidth
							onClick={() => console.log("Log Out")}
						>
							<div className="flex gap-4 items-center absolute left-4">
								<LogOut size={18} />
								Log Out
							</div>
						</Button>
					</div>
				</div>
			</Drawer>
		</>
	);
};

export default SidebarNavbar;
