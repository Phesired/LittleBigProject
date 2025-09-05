"use client";

import { useCallback, useEffect, useState } from "react";
import { useBroadcastEvent, useEventListener, useMyPresence, useOthers } from "@liveblocks/react/suspense";

interface Cursor {
  x: number;
  y: number;
}

export function Canvas() {
  const [myPresence, updateMyPresence] = useMyPresence();
  const others = useOthers();

  const handlePointerMove = useCallback(
    (event: React.PointerEvent) => {
      const cursor = { x: event.clientX, y: event.clientY };
      updateMyPresence({ cursor });
    },
    [updateMyPresence]
  );

  const handlePointerLeave = useCallback(() => {
    updateMyPresence({ cursor: null });
  }, [updateMyPresence]);

  return (
    <div
      className="h-screen w-full bg-gray-50 relative overflow-hidden"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* Canvas content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Collaborative Canvas
          </h2>
          <p className="text-gray-500">
            Move your cursor around to see real-time presence
          </p>
          <p className="text-sm text-gray-400 mt-2">
            {others.length} other user{others.length === 1 ? "" : "s"} online
          </p>
        </div>
      </div>

      {/* Other users' cursors */}
      {others.map(({ connectionId, presence, info }) => {
        if (!presence.cursor) return null;

        return (
          <div
            key={connectionId}
            className="absolute pointer-events-none"
            style={{
              transform: `translateX(${presence.cursor.x}px) translateY(${presence.cursor.y}px)`,
            }}
          >
            {/* Cursor */}
            <svg
              width="24"
              height="36"
              viewBox="0 0 24 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
                fill="#fd7e14"
                stroke="white"
                strokeWidth="1"
              />
            </svg>
            
            {/* User name */}
            {info?.name && (
              <div className="absolute top-5 left-2 px-2 py-1 bg-orange-500 text-white text-xs rounded-md whitespace-nowrap">
                {info.name}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
