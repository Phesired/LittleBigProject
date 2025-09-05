"use client";

import { useOthers, useSelf } from "@liveblocks/react/suspense";
import { Avatar, Group, Text } from "@mantine/core";

export function Presence() {
  const others = useOthers();
  const currentUser = useSelf();

  return (
    <div className="fixed top-4 right-4 z-50">
      <Group gap="xs">
        <Text size="sm" c="dimmed">
          {others.length + 1} online
        </Text>
        
        <Group gap="xs">
          {/* Current user */}
          {currentUser && (
            <Avatar
              src={currentUser.info?.picture}
              alt={currentUser.info?.name || "You"}
              size="sm"
              radius="xl"
              style={{ 
                border: "2px solid #228be6",
                boxShadow: "0 0 0 2px white"
              }}
            />
          )}
          
          {/* Other users */}
          {others.map(({ connectionId, info }) => (
            <Avatar
              key={connectionId}
              src={info?.picture}
              alt={info?.name || "Anonymous"}
              size="sm"
              radius="xl"
              style={{ 
                border: "2px solid #fd7e14",
                boxShadow: "0 0 0 2px white"
              }}
            />
          ))}
        </Group>
      </Group>
    </div>
  );
}
