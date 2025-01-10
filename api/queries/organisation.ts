import wretch from "wretch";

export const getOrganisations = async () => {
  const token = useCookie("authToken");
  if (!token.value) {
    return;
  }
  return wretch("http://localhost:8080/api/organisations")
    .auth(`Bearer ${token.value}`)
    .get()
    .json();
};
