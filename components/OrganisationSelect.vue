<template>
  <SelectRoot
    v-model="selected"
    class="relative"
    @update:model-value="handleSelect"
  >
    <SelectTrigger
      class="inline-flex min-w-[160px] items-center justify-between rounded-md border-2 border-mainLight hover:border-textHighlight px-3 py-2 cursor-pointer"
    >
      <SelectValue placeholder="Select a fruit..." />
      <ChevronDownIcon class="size-5" />
    </SelectTrigger>

    <SelectPortal>
      <SelectContent
        position="popper"
        :side-offset="5"
        class="top-[-200px] py-3 min-w-[var(--radix-select-trigger-width)] bg-main border-2 border-mainLight overflow-hidden rounded-md shadow-2xl"
      >
        <SelectViewport>
          <SelectItem
            v-for="(option, index) in organisations"
            :key="index"
            class="text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-green9 data-[highlighted]:text-green1"
            :value="JSON.stringify(option)"
          >
            <SelectItemIndicator
              class="absolute left-0 w-[25px] inline-flex items-center justify-center"
            >
              <CheckIcon class="size-5" />
            </SelectItemIndicator>
            <SelectItemText>
              {{ option.name }}
            </SelectItemText>
          </SelectItem>
        </SelectViewport></SelectContent
      >
    </SelectPortal>
  </SelectRoot>
</template>

<script setup lang="ts">
import { ChevronDownIcon, CheckIcon } from "@heroicons/vue/24/solid";
import { ref } from "vue";
import {
  SelectContent,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from "radix-vue";
import type { Organisation } from "~/api/io/organisationSchema";
interface Props {
  organisations: Organisation[];
  defaultValue?: Organisation;
  onSelect?: (org: Organisation) => void;
}

const { defaultValue, onSelect, organisations } = defineProps<Props>();
const selected = ref<string>(defaultValue ? JSON.stringify(defaultValue) : "");

const handleSelect = (value: string) => {
  const parsed = JSON.parse(value);
  onSelect?.(parsed);
};
</script>
