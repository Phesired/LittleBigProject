import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { LiveblocksProvider } from "@liveblocks/react/suspense";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Collaborative Canvas",
  description: "Real-time collaborative canvas application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <MantineProvider>
            <Notifications />
            <LiveblocksProvider
              authEndpoint="/api/liveblocks-auth"
            >
              {children}
            </LiveblocksProvider>
          </MantineProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
