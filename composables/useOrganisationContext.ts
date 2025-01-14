import { ref } from "vue";
import { useRoute } from "vue-router";
import { useOrganisations } from "./useOrganisations";
import { useOrganisationStore } from "~/stores/organisation";

export const useOrganizationContext = async () => {
  const route = useRoute();

  const orgId = ref(route.params.orgId);

  if (!orgId.value) {
    return;
  }

  const { data, suspense } = useOrganisations();
  await suspense();
  const org = data.value?.find((o) => o.id === Number(orgId.value));
  const store = useOrganisationStore();
  const { select } = store;

  if (org) {
    select(org.id, org.name);
  }
};
