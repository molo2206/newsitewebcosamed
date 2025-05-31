import { create } from 'zustand';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  // ... autres champs si nécessaires
}

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>((set:any) => ({
  user: null,
  setUser: (user:any) => set({ user }),
  logout: () => set({ user: null }),
}));
