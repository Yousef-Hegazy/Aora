import { AppUser } from "@/api/responses/authResponses";
import authService from "@/api/services/authService";
import { createContext, useContext, useEffect, useState } from "react";

type AppUserType = AppUser | null;

const GlobalContext = createContext({
  isLoggedIn: false,
  user: null as AppUserType,
  loading: true,
  setIsLoggedIn: (value: boolean) => {},
  setUser: (value: AppUserType) => {},
  setLoading: (value: boolean) => {},
});

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<AppUserType>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((res) => {
        setUser(res.data);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        setUser(null);
        setIsLoggedIn(false);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        user,
        loading,
        setIsLoggedIn,
        setUser,
        setLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);

export default GlobalProvider;
