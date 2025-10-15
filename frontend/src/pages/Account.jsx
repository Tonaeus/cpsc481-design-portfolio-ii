import { useEffect, useState } from "react";
import {
	Card,
	Tabs,
	TextInput,
	PasswordInput,
	Button,
	Group,
	Text,
	FloatingIndicator,
} from "@mantine/core";

const Account = () => {
	useEffect(() => {
		document.title = "Account";
	}, []);

	const [rootRef, setRootRef] = useState(null);
	const [value, setValue] = useState("1");
	const [controlsRefs, setControlsRefs] = useState({});
	const setControlRef = (val) => (node) => {
		controlsRefs[val] = node;
		setControlsRefs(controlsRefs);
	};

	return (
		<div className="h-full flex justify-center items-center">
			<Card shadow="xs" radius="lg" padding="xl" withBorder className="w-sm">
				<Tabs
					variant="none"
					value={value}
					onChange={setValue}
					className="relative"
				>
					<Tabs.List ref={setRootRef} className="flex w-full" mb="sm">
						<Tabs.Tab value="1" ref={setControlRef("1")} className="flex-1">
							Sign In
						</Tabs.Tab>
						<Tabs.Tab value="2" ref={setControlRef("2")} className="flex-1">
							Sign Up
						</Tabs.Tab>

						<FloatingIndicator
							target={value ? controlsRefs[value] : null}
							parent={rootRef}
							className="bg-transparent rounded-md border border-gray-200 shadow-sm"
						>
						</FloatingIndicator>
					</Tabs.List>

					<Tabs.Panel value="1">
						<TextInput
							label="Email"
							placeholder="you@example.com"
							required
							mb="sm"
						/>
						<PasswordInput
							label="Password"
							placeholder="••••••••"
							required
							mb="sm"
						/>
						<Group justify="space-between" mt="md">
							<Button fullWidth>Sign in</Button>
						</Group>
						<Text size="sm" mt="sm" c="dimmed" ta="center">
							Forgot password?
						</Text>
					</Tabs.Panel>
					<Tabs.Panel value="2">
						<TextInput
							label="First Name"
							placeholder="First Name"
							required
							mb="sm"
						/>
						<TextInput
							label="Last Name"
							placeholder="Last Name"
							required
							mb="sm"
						/>
						<TextInput
							label="Email"
							placeholder="you@example.com"
							required
							mb="sm"
						/>
						<PasswordInput
							label="Password"
							placeholder="••••••••"
							required
							mb="sm"
						/>
						<PasswordInput
							label="Confirm Password"
							placeholder="••••••••"
							required
							mb="sm"
						/>
						<Button fullWidth mt="md">
							Sign up
						</Button>
					</Tabs.Panel>
				</Tabs>
			</Card>
		</div>
	);
};

export default Account;
