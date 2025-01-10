<template>
  <div class="h-full flex flex-col flex-1">
    <Header />

    <AsideLayout aside-class="bg-mainDark h-full" layout-class="flex-1">
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
