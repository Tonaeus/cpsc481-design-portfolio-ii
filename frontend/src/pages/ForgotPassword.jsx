import { useState, useEffect } from "react";
import { Card, TextInput, Button, Group, Text, Anchor } from "@mantine/core";
import { Link, useNavigate } from "react-router";
import { showNotification } from "@mantine/notifications";
import notifClasses from "../styles/notif.module.css";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		document.title = `${
			import.meta.env.VITE_APP_NAME_ABBREV
		} | Forgot Password`;
	}, []);

	const handleSendReset = () => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!emailRegex.test(email)) {
			showNotification({
				title: "Invalid Email",
				message: "Please enter a valid email address.",
				position: "top-center",
				autoClose: 3000,
				color: "red",
				classNames: notifClasses,
			});
			return;
		}

		showNotification({
			title: "Reset Link Sent",
			message: "Check your email for the password reset link.",
			position: "top-center",
			autoClose: 3000,
			color: "green",
			classNames: notifClasses,
		});

		navigate("/account");
	};

	return (
		<div className="h-full flex justify-center items-center">
			<Card padding="xl" withBorder className="w-sm">
				<Text size="xl" weight={500} ta="center" mb="sm">
					Forgot Password
				</Text>

				<Text mb="sm">
					Enter your email address below to get a password reset link.
				</Text>
				<TextInput
					label="Email"
					placeholder="you@example.com"
					required
					mb="md"
					value={email}
					onChange={(e) => setEmail(e.currentTarget.value)}
				/>
				<Group position="apart" mb="sm">
					<Button fullWidth onClick={handleSendReset}>
						Send Reset Link
					</Button>
				</Group>
				<Anchor component={Link} to="/account" c="dimmed">
					<Text size="sm" ta="center">
						Back to Sign In
					</Text>
				</Anchor>
			</Card>
		</div>
	);
};

export default ForgotPassword;
