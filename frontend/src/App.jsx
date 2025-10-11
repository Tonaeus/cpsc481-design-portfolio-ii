import { BrowserRouter, Routes, Route } from "react-router";
import NavbarLayout from "./layouts/NavbarLayout";
import Account from "./pages/Account";
import Home from "./pages/Home";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<NavbarLayout />}>
					<Route path="/" element={<Home />} />
					<Route path="account" element={<Account />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
