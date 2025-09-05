Objective

This document is the governing constitution for the AI assistant (Co-pilot) for the entire development lifecycle of the Real-Time Collaborative canvas application. These rules are foundational and must be adhered to in response to every prompt. The primary goal is a scalable, feature-rich application that leverages modern, managed services to ensure stability and rapid development.
Section 1: Core Architectural Principles (The Unbreakables)

1. Principle of a Simplified Monolith:

    The project MUST be architected as a single, powerful Next.js application located at apps/web.

    There will be NO separate, custom backend server (apps/server). All complex backend logic for authentication and real-time collaboration is to be offloaded to our managed services (Clerk and Liveblocks).

    The Next.js application will handle all UI rendering, API routes for our own business logic (e.g., interacting with our database), and integration with the Clerk and Liveblocks SDKs.

2. Principle of Technology Stack Mandates:

    The following libraries and services are the only permitted technologies for their respective domains. Do not substitute them. This is to ensure a cohesive and maintainable codebase.

        Framework: Next.js 14+ (App Router).

        Authentication: Clerk. All user management, sign-in, sign-up, and session management MUST be handled through Clerk's components and backend APIs.

        Real-Time Collaboration: Liveblocks. All collaborative features—including presence, live cursors, and data synchronization—MUST be implemented using the Liveblocks SDKs and APIs. Do not build any custom WebSocket or Yjs solutions.

        UI Component Library: Mantine. The primary UI of the application, including buttons, modals, layouts, and forms, MUST be built using components from the Mantine ecosystem.

        Database & ORM: PostgreSQL with Prisma.

        Language: TypeScript.

Section 2: Code Generation & Quality Standards

1. Modularity and Single Responsibility:

    Every file, component, and function must have a single, well-defined purpose. Hooks should encapsulate complex logic (e.g., a canvas hook to interact with Liveblocks), and components should focus on rendering UI.

2. Uncompromising Type Safety:

    All code MUST be strongly typed. Leverage Prisma's generated types and define any custom types for API payloads in a shared package (packages/shared-types).

3. Secure and Environment-Driven Configuration:

    All secrets (Clerk keys, Liveblocks keys, database URLs) MUST be loaded from environment variables (process.env). Every new variable requires an entry in the .env.example file.

4. Predictable State Management:

    Local UI State: Standard, non-shared state (e.g., a modal being open) must be managed with React hooks (useState) or Mantine's state management hooks.

    Shared Collaborative State: The real-time state of the canvas (element positions, user presence, cursors) is managed exclusively by the Liveblocks SDK. Our application will interact with Liveblocks' hooks and APIs to read and write this state. Yjs is no longer part of our stack.

Section 3: Project Governance & Interaction Protocol

1. Dynamic Structure Maintenance:

    The project MUST strictly follow the folder structure defined in zProjectStructure.md.

    If a new file or folder is created, you must immediately state the required change to zProjectstructure.md to keep it as a living blueprint.

2. Clarification Over Assumption:

    If a prompt is ambiguous or conflicts with these rules, you MUST ask for clarification before generating code.

3. Always Re-State Context:

    In your response, briefly mention the rule or principle you are applying (e.g., "Okay, creating the user profile page. Per Rule 1, this will be a client component that uses Clerk's useUser hook.").