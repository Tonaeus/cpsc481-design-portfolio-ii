import { useState, useEffect } from "react";
import {
	Avatar,
	Card,
	ScrollArea,
	Table,
	Text,
	Button,
	Checkbox,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { getTransactionsWithBookInfo } from "../../../backend/history.jsx";
import { getUser } from "../../../backend/transaction.jsx";
import notifClasses from "../styles/notif.module.css";

const Transaction = () => {
	const [user, setUser] = useState("");
	const [transactions, setTransactions] = useState([]);
	const [selectedRows, setSelectedRows] = useState([]);

	useEffect(() => {
		document.title = "Transaction";

		const user = getUser("tony.tran@example.com");
		setUser(user);

		const data = getTransactionsWithBookInfo("tony.tran@example.com");
		setTransactions(data);
	}, []);

	const toggleRow = (id) => {
		setSelectedRows((prev) =>
			prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
		);
	};

	const rows = transactions.map((tx) => (
		<Table.Tr key={tx.transaction_id}>
			<Table.Td>
				<Checkbox
					checked={selectedRows.includes(tx.transaction_id)}
					onChange={() => toggleRow(tx.transaction_id)}
				/>
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

	const checkSelectedRows = (action = "perform this action") => {
		if (selectedRows.length === 0) {
			showNotification({
				title: "No Selection",
				message: `Please select at least one book to ${action}.`,
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
								setTransactions([]);
								setSelectedRows([]);
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
						<Table.Tbody>{rows}</Table.Tbody>
					</Table>
				</ScrollArea>
			</Card>
			<div className="flex justify-between">
				<div className="flex gap-2">
					<Button variant="filled">RFID Scan</Button>
					<Button variant="filled">Barcode Scan</Button>
				</div>
				<div className="flex gap-2">
					<Button
						variant="filled"
						onClick={() => {
							if (!checkSelectedRows("check out")) return;
								if (!checkNoOverdueBooks(`${user.first_name} ${user.last_name}`)) return;
						}}
					>
						Check Out
					</Button>
					<Button
						variant="filled"
						onClick={() => {
							if (!checkSelectedRows("check in")) return;
						}}
					>
						Check In
					</Button>
					<Button
						variant="filled"
						onClick={() => {
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
