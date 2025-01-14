<template>
  <NuxtLink
    :href="href"
    :class="
      cn('link', {
        '!text-gray-500 pointer-events-none': disabled,
      })
    "
    :aria-disabled="disabled"
    :onclick="handleClick"
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
interface Props {
  href: string;
  disabled?: boolean;
}
const { disabled } = defineProps<Props>();

const handleClick = (e: Event) => {
  if (disabled) {
    e.preventDefault();
  }
};
</script>
