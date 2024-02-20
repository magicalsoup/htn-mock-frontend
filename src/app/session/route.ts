import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { defaultSession, sessionOptions } from "@/session/lib";
import { SessionData } from "@/session/lib";
import { DEMO_PASSWORD, DEMO_USERNAME } from "@/lib/constants";

// login
export async function POST(request: NextRequest) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  const { username = "No username", password = "" } = (await request.json()) as {
    username: string;
    password: string;
  };

  
  if (username === DEMO_USERNAME && password == DEMO_PASSWORD) { 
    session.isLoggedIn = true;
    session.username = username;
    await session.save();
  } else {
    return Response.json({error: 'Incorrect username or password', ...session})
  }

  return Response.json(session)
}

// read session
export async function GET() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (session.isLoggedIn !== true) {
    return Response.json(defaultSession);
  }

  return Response.json(session);
}

// logout
export async function DELETE() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  session.destroy();

  return Response.json(defaultSession);
}