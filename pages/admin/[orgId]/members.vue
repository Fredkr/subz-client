<template>
  <div>
    <section class="card mb-5">
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

    <section class="card">
      <template v-if="tableData?.length">
        <SortedTable
          v-model:sorting="sorting"
          :columns="columns"
          :data="tableData"
        />
      </template>
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
import { useMembers } from "~/composables/useMembers";
import SortedTable from "~/components/Table/SortedTable.vue";
import { createColumnHelper, type SortingState } from "@tanstack/vue-table";
import type { Member } from "~/api/io/memberSchema";
import type { GetCursorRequest } from "~/types/io.types";

const route = useRoute();
const { mutate: inviteMember } = useInviteOrganisationMember();
const sorting = ref<SortingState>([]);

const pagination = ref<GetCursorRequest>({
  limit: 100,
  cursor: null,
  sortField: "created_at",
  sortDirection: "ASC",
});

// Use watchEffect to update pagination when sorting changes
watchEffect(() => {
  const currentSort = sorting.value[0];
  console.log("watchEffect running with sorting:", currentSort);

  pagination.value = {
    limit: 100,
    cursor: null,
    sortField: currentSort?.id ?? "created_at",
    sortDirection: currentSort?.desc ? "DESC" : "ASC",
  };
});

const { data } = useMembers({
  orgId: Number(route.params.orgId),
  pagination, // Pass the ref itself
});
const tableData = computed(() => data.value?.data ?? []);

const formSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

const schema = toTypedSchema(formSchema);

const columnHelper = createColumnHelper<Member>();

const columns = [
  columnHelper.accessor("email", {
    id: "email",
    cell: (info) => info.getValue(),
    header: () => "Email",
  }),

  columnHelper.accessor("skills", {
    cell: (info) =>
      h(
        "div",
        { class: "flex flex-wrap gap-2" },
        [...info.getValue()].map((skill) =>
          h(
            "span",
            {
              class: "pill",
            },
            skill,
          ),
        ),
      ),
    header: () => "Skills",
  }),

  columnHelper.accessor("created_at", {
    header: "Created At",
    enableSorting: false,
  }),
];

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
