"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { 
  Button, 
  Modal, 
  TextInput, 
  Group, 
  Text
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconPlus } from "@tabler/icons-react";

export function NewBoardButton() {
  const [opened, { open, close }] = useDisclosure(false);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      notifications.show({
        title: "Error",
        message: "Board title is required",
        color: "red",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/boards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          orgId: user?.organizationMemberships?.[0]?.organization?.id || user?.id || "",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create board");
      }

      const board = await response.json();
      
      notifications.show({
        title: "Success",
        message: "Board created successfully",
        color: "green",
      });

      setTitle("");
      close();
      router.push(`/board/${board.id}`);
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to create board",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button 
        leftSection={<IconPlus size={16} />}
        onClick={open}
        size="lg"
      >
        Create New Board
      </Button>

      <Modal opened={opened} onClose={close} title="Create New Board">
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Board Title"
            placeholder="Enter board title..."
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
            required
            mb="md"
          />
          
          <Group justify="flex-end">
            <Button variant="subtle" onClick={close}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              loading={loading}
              disabled={!title.trim()}
            >
              Create Board
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
}
