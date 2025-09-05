import { LiveObject } from "@liveblocks/client";

declare global {
  interface Liveblocks {
    // The presence type
    Presence: {
      cursor: { x: number; y: number } | null;
      selection: string[];
    };

    // The storage type
    Storage: {
      canvasObjects: LiveObject<Record<string, any>>;
    };

    // The user meta type
    UserMeta: {
      id: string;
      info: {
        name: string;
        picture: string;
      };
    };

    // The room event type
    RoomEvent: {};
  }
}
