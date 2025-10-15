import { BrowserRouter, Routes, Route } from "react-router";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import NavbarLayout from "./layouts/NavbarLayout";
import Account from "./pages/Account";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Browse from "./pages/Browse";
import Book from "./pages/Book";
import History from "./pages/History";
import Report from "./pages/Report";
import Transaction from "./pages/Transaction";
import Reserve from "./pages/Reserve";
import Payment from "./pages/Payment";

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
						<Route path="forgot-password" element={<ForgotPassword />} />
						<Route path="menu" element={<Menu />} />
						<Route path="browse" element={<Browse />} />
						<Route path="book" element={<Book />} />
						<Route path="history" element={<History />} />
						<Route path="report" element={<Report />} />
						<Route path="transaction" element={<Transaction />} />
						<Route path="reserve" element={<Reserve />} />
						<Route path="payment" element={<Payment />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</MantineProvider>
	);
}

export default App;
