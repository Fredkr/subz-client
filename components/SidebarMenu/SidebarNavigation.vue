<script setup lang="ts">
import {
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "radix-vue";
export interface NavItem {
  label: string;
  path: string;
  sub?: NavItem[];
}
interface Props {
  nav: NavItem[];
}

defineProps<Props>();
import { ChevronDownIcon } from "@heroicons/vue/24/solid";
</script>

<template>
  <nav aria-label="Sidebar Navigation" class="p-3 flex-1 w-full">
    <AccordionRoot type="multiple" collapsible class="space-y-2">
      <template v-for="item in nav" :key="item.path">
        <template v-if="!item.sub">
          <a :href="item.path" class="menu-item">
            {{ item.label }}
          </a>
        </template>

        <template v-if="item.sub">
          <AccordionItem :value="item.label" class="flex-1">
            <AccordionTrigger
              class="menu-item flex-1 items-center justify-between"
            >
              <span>{{ item.label }}</span>
              <ChevronDownIcon class="size-5" />
            </AccordionTrigger>
            <AccordionContent class="p-3 flex flex-col space-y-3 w-full">
              <template v-for="sub in item.sub" :key="sub.path">
                <a :href="sub.path" class="menu-item">
                  {{ sub.label }}
                </a>
              </template>
            </AccordionContent>
          </AccordionItem>
        </template>
      </template>
    </AccordionRoot>
  </nav>
</template>

<style scoped>
.accordion-content {
  @apply bg-mainDark px-4 py-2 whitespace-nowrap;
}
.menu-item {
  @apply bg-mainDark px-4 py-2 whitespace-nowrap hover:bg-main flex flex-1 rounded-md w-full;
}
</style>
