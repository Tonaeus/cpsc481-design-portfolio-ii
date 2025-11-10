import { Outlet } from "react-router";
import SidebarNavbar from "../components/SidebarNavbar";

function MainLayout() {
	return (
		<div className="flex flex-col min-h-screen">
			<header>
				<SidebarNavbar />
			</header>
			<main className="flex justify-center flex-1 bg-gray-100">
				<div className="h-[calc(100vh-56px)] w-full max-w-7xl overflow-y-auto">
					<div className="p-4">
						<Outlet />
					</div>
				</div>
			</main>
		</div>
	);
}

export default MainLayout;
