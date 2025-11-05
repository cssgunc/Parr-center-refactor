"use client";
import AuthGate from "@/components/AuthGate";

/**
 * HOME COMPONENT
 *
 * The main page component that renders home, student, or admin view
 * based on the currentView state. This provides a simple way to navigate
 * between different sections of the application without complex routing.
 */
export default function Home() {
  // ===== STATE MANAGEMENT =====

  /**
   * Redirect based on if user is logged in and whether user is admin or student
   */
  /* The commented out code block you provided is attempting to perform the following actions: */

  // try{
  // const auth = getAuth(app);

  // const isAdmin = await getUserRole(auth.currentUser.uid);
  // router.replace(isAdmin ? "/admin" : "/student");
  // return;
  // } catch

  return (
    <AuthGate>
      <></>
    </AuthGate>
  );
}
