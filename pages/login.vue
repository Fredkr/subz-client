<template>
  <div class="flex h-full w-full items-center justify-center bg-cardSecondary">
    <div class="card min-w-[400px] space-y-8">
      <section class="flex flex-col items-center">
        <h1 class="pb-5 text-center text-3xl font-bold">Subz</h1>

        <a
          class="btn"
          :href="`${config.public.apiBase}/auth/login?provider=google&redirect=${redirect}`"
          >Login with google</a
        >
      </section>
      <div class="mx-5 border-b-sm border-black" />
      <section>
        <VForm
          v-slot="{ errors }"
          :validation-schema="schema"
          class="flex flex-col gap-2"
          @submit="handleSubmit"
        >
          <VField
            id="email"
            name="email"
            type="email"
            :class="cn('input', { error: errors.email })"
            placeholder="Email"
          />
          <VErrorMessage name="email" class="input-error" />
          <VField
            id="password"
            name="password"
            type="password"
            :class="cn('input', { error: errors.password })"
            placeholder="Password"
          />
          <VErrorMessage name="password" class="input-error" />

          <button class="btn" type="submit">Log in</button>
        </VForm>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Form as VForm,
  Field as VField,
  ErrorMessage as VErrorMessage,
} from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useLoginUser } from "~/composables/useAuth";
const route = useRoute();
const config = useRuntimeConfig();
const { mutate: login } = useLoginUser();

const formSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const schema = toTypedSchema(formSchema);
const handleSubmit = async (values: typeof schema) => {
  console.log(values);
  login(values);
};

const redirect = route.query.redirect || config.public.baseUrl;
</script>
