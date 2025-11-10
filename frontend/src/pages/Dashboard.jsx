import { useState, useEffect } from "react";
import {
	Anchor,
	Card,
	Title,
	ScrollArea,
	Table,
	Badge,
} from "@mantine/core";
import { Info } from "lucide-react";
import { Link, useNavigate } from "react-router";
import useAuthContext from "../hooks/useAuthContext";
import { getTransactionsWithBookInfo } from "../../../backend/history.jsx";
import { getStatusColor } from "../utils/status.jsx";

const Dashboard = () => {
	const { state } = useAuthContext();
	const { user, loading } = state;
	const navigate = useNavigate();

	const [transactions, setTransactions] = useState([]);

	useEffect(() => {
		document.title = `${import.meta.env.VITE_APP_NAME_ABBREV} | Dashboard`;
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
		["Borrowed", "Overdue", "Reserved"].includes(tx.status)
	);

	const rows = filteredTransactions.map((tx) => (
		<Table.Tr key={tx.transaction_id}>
			<Table.Td>
				<Anchor component={Link} to={`/books/${tx.book.id}`}>
					<Info size={18} />
				</Anchor>
			</Table.Td>
			<Table.Td>{tx.book.title}</Table.Td>
			<Table.Td>{tx.book.author}</Table.Td>
			<Table.Td>{tx.due_date}</Table.Td>
			<Table.Td>
				<Badge color={getStatusColor(tx.status)} variant="light">
					{tx.status}
				</Badge>
			</Table.Td>
		</Table.Tr>
	));

	return (
		<div className="h-full flex flex-col gap-4">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{/* Welcome */}
				<Card withBorder className="md:col-span-3">
					<Title order={3}>
						Welcome,{" "}
						{user ? `${user.first_name} ${user.last_name}` : "Library Member"}!
					</Title>
				</Card>
				
				{/* Borrowed Items */}
				<Card withBorder className="h-80 md:col-span-2">
					<Title order={4} >
						Borrowed Items
					</Title>
					<div className="h-[1px] my-4 bg-gray-200" />
					<ScrollArea className="h-full">
						<Table stickyHeader striped highlightOnHover>
							<Table.Thead>
								<Table.Tr>
									<Table.Th>Book Info</Table.Th>
									<Table.Th>Book Title</Table.Th>
									<Table.Th>Book Author</Table.Th>
									<Table.Th>Due Date</Table.Th>
									<Table.Th>Status</Table.Th>
								</Table.Tr>
							</Table.Thead>
							<Table.Tbody>{rows}</Table.Tbody>
						</Table>
					</ScrollArea>
				</Card>

				{/* Fees */}
				<Card withBorder className="h-80">
					<Title order={4}>Fees</Title>
				</Card>

				{/* Total Books */}
				<Card withBorder className="h-64">
					<Title order={4}>Total Books</Title>
				</Card>

				{/* Book Genre */}
				<Card withBorder className="h-64">
					<Title order={4}>Book Genres</Title>
				</Card>

				{/* Book Author */}
				<Card withBorder className="h-64">
					<Title order={4}>Top Authors</Title>
				</Card>

				{/* Recommendations */}
				<Card withBorder className="h-80 md:col-span-3">
					<Title order={4}>Recommendations</Title>
				</Card>
			</div>
		</div>
	);
};

export default Dashboard;
