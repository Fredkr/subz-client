<template>
  <NavigationMenuLink
    class="link data-[active]:text-textHighlight"
    :href="{ href }"
    :active="rootPath === 'rear'"
  >
    <slot />
  </NavigationMenuLink>
</template>
<script setup lang="ts">
import { NavigationMenuLink } from "radix-vue";
interface Props {
  href: string;
}

defineProps<Props>();

const route = useRoute();
const rootPath = route.path.split("/")[1];
</script>
