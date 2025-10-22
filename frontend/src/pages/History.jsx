import { useState, useEffect } from "react";
import { ScrollArea, Table, Title, Text } from "@mantine/core";
import { getTransactionsWithBookInfo } from "../../../backend/history.jsx";

const History = () => {
	const [transactions, setTransactions] = useState([]);

	useEffect(() => {
		document.title = "History";

		const data = getTransactionsWithBookInfo("tony.tran@example.com");
		setTransactions(data);
		console.log(data);
	}, []);

	const rows = transactions.map((tx) => (
		<Table.Tr key={tx.transaction_id}>
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
		<div>
			<Title order={2} mb="md">
				History
			</Title>

			{transactions.length === 0 ? (
				<Text>No transactions found.</Text>
			) : (
				<ScrollArea h={400}>
					<Table stickyHeader striped highlightOnHover>
						<Table.Thead>
							<Table.Tr>
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
			)}
		</div>
	);
};

export default History;
