"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase/firebaseConfig";
import { getUserRole } from "@/lib/firebase/Authentication/GetUserRole";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [user] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let isMounted = true;

    const checkAdminStatus = async () => {
      if (!user) {
        if (isMounted) {
          setIsAdmin(false);
        }
        return;
      }

      try {
        const adminStatus = await getUserRole(user.uid);
        if (isMounted) {
          setIsAdmin(Boolean(adminStatus));
        }
      } catch (error) {
        if (isMounted) {
          setIsAdmin(false);
        }
      }
    };

    checkAdminStatus();

    return () => {
      isMounted = false;
    };
  }, [user]);

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "info.main",
        boxShadow: "none",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Box
            component={Link}
            href="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              py: 2,
            }}
          >
            <Image
              src="/philosophy_logo_white_horizontal.png"
              alt="UNC Parr Center for Ethics"
              width={400}
              height={60}
              priority
              style={{ height: "auto", maxHeight: "60px" }}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {user && (
              <Button
                component={Link}
                href="/journal"
                variant={pathname === "/journal" ? "contained" : "outlined"}
                sx={{
                  color: pathname === "/journal" ? "white" : "primary.main",
                  backgroundColor: pathname === "/journal" ? "primary.main" : "transparent",
                  borderColor: "primary.main",
                  textTransform: "none",
                  fontSize: "16px",
                  borderRadius: "16px",
                  px: 3,
                  py: 1,
                }}
              >
                Journal
              </Button>
            )}

            {isAdmin && (
              <Button
                component={Link}
                href={pathname.startsWith("/admin") ? "/student" : "/admin"}
                variant="contained"
                sx={{
                  backgroundColor: "primary.main",
                  color: "white",
                  textTransform: "none",
                  fontSize: "16px",
                  borderRadius: "16px",
                  px: 3,
                  py: 1,
                }}
              >
                {pathname.startsWith("/admin") ? "Modules" : "Admin Dashboard"}
              </Button>
            )}

            <IconButton
              component={Link}
              href="/profile"
              sx={{
                color: "primary.main",
              }}
            >
              <AccountCircle sx={{ fontSize: 40 }} />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
