"use client";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function Home() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen text-white flex flex-col items-center p-8">
        <h1>Home</h1>
      </div>
    </ProtectedRoute>
  );
}
