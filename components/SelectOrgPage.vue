<template>
  <div>
    <h1>Select your organisation</h1>
    <template v-if="organisations?.length">
      <OrganisationSelect
        :organisations="organisations"
        :default-value="organisation"
        @select="handleOrgSelect"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { useOrganisations } from "~/composables/useOrganisations";
import { useOrganisationStore } from "~/stores/organisation";
import OrganisationSelect from "~/components/OrganisationSelect.vue";
import type { Organisation } from "~/api/io/organisationSchema";

interface Props {
  onSelect?: (org: Organisation) => void;
}

defineProps<Props>();

const store = useOrganisationStore();
const { select } = store;

const { data, suspense } = useOrganisations();
await suspense();

const organisations = ref(data.value);
const organisation = organisations.value?.find((o) => o.id === store.id);

if (organisations.value && organisations.value.length === 1) {
  const first = organisations.value[0];
  select(first.id, first.name);
}

const handleOrgSelect = (org: Organisation) => {
  select(org.id, org.name);
  navigateTo(`/admin/${org.id}`);
};
</script>
