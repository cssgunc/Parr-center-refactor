import React, { useState, useEffect } from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";
import {
  getModuleById,
  getUserProgress,
  startUserProgress,
  getStepsByModuleId,
  completeModule,
  markStepCompleted,
  updateQuizScore
} from "@/lib/firebase/db-operations";
import { Module, Step, VideoStep, QuizStep, FlashcardsStep, FreeResponseStep, UserProgress } from "@/lib/firebase/types";
import FreeResponseStepView from "./FreeResponseStepView";
import VideoStepView from "./VideoStepView";
import FlashcardsStepView from "./FlashcardsStepView";
import QuizStepView from "./QuizStepView";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import confetti from "canvas-confetti";

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
  const [freeResponsesByStepId, setFreeResponsesByStepId] = useState<
    Record<string, string>
  >({});
  const [nextEnabled, setNextEnabled] = useState(true);
  const theme = useTheme();

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
    setNextEnabled(true);   // Reset next button
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
      // Reset free response map when module changes/steps reload
      setFreeResponsesByStepId({});
    };

    fetchContent();
  }, [moduleId, userId]);

  // Keep user progress updated
  const refreshProgress = () => {
    getUserProgress(userId, moduleId).then((progress) => {
      setUserProgress(progress);
    });
  };

  const handleFreeResponseChange = (stepId: string, value: string) => {
    setFreeResponsesByStepId((prev) => ({
      ...prev,
      [stepId]: value,
    }));
  };

  const handleQuizPassedChange = (score: number) => {
    if (score > 0) {
      setNextEnabled(true);
      updateQuizScore(userId, moduleId, steps[currentStepIndex].id, score);
    } else {
      !(userProgress?.quizScores[steps[currentStepIndex].id]) && setNextEnabled(false);
    }
  }

  // Step View with Navigation
  if (showSteps && steps.length > 0) {
    const currentStep = steps[currentStepIndex];

    const handlePrevious = async () => {
      setNextEnabled(true);
      if (currentStepIndex > 0) {
        setCurrentStepIndex(currentStepIndex - 1);
        refreshProgress();
      } else {
        await refreshProgress();
        setShowSteps(false);
      }
    };

    const handleNext = async () => {
      await markStepCompleted(userId, moduleId, currentStep.id);
      if (currentStepIndex < steps.length - 1) {
        setCurrentStepIndex(currentStepIndex + 1);
        refreshProgress();
      } else {
        await completeModule(userId, moduleId);
        await refreshProgress();
        confetti({
          particleCount: 300,
          spread: 120,
          startVelocity: 40,
          origin: { y: 0.6 }
        });
        setShowSteps(false);
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
            bgcolor: "white",
            borderTopRightRadius: "16px",
            border: `1px solid ${theme.palette.grey[300]}`,
          }}
        >
          {currentStepIndex === 0 ? (
            <Button
              variant="outlined"
              onClick={handlePrevious}
              sx={{
                borderRadius: "16px",
                px: 3,
                py: 1,
              }}
            >
              Back
            </Button>
          ) : (
          <Button
            variant="outlined"
            onClick={handlePrevious}
            sx={{
              borderRadius: "16px",
              px: 3,
              py: 1,
            }}
          >
            Previous
          </Button>
          )}

          <Typography sx={{ fontWeight: "bold" }}>
            Step {currentStepIndex + 1} of {steps.length}
          </Typography>
          {currentStepIndex === steps.length - 1 ? nextEnabled ? (
            <Button
              variant="contained"
              onClick={handleNext}
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
              Finish
            </Button>
          ) : 
          (
            <Button
              variant="contained"
              disabled={true}
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
              Finish
            </Button>
          ) : nextEnabled ? (
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
          ) : (
            <Button
            variant="contained"
            disabled={true}
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
          )}
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
              <VideoStepView step={currentStep as VideoStep}/>
            )}
            {currentStep.type === "quiz" && (
              <QuizStepView step={currentStep as QuizStep} quizPassed={nextEnabled} onPassedChange={(value) => 
                handleQuizPassedChange(value)
              }/>
            )}
            {currentStep.type === "flashcards" && (
              <FlashcardsStepView step={currentStep as FlashcardsStep} />
            )}
            {currentStep.type === "freeResponse" && (
              <FreeResponseStepView
                step={currentStep as FreeResponseStep}
                userId={userId}
                moduleId={moduleId}
                moduleTitle={content?.title || ""}
                response={freeResponsesByStepId[currentStep.id] ?? ""}
                onChangeResponse={(value) =>
                  handleFreeResponseChange(currentStep.id, value)
                }
              />
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
