import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import ResumeDetail from "@/pages/ResumeDetail";
import LandingPage from "@/pages/landing/LandingPage";
import MyResumes from "@/pages/MyResumes";
import Profile from "@/pages/Profile";


function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

function App() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
        <Route path="/" element={<LandingPage />} />{" "}
      </Routes>
    </>
  );
}

export default App;
