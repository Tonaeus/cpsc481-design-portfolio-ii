import { useEffect } from "react";
import {
  Card,
  Stack,
  Title,
  Text,
  Group,
  Button,
  Image,
  Paper,
  Badge,
  Divider,
} from "@mantine/core";
import { Link, useLocation } from "react-router";

const ReservationDetails = () => {
  const { state } = useLocation();
  const book = state?.book;

  useEffect(() => {
    document.title = `${import.meta.env.VITE_APP_NAME_ABBREV} | Reservation Details`;
  }, []);

  if (!book) {
    return (
      <Card shadow="sm" padding="xl" radius="md" withBorder>
        <Text>Reservation details unavailable. No book selected.</Text>
      </Card>
    );
  }

  const reservationNumber = `RS-${String(book.id).padStart(4, "0")}`;

  return (
    <Card shadow="sm" padding="xl" radius="md" withBorder>
      <Stack gap="md" align="center">
        <Badge color="green" variant="light" radius="sm">
          Hold placed
        </Badge>

        <Title order={2}>Reservation Details</Title>

        <Text c="dimmed" ta="center">
          Your reservation has been placed successfully. We&apos;ll notify you at
          the main desk when a copy becomes available.
        </Text>

        <Paper withBorder radius="md" p="md" mt="sm" w="100%" maw={540}>
          <Group align="flex-start" gap="md">
            <Image
              src={
                book.cover ||
                "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80"
              }
              alt={book.title || "Book cover"}
              radius="md"
              w={90}
              h={130}
              fit="cover"
            />

            <Stack gap={6} flex={1}>
              <Text fw={600}>{book.title || "Unknown Book"}</Text>
              <Text size="sm" c="dimmed">
                {book.author || "Author unknown"}
              </Text>

              <Divider my="xs" />

              <Text size="sm">
                <Text span c="dimmed">
                  Reservation #:
                </Text>{" "}
                {reservationNumber}
              </Text>

              <Text size="sm">
                <Text span c="dimmed">
                  Pickup location:
                </Text>{" "}
                Main Desk
              </Text>

              <Text size="sm">
                <Text span c="dimmed">
                  Queue status:
                </Text>{" "}
                You&apos;ll be next in line once a copy is returned.
              </Text>
            </Stack>
          </Group>
        </Paper>

        <Group mt="lg">
          <Button component={Link} to="/">
            Go to Home
          </Button>
          <Button variant="default" component={Link} to="/history">
            View History
          </Button>
        </Group>
      </Stack>
    </Card>
  );
};

export default ReservationDetails;
