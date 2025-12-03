import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import {
	Anchor,
	Avatar,
	Card,
	ScrollArea,
	Table,
	Button,
	Checkbox,
	Modal,
	Select,
	Tabs,
	FloatingIndicator,
	Badge,
} from "@mantine/core";
import { Info } from "lucide-react";
import { showNotification } from "@mantine/notifications";
import { getTransactionsWithBookInfo } from "../../backend/history.jsx";
import {
	getUser,
	getUsers,
	getAllBookCopiesWithUser,
} from "../../backend/transaction.jsx";
import notifClasses from "../styles/notif.module.css";
import { getStatusColor } from "../utils/status.jsx";
import useAuthContext from "../hooks/useAuthContext";
import { useHotkeys } from "@mantine/hooks";
import { Tooltip } from "@mantine/core";

const Transaction = () => {
	const { state } = useAuthContext();
	const { user, loading } = state;
	const navigate = useNavigate();

	const [helpOpened, setHelpOpened] = useState(false);

	const [scannedUser, setScannedUser] = useState("");
	const [transactions, setTransactions] = useState([]);
	const [scannedBooks, setScannedBooks] = useState([]);
	const [selectedRows, setSelectedRows] = useState([]);

	const [rfidModalOpened, setRfidModalOpened] = useState(false);
	const [allUsers, setAllUsers] = useState([]);
	const [tempSelectedUser, setTempSelectedUser] = useState("");

	const [copies, setCopies] = useState([]);
	const [barcodeModalOpened, setBarcodeModalOpened] = useState(false);
	const [barcodeSelected, setBarcodeSelected] = useState([]);

	const [rootRef, setRootRef] = useState(null);
	const [value, setValue] = useState("history");
	const [controlsRefs, setControlsRefs] = useState({});
	const setControlRef = (val) => (node) => {
		controlsRefs[val] = node;
		setControlsRefs(controlsRefs);
	};

	useHotkeys([["r", () => setRfidModalOpened((o) => !o)]]);
	useHotkeys([["b", () => setBarcodeModalOpened((o) => !o)]]);

	useEffect(() => {
		document.title = `${import.meta.env.VITE_APP_NAME_ABBREV} | Transaction`;
		const usersList = getUsers();
		setAllUsers(usersList.map((email) => ({ value: email, label: email })));

		const copiesList = getAllBookCopiesWithUser();
		setCopies(copiesList);
	}, []);

	useEffect(() => {
		if (!loading && !user) {
			navigate("/account");
		} else if (!loading && user?.role !== "staff") {
			navigate("/dashboard");
		}
	}, [loading, user, navigate]);

	const updateTransactions = (newDataOrFn) => {
		setTransactions((prev) => {
			const newData =
				typeof newDataOrFn === "function" ? newDataOrFn(prev) : newDataOrFn;

			return [...newData].sort(
				(a, b) => new Date(b.borrow_date) - new Date(a.borrow_date)
			);
		});
	};

	const toggleRow = (id) => {
		setSelectedRows((prev) =>
			prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
		);
	};

	const transactionsRows = transactions.map((tx) => (
		<Table.Tr key={tx.transaction_id}>
			<Table.Td>
				<Anchor component={Link} to={`/books/${tx.book.id}`}>
					<Info size={18} />
				</Anchor>
			</Table.Td>
			<Table.Td>{tx.copy_id}</Table.Td>
			<Table.Td>{tx.book.title}</Table.Td>
			<Table.Td>{tx.book.author}</Table.Td>
			<Table.Td>{tx.copy.location.branch}</Table.Td>
			<Table.Td>{tx.borrow_date}</Table.Td>
			<Table.Td>{tx.due_date}</Table.Td>
			<Table.Td>{tx.return_date || "—"}</Table.Td>
			<Table.Td>
				<Badge color={getStatusColor(tx.status)} variant="light">
					{tx.status}
				</Badge>
			</Table.Td>
		</Table.Tr>
	));

	const scannedRows = scannedBooks.map((sb) => (
		<Table.Tr key={sb.copy_id}>
			<Table.Td>
				<Checkbox
					checked={selectedRows.includes(sb.copy_id)}
					onChange={() => toggleRow(sb.copy_id)}
				/>
			</Table.Td>
			<Table.Td>{sb.copy_id}</Table.Td>
			<Table.Td>{sb.book_info.title}</Table.Td>
			<Table.Td>{sb.book_info.author}</Table.Td>
			<Table.Td>{sb.location.branch}</Table.Td>
			<Table.Td>
				{sb.current_user
					? `${sb.current_user.first_name} ${sb.current_user.last_name}`
					: "-"}
			</Table.Td>
			<Table.Td>{sb.current_user ? sb.current_user.email : "-"}</Table.Td>
			<Table.Td>
				<Badge color={getStatusColor(sb.status)} variant="light">
					{sb.status}
				</Badge>
			</Table.Td>
		</Table.Tr>
	));

	const handleRFIDScan = () => {
		const scannedUser = getUser(tempSelectedUser);
		if (!scannedUser.email) {
			showNotification({
				title: "User Not Found",
				message: `No member found with email ${tempSelectedUser}.`,
				position: "top-center",
				autoClose: 3000,
				color: "red",
				classNames: notifClasses,
			});
			return;
		}
		setScannedUser(scannedUser);
		updateTransactions(getTransactionsWithBookInfo(tempSelectedUser));
		setSelectedRows([]);
		setRfidModalOpened(false);
	};

	const handleBarcodeScan = () => {
		if (barcodeSelected.length === 0) {
			showNotification({
				title: "No Books Selected",
				message: "Select at least one book to add.",
				position: "top-center",
				autoClose: 3000,
				color: "red",
				classNames: notifClasses,
			});
			return;
		}

		const selectedBooks = copies.filter((copy) =>
			barcodeSelected.includes(copy.copy_id)
		);

		setScannedBooks((prev) => [...prev, ...selectedBooks]);
		setBarcodeSelected([]);
		setBarcodeModalOpened(false);
	};

	const barcodeModalRows = copies
		.filter((copy) => !scannedBooks.some((sb) => sb.copy_id === copy.copy_id))
		.map((copy) => (
			<Table.Tr key={copy.copy_id}>
				<Table.Td>
					<Checkbox
						checked={barcodeSelected.includes(copy.copy_id)}
						onChange={() =>
							setBarcodeSelected((prev) =>
								prev.includes(copy.copy_id)
									? prev.filter((id) => id !== copy.copy_id)
									: [...prev, copy.copy_id]
							)
						}
					/>
				</Table.Td>
				<Table.Td>{copy.copy_id}</Table.Td>
				<Table.Td>{copy.book_info.title}</Table.Td>
				<Table.Td>{copy.book_info.author}</Table.Td>
				<Table.Td>{copy.location.branch}</Table.Td>
				<Table.Td>{copy.status}</Table.Td>
			</Table.Tr>
		));

	const checkLibraryCard = (action = "perform this action") => {
		if (!scannedUser) {
			showNotification({
				title: "Library Card Required",
				message: `Scan the member’s library card to ${action}.`,
				position: "top-center",
				autoClose: 3000,
				color: "red",
				classNames: notifClasses,
			});
			return false;
		}
		return true;
	};

	const checkSelectedRows = (action = "perform this action") => {
		if (selectedRows.length === 0) {
			showNotification({
				title: "No Selection",
				message: `Select at least one book to ${action}.`,
				position: "top-center",
				autoClose: 3000,
				color: "red",
				classNames: notifClasses,
			});
			return false;
		}
		return true;
	};

	const checkNoOverdueBooks = () => {
		const overdueRows = transactions.filter((tx) => tx.status === "Overdue");

		if (overdueRows.length > 0) {
			showNotification({
				id: "single-notification",
				title: "Overdue Books",
				message: `The library member cannot check out because they have overdue books.`,
				position: "top-center",
				autoClose: 3000,
				color: "red",
				classNames: notifClasses,
			});
			return false;
		}

		return true;
	};

	const handleCheckOut = () => {
		const invalidRows = scannedBooks.filter(
			(sb) => selectedRows.includes(sb.copy_id) && sb.status !== "Available"
		);

		if (invalidRows.length > 0) {
			showNotification({
				title: "Cannot Check Out",
				message: "Some selected books are already borrowed or unavailable.",
				position: "top-center",
				autoClose: 3000,
				color: "red",
				classNames: notifClasses,
			});

			return;
		}

		const today = new Date();
		const twoWeeksLater = new Date(today);
		twoWeeksLater.setDate(today.getDate() + 14);

		const borrowDate = today.toISOString().split("T")[0];
		const dueDate = twoWeeksLater.toISOString().split("T")[0];

		setScannedBooks((prev) =>
			prev.map((sb) => {
				if (selectedRows.includes(sb.copy_id)) {
					return {
						...sb,
						current_user: {
							first_name: scannedUser.first_name,
							last_name: scannedUser.last_name,
							email: scannedUser.email,
						},
						status: "Borrowed",
					};
				}
				return sb;
			})
		);

		const newTransactions = scannedBooks
			.filter((sb) => selectedRows.includes(sb.copy_id))
			.map((sb) => ({
				transaction_id: Math.floor(Math.random() * 100000),
				copy_id: sb.copy_id,
				book: sb.book_info,
				copy: sb,
				borrow_date: borrowDate,
				due_date: dueDate,
				return_date: null,
				status: "Borrowed",
			}));

		updateTransactions((prev) => [...prev, ...newTransactions]);

		showNotification({
			title: "Check Out Successful",
			message: "Selected books have been checked out to the library member.",
			position: "top-center",
			autoClose: 3000,
			color: "green",
			classNames: notifClasses,
		});

		setSelectedRows([]);
	};

	const handleCheckIn = () => {
		const today = new Date().toISOString().split("T")[0];

		setScannedBooks((prev) =>
			prev.map((sb) => {
				if (selectedRows.includes(sb.copy_id)) {
					return {
						...sb,
						status: "Available",
						current_user: null,
					};
				}
				return sb;
			})
		);

		updateTransactions((prev) =>
			prev.map((tx) => {
				if (selectedRows.includes(tx.copy_id)) {
					if (tx.status === "Borrowed" || tx.status === "Overdue") {
						return {
							...tx,
							status: "Returned",
							return_date: today,
						};
					}
				}
				return tx;
			})
		);

		setSelectedRows([]);

		showNotification({
			title: "Check In Successful",
			message: "Selected books have been checked in.",
			position: "top-center",
			autoClose: 3000,
			color: "green",
			classNames: notifClasses,
		});
	};

	const handleRenew = () => {
		const invalidRows = scannedBooks.filter(
			(sb) =>
				selectedRows.includes(sb.copy_id) &&
				sb.status !== "Borrowed" &&
				sb.status !== "Overdue"
		);

		if (invalidRows.length > 0) {
			showNotification({
				title: "Cannot Renew",
				message: "Some selected books are not Borrowed or Overdue.",
				position: "top-center",
				autoClose: 3000,
				color: "red",
				classNames: notifClasses,
			});
			return;
		}

		const today = new Date();
		const twoWeeksLater = new Date(today);
		twoWeeksLater.setDate(today.getDate() + 14);
		const newDueDate = twoWeeksLater.toISOString().split("T")[0];

		updateTransactions((prev) =>
			prev.map((tx) => {
				if (selectedRows.includes(tx.copy_id)) {
					if (tx.status === "Borrowed" || tx.status === "Overdue") {
						return {
							...tx,
							status: tx.status === "Overdue" ? "Borrowed" : tx.status,
							due_date: newDueDate,
						};
					}
				}
				return tx;
			})
		);

		showNotification({
			title: "Renew Successful",
			message: "Selected books have been renewed for 2 more weeks.",
			position: "top-center",
			autoClose: 3000,
			color: "green",
			classNames: notifClasses,
		});

		setSelectedRows([]);
	};

	return (
		<div className="flex flex-col gap-4 h-full">
			<div className="flex justify-between space-x-2">
				<Card shadow="xs" withBorder className="w-1/2">
					<div className="flex items-center gap-4">
						{scannedUser === "" ? (
							<div className="h-[38px]" />
						) : (
							<Avatar color="teal" />
						)}
						<div className="flex flex-col">
							<span className="font-semibold leading-tight">
								{scannedUser.first_name} {scannedUser.last_name}
							</span>
							<span className="text-xs text-gray-500 leading-tight">
								{scannedUser.email}
							</span>
						</div>
					</div>
				</Card>
				<div className="w-1/2">
					<div className="flex justify-between gap-2">
						<div>
							<Tooltip label="Help" withArrow>
								<Button
									variant="subtle"
									px={0}
									py={0}
									style={{ aspectRatio: "1 / 1" }}
									onClick={() => setHelpOpened(true)}
								>
									<Info />
								</Button>
							</Tooltip>
							<Modal
								opened={helpOpened}
								onClose={() => setHelpOpened(false)}
								title="How to Use the Transaction Page"
								size="lg"
							>
								<div className="flex flex-col gap-4 text-sm">
									<div>
										<p className="font-semibold">1. Scan Library Card</p>
										<p>
											Click the <b>RFID Scan</b> or <b>Barcode Scan</b> button to scan the library card.
										</p>
									</div>

									<div>
										<p className="font-semibold">2. Scan Books</p>
										<p>
											Click the <b>RFID Scan</b> or <b>Barcode Scan</b> button to scan the books.
										</p>
									</div>

									<div>
										<p className="font-semibold">3. Select Books</p>
										<p>Click the <b>Transaction</b> tab and the checkboxes in each book’s row to select the books.</p>
									</div>

									<div>
										<p className="font-semibold">4. Perform Transaction</p>
										<p>
											Click the <b>Check Out</b>, <b>Check In</b>, or <b>Renew</b> to process the selected books.
										</p>
									</div>

									<div>
										<p className="font-semibold">5. Reset Session</p>
										<p>
											Click the <b>Finish</b> button to complete the current transaction session.
										</p>
									</div>

									<Button
										mt="md"
										onClick={() => setHelpOpened(false)}
										fullWidth
									>
										Got it
									</Button>
								</div>
							</Modal>
						</div>
						<div className="flex gap-2">
							<Button style={{ width: 135 }} variant="outline">
								Undo
							</Button>
							<Button
								style={{ width: 135 }}
								variant="filled"
								onClick={() => {
									setScannedUser("");
									setTempSelectedUser("");
									updateTransactions([]);
									setSelectedRows([]);
									setScannedBooks([]);
								}}
							>
								Finish
							</Button>
						</div>
					</div>
				</div>
			</div>
			<Card shadow="xs" withBorder className="h-full">
				<Tabs
					variant="none"
					value={value}
					onChange={setValue}
					className="relative h-full pb-12"
				>
					<Tabs.List ref={setRootRef} className="flex w-full" pb="md">
						<Tabs.Tab
							value="history"
							ref={setControlRef("history")}
							className="flex-1"
						>
							History
						</Tabs.Tab>
						<Tabs.Tab
							value="transaction"
							ref={setControlRef("transaction")}
							className="flex-1"
						>
							Transaction
						</Tabs.Tab>

						<FloatingIndicator
							target={value ? controlsRefs[value] : null}
							parent={rootRef}
							className="bg-transparent rounded-sm border border-gray-200 shadow-sm"
						/>
					</Tabs.List>

					<Tabs.Panel value="history" className="h-full">
						<ScrollArea className="h-full">
							<Table stickyHeader striped highlightOnHover>
								<Table.Thead>
									<Table.Tr>
										<Table.Th>Book Info</Table.Th>
										<Table.Th>Copy ID</Table.Th>
										<Table.Th>Book Title</Table.Th>
										<Table.Th>Book Author</Table.Th>
										<Table.Th>Book Location</Table.Th>
										<Table.Th>Borrow Date</Table.Th>
										<Table.Th>Due Date</Table.Th>
										<Table.Th>Return Date</Table.Th>
										<Table.Th>Status</Table.Th>
									</Table.Tr>
								</Table.Thead>
								<Table.Tbody>{transactionsRows}</Table.Tbody>
							</Table>
						</ScrollArea>
					</Tabs.Panel>

					<Tabs.Panel value="transaction" className="h-full">
						<ScrollArea className="h-full">
							<Table stickyHeader striped highlightOnHover>
								<Table.Thead>
									<Table.Tr>
										<Table.Th>Select</Table.Th>
										<Table.Th>Copy ID</Table.Th>
										<Table.Th>Book Title</Table.Th>
										<Table.Th>Book Author</Table.Th>
										<Table.Th>Book Location</Table.Th>
										<Table.Th>Member Name</Table.Th>
										<Table.Th>Member Email</Table.Th>
										<Table.Th>Status</Table.Th>
									</Table.Tr>
								</Table.Thead>
								<Table.Tbody>{scannedRows}</Table.Tbody>
							</Table>
						</ScrollArea>
					</Tabs.Panel>
				</Tabs>
			</Card>

			<div className="flex justify-between space-x-2">
				<div className="flex gap-2">
					<Button
						style={{ width: 135 }}
						variant="filled"
						onClick={() => setRfidModalOpened(true)}
					>
						RFID Scan
					</Button>
					<Modal
						opened={rfidModalOpened}
						onClose={() => setRfidModalOpened(false)}
						title="Select a Library Card to Scan"
					>
						<Select
							label="Member Email"
							placeholder="Select member"
							data={allUsers}
							value={tempSelectedUser}
							onChange={setTempSelectedUser}
						/>
						<Button className="mt-4" fullWidth onClick={handleRFIDScan}>
							Scan Library Card
						</Button>
					</Modal>
					<Button
						style={{ width: 135 }}
						variant="filled"
						onClick={() => setBarcodeModalOpened(true)}
					>
						Barcode Scan
					</Button>
					<Modal
						opened={barcodeModalOpened}
						onClose={() => setBarcodeModalOpened(false)}
						title="Select Books to Scan"
						size="lg"
					>
						<ScrollArea h={300}>
							<Table striped highlightOnHover>
								<Table.Thead>
									<Table.Tr>
										<Table.Th>Select</Table.Th>
										<Table.Th>Copy ID</Table.Th>
										<Table.Th>Title</Table.Th>
										<Table.Th>Author</Table.Th>
										<Table.Th>Location</Table.Th>
										<Table.Th>Status</Table.Th>
									</Table.Tr>
								</Table.Thead>
								<Table.Tbody>{barcodeModalRows}</Table.Tbody>
							</Table>
						</ScrollArea>
						<Button fullWidth className="mt-4" onClick={handleBarcodeScan}>
							Scan Books
						</Button>
					</Modal>
				</div>
				<div className="flex gap-2">
					<Button
						style={{ width: 135 }}
						variant="filled"
						onClick={() => {
							if (!checkLibraryCard("check out")) return;
							if (!checkSelectedRows("check out")) return;
							if (!checkNoOverdueBooks()) return;
							handleCheckOut();
						}}
					>
						Check Out
					</Button>
					<Button
						style={{ width: 135 }}
						variant="filled"
						onClick={() => {
							if (!checkLibraryCard("check in")) return;
							if (!checkSelectedRows("check in")) return;
							handleCheckIn();
						}}
					>
						Check In
					</Button>
					<Button
						style={{ width: 135 }}
						variant="filled"
						onClick={() => {
							if (!checkLibraryCard("renew")) return;
							if (!checkSelectedRows("renew")) return;
							handleRenew();
						}}
					>
						Renew
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Transaction;
