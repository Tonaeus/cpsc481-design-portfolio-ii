import { useEffect } from "react";
import {
  Card,
  Group,
  Stack,
  Title,
  Text,
  Button,
  Image,
  Alert,
} from "@mantine/core";
import { Link } from "react-router";

const Book = () => {
  useEffect(() => {
    document.title = `${import.meta.env.VITE_APP_NAME_ABBREV} | Book`;
  }, []);

  const book = {
    id: "bk-001",
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    year: 2017,
    isbn: "978-1449373320",
    cover:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    available: true,
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group align="flex-start" gap="xl">
        <Stack flex={1}>
          <Title order={3}>{book.title}</Title>

          {!book.available && (
            <Alert variant="light" color="gray" title="Not available">
              This book is currently checked out. You can place a reservation instead.
            </Alert>
          )}

          <Stack gap={4}>
            <Text size="sm" c="dimmed">
              Metadata
            </Text>
            <Text size="sm">Author: {book.author}</Text>
            <Text size="sm">Year: {book.year}</Text>
            <Text size="sm">ISBN: {book.isbn}</Text>
          </Stack>

          <Group mt="md">
            <Button variant="default" disabled={!book.available}>
              Checkout
            </Button>
            <Button component={Link} to="/reserve" state={{ book }}>
              Reserve
            </Button>
          </Group>
        </Stack>

        <Image
          src={book.cover}
          alt="Book cover"
          radius="md"
          w={220}
          h={300}
          fit="cover"
        />
      </Group>
    </Card>
  );
};

export default Book;
