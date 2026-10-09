import { useEffect } from "react";
import { toast } from "sonner";
import apiClient from "@/lib/axios";

// Pings the backend as soon as the app opens. If the server is asleep
// (free hosting), the user sees a friendly message instead of a frozen UI.
export function useServerWarmup() {
  useEffect(() => {
    let toastId: string | number | undefined;

    const timer = setTimeout(() => {
      toastId = toast.loading(
        "Waking up the server. The first request can take up to a minute..."
      );
    }, 3000);

    apiClient
      .get("/health")
      .catch(() => {})
      .finally(() => {
        clearTimeout(timer);
        if (toastId !== undefined) toast.dismiss(toastId);
      });

    return () => clearTimeout(timer);
  }, []);
}