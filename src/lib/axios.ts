import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url: string = error.config?.url ?? "";
    const isAuthRequest = url.startsWith("/auth/");

    // 401 on a protected request = expired session.
    // 401 on login/register = wrong credentials, so let the form show its own error.
    if (status === 401 && !isAuthRequest && localStorage.getItem("token")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      sessionStorage.setItem("sessionExpired", "1");
      window.location.href = "/login";
    }

    // Network failure / timeout: give the forms a readable message to display
    if (!error.response) {
      const message =
        error.code === "ECONNABORTED"
          ? "The server took too long to respond. Please try again."
          : "Cannot reach the server. Please check your internet connection.";
      error.response = { status: 0, data: { message } };
    }

    return Promise.reject(error);
  }
);

export default apiClient;