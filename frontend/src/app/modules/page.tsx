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
  const [id, setId] = useState<string>("DY0C6mviJBcQDoFfbMPx");
  const [publicModules, setPublicModules] = useState<Module[]>([]);
  const [module, setModule] = useState<Module | null>(null);

  useEffect(() => {
    if (id.length == "DY0C6mviJBcQDoFfbMPx".length) {
      getModuleById(id)
        .then((module) => {
          console.log("Module fetched by ID:", module);
          setModule(module);
        })
        .catch((error) => {
          console.error("Error fetching module by ID:", error);
        });
    }

    getPublicModules()
      .then((modules: Module[]) => {
        console.log("Public modules fetched:", modules);
        setPublicModules(modules);
      })
      .catch((error: unknown) => {
        console.error("Error fetching public modules:", error);
      });
  }, [id]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Modules (Fetch by ID)
        </Typography>
        <Input value={id} onChange={(e) => setId(e.target.value)} />
        {module && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h5">Module Details:</Typography>
            <Typography>ID: {module.id}</Typography>
            <Typography>Title: {module.title}</Typography>
            <Typography variant="body2">
              Description: {module.description}
            </Typography>
          </Box>
        )}
      </Box>
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Public Modules
        </Typography>
        {publicModules.length > 0 ? (
          <Box sx={{ mt: 2 }}>
            {publicModules.map((module) => (
              <Box key={module.id} sx={{ mb: 2 }}>
                <Typography variant="h5">Module Details:</Typography>
                <Typography>ID: {module.id}</Typography>
                <Typography>Title: {module.title}</Typography>
                <Typography variant="body2">
                  Description: {module.description}
                </Typography>
              </Box>
            ))}
          </Box>
        ) : (
          <Typography>No public modules found.</Typography>
        )}
      </Box>
    </Container>
  );
}
