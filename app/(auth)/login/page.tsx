"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { loginUser } from "@/services/auth.service";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const user = await loginUser(email, password);
      login(user); // save to context + localStorage
      router.push("/orders");
    } catch {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-sm p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">RestaurantOS</h1>
        <p className="text-sm text-gray-500 mb-6">Sign in to your account</p>

        <div className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@restaurant.com"
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />

          {error && (
            <p className="text-sm text-red-500 bg-red-50 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <Button
            onClick={handleLogin}
            isLoading={loading}
            size="lg"
            className="w-full"
          >
            Sign In
          </Button>
        </div>

        <p className="text-sm text-gray-500 mt-6 text-center">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}