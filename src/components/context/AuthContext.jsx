import { createContext, useContext, useEffect, useState } from "react";
import { checkAuthState } from "../../firebase-config";
import { login, logout } from "../../firebase-config";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [authState, setAuthState] = useState({ user: null, loading: true });
  const user = authState.user;
  const loading = authState.loading;
  useEffect(() => {
    const stopListen = () => {
      checkAuthState((user) => {
        if (user) {
          setAuthState({ user, loading: false });
        } else {
          setAuthState({ user: null, loading: false });
        }
      });
    };
    return () => stopListen();
  }, []);
  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}