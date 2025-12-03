import { AuthContextProvider } from "./contexts/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/carousel/styles.css";
import HomeLayout from "./layouts/HomeLayout";
import AccountNavbarLayout from "./layouts/AccountNavbarLayout";
import EmptyNavbarLayout from "./layouts/EmptyNavbarLayout";
import SidebarNavbarLayout from "./layouts/SidebarNavbarLayout";
import Account from "./pages/Account";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Browse from "./pages/Browse";
import Book from "./pages/Book";
import History from "./pages/History";
import Report from "./pages/Report";
import Transaction from "./pages/Transaction";
import Reserve from "./pages/Reserve";
import Payment from "./pages/Payment";
import Empty from "./pages/Empty";

function App() {
	return (
		<AuthContextProvider>
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
						</Route>
						<Route element={<AccountNavbarLayout />}>
							<Route path="forgot-password" element={<ForgotPassword />} />
						</Route>
						<Route element={<EmptyNavbarLayout />}>
							<Route path="account" element={<Account />} />
						</Route>
						<Route element={<SidebarNavbarLayout />}>
							<Route path="dashboard" element={<Dashboard />} />
							<Route path="browse" element={<Browse />} />
							<Route path="book" element={<Book />} />
							<Route path="history" element={<History />} />
							<Route path="report" element={<Report />} />
							<Route path="transaction" element={<Transaction />} />
							<Route path="reserve" element={<Reserve />} />
							<Route path="payment" element={<Payment />} />
							<Route path="empty" element={<Empty />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</MantineProvider>
		</AuthContextProvider>
	);
}

export default App;
