export type UserT = {
  id: number;
  email: string;
  isActivated: boolean;
  username?: string;
  photo?: string;
  roles: RoleT[];
};

export type RoleT = {
  createdAt: string | null;
  description: string | null;
  id: number;
  updatedAt: string | null;
  value: string;
};
