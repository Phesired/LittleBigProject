import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { Container, Title, Text, Button, Stack, Group } from "@mantine/core";
import { IconBrandMantine, IconUsers, IconPalette } from "@tabler/icons-react";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();

  // If user is authenticated, redirect to dashboard
  if (userId) {
    redirect("/dashboard");
  }

  return (
    <Container size="lg" py="xl">
      <Stack align="center" gap="xl" style={{ minHeight: "80vh", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <Title size="3rem" mb="md">
            Collaborative Canvas
          </Title>
          <Text size="xl" c="dimmed" mb="xl">
            Real-time collaborative whiteboard for teams
          </Text>
        </div>

        <Group gap="xl" style={{ textAlign: "center" }}>
          <Stack align="center" gap="sm">
            <IconUsers size={48} color="#228be6" />
            <Text fw={500}>Real-time Collaboration</Text>
            <Text size="sm" c="dimmed">
              Work together with your team in real-time
            </Text>
          </Stack>

          <Stack align="center" gap="sm">
            <IconPalette size={48} color="#fd7e14" />
            <Text fw={500}>Intuitive Design</Text>
            <Text size="sm" c="dimmed">
              Beautiful and easy-to-use interface
            </Text>
          </Stack>

          <Stack align="center" gap="sm">
            <IconBrandMantine size={48} color="#51cf66" />
            <Text fw={500}>Modern Technology</Text>
            <Text size="sm" c="dimmed">
              Built with the latest web technologies
            </Text>
          </Stack>
        </Group>

        <Group gap="md">
          <Button
            component={Link}
            href="/sign-up"
            size="lg"
            radius="md"
          >
            Get Started
          </Button>
          <Button
            component={Link}
            href="/sign-in"
            variant="outline"
            size="lg"
            radius="md"
          >
            Sign In
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}
