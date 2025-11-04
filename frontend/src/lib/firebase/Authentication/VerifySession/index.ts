import { cookies } from "next/headers";
import { authAdmin } from "@/lib/firebase/adminConfig";

export async function verifySession() {
  //token that holds cookie session
  const token = cookies().get("session")?.value;
  if (!token) {
    return null;
  }

  //Verify Cookie session with firebaseadmin
  try {
    return await authAdmin.verifySessionCookie(token, true);
  } catch {
    return null;
  }
}
