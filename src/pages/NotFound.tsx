import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 p-4 text-center">
      <p className="text-6xl font-bold text-foreground">404</p>
      <h1 className="text-xl font-semibold">Page not found</h1>
      <p className="text-muted-foreground">
        The page you're looking for doesn't exist or was moved.
      </p>
      <Link to="/">
        <Button>Back to home</Button>
      </Link>
    </div>
  );
}