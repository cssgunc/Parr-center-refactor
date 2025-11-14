import React, { useState, useEffect } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import moduleVideos, { ModuleVideo } from "@/data/moduleVideos";
import Link from "next/link";
import {
  getModuleById,
  getUserProgress,
  startUserProgress,
  getStepsByModuleId,
} from "@/lib/firebase/db-operations";
import { Module, Step, VideoStep, QuizStep, FlashcardsStep, FreeResponseStep, UserProgress } from "@/lib/firebase/types";
import FreeResponseStepView from "./FreeResponseStepView";
import VideoStepView from "./VideoStepView";
import FlashcardsStepView from "./FlashcardsStepView";
import QuizStepView from "./QuizStepView";
import { getFirstMockFreeResponseStep } from "@/data/mockFreeResponseSteps";

interface ModuleContentProps {
  moduleId: string;
  index: number;
  userId: string;
}

export default function ModuleContentMUI({
  moduleId,
  index,
  userId,
}: ModuleContentProps) {
  const [content, setContent] = useState<Module | null>(null);
  const [steps, setSteps] = useState<Step[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [showSteps, setShowSteps] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const handleStartModule = async () => {
    if (!userProgress) {
      await startUserProgress(userId, moduleId);
      const newProgress = await getUserProgress(userId, moduleId);
      setUserProgress(newProgress);
    }
    // Show steps view
    setShowSteps(true);
    setCurrentStepIndex(0);
  };

  useEffect(() => {
    if (!moduleId) return;

    const fetchContent = async () => {
      const content = await getModuleById(moduleId);
      setContent(content);

      // Fetch steps
      const moduleSteps = await getStepsByModuleId(moduleId);
      setSteps(moduleSteps);

      // Fetch user progress
      const progress = await getUserProgress(userId, moduleId);
      setUserProgress(progress);
    };

    fetchContent();

    // Reset step view when module changes
    setShowSteps(false);
    setCurrentStepIndex(0);
  }, [moduleId, userId]);

  if (!content) {
    return (
      <Box>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: "bold",
            color: (t) => t.palette.grey[800],
          }}
        >
          Module {moduleId}
        </Typography>
        <Typography
          sx={{
            mt: 2,
            color: (t) => t.palette.grey[700],
          }}
        >
          No content available for this module yet.
        </Typography>
      </Box>
    );
  }

  // Format duration from seconds to MM:SS
  const formatDuration = (seconds?: number): string => {
    if (!seconds) return "";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Step View with Navigation
  if (showSteps && steps.length > 0) {
    const currentStep = steps[currentStepIndex];

    const handlePrevious = () => {
      if (currentStepIndex > 0) {
        setCurrentStepIndex(currentStepIndex - 1);
      }
    };

    const handleNext = () => {
      if (currentStepIndex < steps.length - 1) {
        setCurrentStepIndex(currentStepIndex + 1);
      }
    };

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* Step Content */}
        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 3,
          }}
        >
          {currentStep.type === "video" && (
            <VideoStepView step={currentStep as VideoStep} />
          )}
          {currentStep.type === "quiz" && (
            <QuizStepView step={currentStep as QuizStep} />
          )}
          {currentStep.type === "flashcards" && (
            <FlashcardsStepView step={currentStep as FlashcardsStep} />
          )}
          {currentStep.type === "freeResponse" && (
            <FreeResponseStepView step={currentStep as FreeResponseStep} />
          )}
        </Box>

        {/* Navigation Controls */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 3,
            borderTop: (t) => `1px solid ${t.palette.grey[200]}`,
            bgcolor: "white",
          }}
        >
          <Button
            variant="outlined"
            onClick={handlePrevious}
            disabled={currentStepIndex === 0}
            sx={{
              borderRadius: "16px",
              px: 3,
              py: 1,
            }}
          >
            Previous
          </Button>

          <Typography sx={{ fontWeight: "bold" }}>
            Step {currentStepIndex + 1} of {steps.length}
          </Typography>

          <Button
            variant="contained"
            onClick={handleNext}
            disabled={currentStepIndex === steps.length - 1}
            sx={{
              borderRadius: "16px",
              px: 3,
              py: 1,
              bgcolor: (t) => t.palette.common.black,
              "&:hover": {
                bgcolor: (t) => t.palette.grey[800],
              },
            }}
          >
            Next
          </Button>
        </Box>
      </Box>
    );
  }

  // Overview View
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        m: "8vw",
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        sx={{
          fontSize: "3rem",
          fontWeight: "bold",
          fontFamily: "var(--font-secondary)",
          color: (t) => t.palette.error.main,
          mb: 0.5,
        }}
      >
        Welcome to Module {index + 1}
      </Typography>

      <Typography
        variant="h3"
        component="h2"
        sx={{
          fontSize: "3rem",
          fontWeight: "bold",
          fontFamily: "var(--font-secondary)",
          color: (t) => t.palette.error.main,
          mb: 1,
        }}
      >
        {content?.title}
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          mb: 8,
        }}
      >
        <Button
          onClick={() => handleStartModule()}
          variant="contained"
          sx={{
            py: 1.5,
            px: 2,
            borderRadius: "16px",
            bgcolor: (t) => t.palette.common.black,
            fontWeight: "bold",
            color: "white",
            fontSize: "1.25rem",
            "&:hover": {
              bgcolor: (t) => t.palette.common.black,
            },
          }}
        >
          {userProgress ? "Continue Module" : "Start Module"}
        </Button>
        <Link href={`/modules/${moduleId}/journal`} passHref>
          <Button
            variant="contained"
            component="a"
            sx={{
              py: 1.5,
              px: 2,
              borderRadius: "16px",
              bgcolor: (t) => t.palette.common.black,
              color: "white",
              fontSize: "1.25rem",
              "&:hover": {
                bgcolor: (t) => t.palette.common.black,
              },
            }}
          >
            View Journal
          </Button>
        </Link>
      </Box>

      <Box
        sx={{
          mb: 8,
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "1.125rem",
            mb: 1,
          }}
        >
          Current Progress
        </Typography>
        {/* TODO USE getUserProgress Step Indicators */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: 1,
            ml: "10vw",
          }}
        >
          {[1, 2, 3, 4].map((step) => (
            <Box key={step} sx={{ display: "flex", alignItems: "center" }}>
              <Button
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  border: (t) => `1px solid ${t.palette.grey[300]}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  color: (t) => t.palette.grey[800],
                  minWidth: 32,
                  p: 0,
                  "&:hover": {
                    bgcolor: (t) => t.palette.grey[100],
                  },
                }}
              >
                {step}
              </Button>
              {step < 4 && (
                <Box
                  sx={{
                    width: 64,
                    height: 1,
                    bgcolor: (t) => t.palette.grey[200],
                  }}
                />
              )}
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{}}>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "1.125rem",
            mb: 1,
          }}
        >
          Module Overview
        </Typography>
        <Typography
          sx={{
            color: (t) => t.palette.common.black,
            lineHeight: "1.6",
            ml: "5vw",
          }}
        >
          {content?.description}
        </Typography>
      </Box>
    </Box>
  );
}
