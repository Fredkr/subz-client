import { MemberSchema } from "~/api/io/memberSchema";
import wretch from "wretch";
import QueryStringAddon from "wretch/addons/queryString";
import type { GetCursorRequest } from "~/types/io.types";
import { z } from "zod";

const GetMembersResponseSchema = z.object({
  data: z.array(MemberSchema),
  pagination: z.object({
    next_cursor: z.string().nullable(),
    has_more: z.boolean(),
  }),
  sort: z.object({
    field: z.string(),
    direction: z.string(),
  }),
});

type GetMemberResponse = z.infer<typeof GetMembersResponseSchema>;
type GetMemberRequest = {
  pagination: GetCursorRequest;
  orgId: number;
};

export const getMembers = async ({
  pagination = {
    sortField: "created_at",
    sortDirection: "DESC",
    limit: 100,
    cursor: null,
  },
  orgId,
}: GetMemberRequest): Promise<GetMemberResponse> => {
  const { sortField, sortDirection, limit, cursor } = pagination;
  const token = useCookie("authToken");
  if (!token.value) {
    throw new Error("No token found");
  }

  return wretch(`http://localhost:8080/api/organisation/${orgId}/members`)
    .addon(QueryStringAddon)
    .auth(`Bearer ${token.value}`)
    .query({
      sort_field: sortField,
      sort_direction: sortDirection,
      limit: limit,
      ...(cursor ? { cursor: cursor } : {}),
    })
    .get()
    .json((response) => {
      const validatedResponse = GetMembersResponseSchema.safeParse(response);

      if (validatedResponse?.success) {
        return validatedResponse.data;
      } else {
        console.error("getMembers | ", validatedResponse.error);
        throw new Error("Invalid getMembers response");
      }
    });
};
