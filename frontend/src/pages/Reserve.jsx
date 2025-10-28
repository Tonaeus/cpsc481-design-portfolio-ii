import { useEffect } from "react";
import {
  Card,
  Stack,
  Title,
  Text,
  Divider,
  Group,
  Button,
} from "@mantine/core";
import { Link, useLocation } from "react-router";

const Reserve = () => {
  useEffect(() => {
    document.title = `${import.meta.env.VITE_APP_NAME_ABBREV} | Reserve`;
  }, []);

  const { state } = useLocation();
  const book = state?.book;

  return (
    <Card shadow="sm" padding="xl" radius="md" withBorder>
      <Stack align="center" gap="sm">
        <Title order={2}>Reserve Confirmation</Title>

        <Text c="dimmed">Book:</Text>
        <Text fw={600}>{book?.title || "Unknown Book"}</Text>

        <Divider my="sm" w="100%" />
        <Text size="sm">
          Are you sure you want to reserve{" "}
          <strong>{book?.title || "this book"}</strong>?
        </Text>

        <Group mt="md">
          <Button component={Link} to="/details" state={{ book }}>
            Confirm
          </Button>
          <Button variant="default" component={Link} to="/book">
            Cancel
          </Button>
        </Group>
      </Stack>
    </Card>
  );
};

export default Reserve;
