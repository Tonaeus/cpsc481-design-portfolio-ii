import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

function MainLayout() {
	return (
		<div className="flex flex-col min-h-screen">
			<header>
				<Navbar />
			</header>
			<main className="flex justify-center flex-1">
        <div className="w-full max-w-7xl p-4">
				  <Outlet />
        </div>
			</main>
		</div>
	);
}

export default MainLayout;
