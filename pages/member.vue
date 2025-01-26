<template>
  <NuxtLayout name="member">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth", "role-guard"],
  allowedRoles: ["user"],
});
</script>
