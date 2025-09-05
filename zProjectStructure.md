Objective

This document defines the canonical file and folder structure for the Real-Time Collaborative canvas application. It is the single source of truth for the project's layout and reflects our modern, service-based architecture.

IMPORTANT ARCHITECTURAL NOTES:

    This is a monorepo using PNPM with a pnpm-workspace.yaml.

    The project is a single Next.js application (apps/web). There is no custom real-time backend.

    Authentication is handled by Clerk.

    Real-Time Collaboration is handled by Liveblocks.

    UI Components are from the Mantine library.

Root Level
code Code
IGNORE_WHEN_COPYING_START
IGNORE_WHEN_COPYING_END

    
/
├── .gitignore
├── package.json                # Manages workspaces and root-level PNPM scripts
├── pnpm-lock.yaml              # PNPM lock file
├── pnpm-workspace.yaml         # Defines the PNPM workspace locations
├── tsconfig.base.json          # A shared TypeScript configuration
└── vercel.json                 # Vercel deployment configuration

  

packages/ - Shared Code

This directory contains shared, reusable code.
code Code
IGNORE_WHEN_COPYING_START
IGNORE_WHEN_COPYING_END

    
/packages/
│
├── db/                    # Centralized package for database schema and Prisma client.
│   ├── prisma/
│   │   └── schema.prisma  # The single source of truth for our PostgreSQL models (e.g., Board).
│   └── package.json       # Manages Prisma dependencies.
│
└── shared-types/          # Optional: For sharing complex types between API routes and client.
    ├── src/
    │   └── index.ts
    └── package.json

  

apps/ - The Main Application

This directory contains our single, deployable Next.js application.
code Code
IGNORE_WHEN_COPYING_START
IGNORE_WHEN_COPYING_END

    
/apps/
    │
    └─ web/                  # The Next.js Frontend & API (Deployed to Vercel)
        ├── app/
        │   ├── api/
        │   │   └── boards/ # Our custom API routes for board data management.
        │   │       ├── route.ts             # API for creating/listing boards.
        │   │       └── [boardId]/route.ts   # API for updating/deleting a specific board.
        │   │
        │   ├── (auth)/                      # Clerk's pre-built authentication pages.
        │   │   ├── sign-in/[[...sign-in]]/page.tsx
        │   │   └── sign-up/[[...sign-up]]/page.tsx
        │   │
        │   ├── (dashboard)/                 # Route group for all authenticated pages.
        │   │   ├── board/[boardId]/
        │   │   │   ├── _components/         # Components specific to the board page.
        │   │   │   │   ├── Canvas.tsx       # Renders the main canvas area.
        │   │   │   │   └── Presence.tsx     # Renders user avatars/cursors via Liveblocks.
        │   │   │   └── page.tsx             # The main page for a board, wrapped in Liveblocks' RoomProvider.
        │   │   │
        │   │   ├── _components/             # Components shared across the dashboard.
        │   │   │   └── NewBoardButton.tsx   # Mantine button/modal to create a new board.
        │   │   │
        │   │   └── page.tsx                 # Dashboard: fetches and displays a list of the user's boards.
        │   │
        │   ├── layout.tsx                   # Root layout (ClerkProvider, MantineProvider, LiveblocksProvider).
        │   └── page.tsx                     # The public-facing landing page.
        │
        ├── components/
        │   └── ui/                          # Custom UI components built with Mantine.
        │
        ├── hooks/
        │   └── use-selection-bounds.ts      # Custom hook to manage selection logic on the canvas.
        │
        ├── lib/
        │   ├── db.ts                        # Initializes and exports the Prisma client.
        │   ├── liveblocks.ts                # Config for Liveblocks authentication.
        │   └── utils.ts                     # General utility functions.
        │
        ├── .env.example                     # All environment variables (Clerk, Liveblocks, Database).
        ├── middleware.ts                    # Clerk middleware for protecting routes.
        ├── liveblocks.config.ts             # Liveblocks type definitions for collaborative state.
        ├── next.config.js
        ├── package.json                     # All frontend dependencies.
        └── tsconfig.json

  