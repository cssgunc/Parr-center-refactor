import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  // remove the session cookie set at login
  try {
    cookies().set("session", "", { httpOnly: true, path: "/", maxAge: 0 });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: "COOKIE_CLEAR_FAILED" },
      { status: 500 }
    );
  }
}
