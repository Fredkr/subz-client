import { useMutation } from "@tanstack/vue-query";
import {
  type LoginUser,
  loginUser,
  type RegisterUser,
  registerUser,
} from "~/api/queries/user";

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: (user: RegisterUser) => registerUser(user),
  });
};

export const useLoginUser = () => {
  return useMutation({
    mutationFn: (user: LoginUser) => loginUser(user),
    onSuccess(data) {
      navigateTo(data.redirectUrl);
    },
  });
};
