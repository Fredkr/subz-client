import { z } from "zod";
import wretch from "wretch";

const registerUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  invitation_token: z.string(),
});

export type RegisterUser = z.infer<typeof registerUserSchema>;
export const registerUser = async ({
  email,
  password,
  invitation_token,
}: RegisterUser) => {
  return wretch("http://localhost:8080/auth/register/email").post({
    email,
    password,
    invitation_token,
  });
};

const loginUserResponseSchema = z.object({
  token: z.string(),
});
export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
export type LoginUser = z.infer<typeof loginUserSchema>;
export const loginUser = async ({ email, password }: LoginUser) => {
  return wretch("http://localhost:8080/auth/login/email")
    .options({ credentials: "include", mode: "cors" })
    .post({
      email,
      password,
    })

    .json((response) => {
      const validatedResponse = loginUserResponseSchema.safeParse(response);

      if (validatedResponse?.success) {
        return validatedResponse.data;
      } else {
        console.error("loginUser | ", validatedResponse.error);
        throw new Error("Invalid loginUser response");
      }
    });
};
