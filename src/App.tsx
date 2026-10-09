import type { ReactNode } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import MyResumes from "@/pages/MyResumes";
import ResumeDetail from "@/pages/ResumeDetail";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/NotFound";
import LandingPage from "@/pages/landing/LandingPage";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { useServerWarmup } from "@/hooks/useServerWarmup";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

// Logged-in users shouldn't see the login/register forms
function PublicOnlyRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <>{children}</>;
}

function App() {
  useServerWarmup();

  return (
    <>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <Login />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicOnlyRoute>
              <Register />
            </PublicOnlyRoute>
          }
        />

        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resumes" element={<MyResumes />} />
          <Route path="/resumes/:id" element={<ResumeDetail />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;