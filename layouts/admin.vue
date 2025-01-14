<template>
  <div class="h-full flex flex-col flex-1">
    <Header>
      <template #start>
        <OrganisationSelect
          :key="organisation?.id"
          :organisations="organisations"
          :default-value="organisation"
          @select="handleOrgSelect"
        />
      </template>
    </Header>

    <AsideLayout
      aside-class="bg-mainDark h-full"
      layout-class="flex-1"
      content-class="py-5"
    >
      <template #aside>
        <SidebarNavigation :nav="navigation" nav-class="ps-5 py-5" />
      </template>

      <template #content>
        <slot />
      </template>
    </AsideLayout>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import Header from "~/components/Header/Header.vue";
import SidebarNavigation from "~/components/SidebarMenu/SidebarNavigation.vue";
import { useOrganisationStore } from "~/stores/organisation";
import { useOrganizationContext } from "~/composables/useOrganisationContext";
import OrganisationSelect from "~/components/OrganisationSelect.vue";
import type { Organisation } from "~/api/io/organisationSchema";
import { useOrganisations } from "~/composables/useOrganisations";

const store = useOrganisationStore();
const route = useRoute();
const { data, suspense } = useOrganisations();
await suspense();

await useOrganizationContext();

const { select } = store;
const { id: orgId } = storeToRefs(store);

const organisations = ref(data.value);
const organisation = computed(() => {
  return organisations.value?.find((o) => o.id === orgId.value);
});

if (organisations.value && organisations.value.length === 1) {
  const first = organisations.value[0];
  select(first.id, first.name);
}

const handleOrgSelect = (org: Organisation) => {
  select(org.id, org.name);

  const currentPath = route.path;
  const newPath = currentPath.replace(
    /\/admin\/\d+/, // Matches /admin/[number]
    `/admin/${org.id}`,
  );

  navigateTo(newPath);
};

const navigation = computed(() => [
  {
    label: "Schedule",
    path: `/admin/${orgId.value}/schedule`,
    disabled: !orgId.value,
  },
]);
</script>
