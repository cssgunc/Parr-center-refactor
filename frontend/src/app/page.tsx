import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import ModuleContentMUI from "@/components/ModuleContentMUI";
import modulesContent from "@/data/modulesContent";
import ModulesPage from "@/components/ModulesPage";
import ProtectedRoute from "@/components/ProtectedRoute";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/navigation";

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

  const decoded = await verifySession();

  if (!decoded) {
    redirect("/login");
  }
  const isAdmin = await getUserRole(decoded.uid);

  redirect(isAdmin ? "/admin" : "/student");

  // ===== RENDER LOGIC =====
  // //Displays loading while AuthContext is fetching role, and userProfile
  // if (loading || isRedirecting) {
  //   return (
  //     <Box
  //       sx={{
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         minHeight: "100vh",
  //         backgroundColor: "#f9fafb",
  //       }}
  //     >
  //       <CircularProgress />
  //     </Box>
  //   );
  // }
}
