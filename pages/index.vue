<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

navigateTo("/member");
</script>
