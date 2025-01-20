<template>
  <div>
    <h1>members</h1>

    <section class="card">
      <h2>Add member</h2>
      <VForm
        v-slot="{ errors }"
        :validation-schema="schema"
        @submit="handleSubmit"
        class="flex gap-2"
      >
        <VField
          id="email"
          name="email"
          type="email"
          :class="cn('input', { error: errors.email })"
          placeholder="Email"
        />
        <VErrorMessage name="email" class="input-error" />

        <button class="btn" type="submit">Add</button>
      </VForm>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  Form as VForm,
  Field as VField,
  ErrorMessage as VErrorMessage,
} from "vee-validate";
import { z } from "zod"; // Import z instead of * as zod
import { toTypedSchema } from "@vee-validate/zod";
import { useInviteOrganisationMember } from "~/composables/useOrganisations";

const route = useRoute();
const { mutate: inviteMember } = useInviteOrganisationMember();

const formSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});
/*
type FormSchema = z.infer<typeof formSchema>;
*/
const schema = toTypedSchema(formSchema);

const handleSubmit = async (values: typeof schema) => {
  console.log(values);
  inviteMember({
    email: values.email,
    skills: [],
    phoneNumber: "123",
    organisationId: Number(route.params.orgId),
  });
};
</script>
