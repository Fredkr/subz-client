import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  role: string;
}

export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie("authToken");

  if (!token.value) {
    return redirectToLogin(getCurrentUrl());
  }

  try {
    const decodedToken: DecodedToken = jwtDecode(token.value);

    const allowedRoles = (to.meta.allowedRoles as string[]) || [];

    if (!allowedRoles.includes(decodedToken.role)) {
      return navigateTo("/unauthorized");
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    return redirectToLogin(getCurrentUrl());
  }
});
