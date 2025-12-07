import { useEffect } from "react";
import {
	Card,
	Grid,
	Group,
	Stack,
	Title,
	Text,
	Button,
	Image,
	Alert,
	Badge,
	Paper,
	Divider,
} from "@mantine/core";
import { Link, useLocation } from "react-router";
import MOCK_BOOKS from "../assets/data/MockBooks";

const Book = () => {
	const { state } = useLocation();
	const book = state?.book || MOCK_BOOKS[2];

	useEffect(() => {
		document.title = `${import.meta.env.VITE_APP_NAME_ABBREV} | ${
			book?.title || "Book"
		}`;
	}, [book?.title]);

	if (!book) {
		return (
			<Card
				className="h-auto min-h-full flex flex-col justify-between"
				withBorder
			>
				<Text>Book not found.</Text>
			</Card>
		);
	}

	const locationLabel = book.location
		? `Aisle ${book.location.aisle}, Shelf ${book.location.shelf}`
		: "Location unavailable";

	return (
		<Card
			className="h-auto min-h-full flex flex-col justify-between"
			withBorder
		>
			<Stack gap="lg">
				<Group position="apart" align="center">
					<Button
						component={Link}
						to={state?.from === "home" ? "/" : "/browse"}
						variant="subtle"
						size="sm"
					>
						{state?.from === "home" ? "← Back to Homepage" : "← Back to Browse"}
					</Button>

					<div />
				</Group>

				<Group justify="space-between" align="flex-start">
					<div>
						<Text size="xs" c="dimmed" fw={500} tt="uppercase">
							Book details
						</Text>
						<Title order={2} mt={4}>
							{book.title}
						</Title>

						<Group gap="xs" mt="xs" align="center">
							<Badge
								variant="light"
								color={book.available ? "green" : "gray"}
								radius="sm"
							>
								{book.available ? "Available" : "Checked out"}
							</Badge>

							<Text size="sm" c="dimmed">
								{book.author}
							</Text>

							{book.categories?.map((cat) => (
								<Badge
									key={cat}
									variant="outline"
									radius="sm"
									size="sm"
									ml="xs"
								>
									{cat}
								</Badge>
							))}
						</Group>
					</div>
				</Group>

				{book.available ? (
					<Alert
						variant="light"
						color="green"
						radius="md"
						title="Available to borrow"
						mt="md"
					>
						This book is currently on the shelf. Find it in the stacks and check
						it out at the self-service kiosk or at the main desk.
					</Alert>
				) : (
					<Alert
						variant="light"
						color="red"
						radius="md"
						title="Currently checked out"
						mt="md"
					>
						This title is on loan. Use the{" "}
						<Text span inherit fw={600}>
							Reserve
						</Text>{" "}
						button below to place a hold, and we'll set it aside for you once
						it's returned.
					</Alert>
				)}

				<Grid gutter="xl" align="stretch" mt="md">
					<Grid.Col span={{ base: 12, md: 8 }}>
						<Paper withBorder radius="md" p="md">
							<Text size="sm" fw={600} mb={8}>
								Metadata
							</Text>
							<Divider mb="sm" />

							<Stack gap={6}>
								<Group justify="space-between">
									<Text size="sm" c="dimmed">
										Author
									</Text>
									<Text size="sm" fw={500}>
										{book.author}
									</Text>
								</Group>

								<Group justify="space-between">
									<Text size="sm" c="dimmed">
										ISBN
									</Text>
									<Text size="sm" fw={500}>
										{book.isbn}
									</Text>
								</Group>

								<Group justify="space-between">
									<Text size="sm" c="dimmed">
										Location
									</Text>
									<Text size="sm" fw={500}>
										{locationLabel}
									</Text>
								</Group>
							</Stack>
						</Paper>

						<Paper radius="md" p="md" mt="md" bg="gray.0">
							<Text size="sm" fw={600} mb={4}>
								About this title
							</Text>
							<Text size="sm" c="dimmed">
								When a copy is available, you can borrow it directly from the
								library or this kiosk. When all copies are checked out, place a
								hold and you'll be notified when one is ready for pickup.
							</Text>
						</Paper>
					</Grid.Col>

					<Grid.Col span={{ base: 12, md: 4 }}>
						<Paper withBorder radius="md" p="sm">
							<Image
								src={
									book.cover ||
									"https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80"
								}
								alt={book.title}
								radius="md"
								w="100%"
								h={320}
								fit="contain"
							/>
						</Paper>
					</Grid.Col>
				</Grid>
			</Stack>

			<div className="pt-6">
				{book.available ? (
					<Text size="xs" c="dimmed" mt="xs">
						Reservations are only for books that are currently checked out.
						Since this copy is available, please find it on the shelf and check
						it out at the self-service kiosk or main desk.
					</Text>
				) : (
					<div className="flex flex-col gap-4">
						<Group>
							<Button w={135} component={Link} to="/reserve" state={{ book }}>
								Reserve book
							</Button>
						</Group>
						<Text size="xs" c="dimmed">
							You'll be notified via email when your reserved copy is ready for
							pickup.
						</Text>
					</div>
				)}
			</div>
		</Card>
	);
};

export default Book;
