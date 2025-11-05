"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import { getUserRole } from "@/lib/firebase/Authentication/GetUserRole/index";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/lib/firebase/firebaseConfig";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

type AuthGateProps = {
  children: ReactNode;
  requireAdmin?: boolean;
  redirectIfAuthedTo?: string;
  adminPath?: string;
  studentPath?: string;
};

/**
 * Redeidrects to login if user is not loggedin
 * If user is admin then allows access to /admin otherwise to student
 **/
export default function AuthGate({
  children,
  requireAdmin,
  adminPath = "/admin",
  studentPath = "/student",
}: AuthGateProps) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const navigating = useRef(false);

  useEffect(() => {
    const auth = getAuth(app);

    const unsub = onAuthStateChanged(auth, async (user) => {
      if (navigating.current) return;
      try {
        //Not loggedin
        if (!user) {
          navigating.current = true;
          router.replace("/login");
          return;
        }

        //Makes sure that admin screen doesn't flash on direct route to /admin
        if (requireAdmin) {
          const isAdmin = await getUserRole(user.uid);
          navigating.current = true;
          router.replace(isAdmin ? adminPath : studentPath);
          return;
        }

        const isAdmin = await getUserRole(user.uid);
        navigating.current = true;
        router.replace(isAdmin ? adminPath : studentPath);
        setReady(true);
        return;
      } catch (error) {
        router.replace("/login");
      }
    });

    return () => unsub();
  }, [router, requireAdmin]);

  if (!ready) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f9fafb",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return <>{children}</>;
}
