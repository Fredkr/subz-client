export const getCurrentUrl = () => {
  return `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
};

export const redirectToLogin = (fullUrl: string) => {
  navigateTo(
    `http://localhost:8080/auth/login?redirect=${encodeURIComponent(fullUrl)}`,
    { external: true },
  );
};
