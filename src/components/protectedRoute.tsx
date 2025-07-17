"use client";
import { useAuthStore } from "@/hooks/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const signedIn = useAuthStore((s) => s.signedIn);
  const hasHydrated = useAuthStore((s) => s.hasHydrated);
  const router = useRouter();

  useEffect(() => {
    if (hasHydrated && !signedIn) {
      router.replace("/sign-in");
    }
  }, [signedIn, hasHydrated, router]);

  if (!hasHydrated) return null;

  if (!signedIn) return null;

  return <>{children}</>;
}
