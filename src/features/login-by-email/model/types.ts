import { UserT } from "@/src/entities/user";

export type LoginByEmailReqData = {
  email: string;
  password: string;
};

export type LoginByEmailFormData = LoginByEmailReqData;

export type LoginByEmailRes = {
  accessToken: string;
  refreshToken: string;
  user: UserT;
};
