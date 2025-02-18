import { redirectToLogin } from "~/utils/auth";

export default defineNuxtRouteMiddleware(async (to) => {
  const headers = useRequestHeaders(); // Access headers
  const host = headers.host;
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const fullUrl = `${protocol}://${host}${to.fullPath}`;

  const token = useCookie("authToken");
  if (!token.value) {
    return await redirectToLogin(fullUrl);
  }
});
