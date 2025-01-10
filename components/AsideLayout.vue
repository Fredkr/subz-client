<template>
  <div :class="cn('layout', layoutClass)">
    <aside :class="cn('sidebar', asideClass)">
      <div class="min-w-[300px] ms-auto">
        <slot name="aside" />
      </div>
    </aside>
    <div class="wrapper">
      <div :class="cn('content', contentClass)">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  layoutClass?: string;
  asideClass?: string;
  contentClass?: string;
}

defineProps<Props>();
</script>

<style scoped>
.layout {
  @apply flex justify-center relative;
}

.wrapper {
  @apply w-[var(--content-width)] flex relative;
}

.sidebar {
  @apply bg-mainDark left-0 top-0 bottom-0 absolute ms-auto flex px-5;
  width: calc((100vw - var(--content-width)) / 2);
}

.content {
  @apply w-[var(--content-width)]  px-5;
}
</style>
