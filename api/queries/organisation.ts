import wretch from "wretch";
import {
  type Organisation,
  OrganisationSchema,
} from "~/api/io/organisationSchema";

import { z } from "zod";

const GetOrganisationsResponseSchema = z.array(OrganisationSchema);

export const getOrganisations = async (): Promise<Organisation[]> => {
  const token = useCookie("authToken");
  if (!token.value) {
    throw new Error("No token found");
  }

  return wretch("http://localhost:8080/api/organisations")
    .auth(`Bearer ${token.value}`)
    .get()
    .json((response) => {
      const validatedResponse =
        GetOrganisationsResponseSchema.safeParse(response);

      if (validatedResponse?.success) {
        return validatedResponse.data;
      } else {
        console.error("getOrganisations | ", validatedResponse.error);
        throw new Error("Invalid getOrganisations response");
      }
    });
};
