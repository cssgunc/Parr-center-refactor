"use client";

import {
  getModuleById,
  getUserModules,
  getPublicModules,
} from "@/lib/firebase/db-operations";
import { Module } from "@/lib/firebase/types";
import { Container, Typography, Box, Input } from "@mui/material";
import { useEffect, useState } from "react";
import ModuleTestPage from "@/components/ModuleTestPage";

export default function ModulesPage() {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <ModuleTestPage />
    </Container>
  );
}
