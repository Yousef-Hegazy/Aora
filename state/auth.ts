import { create, StateCreator } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";

export interface AuthState {
  access: string;
  refresh: string;
  user: {
    id: number;
    email: string;
    is_active: boolean;
    is_staff: boolean;
  } | null;
}

interface AuthActions {
  setUser: (user: AuthState["user"]) => void;
  setAuth: (state: AuthState | null) => void;
}

const initialState: AuthState = {
  access: "",
  refresh: "",
  user: null,
};

const createAuthStore: StateCreator<AuthState & AuthActions> = (set) => ({
  access: "",
  refresh: "",
  user: null,
  setUser: (user) => set({ user }),
  setAuth: (state) => set(state || initialState),
});

const useAuthStore = create<AuthState & AuthActions>()(
  persist(createAuthStore, {
    name: "auth-storage",
    storage: createJSONStorage(() => AsyncStorage),
  })
);

export default useAuthStore;
