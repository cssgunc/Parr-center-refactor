import { redirect } from "next/navigation";
import { verifySession } from "@/lib/firebase/Authentication/VerifySession/index";
import { getUserRole } from "@/lib/firebase/Authentication/GetUserRole/index";

/**
 * HOME COMPONENT
 *
 * The main page component that renders home, student, or admin view
 * based on the currentView state. This provides a simple way to navigate
 * between different sections of the application without complex routing.
 */
export default async function Home() {
  // ===== STATE MANAGEMENT =====

  /**
   * Redirect based on if session is active and whether session is admin or student
   */
  const decoded = await verifySession();

  if (!decoded) {
    redirect("/login");
  }
  const isAdmin = await getUserRole(decoded.uid);

  redirect(isAdmin ? "/admin" : "/student");
}
