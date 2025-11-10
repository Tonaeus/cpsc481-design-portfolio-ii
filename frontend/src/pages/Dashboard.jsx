import { useEffect } from "react";
import {
	Card,
	Button,
	Stack,
	Title,
	Text,
	ScrollArea,
	Table,
} from "@mantine/core";
import {
	BookOpen,
	History,
	CreditCard,
	BarChart3,
	FileText,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import useAuthContext from "../hooks/useAuthContext";

const Dashboard = () => {
	const { state } = useAuthContext();
	const { user, loading } = state;
	const navigate = useNavigate();

	useEffect(() => {
		document.title = `${import.meta.env.VITE_APP_NAME_ABBREV} | Dashboard`;
	}, []);

	useEffect(() => {
		if (!loading && !user) {
			navigate("/account");
		}
	}, [loading, user, navigate]);

	return (
		<div className="h-full flex flex-col gap-4">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<Card withBorder className="col-span-3">
					<Title order={3}>
						Welcome,{" "}
						{user ? `${user.first_name} ${user.last_name}` : "Library Member"}!
					</Title>
				</Card>

				<Card withBorder className="md:col-span-2">
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
							<Table.Tbody>{}</Table.Tbody>
						</Table>
					</ScrollArea>
				</Card>

				<Card withBorder className="h-80"></Card>
				<Card withBorder className="h-80"></Card>
				<Card withBorder className="h-80"></Card>
				<Card withBorder className="h-80"></Card>
			</div>
		</div>
	);
};

export default Dashboard;
