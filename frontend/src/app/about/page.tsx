import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

export const metadata: Metadata = {
  title: "About | Ethics Bowl Academy",
  description:
    "Learn how Ethics Bowl Academy helps students, educators, and lifelong learners build ethical reasoning through interactive philosophy modules.",
};

const audiences = [
  "High school & college students preparing for Ethics Bowl competitions",
  "Educators seeking classroom-ready philosophy resources",
  "Curious lifelong learners exploring ethical questions",
];

const moduleFeatures = [
  "TED-Ed animated videos introducing philosophical concepts through compelling dilemmas",
  "Quizzes and flashcards to build sophisticated moral vocabulary",
  "Reflection questions extending thinking to analogous cases",
  "Activities challenging initial reactions and deepening understanding",
];

const approachHighlights = [
  "Case-based reasoning using concrete, high-stakes scenarios",
  "Critical thinking through open-ended moral reflection",
  "Pluralistic toolkit exploring multiple ethical frameworks",
  "Emphasis on weighing competing values with nuance",
];

export default function AboutPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: { xs: 4, md: 8 },
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(to bottom, white 0%, white 15%, rgba(255, 255, 255, 0.95) 20%, rgba(255, 255, 255, 0.8) 30%, rgba(255, 255, 255, 0.5) 50%, #abd8ff 100%)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "radial-gradient(circle at 2px 2px, rgba(171, 216, 255, 0.7) 2px, transparent 0)",
          backgroundSize: "30px 30px",
          maskImage:
            "radial-gradient(ellipse 100% 100% at center, black 40%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0.4) 65%, rgba(0, 0, 0, 0.1) 80%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 100% 100% at center, black 40%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0.4) 65%, rgba(0, 0, 0, 0.1) 80%, transparent 100%)",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Stack spacing={{ xs: 4, md: 5 }}>
          {/* Hero Section */}
          <Card
            elevation={0}
            sx={{
              borderRadius: 6,
              overflow: "hidden",
              border: "1px solid",
              borderColor: "rgba(75, 156, 211, 0.18)",
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(233, 245, 255, 0.96) 100%)",
              boxShadow: "0 18px 48px rgba(19, 41, 75, 0.08)",
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 5 } }}>
              <Stack spacing={3} alignItems="center" textAlign="center">
                <Chip
                  label="About Ethics Bowl Academy"
                  sx={{
                    bgcolor: "rgba(75, 156, 211, 0.12)",
                    color: "primary.main",
                    fontWeight: 700,
                  }}
                />

                <Typography
                  component="h1"
                  sx={{
                    fontFamily: "Georgia, 'Times New Roman', Times, serif",
                    fontSize: { xs: "2.5rem", md: "3.5rem" },
                    lineHeight: 1.1,
                    color: "common.black",
                    letterSpacing: "-0.02em",
                    maxWidth: "800px",
                  }}
                >
                  Where thought meets action
                </Typography>

                <Typography
                  sx={{
                    maxWidth: 700,
                    fontSize: { xs: "1rem", md: "1.1rem" },
                    lineHeight: 1.7,
                    color: "grey.800",
                  }}
                >
                  Welcome to Ethics Bowl Academy, a dynamic learning platform hosted by the UNC Parr Center for Ethics and powered by TED-Ed. We bring animated ethical dilemmas to life through learning experiences grounded in centuries of philosophical thinking and designed for modern students, educators, and curious learners.
                </Typography>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <Button
                    component={Link}
                    href="/student"
                    variant="contained"
                    size="large"
                    sx={{ px: 3.5, py: 1.4, borderRadius: "16px" }}
                  >
                    Explore Modules
                  </Button>
                  <Button
                    component={Link}
                    href="/homepage"
                    variant="outlined"
                    size="large"
                    sx={{ px: 3.5, py: 1.4, borderRadius: "16px" }}
                  >
                    Back to Home
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>

          {/* Who It's For */}
          <Card
            elevation={0}
            sx={{
              borderRadius: 6,
              border: "1px solid",
              borderColor: "rgba(75, 156, 211, 0.15)",
              backgroundColor: "rgba(255, 255, 255, 0.94)",
              boxShadow: "0 10px 30px rgba(19, 41, 75, 0.05)",
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Typography
                component="h2"
                sx={{
                  fontFamily: "Georgia, 'Times New Roman', Times, serif",
                  fontSize: { xs: "1.75rem", md: "2.25rem" },
                  color: "common.black",
                  mb: 3,
                  textAlign: "center",
                }}
              >
                Who is this for?
              </Typography>
              <Grid container spacing={2}>
                {audiences.map((audience, index) => (
                  <Grid key={index} size={{ xs: 12, md: 4 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 1.5,
                        p: 2,
                        borderRadius: 3,
                        backgroundColor: "rgba(248, 251, 255, 0.8)",
                      }}
                    >
                      <CheckCircle
                        sx={{
                          color: "primary.main",
                          fontSize: 20,
                          mt: 0.25,
                          flexShrink: 0,
                        }}
                      />
                      <Typography
                        sx={{
                          color: "grey.800",
                          lineHeight: 1.6,
                          fontSize: "0.95rem",
                        }}
                      >
                        {audience}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          {/* Interactive Learning Experience */}
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  borderRadius: 6,
                  border: "1px solid",
                  borderColor: "divider",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(240, 248, 255, 0.98) 100%)",
                }}
              >
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Typography
                    component="h2"
                    sx={{
                      fontFamily: "Georgia, 'Times New Roman', Times, serif",
                      fontSize: { xs: "1.75rem", md: "2.25rem" },
                      color: "common.black",
                      mb: 2,
                    }}
                  >
                    Interactive Learning Modules
                  </Typography>
                  <Typography
                    sx={{ color: "grey.800", lineHeight: 1.7, mb: 3 }}
                  >
                    At the heart of the Academy is a growing library of high-quality animated videos produced by TED-Ed. Rather than focusing on rote memorization, these videos introduce core philosophical concepts by immersing you in compelling, concrete dilemmas.
                  </Typography>
                  <List sx={{ p: 0 }}>
                    {moduleFeatures.map((feature, index) => (
                      <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckCircle
                            sx={{ color: "primary.main", fontSize: 16 }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={feature}
                          sx={{
                            m: 0,
                            "& .MuiListItemText-primary": {
                              fontSize: "0.9rem",
                              color: "grey.800",
                              lineHeight: 1.6,
                            },
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  borderRadius: 6,
                  border: "1px solid",
                  borderColor: "divider",
                  backgroundColor: "rgba(248, 251, 255, 0.96)",
                }}
              >
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Typography
                    component="h2"
                    sx={{
                      fontFamily: "Georgia, 'Times New Roman', Times, serif",
                      fontSize: { xs: "1.75rem", md: "2.25rem" },
                      color: "common.black",
                      mb: 2,
                    }}
                  >
                    Our Approach
                  </Typography>
                  <Typography
                    sx={{ color: "grey.800", lineHeight: 1.7, mb: 3 }}
                  >
                    Inspired by the National High School Ethics Bowl, we utilize the most effective frameworks for ethical learning in both independent and classroom settings.
                  </Typography>
                  <List sx={{ p: 0 }}>
                    {approachHighlights.map((highlight, index) => (
                      <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckCircle
                            sx={{ color: "primary.main", fontSize: 16 }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={highlight}
                          sx={{
                            m: 0,
                            "& .MuiListItemText-primary": {
                              fontSize: "0.9rem",
                              color: "grey.800",
                              lineHeight: 1.6,
                            },
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Call to Action */}
          <Card
            elevation={0}
            sx={{
              borderRadius: 6,
              border: "1px solid",
              borderColor: "rgba(75, 156, 211, 0.2)",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(226, 241, 252, 0.98) 100%)",
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Stack spacing={2.5} alignItems="center" textAlign="center">
                <Typography
                  component="h2"
                  sx={{
                    fontFamily: "Georgia, 'Times New Roman', Times, serif",
                    fontSize: { xs: "1.75rem", md: "2.25rem" },
                    color: "common.black",
                  }}
                >
                  Ready to dive in?
                </Typography>
                <Typography
                  sx={{
                    color: "grey.800",
                    lineHeight: 1.7,
                    maxWidth: 600,
                  }}
                >
                  The open-ended pursuit of truth goes hand in hand with the realization that our own perspectives are often partial. Ethics Bowl Academy gives learners a philosophical toolkit they can keep refining long after the animation ends.
                </Typography>
                <Button
                  component={Link}
                  href="/student"
                  variant="contained"
                  size="large"
                  sx={{ px: 4, py: 1.5, borderRadius: "16px", fontSize: "1.05rem" }}
                >
                  Start Learning
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
}
