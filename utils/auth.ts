export const getCurrentUrl = () => {
  return `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
};

export const redirectToLogin = (fullUrl: string) => {
  return navigateTo({
    path: "/login",
    query: {
      redirect: encodeURIComponent(fullUrl),
    },
  });
};
