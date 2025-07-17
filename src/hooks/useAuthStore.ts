import { AuthService } from "@/services/authService";
import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface JwtPayload {
  sub: string;
  exp?: number;
}

interface AuthState {
  signedIn: boolean;
  userId: string | null;
  token: string | null;
  hasHydrated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
  initializeAuth: () => void;
  setHasHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      signedIn: false,
      userId: null,
      token: null,
      hasHydrated: false,

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

      initializeAuth: () => {
        const { token } = get();
        if (token) {
          try {
            const decoded = jwtDecode<JwtPayload>(token);
            const now = Math.floor(Date.now() / 1000);
            if (decoded.exp && decoded.exp < now) {
              set({ signedIn: false, userId: null, token: null });
            } else {
              set({
                signedIn: true,
                userId: decoded.sub,
                token,
              });
            }
          } catch {
            set({ signedIn: false, userId: null, token: null });
          }
        } else {
          set({ signedIn: false, userId: null, token: null });
        }
      },

      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        state?.initializeAuth?.();
        state?.setHasHydrated?.(true);
      },
    }
  )
);
