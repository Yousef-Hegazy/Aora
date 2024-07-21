import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { create, StateCreator } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

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
  refreshAuth: () => Promise<void>;
  setAccessToken: (access: string) => void;
}

const initialState: AuthState = {
  access: "",
  refresh: "",
  user: null,
};

const createAuthStore: StateCreator<AuthState & AuthActions> = (set, get) => ({
  access: "",
  refresh: "",
  user: null,
  setUser: (user) => set({ user }),
  setAuth: (state) => set(state || initialState),
  setAccessToken: (access) => set({ access }),
  refreshAuth: async () => {
    const refresh = get().refresh;

    if (!refresh) set(initialState);

    try {
      const { data } = await axios.post<AuthState>(`http://192.168.75.91:8000/api/auth/refresh`, { refresh: refresh });

      set(data);
    } catch (err) {
      set(initialState);
      console.log(err);
    }
  },
});

const useAuthStore = create<AuthState & AuthActions>()(
  persist(createAuthStore, {
    name: "auth-storage",
    storage: createJSONStorage(() => AsyncStorage),
  })
);

export default useAuthStore;
