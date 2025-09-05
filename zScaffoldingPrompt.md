Phase 0, Step 1: The Unbreakable Foundation (Manual Steps)

Before you give any prompts to your co-pilot, you must perform these steps manually in your new, empty project folder.

    Initialize Git: Open your terminal in the new folder and run:
    code Bash

IGNORE_WHEN_COPYING_START
IGNORE_WHEN_COPYING_END

    
git init

  

Create .gitignore: Create the file and paste in the final, correct content I provided.

Create the First "Safe Point" Commit: Run these two commands:
code Bash

    IGNORE_WHEN_COPYING_START
    IGNORE_WHEN_COPYING_END

        
    git add .gitignore
    git commit -m "chore: Initialize repository and configure .gitignore"

      

Phase 0, Step 2: Co-pilot Scaffolding Prompts

Once that first "safe point" commit is made, and only then, you can proceed by giving your co-pilot the following four prompts, one at a time.

This is the set of prompts you asked for.

Prompt 1: Initialize PNPM Workspace

    "Initialize a new PNPM workspace in this directory. Configure the pnpm-workspace.yaml file to recognize applications in an apps directory and shared packages in a packages directory, as specified in zProjectStructure.md."

Prompt 2: Create Next.js Application

    "Following the monorepo structure, scaffold a new Next.js application named web inside the apps directory. Please ensure it is set up with TypeScript and Tailwind CSS."

Prompt 3: Install Core Dependencies

    "Navigate to the apps/web package. Install the following production dependencies: @clerk/nextjs, @liveblocks/react, @liveblocks/client, @liveblocks/react-ui, @mantine/core, @mantine/hooks, @tabler/icons-react, prisma, and @prisma/client."

Prompt 4: Set Up Prisma Package

    "Create a new package named db inside the packages directory. Initialize Prisma within this db package to work with a PostgreSQL database."

After the co-pilot confirms completion of these four steps, we will create our second safe point commit before proceeding to the main MVP implementation. I will be here to guide you through that step.