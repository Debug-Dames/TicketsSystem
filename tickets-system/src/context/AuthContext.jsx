import { createContext, useMemo, useState, useEffect } from "react";
import { registerUser, loginUser } from "../services/api";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // ✅ LOAD USER FROM LOCALSTORAGE ON START
  useEffect(() => {
    const storedUser = localStorage.getItem("ts_current_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const register = async ({ name, email, password, role }) => {
    const result = await registerUser({ name, email, password, role });
    if (!result.success) return { ok: false, error: result.message };
    return { ok: true };
  };

  const login = async ({ email, password }) => {
    const result = await loginUser({ email, password });
    if (!result.success) return { ok: false, error: result.message };

    const sessionUser = { ...result.user, token: result.token };

    setUser(sessionUser);
    localStorage.setItem("ts_current_user", JSON.stringify(sessionUser));

    return { ok: true, user: sessionUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("ts_current_user");
  };

  const value = useMemo(() => ({ user, register, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
