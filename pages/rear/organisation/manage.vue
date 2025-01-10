<template>
  <NuxtLayout name="rear">
    <div class="p-3 flex-1">
      <h1 class="text-3xl font-bold pb-5">Organisation2</h1>

      {{ data }}
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useOrganisations } from "~/composables/useOrganisations";

const { data, suspense } = useOrganisations();
await suspense();
</script>
