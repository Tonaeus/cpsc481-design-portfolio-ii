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
import { getTransactionsWithBookInfo } from "../../../backend/history.jsx";
import { getUser } from "../../../backend/transaction.jsx";

const Transaction = () => {
	const [transactions, setTransactions] = useState([]);
	const [user, setUser] = useState("");
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
			<Table.Td>{tx.return_date || "—"}</Table.Td>
			<Table.Td>{tx.status}</Table.Td>
		</Table.Tr>
	));

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
					<Button variant="filled">Finish</Button>
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
					<Button variant="filled">Check Out</Button>
					<Button variant="filled">Check In</Button>
					<Button variant="filled">Renew</Button>
				</div>
			</div>
		</div>
	);
};

export default Transaction;
