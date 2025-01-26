import { useQuery } from "@tanstack/vue-query";
import { getMembers } from "~/api/queries/members";
import type { GetCursorRequest } from "~/types/io.types";

export function useMembers({
  orgId,
  pagination,
}: {
  orgId: number;
  pagination: Ref<GetCursorRequest>;
}) {
  return useQuery({
    queryKey: computed(() => [
      "members",
      orgId,
      pagination.value.sortField,
      pagination.value.sortDirection,
    ]),
    queryFn: () =>
      getMembers({
        orgId,
        pagination: pagination.value,
      }),
  });
}
