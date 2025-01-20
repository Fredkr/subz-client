<template>
  <div class="flex h-full flex-1 flex-col">
    <Header>
      <template #org-select>
        <OrganisationSelect
          :key="organisation?.id"
          :organisations="organisations"
          :default-value="organisation"
          @select="handleOrgSelect"
        />
      </template>
    </Header>

    <div class="flex flex-1 gap-5 p-5">
      <div class="relative space-y-5">
        <div class="card relative z-20">
          <OrganisationSelect
            :key="organisation?.id"
            :organisations="organisations"
            :default-value="organisation"
            trigger-class="w-full"
            @select="handleOrgSelect"
          />
        </div>

        <SidebarNavigation :nav="navigation" nav-class="h-fit z-10 relative" />
      </div>
      <div class="card-secondary flex-1">
        <slot />
      </div>
    </div>
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

  // Get everything after /admin/[number]
  const trailingPath = route.path.replace(/^\/admin(?:\/\d+)?/, "");

  // Construct the new path
  const newPath = `/admin/${org.id}${trailingPath}`;

  navigateTo(newPath);
};

const navigation = computed(() => [
  {
    label: "Schedule",
    path: `/admin/${orgId.value}/schedule`,
    disabled: !orgId.value,
  },
  {
    label: "Members",
    path: `/admin/${orgId.value}/members`,
    disabled: !orgId.value,
  },
]);
</script>
