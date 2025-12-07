import { Outlet } from "react-router";
import Header from "../components/Header";
import SidebarNavbar from "../components/SidebarNavbar";
import useAuthContext from "../hooks/useAuthContext";

function MainLayout() {
	const { state } = useAuthContext();
	const { loading, user } = state;

	return (
		<div className="flex flex-col min-h-screen">
			<header>
				{(!loading && !user) ? <Header /> : <SidebarNavbar />}
			</header>
			<main className="flex justify-center flex-1 bg-gray-100 overflow-y-auto">
				<div className="h-[calc(100vh-56px)] w-full">
					<div>
						<Outlet />
					</div>
				</div>
			</main>
		</div>
	);
}

export default MainLayout;
