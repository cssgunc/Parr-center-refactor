"use client";

import { Box, Button, Container, Typography } from "@mui/material";
import AuthGate from "@/components/AuthGate";

export const dynamic = "force-dynamic";

export default function HomepagePage() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        background:
          "linear-gradient(to bottom, white 0%, white 6%, #abd8ff 100%)",
      }}
    >
      <AuthGate>
        <Box sx={{ py: 6, textAlign: "center" }}>
          {/* Welcome message */}
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome to ... !
          </Typography>

          {/* Motivation and value blurb */}
          <Box sx={{ my: 4, maxWidth: 720, mx: "auto" }}>
            <Typography variant="body1" color="text.secondary">
              A brief blurb about what this platform offers and why it matters -
              site's motivation and value.
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Could add photo carousel in this space between header and
              sectioned information below?
            </Typography>
          </Box>

          {/* Three horizontally aligned sections */}
          <Box
            sx={{
              mt: 4,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 3,
              justifyContent: "center",
              alignItems: "stretch",
            }}
          >
            {/* Section 1: Get Learning */}
            <Box
              sx={{
                flex: 1,
                maxWidth: 360,
                p: 3,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                alignItems: "center",
              }}
            >
              <Typography variant="h5" component="h2" gutterBottom>
                Get Learning
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Jump into modules and start exploring. Button links to the
                modules page.
              </Typography>
              <Button variant="contained">Get Learning</Button>
            </Box>

            {/* Section 2: Ethics Bowl Academy */}
            <Box
              sx={{
                flex: 1,
                maxWidth: 360,
                p: 3,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                alignItems: "center",
              }}
            >
              <Typography variant="h5" component="h2" gutterBottom>
                Ethics Bowl Academy
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Blurb about information about the Ethics Bowl Academy. Designed
                to link to another page with more information.
              </Typography>
              <Button variant="outlined">Learn More</Button>
            </Box>

            {/* Section 3: Spot left open for another section of homepage content */}
            <Box
              sx={{
                flex: 1,
                maxWidth: 360,
                p: 3,
                minHeight: 120,
              }}
            >
              <Typography variant="h5" component="h2" gutterBottom>
                Open for potential future homepage content
              </Typography>
            </Box>
          </Box>
        </Box>
      </AuthGate>
    </Container>
  );
}
