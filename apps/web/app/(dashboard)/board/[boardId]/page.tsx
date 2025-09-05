import { notFound, redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { RoomProvider } from "@liveblocks/react/suspense";
import { LiveObject } from "@liveblocks/client";

import { db } from "@/lib/db";
import { Canvas } from "./_components/Canvas";
import { Presence } from "./_components/Presence";

interface BoardPageProps {
  params: Promise<{
    boardId: string;
  }>;
}

async function getBoard(boardId: string, userId: string) {
  const board = await db.board.findUnique({
    where: {
      id: boardId,
    },
  });

  if (!board) {
    return null;
  }

  // Check if user has access to this board
  if (board.authorId !== userId && board.orgId !== userId) {
    return null;
  }

  return board;
}

export default async function BoardPage({ params }: BoardPageProps) {
  const { userId } = await auth();
  const { boardId } = await params;
  
  if (!userId) {
    redirect("/sign-in");
  }

  const board = await getBoard(boardId, userId);

  if (!board) {
    notFound();
  }

  return (
    <RoomProvider
      id={boardId}
      initialPresence={{
        cursor: null,
        selection: [],
      }}
      initialStorage={{
        canvasObjects: new LiveObject({}),
      }}
    >
      <div className="h-screen w-full">
        <Presence />
        <Canvas />
      </div>
    </RoomProvider>
  );
}
