import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold text-foreground">
        Welcome, {user?.fullName}! 👋
      </h1>
      <p className="text-muted-foreground">{user?.email}</p>
      <Button onClick={logout} variant="destructive">
        Logout
      </Button>
    </div>
  );
}