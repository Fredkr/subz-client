<template>
  <NavigationMenuLink
    class="link data-[active]:text-textHighlight"
    :href="href"
    :active="active"
  >
    <slot />
  </NavigationMenuLink>
</template>
<script setup lang="ts">
import { NavigationMenuLink } from "radix-vue";
interface Props {
  href: string;
}

const { href } = defineProps<Props>();

const route = useRoute();
const rootPath = route.path.split("/")[1];
const active = href.endsWith(rootPath);
</script>
