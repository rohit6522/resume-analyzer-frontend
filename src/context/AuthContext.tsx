import { createContext, useContext, useState, type ReactNode } from "react";
import type { User } from "@/types/auth.types";
import { isTokenExpired } from "@/lib/jwt";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

interface Session {
  token: string | null;
  user: User | null;
}

const EMPTY_SESSION: Session = { token: null, user: null };

function clearStoredSession() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

function loadSession(): Session {
  try {
    const token = localStorage.getItem("token");
    const rawUser = localStorage.getItem("user");
    if (!token || !rawUser) return EMPTY_SESSION;

    if (isTokenExpired(token)) {
      clearStoredSession();
      sessionStorage.setItem("sessionExpired", "1");
      return EMPTY_SESSION;
    }

    return { token, user: JSON.parse(rawUser) as User };
  } catch {
    // Corrupted storage should never white-screen the app
    clearStoredSession();
    return EMPTY_SESSION;
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session>(loadSession);

  const login = (token: string, user: User) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setSession({ token, user });
  };

  const logout = () => {
    clearStoredSession();
    setSession(EMPTY_SESSION);
  };

  return (
    <AuthContext.Provider
      value={{
        user: session.user,
        token: session.token,
        isAuthenticated: !!session.token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}