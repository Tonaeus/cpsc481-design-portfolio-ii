import { Outlet, useLocation } from "react-router";
import Header from "../components/Header";
import SidebarNavbar from "../components/SidebarNavbar";
import useAuthContext from "../hooks/useAuthContext";

function MainLayout() {
	const { state } = useAuthContext();
	const { loading, user } = state;

	const location = useLocation();
	const path = location.pathname;

	return path === "/" ? (
		<div className="flex flex-col min-h-screen">
			<header>{!loading && !user ? <Header /> : <SidebarNavbar />}</header>
			<main className="flex justify-center flex-1 bg-gray-100 overflow-y-auto">
				<div className="h-[calc(100vh-56px)] w-full">
					<div>
						<Outlet />
					</div>
				</div>
			</main>
		</div>
	) : (
		<div className="flex flex-col min-h-screen">
			<header>
				<header>{!loading && !user ? <Header /> : <SidebarNavbar />}</header>
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
