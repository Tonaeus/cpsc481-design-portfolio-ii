import { useEffect } from "react";
import { Card, TextInput, Button, Group, Text, Anchor } from "@mantine/core";
import { Link } from "react-router";

const ForgotPassword = () => {
	useEffect(() => {
		document.title = `${
			import.meta.env.VITE_APP_NAME_ABBREV
		} | Forgot Password`;
	}, []);

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
				/>
				<Group position="apart" mb="sm">
					<Button fullWidth>Send Reset Link</Button>
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
