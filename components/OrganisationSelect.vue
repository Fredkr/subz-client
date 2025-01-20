<template>
  <!--  <ComboboxRoot
    v-model="selected"
    class="relative"
    @update:model-value="handleSelect"
  >
    <ComboboxAnchor
      :class="
        cn(
          'btn data-[state=open]:text-textHighlight z-20 flex min-w-[160px] flex-1 items-center justify-between data-[state=open]:!cursor-pointer',
          triggerClass,
        )
      "
    >
      <ComboboxInput
        class="text-grass11 selection:bg-grass5 placeholder-mauve8 h-full !bg-transparent outline-none"
        placeholder="Placeholder..."
      />
      <ComboboxTrigger />
      <ComboboxCancel />
    </ComboboxAnchor>

    <ComboboxContent
      class="pt-38 absolute z-10 mt-2 h-[200px] w-full min-w-[160px] overflow-hidden rounded bg-white"
    >
      <ComboboxViewport>
        <ComboboxItem
          v-for="(option, index) in organisations"
          :key="index"
          class="text-black"
          :value="JSON.stringify(option)"
        >
          <ComboboxItemIndicator
            class="absolute left-0 inline-flex w-[25px] items-center justify-center"
          >
            <CheckIcon class="size-5" />
          </ComboboxItemIndicator>
          <p>
            {{ option.name }}
          </p>
        </ComboboxItem>
      </ComboboxViewport>
    </ComboboxContent>
  </ComboboxRoot>-->
  <SelectRoot
    v-model="selected"
    @update:model-value="handleSelect"
    class="relative"
  >
    <SelectTrigger
      style="cursor: pointer !important"
      :class="
        cn(
          'btn data-[state=open]:text-textHighlight relative z-[999] flex min-w-[160px] flex-1 items-center justify-between data-[state=open]:!cursor-pointer',
          triggerClass,
        )
      "
    >
      <SelectValue placeholder="Select a fruit..." />
      <ChevronDownIcon class="size-5" />
    </SelectTrigger>

    <SelectContent
      :body-lock="false"
      position="popper"
      class="data-[state=open]:card data-[state=open]:card-sm absolute top-[-44px] -z-10 flex w-[var(--radix-select-trigger-width)] min-w-[160px] flex-col space-y-3 p-3 !pt-14"
    >
      <SelectViewport>
        <SelectItem
          v-for="(option, index) in organisations"
          :key="index"
          class="relative flex items-center gap-x-2 text-black"
          :value="JSON.stringify(option)"
        >
          <SelectItemIndicator class="">
            <CheckIcon class="size-5" />
          </SelectItemIndicator>
          <SelectItemText>
            {{ option.name }}
          </SelectItemText>
        </SelectItem>
      </SelectViewport>
    </SelectContent>
  </SelectRoot>
</template>

<script setup lang="ts">
import { ChevronDownIcon, CheckIcon } from "@heroicons/vue/16/solid";
import { ref } from "vue";
import {
  SelectContent,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
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
  triggerClass?: string;
}

const { defaultValue, onSelect, organisations } = defineProps<Props>();
const selected = ref<string>(defaultValue ? JSON.stringify(defaultValue) : "");

const handleSelect = (value: string) => {
  const parsed = JSON.parse(value);
  onSelect?.(parsed);
};
</script>
