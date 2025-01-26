import { z } from "zod";

const invitationStateSchema = z.object({
  invitation_token: z.string(),
});

export const parseInvitationState = (state: string | null) => {
  if (!state) {
    return null;
  }

  try {
    const parsedState = JSON.parse(state);
    const validatedState = invitationStateSchema.safeParse(parsedState);
    if (validatedState.success) {
      return validatedState.data.invitation_token;
    }
    return null;
  } catch (error) {
    console.error("parseInvitationState | ", error);
    return null;
  }
};
