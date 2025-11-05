import { cookies } from "next/headers";
import { authAdmin } from "@/lib/firebase/adminConfig";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const idToken = body?.idToken as string | undefined;

    if (!idToken) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    //Verification
    const resp = await authAdmin.verifyIdToken(idToken, true);
    console.log(resp);
    /**
     * Create Session cookie using Firebase admin
     */
    //Expries in 1 day
    const expiresIn = 1 * 24 * 60 * 60 * 1000;
    const session = await authAdmin.createSessionCookie(idToken, { expiresIn });

    cookies().set("session", session, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: expiresIn / 1000,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 401 }
    );
  }
}
