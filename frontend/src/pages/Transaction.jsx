import { useState, useEffect } from "react";
import { Link } from "react-router";
import {
	Anchor,
	Avatar,
	Card,
	ScrollArea,
	Table,
	Text,
	Button,
	Checkbox,
	Modal,
	Select,
} from "@mantine/core";
import { Info } from "lucide-react";
import { showNotification } from "@mantine/notifications";
import { getTransactionsWithBookInfo } from "../../../backend/history.jsx";
import {
	getUser,
	getUsers,
	getAllBookCopiesWithUser,
} from "../../../backend/transaction.jsx";
import notifClasses from "../styles/notif.module.css";

const Transaction = () => {
	const [user, setUser] = useState("");
	const [transactions, setTransactions] = useState([]);
	const [scannedBooks, setScannedBooks] = useState([]);
	const [selectedRows, setSelectedRows] = useState([]);

	const [rfidModalOpened, setRfidModalOpened] = useState(false);
	const [allUsers, setAllUsers] = useState([]);
	const [tempSelectedUser, setTempSelectedUser] = useState("");

	const [copies, setCopies] = useState([]);
	const [barcodeModalOpened, setBarcodeModalOpened] = useState(false);
	const [barcodeSelected, setBarcodeSelected] = useState([]);

	useEffect(() => {
		document.title = "Transaction";
		const usersList = getUsers();
		setAllUsers(usersList.map((email) => ({ value: email, label: email })));

		const copiesList = getAllBookCopiesWithUser();
		setCopies(copiesList);
		console.log(copiesList);
	}, []);

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
			<Table.Td>{tx.status}</Table.Td>
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
			<Table.Td>{sb.borrow_date}</Table.Td>
			<Table.Td>{sb.due_date}</Table.Td>
			<Table.Td>{sb.return_date || "—"}</Table.Td>
			<Table.Td>{sb.status}</Table.Td>
		</Table.Tr>
	));

	const handleRFIDScan = () => {
		const scannedUser = getUser(tempSelectedUser);
		if (!scannedUser.email) {
			showNotification({
				title: "User Not Found",
				message: `No member found with email ${tempSelectedUser}.`,
				position: "bottom-center",
				autoClose: 3000,
				color: "red",
				classNames: notifClasses,
			});
			return;
		}
		setUser(scannedUser);
		setTransactions(getTransactionsWithBookInfo(tempSelectedUser));
		setSelectedRows([]);
		setRfidModalOpened(false);
	};

	const handleBarcodeScan = () => {
		const selectedBooks = copies.filter((copy) =>
			barcodeSelected.includes(copy.copy_id)
		);

		const newScanned = selectedBooks.filter(
			(copy) => !scannedBooks.some((sb) => sb.copy_id === copy.copy_id)
		);

		if (newScanned.length === 0) {
			showNotification({
				title: "Already Scanned",
				message: "These books are already in the scanned list.",
				position: "bottom-center",
				autoClose: 3000,
				color: "red",
				classNames: notifClasses,
			});
			return;
		}

		setScannedBooks((prev) => [...prev, ...newScanned]);
		setBarcodeSelected([]);
		setBarcodeModalOpened(false);

		showNotification({
			title: "Books Scanned",
			message: `${newScanned.length} book(s) added to scanned list.`,
			position: "bottom-center",
			autoClose: 2000,
			classNames: notifClasses,
		});
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
		if (!user) {
			showNotification({
				title: "Library Card Required",
				message: `Scan the member’s library card to ${action}.`,
				position: "bottom-center",
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
				position: "bottom-center",
				autoClose: 3000,
				color: "red",
				classNames: notifClasses,
			});
			return false;
		}
		return true;
	};

	const checkNoOverdueBooks = (memberName) => {
		const overdueRows = transactions.filter((tx) => tx.status === "Overdue");

		if (overdueRows.length > 0) {
			showNotification({
				id: "single-notification",
				title: "Overdue Books",
				message: `${memberName} cannot check out because they have overdue books.`,
				position: "bottom-center",
				autoClose: 3000,
				color: "red",
				classNames: notifClasses,
			});
			return false;
		}

		return true;
	};

	const handleCheckOut = () => {
		const invalidRows = transactions.filter(
			(tx) => selectedRows.includes(tx.transaction_id) && tx.status !== "-"
		);

		if (invalidRows.length > 0) {
			showNotification({
				title: "Cannot Check Out",
				message: "Some selected books are already borrowed or unavailable.",
				position: "bottom-center",
				autoClose: 3000,
				color: "red",
				classNames: notifClasses,
			});

			return;
		}

		setSelectedRows([]);
	};

	const handleCheckIn = () => {};

	const handleRenew = () => {
		const invalidRows = transactions.filter(
			(tx) =>
				selectedRows.includes(tx.transaction_id) &&
				tx.status !== "Borrowed" &&
				tx.status !== "Overdue"
		);

		if (invalidRows.length > 0) {
			showNotification({
				title: "Cannot Renew",
				message: "Some selected books are not 'Borrowed' or 'Overdue'.",
				position: "bottom-center",
				autoClose: 3000,
				color: "red",
				classNames: notifClasses,
			});

			return;
		}

		setSelectedRows([]);
	};

	return (
		<div className="flex flex-col gap-4 h-full">
			<div className="flex justify-between">
				<Card shadow="xs" withBorder className="w-1/2">
					<div className="flex flex-row items-center gap-3">
						<Avatar />
						<Text size="sm">
							{user.first_name} {user.first_name}
						</Text>
					</div>
				</Card>
				<div>
					<div>
						<Button
							variant="filled"
							onClick={() => {
								setUser("");
								setTempSelectedUser("");
								setTransactions([]);
								setSelectedRows([]);
								setScannedBooks([]);
							}}
						>
							Finish
						</Button>
					</div>
				</div>
			</div>
			<Card shadow="xs" withBorder className="flex-1">
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
			</Card>
			<Card shadow="xs" withBorder className="flex-1">
				<ScrollArea className="h-full">
					<Table stickyHeader striped highlightOnHover>
						<Table.Thead>
							<Table.Tr>
								<Table.Th>Select</Table.Th>
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
						<Table.Tbody>{scannedRows}</Table.Tbody>
					</Table>
				</ScrollArea>
			</Card>
			<div className="flex justify-between">
				<div className="flex gap-2">
					<Button variant="filled" onClick={() => setRfidModalOpened(true)}>
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
					<Button variant="filled" onClick={() => setBarcodeModalOpened(true)}>
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
						variant="filled"
						onClick={() => {
							if (!checkLibraryCard("check out")) return;
							if (!checkSelectedRows("check out")) return;
							if (!checkNoOverdueBooks(`${user.first_name} ${user.last_name}`))
								return;
							handleCheckOut();
						}}
					>
						Check Out
					</Button>
					<Button
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
