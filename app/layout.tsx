import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "RestaurantOS",
  description: "Restaurant management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Wrap entire app in AuthProvider so every page can access auth state */}
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}