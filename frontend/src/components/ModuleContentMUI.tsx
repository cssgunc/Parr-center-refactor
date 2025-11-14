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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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

    // Reset only view state when module changes
    // Keep all data (content, steps, userProgress) to avoid any flashing
    setShowSteps(false);     // Exit step view
    setCurrentStepIndex(0);  // Reset step navigation

    const fetchContent = async () => {
      // Fetch all data in parallel and update all state together
      // This prevents any state from being out of sync during the transition
      const [content, moduleSteps, progress] = await Promise.all([
        getModuleById(moduleId),
        getStepsByModuleId(moduleId),
        getUserProgress(userId, moduleId)
      ]);

      // Update all state at once - React will batch these updates
      setContent(content);
      setSteps(moduleSteps);
      setUserProgress(progress);
    };

    fetchContent();
  }, [moduleId, userId]);

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
          height: "100%",
          overflow: "hidden",
        }}
      >
        {/* Navigation Controls - Top */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            borderBottom: (t) => `1px solid ${t.palette.grey[200]}`,
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

        {/* Step Content - Full Height */}
        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "1400px",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
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
          mb: 4,
        }}
      >
        {content?.title}
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          mb: 4,
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
      </Box>

      <Box
        sx={{
          mb: 4,
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
        <Box className="flex flex-row gap-5 mt-5">
          {Array.from({ length: steps.length }, (_, i) => i + 1).map((step) => (
            <Box key={step}>
              {userProgress && step <= userProgress.completedStepIds.length ? (
                <div className="w-[50px] h-[50px] rounded-full border border-gray-300 flex items-center justify-center font-bold text-gray-800 min-w-[32px] p-0 bg-green-600 hover:bg-green-700">
                  {step}
                </div>
              ) : (
                <div className="w-[50px] h-[50px] rounded-full border border-gray-300 flex items-center justify-center font-bold text-gray-800 min-w-[32px] p-0 bg-gray-100 hover:bg-gray-200">
                  {step}
                </div>
              )}
            </Box>
          ))}
          {steps.length > 0 && userProgress?.completedStepIds.length === steps.length && (
            <CheckCircleIcon 
              sx={{
                color: (t) => t.palette.success.main,
                fontSize: '2rem',
                alignSelf: 'center',
              }}
            />
          )}
        </Box>
      </Box>

      <Box
        sx={{
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: '1.125rem',
            mb: 1,
          }}
        >
          Module Overview
        </Typography>
        <Typography
          sx={{
            color: (t) => t.palette.common.black,
            lineHeight: '1.6',
          }}
        >
          {content?.description}
        </Typography>
      </Box>
    </Box>
  );
}
