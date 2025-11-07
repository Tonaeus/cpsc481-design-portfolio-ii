import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import bgImage from "../assets/dinosaur-skeleton-clipart-xl.png";

function MainLayout() {
	return (
		<div className="flex flex-col min-h-screen">
			<header>
				<Navbar showUserButton={false} />
			</header>
			<main className="relative flex justify-center flex-1 bg-gray-100">
				<div className="absolute inset-0 hidden xl:flex justify-center items-center pointer-events-none">
					<div
						className="bg-contain bg-center bg-no-repeat w-9/10 h-9/10"
						style={{ backgroundImage: `url(${bgImage})`, opacity: 0.05 }}
					/>
				</div>
				<div className="relative z-10 h-[calc(100vh-56px)] w-full max-w-7xl p-4">
					<Outlet />
				</div>
			</main>
		</div>
	);
}

export default MainLayout;
