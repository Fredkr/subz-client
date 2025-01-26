import { useMutation, useQuery } from "@tanstack/vue-query";
import type { InviteOrganisationMember } from "~/api/queries/organisation";
import { inviteMember, getOrganisations } from "~/api/queries/organisation";

export const useOrganisations = () => {
  return useQuery({ queryKey: ["organisation"], queryFn: getOrganisations });
};


export const useInviteOrganisationMember = () => {
  return useMutation({
    mutationFn: (member: InviteOrganisationMember) => inviteMember(member),
    onSuccess(data, variables, context) {},
    onError(error, variables, context) {},
  });
};
