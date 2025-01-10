<script setup lang="ts">
import SidebarNavigation, {
  type NavItem,
} from "~/components/SidebarMenu/SidebarNavigation.vue";

interface Props {
  nav: NavItem[];
}

defineProps<Props>();
</script>

<template>
  <div class="bg-mainDark flex flex-col w-auto space-y-3">
    <SidebarNavigation :nav="nav" />
  </div>
</template>

<style scoped>
/* Optional: Add transitions for AccordionContent */
</style>
