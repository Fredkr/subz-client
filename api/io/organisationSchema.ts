import * as z from "zod";

export const OrganisationSchema = z.object({
  id: z.number(),
  name: z.string().min(3).max(50),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Organisation = z.infer<typeof OrganisationSchema>;
