import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Unhandled UI error:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 p-4 text-center">
          <h1 className="text-2xl font-bold text-foreground">Something went wrong</h1>
          <p className="text-muted-foreground max-w-md">
            An unexpected error occurred. Reloading the page usually fixes it.
          </p>
          <Button onClick={() => (window.location.href = "/")}>Reload app</Button>
        </div>
      );
    }
    return this.props.children;
  }
}