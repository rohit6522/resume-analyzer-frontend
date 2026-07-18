import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {  LayoutDashboard, LogOut } from "lucide-react";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const initials = user?.fullName
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navbar */}
     <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-10">
  <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
    <Link to="/dashboard" className="flex items-center gap-2 font-semibold text-lg">
      <LayoutDashboard className="h-5 w-5" />
      Resume Analyzer
    </Link>

    <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
      <Link to="/dashboard" className="hover:text-foreground transition-colors">
        Dashboard
      </Link>
      <Link to="/resumes" className="hover:text-foreground transition-colors">
        My Resumes
      </Link>
    </nav>

    <div className="flex items-center gap-2">
      <button
        className="md:hidden p-2 text-muted-foreground"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="cursor-pointer h-9 w-9">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <div className="px-2 py-1.5 text-sm">
            <p className="font-medium">{user?.fullName}</p>
            <p className="text-muted-foreground text-xs">{user?.email}</p>
          </div>
          <DropdownMenuItem onClick={() => navigate("/profile")}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout} className="text-destructive">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>

  {/* Mobile menu dropdown */}
  {mobileMenuOpen && (
    <nav className="md:hidden border-t border-border px-4 py-3 flex flex-col gap-3 text-sm">
      <Link
        to="/dashboard"
        className="text-muted-foreground hover:text-foreground transition-colors"
        onClick={() => setMobileMenuOpen(false)}
      >
        Dashboard
      </Link>
      <Link
        to="/resumes"
        className="text-muted-foreground hover:text-foreground transition-colors"
        onClick={() => setMobileMenuOpen(false)}
      >
        My Resumes
      </Link>
    </nav>
  )}
</header>

      {/* Page Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
