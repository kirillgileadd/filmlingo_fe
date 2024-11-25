import { UserT } from "@/src/entities/user";

export type RegisterUserReq = {
  email: string;
  password: string;
};

export type RegisterUserFormData = RegisterUserReq & { repeatPassword: string };

export type RegisterUserRes = {
  accessToken: string;
  refreshToken: string;
  user: UserT;
};
