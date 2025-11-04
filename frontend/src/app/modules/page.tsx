import { Container, Typography, Box } from "@mui/material";

/*
* COMMENTED OUT TESTING CODE - Uncomment if needed for debugging:
*
* "use client";
*
* import {
*   getModuleById,
*   getUserModules,
*   getPublicModules,
* } from "@/lib/firebase/db-operations";
* import { Module } from "@/lib/firebase/types";
* import { useEffect, useState } from "react";
*
* const [id, setId] = useState<string>("DY0C6mviJBcQDoFfbMPx");
* const [publicModules, setPublicModules] = useState<Module[]>([]);
* const [module, setModule] = useState<Module | null>(null);
*
* useEffect(() => {
*   if (id.length == "DY0C6mviJBcQDoFfbMPx".length) {
*     getModuleById(id)
*       .then((module) => {
*         console.log("Module fetched by ID:", module);
*         setModule(module);
*       })
*       .catch((error) => {
*         console.error("Error fetching module by ID:", error);
*       });
*   }
*
*   getPublicModules()
*     .then((modules: Module[]) => {
*       console.log("Public modules fetched:", modules);
*       setPublicModules(modules);
*     })
*     .catch((error: unknown) => {
*       console.error("Error fetching public modules:", error);
*     });
* }, [id]);
*/

export default function ModulesPage() {
  return (
    <Container maxWidth="lg">
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
