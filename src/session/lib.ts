import { SessionOptions } from "iron-session";

export interface SessionData {
  username: string;
  password: string;
  isLoggedIn: boolean;
}

export type User = {
    username: string;
    password: string;
}

export const defaultSession: SessionData = {
  username: "",
  password: "",
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: process.env.LOGIN_COOKIE_NAME as string,
  cookieOptions: {
    // secure only works in `https` environments
    // if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
    secure: true,
  },
};

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}