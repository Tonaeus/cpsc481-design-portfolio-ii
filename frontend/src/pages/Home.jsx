import { useEffect } from "react";
import {
	Button,
	Card,
	Title,
	Text,
	Group,
	Stack,
	Badge,
	Box,
	Center,
	Image,
	Paper,
} from "@mantine/core";
import { Link } from "react-router";
import {
	BookOpen,
	Calendar,
	CreditCard,
	Users,
	ArrowRight,
	Book,
	Clock,
	MapPin,
} from "lucide-react";

import theGreatGatsby from "../assets/book-covers/the-great-gatsby.jpg";
import _1984 from "../assets/book-covers/1984.jpg";
import toKillAMockingbird from "../assets/book-covers/to-kill-a-mockingbird.jpg";
import prideAndPrejudice from "../assets/book-covers/pride-and-prejudice.jpg";
import braveNewWorld from "../assets/book-covers/brave-new-world.jpg";
import theHobbit from "../assets/book-covers/the-hobbit.jpg";
import fahrenheit451 from "../assets/book-covers/fahrenheit-451.jpg";

// The component is now a standard JavaScript function with props
export default function Home({ onNavigateToPayment }) {
	useEffect(() => {
		document.title = `${import.meta.env.VITE_APP_NAME_ABBREV} | Home`;
	}, []);

	const featuredBooks = [
		{
			id: 1,
			title: "The Great Gatsby",
			author: "F. Scott Fitzgerald",
			cover: theGreatGatsby,
			category: "Fiction",
		},
		{
			id: 2,
			title: "The Hobbit",
			author: "J.R.R. Tolkien",
			cover: theHobbit,
			category: "Science",
		},
		{
			id: 3,
			title: "1984",
			author: "George Orwell",
			cover: _1984,
			category: "Sci-Fi",
		},
		{
			id: 4,
			title: "Brave New World",
			author: "Aldous Huxley",
			cover: braveNewWorld,
			category: "Children's Book",
		},
	];

	const newsItems = [
		{
			id: 1,
			date: "November 28, 2025",
			title: "Extended Holiday Hours",
			description:
				"The library will be open extended hours during the holiday season to serve you better.",
		},
		{
			id: 2,
			date: "November 25, 2025",
			title: "New Digital Collection Available",
			description:
				"Access thousands of audiobooks and e-books through our new partnership with OverDrive.",
		},
		{
			id: 3,
			date: "November 20, 2025",
			title: "Winter Reading Challenge",
			description:
				"Join our winter reading challenge! Read 5 books and win a prize.",
		},
	];

	const upcomingEvents = [
		{
			id: 1,
			title: "Children's Story Time",
			date: "Every Saturday",
			time: "10:00 AM",
			location: "Children's Wing",
		},
		{
			id: 2,
			title: "Book Club: Modern Classics",
			date: "December 8, 2025",
			time: "6:00 PM",
			location: "Meeting Room A",
		},
		{
			id: 3,
			title: "Tech Help Sessions",
			date: "Every Tuesday",
			time: "2:00 PM",
			location: "Computer Lab",
		},
	];

	// Utility function for scrolling to the events section
	const scrollToEvents = () => {
		const eventsSection = document.getElementById("upcoming-events-section");
		if (eventsSection) {
			eventsSection.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	};

	// Utility to match the dark teal styling on headings/titles
	const H2Title = ({ children }) => (
		<Title order={2} c="teal.7" className="text-teal-700">
			{children}
		</Title>
	);

	return (
		<Box className="size-full overflow-y-auto bg-gray-100">
			{/* Hero Section (Matching teal background with image overlay) */}
			<Box
				className="relative h-[350px] flex items-center justify-center overflow-hidden"
				style={{
					backgroundColor: "var(--mantine-color-teal-6)",
				}}
			>
				<Box
					className="absolute inset-0 opacity-10"
					style={{
						backgroundImage:
							'url("https://images.unsplash.com/photo-1703236079592-4d2f222e8d2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsaWJyYXJ5JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY0NTM5MTcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral")',
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				/>
				<div className="relative z-10 text-center text-white px-6 max-w-3xl">
					<Title order={1} c="white" className="mb-4">
						Welcome to the Drumheller Public Library
					</Title>
					<Text c="white">
						Discover, learn, and connect with your community. Explore thousands
						of books, attend events, and access digital resources.
					</Text>
				</div>
			</Box>

			{/* Quick Actions (Updated to remove Pay Fees and modify Events link) */}
			<Box className="max-w-6xl mx-auto px-4 -mt-20 relative z-20 mb-12">
				{/* Changed to grid-cols-3 since Pay Fees was removed */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					{/* Card 1: Browse Catalog -> Links to /browse */}
					<Card
						withBorder
						shadow="md"
						component={Link}
						to="/browse"
						className="hover:shadow-lg transition-all cursor-pointer text-center"
					>
						<Stack gap="xs" align="center">
							<BookOpen size={48} color="var(--mantine-color-teal-6)" />
							<Title order={4} c="teal.7">
								Browse Catalog
							</Title>
							<Text size="sm" c="dimmed">
								Search our collection
							</Text>
						</Stack>
					</Card>

					{/* Card 2: My Account */}
					<Card
						withBorder
						shadow="md"
						component={Link}
						to="/dashboard"
						className="hover:shadow-lg transition-all cursor-pointer text-center"
					>
						<Stack gap="xs" align="center">
							<Users size={48} color="var(--mantine-color-teal-6)" />
							<Title order={4} c="teal.7">
								My Account
							</Title>
							<Text size="sm" c="dimmed">
								View loans & holds
							</Text>
						</Stack>
					</Card>

					{/* Card 3: Events -> Scrolls to Events Section */}
					<Card
						withBorder
						shadow="md"
						onClick={scrollToEvents} // Use the scroll function
						className="hover:shadow-lg transition-all cursor-pointer text-center"
					>
						<Stack gap="xs" align="center">
							<Calendar size={48} color="var(--mantine-color-teal-6)" />
							<Title order={4} c="teal.7">
								Events
							</Title>
							<Text size="sm" c="dimmed">
								See what's happening
							</Text>
						</Stack>
					</Card>
				</div>
			</Box>

			<Box className="max-w-6xl mx-auto px-4 pb-4">
				{/* Featured Books */}
				<section className="mb-12">
					<Group justify="space-between" mb="lg">
						<H2Title>Staff Recommendations</H2Title>
					</Group>

					<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
						{featuredBooks.map((book) => (
							<Card
								key={book.id}
								withBorder
								shadow="md"
								className="hover:shadow-lg transition-all cursor-pointer overflow-hidden"
								padding="0"
							>
								<Box className="h-48 flex items-center justify-center">
									<Image
										src={book.cover}
										fit="contain"
										alt={book.title}
										className="h-40"
										size={80}
									/>
								</Box>
								<Box p="md">
									<Badge color="teal.1" c="teal.7" mb="xs">
										{book.category}
									</Badge>
									<Title order={4} c="teal.7" lineClamp={1}>
										{book.title}
									</Title>
									<Text c="dimmed" size="sm" lineClamp={1}>
										{book.author}
									</Text>
								</Box>
							</Card>
						))}
					</div>
				</section>

				{/* Library News and Events */}
				{/* Added ID to allow scrolling to this section */}
				<div
					className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
					id="upcoming-events-section"
				>
					{/* News Section */}
					<section>
						<Group justify="space-between" mb="lg">
							<H2Title className="mb-6">Library News</H2Title>
						</Group>
						<Stack gap="md">
							{newsItems.map((item) => (
								<Card
									key={item.id}
									withBorder
									shadow="md"
									className="hover:shadow-lg transition-all cursor-pointer"
								>
									<Group align="flex-start" wrap="nowrap">
										<Center
											p="xs"
											style={{
												backgroundColor: "var(--mantine-color-teal-1)",
												borderRadius: "var(--mantine-radius-md)",
											}}
										>
											<Book size={20} color="var(--mantine-color-teal-6)" />
										</Center>
										<Stack gap={0} className="flex-1">
											<Text size="sm" c="dimmed" mb={2}>
												{item.date}
											</Text>
											<Title order={5} c="teal.7">
												{item.title}
											</Title>
											<Text size="sm" c="dimmed" mt="xs">
												{item.description}
											</Text>
										</Stack>
									</Group>
								</Card>
							))}
						</Stack>
					</section>

					{/* Events Section */}
					<section>
						<Group justify="space-between" mb="lg">
							<H2Title className="mb-6">Upcoming Events</H2Title>
						</Group>
						<Stack gap="md">
							{upcomingEvents.map((event) => (
								<Card
									key={event.id}
									withBorder
									shadow="md"
									className="hover:shadow-lg transition-all cursor-pointer"
								>
									<Group align="flex-start" wrap="nowrap">
										<Center
											p="xs"
											style={{
												backgroundColor: "var(--mantine-color-teal-1)",
												borderRadius: "var(--mantine-radius-md)",
											}}
										>
											<Calendar size={20} color="var(--mantine-color-teal-6)" />
										</Center>
										<Stack gap={0} className="flex-1">
											<Title order={5} c="teal.7" mb="xs">
												{event.title}
											</Title>
											<Stack gap={4} mt="xs">
												<Group gap="xs" c="dimmed" size="sm">
													<Calendar size={16} />
													<Text size="sm">{event.date}</Text>
												</Group>
												<Group gap="xs" c="dimmed" size="sm">
													<Clock size={16} />
													<Text size="sm">{event.time}</Text>
												</Group>
												<Group gap="xs" c="dimmed" size="sm">
													<MapPin size={16} />
													<Text size="sm">{event.location}</Text>
												</Group>
											</Stack>
										</Stack>
									</Group>
								</Card>
							))}
						</Stack>
					</section>
				</div>

				{/* Featured Image Section */}
				<section className="">
					<Paper withBorder shadow="xl" className="overflow-hidden">
						<div className="grid md:grid-cols-2 gap-0">
							<Box className="h-80 flex items-center justify-center">
								<Image
									src="https://images.unsplash.com/photo-1582203914614-e23623afc345?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxsaWJyYXJ5JTIwcmVhZGluZ3xlbnwxfHx8fDE3NjQ2NTY3ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
									alt="Person reading in library"
									fit="cover"
									className="size-full"
								/>
							</Box>
							<Box p="xl" className="flex flex-col justify-center bg-white">
								<H2Title mb="md">Digital Library Access</H2Title>
								<Text c="dimmed" mb="lg">
									Access thousands of e-books, audiobooks, magazines, and more
									from the comfort of your home. Available 24/7 with your
									library card.
								</Text>
								<Button
									color="teal"
									rightSection={<ArrowRight size={16} />}
									className="w-fit"
									component={Link}
									to="/browse" // Changed from /digital to /browse
								>
									Explore Digital Collection
								</Button>
							</Box>
						</div>
					</Paper>
				</section>
			</Box>
		</Box>
	);
}
