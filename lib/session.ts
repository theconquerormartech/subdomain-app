import { IronSession, getIronSession } from "iron-session";
import { cookies } from "next/headers";

export interface SessionData {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export type IronSessionData = IronSession<SessionData>;

export const sessionOptions = {
  password: process.env.SESSION_PASSWORD || "your-secret-password-change-this-in-production",
  cookieName: "reosm-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    domain: "reosm.com",
    path: "/",
    httpOnly: true,
    sameSite: "lax" as const,
  },
};

export async function getSession() {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
  return session;
}
