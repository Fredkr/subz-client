import * as z from "zod";

export const MemberSchema = z.object({
  id: z.number(),
  email: z.string(),
  organisation_id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  user_id: z.number(),
  skills: z.array(z.string()),
  phone_number: z.string().nullable(),
  working_hours: z.string().nullable(),
});

export type Member = z.infer<typeof MemberSchema>;
