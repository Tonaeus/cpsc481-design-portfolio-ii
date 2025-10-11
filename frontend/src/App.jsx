import { BrowserRouter, Routes, Route } from "react-router";
import Account from "./pages/Account";
import Home from "./pages/Home";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
        <Route path="account" element={<Account />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
