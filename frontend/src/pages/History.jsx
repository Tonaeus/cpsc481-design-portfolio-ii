import { useState, useEffect } from "react";
import { ScrollArea, Table, TextInput, Text, Button } from "@mantine/core";
import { Search } from "lucide-react";
import { getTransactionsWithBookInfo } from "../../../backend/history.jsx";

const History = () => {
	const [transactions, setTransactions] = useState([]);
	const [search, setSearch] = useState("");

	useEffect(() => {
		document.title = "History";

		const data = getTransactionsWithBookInfo("tony.tran@example.com");
		setTransactions(data);
	}, []);

	const filteredTransactions = transactions.filter((tx) =>
		tx.book.title.toLowerCase().includes(search.toLowerCase())
	);

	const rows = filteredTransactions.map((tx) => (
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
		<div className="flex flex-col gap-4">
			<div className="flex justify-between">
				<TextInput
					className="w-1/2"
					placeholder="Search by book title"
					leftSection={<Search size={16} strokeWidth={2} />}
					value={search}
					onChange={(e) => setSearch(e.currentTarget.value)}
				/>
				<div className="flex gap-2">
					<Button variant="filled">Filter</Button>
					<Button variant="filled">Sort</Button>
				</div>
			</div>
			<div>
				{filteredTransactions.length === 0 ? (
					<Text>No matching books found.</Text>
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
		</div>
	);
};

export default History;
