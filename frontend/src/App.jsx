import { BrowserRouter, Routes, Route } from "react-router";
import { MantineProvider } from "@mantine/core";
import { Notifications } from '@mantine/notifications';
import "@mantine/core/styles.css";
import '@mantine/notifications/styles.css';
import HomeLayout from "./layouts/HomeLayout";
import AccountLayout from "./layouts/AccountLayout";
import SidebarLayout from "./layouts/SidebarLayout";
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
			<Notifications />
			<BrowserRouter>
				<Routes>
					<Route element={<HomeLayout />}>
						<Route path="/" element={<Home />} />
						<Route path="forgot-password" element={<ForgotPassword />} />
					</Route>
					<Route element={<AccountLayout />}>
						<Route path="account" element={<Account />} />
					</Route>
					<Route element={<SidebarLayout />}>
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
