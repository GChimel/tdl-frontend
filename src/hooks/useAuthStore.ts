import { AuthService } from "@/services/authService";
import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface JwtPayload {
  sub: string; // user id (uuid)
}

interface AuthState {
  signedIn: boolean;
  userId: string | null;
  token: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      signedIn: false,
      userId: null,
      token: null,

      signIn: async (email, password) => {
        const { accessToken } = await AuthService.signIn({ email, password });
        const decoded = jwtDecode<JwtPayload>(accessToken);
        set({
          signedIn: true,
          userId: decoded.sub,
          token: accessToken,
        });
      },

      signUp: async (name, email, password) => {
        const { accessToken } = await AuthService.signUp({
          name,
          email,
          password,
        });
        const decoded = jwtDecode<JwtPayload>(accessToken);
        set({
          signedIn: true,
          userId: decoded.sub,
          token: accessToken,
        });
      },

      signOut: () => {
        set({
          signedIn: false,
          userId: null,
          token: null,
        });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
