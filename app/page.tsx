import { redirect } from "next/navigation";

// Root route just redirects to register
export default function HomePage() {
  redirect("/register");
}