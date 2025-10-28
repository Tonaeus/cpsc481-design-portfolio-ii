import { useEffect } from "react";
import { Card, Stack, Title, Text, Group, Button, Image } from "@mantine/core";
import { Link, useLocation } from "react-router";

const ReservationDetails = () => {
    useEffect(() => {
        document.title = `${import.meta.env.VITE_APP_NAME_ABBREV} | Reservation Details`;
    }, []);

    const { state } = useLocation();
    const book = state?.book;

    return (
        <Card shadow="sm" padding="xl" radius="md" withBorder>
            <Stack align="center" gap="xs">
                <Title order={2}>Reservation Details</Title>

                <Text c="dimmed" ta="center">
                    Your reservation has been placed successfully.
                </Text>

                <Card withBorder radius="md" w={420} mt="sm">
                    <Stack p="md" gap="sm" align="center">
                        <Image
                            src={book?.cover || "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80"}
                            alt={book?.title || "Book cover"}
                            radius="md"
                            w={120}
                            h={160}
                            fit="cover"
                        />
                        <Text size="sm">
                            <strong>Title:</strong> {book?.title || "Unknown Book"}
                        </Text>
                        <Text size="sm">
                            <strong>Author:</strong> {book?.author || "N/A"}
                        </Text>
                        <Text size="sm">
                            <strong>Pickup:</strong> Main Desk · Within 48 hours
                        </Text>
                        <Text size="sm">
                            <strong>Reservation #:</strong> RS-{book?.id?.toUpperCase() || "000000"}
                        </Text>
                    </Stack>
                </Card>

                <Group mt="lg">
                    <Button component={Link} to="/">
                        Home
                    </Button>
                    <Button variant="default" component={Link} to="/history">
                        History
                    </Button>
                </Group>
            </Stack>
        </Card>
    );
};

export default ReservationDetails;
