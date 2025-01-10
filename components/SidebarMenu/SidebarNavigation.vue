<script setup lang="ts">
import {
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "radix-vue";
import { ChevronDownIcon } from "@heroicons/vue/24/solid";
export interface NavItem {
  label: string;
  path: string;
  sub?: NavItem[];
}
interface Props {
  nav: NavItem[];
  navClass?: string;
}

defineProps<Props>();

const route = useRoute();
const path = route.path.split("/")[2];
</script>

<template>
  <nav aria-label="Sidebar Navigation" :class="cn('flex-1 w-full', navClass)">
    <AccordionRoot
      type="multiple"
      collapsible
      class="space-y-2"
      :default-value="[path]"
    >
      <template v-for="item in nav" :key="item.path">
        <template v-if="!item.sub">
          <a :href="item.path" class="link">
            {{ item.label }}
          </a>
        </template>

        <template v-if="item.sub">
          <AccordionItem :value="item.label.toLocaleLowerCase()" class="flex-1">
            <AccordionTrigger
              class="link flex w-full flex-1 items-center justify-between data-[state=open]:text-textHighlight"
            >
              <span>{{ item.label }}</span>
              <ChevronDownIcon class="size-5" />
            </AccordionTrigger>
            <AccordionContent class="p-3 flex flex-col space-y-3 w-full">
              <template v-for="sub in item.sub" :key="sub.path">
                <a :href="sub.path" class="link">
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
</style>
