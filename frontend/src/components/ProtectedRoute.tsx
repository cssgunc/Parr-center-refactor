"use client";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, loading] = useAuth();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      setIsRedirecting(true);
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading || isRedirecting) {
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
  if (!user) return null;

  return <>{children}</>;
}
