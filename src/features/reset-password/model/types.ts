import { UserT } from "@/src/entities/user";
import { AxiosError } from "axios";

export type ResetPasswordFormDataT = {
  repeatPassword: string;
  password: string;
};

export type ResetPasswordBody = {
  password: string;
  token: string;
};

export type ResetPasswordRes = UserT;

export type ResetPasswordError = AxiosError<{
  message: string;
}>;
