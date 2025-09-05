The Project Debrief & First MVP Prompt

Hello Co-pilot. We are starting a brand new project to build a modern, real-time collaborative canvas application, similar in spirit to Miro. The architecture for this project is critical. We will be building a scalable, high-quality application by leveraging powerful, managed services to handle the most complex features.

You will be the lead engineer on this project. Your primary goal is to build a functional Minimum Viable Product (MVP) based on the architecture and technology stack defined below.

1. The Core Architecture: Simplified Monolith

Our application will be a single, powerful Next.js application. We will not build a separate custom backend for real-time logic. Instead, we will offload all complex, stateful operations to specialized third-party services. Our Next.js app will be responsible for the user interface, our specific business logic via API routes, and integrating with these services.

2. The Mandated Technology Stack (Non-Negotiable)

You must use the following services and libraries. These have been chosen to ensure stability, security, and rapid development.

    Authentication: Clerk. All user management (sign-up, sign-in, sessions, profiles) will be handled by Clerk's Next.js SDK and pre-built components.

    Real-Time Collaboration: Liveblocks. All real-time infrastructure (user presence, live cursors, data synchronization) will be handled by the Liveblocks React SDK. We will build our UI on top of their provided hooks and APIs.

    UI Components: Mantine. The entire user interface, from buttons and modals to layout and forms, will be built using the Mantine component library.

    Database: PostgreSQL with Prisma as the ORM. This will be used to store our own application data, such as information about the boards themselves.

3. The First Milestone: The MVP User Journey

Your first task is to build the core user flow that validates our architecture. This involves the following steps:

    Setup Authentication: Integrate Clerk into the Next.js application. Create the necessary sign-in and sign-up pages using Clerk's components and protect the main application routes using Clerk's middleware.

    Build the Dashboard: Create a dashboard page that is only accessible to authenticated users. On this page, a user should be able to see a list of the canvases they have created.

    Implement Board Creation: Add a feature (e.g., a button or modal built with Mantine) that allows a logged-in user to create a new board. This action should call a custom Next.js API route that you will create. This API route will use Prisma to save a new Board record to our PostgreSQL database, linking it to the authenticated user's ID provided by Clerk.

    Create the Board Page: When a user clicks on a board from the dashboard, they should be taken to a dynamic board/[boardId] page.

    Integrate Liveblocks (Proof of Concept): On this board page, perform the initial integration of the Liveblocks SDK. The page should become a Liveblocks "room," identified by its unique boardId. For the MVP, simply enable Liveblocks' presence and live cursor features. This will prove that our real-time collaboration service is correctly configured and authenticated for that specific board.

4. Governing Principles

Throughout this entire process, you must strictly adhere to the two provided documents: zRules.md and zProjectStructure.md. These are our project's constitution and file blueprint. Remember that zProjectStructure.md is a living document; if you create new files or folders, you must state the required changes to keep it updated.

Let's begin.