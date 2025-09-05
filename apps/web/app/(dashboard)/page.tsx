import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { Container, Title, Grid, Card, Text, Group, ActionIcon, Stack } from "@mantine/core";
import { IconEye, IconTrash } from "@tabler/icons-react";
import Link from "next/link";

import { db } from "@/lib/db";
import { NewBoardButton } from "./_components/NewBoardButton";

async function getBoards(userId: string, orgId?: string) {
  return await db.board.findMany({
    where: {
      authorId: userId,
      orgId: orgId || userId,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
}

export default async function Dashboard() {
  const { userId, orgId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  const boards = await getBoards(userId, orgId || undefined);

  return (
    <Container size="xl" py="xl">
      <Group justify="space-between" mb="xl">
        <Title order={1}>Your Boards</Title>
        <NewBoardButton />
      </Group>

      {boards.length === 0 ? (
        <Card withBorder p="xl" radius="md">
          <Stack align="center" gap="md">
            <Text size="lg" c="dimmed">
              No boards yet
            </Text>
            <Text c="dimmed" ta="center">
              Create your first board to start collaborating
            </Text>
            <NewBoardButton />
          </Stack>
        </Card>
      ) : (
        <Grid>
          {boards.map((board) => (
            <Grid.Col key={board.id} span={{ base: 12, md: 6, lg: 4 }}>
              <Card withBorder radius="md" p="md">
                <Group justify="space-between" mb="sm">
                  <Text fw={500} size="lg" truncate>
                    {board.title}
                  </Text>
                  <Group gap="xs">
                    <ActionIcon
                      component={Link}
                      href={`/board/${board.id}`}
                      variant="subtle"
                      size="sm"
                    >
                      <IconEye size={16} />
                    </ActionIcon>
                  </Group>
                </Group>
                
                <Text size="sm" c="dimmed" mb="md">
                  Created by {board.authorName}
                </Text>
                
                <Text size="xs" c="dimmed">
                  Updated {new Date(board.updatedAt).toLocaleDateString()}
                </Text>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      )}
    </Container>
  );
}
