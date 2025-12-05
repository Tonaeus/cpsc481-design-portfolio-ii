import { Outlet } from "react-router";

function MainLayout() {
	return (
		<div className="flex flex-col min-h-screen">
			<main className="flex justify-center flex-1 bg-gray-100 overflow-y-auto">
        <div className="h-[calc(100vh-56px)] w-full">
					<div className="">
						<Outlet />
					</div>
        </div>
			</main>
		</div>
	);
}

export default MainLayout;
