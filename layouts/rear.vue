<template>
  <div class="h-full flex flex-col flex-1">
    <Header />

    <AsideLayout aside-class="bg-mainDark h-full" layout-class="flex-1">
      <template #aside>
        <SidebarMenu :nav="navigation" />
      </template>

      <template #content>
        <slot />
      </template>
    </AsideLayout>
  </div>
</template>

<script setup lang="ts">
import Header from "~/components/Header/Header.vue";
import SidebarMenu from "~/components/SidebarMenu/SidebarMenu.vue";
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
