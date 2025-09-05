import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { liveblocks } from "@/lib/liveblocks";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Authorize the user for Liveblocks
    const session = liveblocks.prepareSession(userId, {
      userInfo: {
        name: user.fullName || user.firstName || "Anonymous",
        picture: user.imageUrl || "",
      },
    });

    // Allow user to access any room for now
    // In production, you'd check permissions against the database
    session.allow("*", session.FULL_ACCESS);

    const { status, body } = await session.authorize();

    return new Response(body, { status });
  } catch (error) {
    console.error("Liveblocks auth error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
