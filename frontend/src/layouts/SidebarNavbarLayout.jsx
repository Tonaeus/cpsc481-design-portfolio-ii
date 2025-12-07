import { Outlet, useLocation } from "react-router";
import Header from "../components/Header";
import SidebarNavbar from "../components/SidebarNavbar";
import useAuthContext from "../hooks/useAuthContext";

function MainLayout() {
	const { state } = useAuthContext();
	const { loading, user } = state;

	const location = useLocation();
	const path = location.pathname;

	return (
		<div className="flex flex-col min-h-screen">
			<header>
				<header>{!loading && !user ? <Header /> : <SidebarNavbar />}</header>
			</header>
			<main className="flex justify-center flex-1 overflow-auto bg-gray-100">
				<div className={`w-full ${path === "/" ? "" : "max-w-7xl p-4"}`}>
					<Outlet />
				</div>
			</main>
		</div>
	);
}

export default MainLayout;
