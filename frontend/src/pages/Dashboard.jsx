import { useEffect } from "react";
import { Card, Button, Stack, Title, Text } from "@mantine/core";
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
	const { user } = state;
	const navigate = useNavigate();

	useEffect(() => {
		document.title = `${import.meta.env.VITE_APP_NAME_ABBREV} | Dashboard`;
	}, []);

	useEffect(() => {
		if (!user) {
			navigate("/account");
		}
	}, [user, navigate]);

	return (
		<div className="h-full flex flex-col gap-4">
			<Card>
				<Title order={3}>
					Welcome,{" "}
					{user ? `${user.first_name} ${user.last_name}` : "Library Member"}!
				</Title>
			</Card>
		</div>
	);
};

export default Dashboard;
