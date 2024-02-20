import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { defaultSession, sessionOptions } from "@/session/lib";
import { sleep, SessionData } from "@/session/lib";

// login
export async function POST(request: NextRequest) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

//   console.log("[receieved request]", request)

  const { username = "No username", password = "" } = (await request.json()) as {
    username: string;
    password: string;
  };

  
  if (username === "admin" && password == "admin123") { // TODO change
    session.isLoggedIn = true;
    session.username = username;
    await session.save();
  
    // simulate looking up the user in db
    await sleep(250);
  } else {
    return Response.json({error: 'Incorrect username or password', ...session})
  }

  return Response.json(session)
}

// read session
export async function GET() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  // simulate looking up the user in db
  await sleep(250);

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