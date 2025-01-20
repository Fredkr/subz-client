<script setup lang="ts">
import {
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "radix-vue";
import { PhCaretDown, PhArrowRight } from "@phosphor-icons/vue";

import Link from "~/components/ExtendedLink.vue";
export interface NavItem {
  label: string;
  path: string;
  disabled?: boolean;
  sub?: NavItem[];
}
interface Props {
  nav: NavItem[];
  navClass?: string;
}

const { nav } = defineProps<Props>();

const route = useRoute();
const path = route.path.split("/")[2];
</script>

<template>
  <nav
    aria-label="Sidebar Navigation"
    :class="cn('card-secondary w-[400px]', navClass)"
  >
    <AccordionRoot
      type="multiple"
      collapsible
      class="flex flex-col space-y-2"
      :default-value="[path]"
    >
      <template v-for="item in nav" :key="item.path">
        <template v-if="!item.sub">
          <Link
            :href="item.path"
            :disabled="item.disabled"
            :class="
              cn('flex items-center gap-x-2', {
                'font-bold': route.path === item.path,
              })
            "
          >
            <template v-if="route.path === item.path">
              <PhArrowRight :size="16" weight="bold" />
            </template>
            {{ item.label }}
          </Link>
        </template>

        <template v-if="item.sub">
          <AccordionItem
            :value="item.label.toLocaleLowerCase()"
            class="relative flex-1"
          >
            <AccordionTrigger
              class="btn data-[state=open]:text-textHighlight relative z-20 flex w-full flex-1 items-center justify-between"
            >
              <span>{{ item.label }}</span>
              <PhCaretDown :size="32" weight="bold" />
            </AccordionTrigger>
            <AccordionContent
              class="data-[state=open]:card data-[state=open]:card-sm absolute -top-0 z-10 flex w-full flex-col space-y-3 p-3 !pt-12"
            >
              <template v-for="sub in item.sub" :key="sub.path">
                <Link :href="sub.path"> {{ sub.label }} </Link>
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
  @apply whitespace-nowrap bg-cardPrimary px-4 py-2;
}
</style>
