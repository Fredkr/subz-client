<template>
  <div class="flex h-full flex-1 flex-col">
    <Header />

    <div class="flex flex-1 gap-5 p-5">
      <div class="relative space-y-5">
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
import Header from "~/components/Header/Header.vue";
import SidebarNavigation from "~/components/SidebarMenu/SidebarNavigation.vue";
await useOrganizationContext();

const navigation = computed(() => [
  {
    label: "Schedule",
    path: `/member/schedule`,
  },
]);
</script>
