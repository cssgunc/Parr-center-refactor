"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "sonner";
export function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, loading } = useAuth();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        setIsRedirecting(true);
        router.push("/login");
      } else if (!isAdmin) {
        setIsRedirecting(true);
        router.push("/");
        toast.message("Page is only for administrative users");
      }
    }
  }, [user, isAdmin, loading, router]);

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
  if (!user || !isAdmin) return null;

  return <>{children}</>;
}
