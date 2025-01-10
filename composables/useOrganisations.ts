import { useQuery } from "@tanstack/vue-query";
import { getOrganisations } from "~/api/queries/organisation";

export const useOrganisations = () => {
  return useQuery({ queryKey: ["organisation"], queryFn: getOrganisations });
};
