import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
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
import useAuthContext from "../hooks/useAuthContext";

const SidebarNavbar = () => {
	const { state, dispatch } = useAuthContext();
	const { user } = state;
	const navigate = useNavigate();

	const [sidebarOpened, setSidebarOpened] = useState(false);
	const location = useLocation();

	const isActive = (path) => location.pathname === path;

	const handleLogout = () => {
		dispatch({ type: "LOGOUT" });
		navigate("/account");
	};

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
						height: "calc(100% - 71px)",
					},
				}}
				title={
					<Card padding={0}>
						<div className="flex items-center gap-4">
							<Avatar color="teal" />
							<div className="flex flex-col">
								<span className="font-semibold leading-tight">
									{user?.first_name} {user?.last_name}
								</span>
								<span className="text-xs text-gray-500 leading-tight">
									{user?.email}
								</span>
							</div>
						</div>
					</Card>
				}
			>
				<div className="h-[1px] mb-4 bg-gray-200" />
				<div className="h-full flex flex-col justify-between">
					<div>
						<Button
							component={Link}
							to="/dashboard"
							fullWidth
							variant={isActive("/dashboard") ? "light" : "subtle"}
							color={isActive("/dashboard") ? undefined : "dark"}
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
							color={isActive("/browse") ? undefined : "dark"}
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
							color={isActive("/history") ? undefined : "dark"}
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
							color={isActive("/payment") ? undefined : "dark"}
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
							color={isActive("/report") ? undefined : "dark"}
						>
							<div className="flex gap-4 items-center absolute left-4">
								<Flag size={18} />
								Report
							</div>
						</Button>
						{user?.role === "staff" && (
							<Button
								component={Link}
								to="/transaction"
								fullWidth
								variant={isActive("/transaction") ? "light" : "subtle"}
								color={isActive("/transaction") ? undefined : "dark"}
							>
								<div className="flex gap-4 items-center absolute left-4">
									<ScanBarcode size={18} />
									Transaction
								</div>
							</Button>
						)}
					</div>

					<div className="mb-4">
						<div className="h-[1px] my-4 bg-gray-200" />
						<Button
							variant="subtle"
							color="dark"
							fullWidth
							onClick={handleLogout}
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
