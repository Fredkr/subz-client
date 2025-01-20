<template>
  <div class="flex h-full flex-1 flex-col">
    <Header />

    <div class="flex flex-1 gap-5 p-5">
      <SidebarNavigation :nav="navigation" nav-class="ps-5 py-5" />
      <div class="card flex-1">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from "~/components/Header/Header.vue";
import SidebarNavigation from "~/components/SidebarMenu/SidebarNavigation.vue";
const navigation = [
  { label: "test", path: "/rear/test" },
  {
    label: "Organisation",
    sub: [
      { label: "Create", path: "/rear/organisation/new" },
      { label: "Manage", path: "/rear/organisation/manage" },
    ],
  },
];
</script>
