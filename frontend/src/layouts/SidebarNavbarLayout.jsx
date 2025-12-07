import { Outlet } from "react-router";
import SidebarNavbar from "../components/SidebarNavbar";

function MainLayout() {
	return (
		<div className="flex flex-col min-h-screen">
			<header>
				<SidebarNavbar />
			</header>
			<main className="flex justify-center flex-1 overflow-auto bg-gray-100">
				<div className="w-full max-w-7xl p-4">
					<Outlet />
				</div>
			</main>
		</div>
	);
}

export default MainLayout;
