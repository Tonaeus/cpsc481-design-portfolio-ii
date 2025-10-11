import { BrowserRouter, Routes, Route } from "react-router";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import NavbarLayout from "./layouts/NavbarLayout";
import Account from "./pages/Account";
import Home from "./pages/Home";

function App() {
	return (
		<MantineProvider
			theme={{
				primaryColor: "teal",
			}}
			withGlobalStyles
			withNormalizeCSS
		>
			<BrowserRouter>
				<Routes>
					<Route element={<NavbarLayout />}>
						<Route path="/" element={<Home />} />
						<Route path="account" element={<Account />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</MantineProvider>
	);
}

export default App;
