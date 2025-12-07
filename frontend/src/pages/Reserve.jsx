import { useEffect } from "react";
import {
  Card,
  Stack,
  Title,
  Text,
  Divider,
  Group,
  Button,
  Paper,
  Image,
  Badge,
} from "@mantine/core";
import { Link, useLocation } from "react-router";

const Reserve = () => {
  const { state } = useLocation();
  const book = state?.book;

  useEffect(() => {
    document.title = `${import.meta.env.VITE_APP_NAME_ABBREV} | Reserve`;
  }, []);

  if (!book) {
    return (
      <Card className="h-auto min-h-full flex items-center justify-center" withBorder>
        <Text>Reservation unavailable. No book selected.</Text>
      </Card>
    );
  }

  return (
    <Card className="h-auto min-h-full flex items-center justify-center" withBorder>
      <Stack gap="md" align="center">
        <Text size="xs" c="dimmed" fw={500} tt="uppercase">
          Reservation
        </Text>
        <Title order={2}>Place a Hold</Title>

        <Text c="dimmed" ta="center" maw={540}>
          You're reserving a copy of this book. We'll hold it at the
          main desk once it's returned and ready for pickup.
        </Text>

        <Paper withBorder p="md" mt="sm" w="100%" maw={520}>
          <Group align="flex-start" gap="md">
            <Image
              src={
                book.cover ||
                "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80"
              }
              alt={book.title || "Book cover"}
              w={80}
              h={112}
              fit="cover"
            />
            <Stack gap={4} flex={1}>
              <Group justify="space-between" align="flex-start">
                <div>
                  <Text fw={600}>{book.title || "Unknown Book"}</Text>
                  <Text size="sm" c="dimmed">
                    {book.author || "Author unknown"}
                  </Text>
                </div>
                <Badge variant="light" color="green">
                  Hold request
                </Badge>
              </Group>

              <Divider my="sm" />

              <Text size="sm" c="dimmed">
                Pickup location:{" "}
                <Text span fw={500}>
                  Main Desk
                </Text>
              </Text>
              <Text size="sm" c="dimmed">
                We'll notify you when a copy becomes available.
              </Text>
            </Stack>
          </Group>
        </Paper>

        <Divider w="100%" my="sm" />

        <Text size="sm" ta="center" maw={480}>
          Are you sure you want to place a reservation on{" "}
          <Text span fw={600}>{book.title || "this book"}</Text>?
        </Text>

        <Group mt="md">
          <Button w={135} component={Link} to="/details" state={{ book }}>
            Confirm
          </Button>
          <Button w={135} variant="default" component={Link} to="/book" state={{ book }}>
            Cancel
          </Button>
        </Group>
      </Stack>
    </Card>
  );
};

export default Reserve;
