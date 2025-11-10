import { useState, useEffect } from "react";
import {
	Anchor,
	Card,
	Title,
	ScrollArea,
	Table,
	Badge,
	Text,
} from "@mantine/core";
import { DonutChart, BarChart } from "@mantine/charts";
import { Info, BookOpen } from "lucide-react";
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

	let feeFilteredTransactions = transactions.filter((tx) =>
		["Overdue"].includes(tx.status)
	);

	const today = new Date();
	const feeRate = 0.5;

	const fees = feeFilteredTransactions.map((tx) => {
		const dueDate = new Date(tx.due_date);
		let fee = 0;

		if (dueDate < today && tx.status !== "Returned") {
			const daysOverdue = Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24));
			fee = daysOverdue * feeRate;
		}

		return (
			<Table.Tr key={tx.transaction_id}>
				<Table.Td>{tx.book.title}</Table.Td>
				<Table.Td>{tx.due_date}</Table.Td>
				<Table.Td>${fee.toFixed(2)}</Table.Td>
			</Table.Tr>
		);
	});

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
				<Card withBorder className="h-72 md:col-span-2">
					<Title order={4}>Borrowed Items</Title>
					<div className="h-[1px] my-4 bg-gray-200" />
					{rows.length > 0 ? (
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
					) : (
						<Text ta="center" c="dimmed" className="mt-6">
							No borrowed items 📚
						</Text>
					)}
				</Card>

				{/* Fees */}
				<Card withBorder className="h-72">
					<Title order={4}>Fees</Title>
					<div className="h-[1px] my-4 bg-gray-200" />
					{fees.length > 0 ? (
						<ScrollArea className="h-full">
							<Table stickyHeader striped highlightOnHover>
								<Table.Thead>
									<Table.Tr>
										<Table.Th>Book Title</Table.Th>
										<Table.Th>Due Date</Table.Th>
										<Table.Th>Fee</Table.Th>
									</Table.Tr>
								</Table.Thead>
								<Table.Tbody>{fees}</Table.Tbody>
							</Table>
						</ScrollArea>
					) : (
						<Text ta="center" c="dimmed" className="mt-6">
							No outstanding fees 🎉
						</Text>
					)}
				</Card>

				{/* Total Books */}
				<Card withBorder className="h-64 flex flex-col">
					<Title order={4}>Total Books</Title>
					<div className="flex flex-col justify-center items-center flex-1 text-center">
						<BookOpen size={40} strokeWidth={1.5} />
						<Title order={2} mt="sm">
							132
						</Title>
						<Text c="dimmed" size="sm">
							Total Books Read
						</Text>
					</div>
				</Card>

				{/* Book Genre */}
				<Card withBorder className="h-64 flex flex-col">
					<Title order={4}>Book Genres</Title>
					<div className="flex justify-center items-center flex-1">
						<DonutChart
							paddingAngle={2}
							className="h-full"
							data={[
								{ name: "Fiction", value: 45, color: "teal.9" },
								{ name: "Non-fiction", value: 30, color: "teal.7" },
								{ name: "Science", value: 15, color: "teal.5" },
								{ name: "History", value: 10, color: "teal.3" },
								{ name: "Other", value: 5, color: "teal.1" },
							]}
						/>
					</div>
				</Card>

				{/* Book Author */}
				<Card withBorder className="h-64" padding={0} clas>
					<Title order={4} className="p-4">
						Top Authors
					</Title>
					<div className="flex justify-start items-center flex-1">
						<BarChart
							className="h-full pb-4 pr-8"
							data={[
								{ author: "J.K. Rowling", Books: 13 },
								{ author: "George R.R. Martin", Books: 10 },
								{ author: "Agatha Christie", Books: 9 },
								{ author: "Stephen King", Books: 7 },
								{ author: "J.R.R. Tolkien", Books: 4 },
							]}
							dataKey="author"
							series={[{ name: "Books", color: "teal.6" }]}
						/>
					</div>
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
