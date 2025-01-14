<template>
  <NuxtLayout name="rear">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth", "role-guard"],
  allowedRoles: ["super"],
});
</script>
