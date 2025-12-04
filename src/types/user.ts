/* eslint-disable @typescript-eslint/no-explicit-any */


type JwtPayload = {
  email: string;
  role: "user" | "admin";
  name: string;
  phone_number: string;
  address: string;
};

export type IUser = {
  avatarUrl: string;
  name: any;
  jwtPayload: JwtPayload;
  iat: number;
  exp: number;
};
