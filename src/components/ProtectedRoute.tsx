"use client";
import { useAuthStore } from "@/hooks/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const signedIn = useAuthStore((s) => s.signedIn);
  const router = useRouter();

  useEffect(() => {
    if (!signedIn) {
      router.replace("/sign-in");
    }
  }, [signedIn, router]);

  if (!signedIn) return null;

  return <>{children}</>;
}
