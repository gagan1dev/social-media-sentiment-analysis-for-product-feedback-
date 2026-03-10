import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type AuthUser = {
  id: string;
  email: string;
  role: "admin" | "user";
  createdAt: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
  users: AuthUser[];
  deleteUser: (id: string) => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "va20_auth_user";
const STORAGE_USERS_KEY = "va20_users";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [users, setUsers] = useState<AuthUser[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      // ignore
    }
    try {
      const rawUsers = localStorage.getItem(STORAGE_USERS_KEY);
      if (rawUsers) setUsers(JSON.parse(rawUsers));
    } catch {
      // ignore
    }
  }, []);

  const persistUser = useCallback((u: AuthUser | null) => {
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else localStorage.removeItem(STORAGE_KEY);
  }, []);

  const persistUsers = useCallback((list: AuthUser[]) => {
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(list));
  }, []);

  const login = useCallback(async (email: string, _password: string) => {
    // Demo-only auth. If user exists, sign them in; otherwise create a basic user.
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    const u: AuthUser = existing ?? {
      id: crypto.randomUUID(),
      email,
      role: users.length === 0 ? "admin" : "user",
      createdAt: new Date().toISOString(),
    };
    if (!existing) {
      const next = [...users, u];
      setUsers(next);
      persistUsers(next);
    }
    setUser(u);
    persistUser(u);
  }, [persistUser, persistUsers, users]);

  const signup = useCallback(async (email: string, _password: string) => {
    const exists = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      setUser(exists);
      persistUser(exists);
      return;
    }
    const u: AuthUser = {
      id: crypto.randomUUID(),
      email,
      role: users.length === 0 ? "admin" : "user",
      createdAt: new Date().toISOString(),
    };
    const next = [...users, u];
    setUsers(next);
    persistUsers(next);
    setUser(u);
    persistUser(u);
  }, [persistUser, persistUsers, users]);

  const logout = useCallback(() => {
    setUser(null);
    persistUser(null);
  }, [persistUser]);

  const deleteUser = useCallback((id: string) => {
    const next = users.filter(u => u.id !== id);
    setUsers(next);
    persistUsers(next);
    if (user?.id === id) {
      setUser(null);
      persistUser(null);
    }
  }, [persistUsers, user, users, persistUser]);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    login,
    signup,
    logout,
    users,
    deleteUser,
  }), [deleteUser, login, logout, signup, user, users]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};


