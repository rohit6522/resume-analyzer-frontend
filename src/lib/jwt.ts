export function isTokenExpired(token: string): boolean {
  try {
    const payload = token.split(".")[1];
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    const { exp } = JSON.parse(json);
    return typeof exp === "number" && exp * 1000 < Date.now();
  } catch {
    return true;
  }
}