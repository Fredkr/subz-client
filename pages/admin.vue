<template>
  <NuxtLayout name="admin">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth", "role-guard"],
  allowedRoles: ["manager", "super"],
});
</script>
