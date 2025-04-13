import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
  accessToken: string | null;
  expiresIn: number | null;
  setAuth: (token: string, expiresIn: number) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      expiresIn: null,
      setAuth: (token, expiresIn) => set({ accessToken: token, expiresIn }),
      logout: () => set({ accessToken: null, expiresIn: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

