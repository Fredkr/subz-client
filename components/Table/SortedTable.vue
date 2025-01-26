<script setup lang="ts" generic="T">
import type { ColumnDef, SortingState } from "@tanstack/vue-table";
import { FlexRender, getCoreRowModel, useVueTable } from "@tanstack/vue-table";
import { ref } from "vue";

interface Props<T> {
  data: T[];
  columns: ColumnDef<T, any>[];
}

const emit = defineEmits<{
  "update:sorting": [value: SortingState];
}>();

const { columns, data } = withDefaults(defineProps<Props<T>>(), {
  data: () => [],
  columns: () => [],
});
const sorting = ref<SortingState>([]);
const tableData = computed(() => data);

const table = useVueTable({
  get data() {
    return tableData.value;
  },
  columns,
  state: {
    get sorting() {
      return sorting.value;
    },
  },
  onSortingChange: (updaterOrValue) => {
    const newValue =
      typeof updaterOrValue === "function"
        ? updaterOrValue(sorting.value)
        : updaterOrValue;

    sorting.value = newValue;
    emit("update:sorting", newValue);
  },
  getCoreRowModel: getCoreRowModel(),
  manualSorting: true,
  debugTable: true,
});
</script>

<template>
  <div class="p-2">
    <table
      cellspacing="10"
      class="relative w-full border-separate bg-cardPrimary"
    >
      <thead class="">
        <tr
          class=""
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <th
            v-for="header in headerGroup.headers"
            :key="header.id"
            :colSpan="0"
            :class="
              cn(
                'sticky top-0 mb-3 rounded-md border-[3px] border-black bg-cardPrimary px-3 py-2 text-start drop-shadow-sm',
                {
                  'cursor-pointer select-none': header.column.getCanSort(),
                },
              )
            "
            @click="header.column.getToggleSortingHandler()?.($event)"
          >
            <template v-if="!header.isPlaceholder">
              <div>
                <FlexRender
                  :render="header.column.columnDef.header"
                  :props="header.getContext()"
                />

                {{
                  { asc: " 🔼", desc: " 🔽" }[
                    header.column.getIsSorted() as string
                  ]
                }}
              </div>
            </template>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="row in table.getRowModel().rows" :key="row.id">
          <td
            v-for="cell in row.getVisibleCells()"
            :key="cell.id"
            class="border-b-[2px] border-black px-3 py-2"
          >
            <FlexRender
              :render="cell.column.columnDef.cell"
              :props="cell.getContext()"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
