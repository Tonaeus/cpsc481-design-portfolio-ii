import { useState, useEffect } from "react";
import {
	ScrollArea,
	Table,
	TextInput,
	Text,
	Button,
	Card,
	Modal,
	Select,
} from "@mantine/core";
import { Search } from "lucide-react";
import { getTransactionsWithBookInfo } from "../../../backend/history.jsx";

const History = () => {
	const [transactions, setTransactions] = useState([]);
	const [search, setSearch] = useState("");

	const [filterModalOpened, setFilterModalOpened] = useState(false);
	const [sortModalOpened, setSortModalOpened] = useState(false);

	const [statusFilter, setStatusFilter] = useState("");
	const [sortBy, setSortBy] = useState("");

	useEffect(() => {
		document.title = "History";
		const data = getTransactionsWithBookInfo("tony.tran@example.com");
		setTransactions(data);
	}, []);

	let filteredTransactions = transactions.filter((tx) =>
		tx.book.title.toLowerCase().includes(search.toLowerCase())
	);

	if (statusFilter) {
		filteredTransactions = filteredTransactions.filter(
			(tx) => tx.status === statusFilter
		);
	}

	if (sortBy === "borrow_date") {
		filteredTransactions.sort(
			(a, b) => new Date(a.borrow_date) - new Date(b.borrow_date)
		);
	} else if (sortBy === "return_date") {
		filteredTransactions.sort(
			(a, b) => new Date(a.return_date || 0) - new Date(b.return_date || 0)
		);
	}

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
		<div className="flex flex-col gap-4 h-full">
			<div className="flex justify-between">
				<TextInput
					className="w-1/2"
					placeholder="Search by book title"
					leftSection={<Search size={16} strokeWidth={2} />}
					value={search}
					onChange={(e) => setSearch(e.currentTarget.value)}
				/>
				<div className="flex gap-2">
					<Button variant="filled" onClick={() => setFilterModalOpened(true)}>
						Filter
					</Button>
					<Button variant="filled" onClick={() => setSortModalOpened(true)}>
						Sort
					</Button>
				</div>
			</div>

			<Modal
				opened={filterModalOpened}
				onClose={() => setFilterModalOpened(false)}
				title="Filter History"
			>
				<Select
					label="Status"
					placeholder="Select status"
					data={[
						{ value: "", label: "None" },
						{ value: "Borrowed", label: "Borrowed" },
						{ value: "Returned", label: "Returned" },
						{ value: "Overdue", label: "Overdue" },
					]}
					value={statusFilter}
					onChange={setStatusFilter}
				/>
				<Button
					className="mt-4"
					fullWidth
					onClick={() => setFilterModalOpened(false)}
				>
					Apply Filter
				</Button>
			</Modal>

			<Modal
				opened={sortModalOpened}
				onClose={() => setSortModalOpened(false)}
				title="Sort History"
			>
				<Select
					label="Sort by"
					placeholder="Select field"
					data={[
						{ value: "", label: "None" },
						{ value: "borrow_date", label: "Borrow Date" },
						{ value: "return_date", label: "Return Date" },
					]}
					value={sortBy}
					onChange={setSortBy}
				/>
				<Button
					className="mt-4"
					fullWidth
					onClick={() => setSortModalOpened(false)}
				>
					Apply Sort
				</Button>
			</Modal>

			<Card shadow="xs" withBorder className="h-full">
				{filteredTransactions.length === 0 ? (
					<Text>No matching books found.</Text>
				) : (
					<ScrollArea className="h-full">
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
			</Card>
		</div>
	);
};

export default History;
