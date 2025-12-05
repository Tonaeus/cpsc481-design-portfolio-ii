import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import {
	Anchor,
	ScrollArea,
	Table,
	TextInput,
	Button,
	Card,
	Modal,
	Select,
	Badge,
} from "@mantine/core";
import { Search, Info } from "lucide-react";
import { getTransactionsWithBookInfo } from "../../backend/history.jsx";
import { getStatusColor } from "../utils/status.jsx";
import useAuthContext from "../hooks/useAuthContext";

const History = () => {
	const { state } = useAuthContext();
	const { user, loading } = state;
	const navigate = useNavigate();

	const [transactions, setTransactions] = useState([]);
	const [search, setSearch] = useState("");

	const [filterModalOpened, setFilterModalOpened] = useState(false);
	const [sortModalOpened, setSortModalOpened] = useState(false);

	const [statusFilter, setStatusFilter] = useState("");
	const [sortBy, setSortBy] = useState("");

	const [tempStatusFilter, setTempStatusFilter] = useState("");
	const [tempSortBy, setTempSortBy] = useState("");

	useEffect(() => {
		document.title = `${import.meta.env.VITE_APP_NAME_ABBREV} | History`;
	}, []);

	useEffect(() => {
		if (!loading && !user) {
			navigate("/account");
		} else if (!loading && user?.email) {
			const data = getTransactionsWithBookInfo(user.email);
			setTransactions(data);
		}
	}, [loading, user, navigate]);

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
	} else if (sortBy === "due_date") {
		filteredTransactions.sort(
			(a, b) => new Date(a.due_date) - new Date(b.due_date)
		);
	} else if (sortBy === "return_date") {
		filteredTransactions.sort(
			(a, b) => new Date(a.return_date || 0) - new Date(b.return_date || 0)
		);
	}

	const rows = filteredTransactions.map((tx) => (
		<Table.Tr key={tx.transaction_id}>
			<Table.Td>
				<Anchor component={Link} to={`/books/${tx.book.id}`}>
					<Info size={18} />
				</Anchor>
			</Table.Td>
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

	return (
		<div className="flex flex-col gap-4 h-full">
			<div className="flex justify-between space-x-2">
				<TextInput
					className="w-1/2"
					placeholder="Search by book title"
					leftSection={<Search size={16} strokeWidth={2} />}
					value={search}
					onChange={(e) => setSearch(e.currentTarget.value)}
				/>
				<div className="flex gap-2">
					<Button
					style={{ width: 135 }}
						variant="filled"
						onClick={() => {
							setTempStatusFilter(statusFilter);
							setFilterModalOpened(true);
						}}
					>
						Filter
					</Button>
					<Button
					style={{ width: 135 }}
						variant="filled"
						onClick={() => {
							setTempSortBy(sortBy);
							setSortModalOpened(true);
						}}
					>
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
					value={tempStatusFilter}
					onChange={setTempStatusFilter}
				/>
				<Button
					className="mt-4"
					fullWidth
					onClick={() => {
						setStatusFilter(tempStatusFilter);
						setFilterModalOpened(false);
					}}
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
						{ value: "due_date", label: "Due Date" },
						{ value: "return_date", label: "Return Date" },
					]}
					value={tempSortBy}
					onChange={setTempSortBy}
				/>
				<Button
					className="mt-4"
					fullWidth
					onClick={() => {
						setSortBy(tempSortBy);
						setSortModalOpened(false);
					}}
				>
					Apply Sort
				</Button>
			</Modal>

			<Card shadow="xs" withBorder className="h-full">
				<ScrollArea className="h-full">
					<Table stickyHeader striped highlightOnHover>
						<Table.Thead>
							<Table.Tr>
								<Table.Th>Book Info</Table.Th>
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
		</div>
	);
};

export default History;
