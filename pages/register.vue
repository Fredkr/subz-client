<template>
  <div class="flex h-full w-full items-center justify-center bg-cardPrimary">
    <div class="card-secondary min-w-[400px] space-y-8">
      <template v-if="!isSuccess">
        <section class="flex flex-col items-center">
          <h1 class="pb-5 text-center text-3xl font-bold">Subz</h1>

          <a
            class="btn"
            :href="`${config.public.apiBase}/auth/login?provider=google&redirect=${redirect}`"
            >Register with google</a
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

            <button class="btn" type="submit">Register</button>
          </VForm>
        </section>
      </template>
      <template v-if="isSuccess">
        <section>
          <h1 class="text-3xl font-bold">Success!</h1>
          <p>You have successfully registered an account.</p>
          <p>
            Before you can log in you have to verify your email adress. Then you
            can log in <a :href="`${config.public.baseUrl}/login`">here</a>
          </p>
        </section>
      </template>
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
import { useRegisterUser } from "~/composables/useAuth";
import { parseInvitationState } from "~/utils/invitation";
const route = useRoute();
const config = useRuntimeConfig();
const { mutate: registerUser, isSuccess, data } = useRegisterUser();
const formSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const schema = toTypedSchema(formSchema);
const invitation_token = parseInvitationState(route.query.state);

const handleSubmit = async (values: typeof schema) => {
  registerUser({
    email: values.email,
    password: values.password,
    invitation_token: invitation_token,
  });
};

const redirect = route.query.redirect || config.public.baseUrl;
</script>
