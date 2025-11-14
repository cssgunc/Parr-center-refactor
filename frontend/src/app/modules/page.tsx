"use client";

import {
  getModuleById,
  getUserModules,
  getPublicModules,
} from "@/lib/firebase/db-operations";
import { Module } from "@/lib/firebase/types";
import { Container, Typography, Box, Input } from "@mui/material";
import { useEffect, useState } from "react";

export default function ModulesPage() {
  return (
    <Container
      maxWidth="lg"
      style={{
        background: "linear-gradient(to bottom, white 0%, white 6%, #abd8ff 100%)",
      }}
    >
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Modules
        </Typography>
        <Typography variant="body1">
          This is the modules page. Add your modules content here.
        </Typography>
      </Box>
    </Container>
  );
}
