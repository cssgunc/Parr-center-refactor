"use client";

import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useAuth } from "@/hooks/useAuth";
import {
  getModuleById,
  getStepsByModuleId,
} from "@/lib/firebase/db-operations";
import {
  Module,
  Step,
  FlashcardsStep,
  VideoStep,
  FreeResponseStep,
  QuizStep,
  PollStep,
} from "@/lib/firebase/types";
import FlashcardStep from "./FlashcardsStepView";
import VideoStepView from "./VideoStepView";
import FreeResponseStepView from "./FreeResponseStepView";
import QuizStepView from "./QuizStepView";
import PollStepView from "./PollStepView";

export default function ModuleTestPage() {
  const [user, authLoading] = useAuth();
  const [module, setModule] = useState<Module | null>(null);
  const [steps, setSteps] = useState<Step[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [freeResponsesByStepId, setFreeResponsesByStepId] = useState<
    Record<string, string>
  >({});
  const [quizPassed, setQuizPassed] = useState<boolean>(false);

  const currentStep = steps[currentStepIndex];

  // Get step icon function
  const getStepIcon = (type?: Step["type"]) => {
    if (!type) return null;
    
    switch (type) {
      case "video":
        return (
          <svg
            className="w-4 h-4 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        );
      case "flashcards":
        return (
          <svg
            className="w-4 h-4 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        );
      case "quiz":
        return (
          <svg
            className="w-4 h-4 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "freeResponse":
        return (
          <svg
            className="w-4 h-4 text-purple-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        );
      case "poll":
        return (
          <svg
            className="w-4 h-4 text-orange-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const handleFreeResponseChange = (stepId: string, value: string) => {
    setFreeResponsesByStepId((prev) => ({
      ...prev,
      [stepId]: value,
    }));
  };

  const handleQuizPassedChange = (score: number) => {
    setQuizPassed(score > 0);
  };

  const MODULE_ID = "testmodule2";

  useEffect(() => {
    const fetchModuleData = async () => {
      if (!user) return;

      setLoading(true);
      setError(null);

      try {
        console.log("Fetching module:", MODULE_ID);
        const moduleData = await getModuleById(MODULE_ID);
        console.log("Module fetched:", moduleData);
        setModule(moduleData);

        console.log("Fetching steps for module:", MODULE_ID);
        const stepsData = await getStepsByModuleId(MODULE_ID);
        console.log("Steps fetched:", stepsData);
        setSteps(stepsData);
      } catch (err: any) {
        console.error("Error fetching module/steps:", err);
        setError(err.message || "Failed to load module data");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchModuleData();
    }
  }, [user]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Not Authenticated
          </h2>
          <p className="text-gray-600 mb-4">
            Please log in to view this test page.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading module data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">Module ID: {MODULE_ID}</p>
        </div>
      </div>
    );
  }

  if (!module) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Module Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            Module ID "{MODULE_ID}" does not exist.
          </p>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {module?.title || "No Module"}
          </h1>
          <p className="text-gray-600">{module?.description || "No description"}</p>
          <p className="text-sm text-gray-400 mt-2">
            Module ID: {MODULE_ID} | Steps: {steps.length}
          </p>
        </div>
      </div>

      {/* Navigation */}
      {steps.length > 0 && (
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button
              onClick={() =>
                setCurrentStepIndex(Math.max(0, currentStepIndex - 1))
              }
              disabled={currentStepIndex === 0}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 text-gray-700 rounded-lg font-medium transition-colors duration-200"
            >
              ← Previous
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Step {currentStepIndex + 1} of {steps.length}
              </p>
              <div className="flex items-center justify-center gap-2">
                {getStepIcon(currentStep?.type)}
                <p className="text-xs text-gray-400 capitalize">
                  {currentStep?.type || "unknown"}
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                setCurrentStepIndex(
                  Math.min(steps.length - 1, currentStepIndex + 1)
                )
              }
              disabled={currentStepIndex === steps.length - 1}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 text-gray-700 rounded-lg font-medium transition-colors duration-200"
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="py-8">
        {steps.length === 0 ? (
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-gray-600">No steps in this module yet.</p>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto">
            {currentStep && (
              <>
                {currentStep.type === "flashcards" && (
                  <FlashcardStep step={currentStep as FlashcardsStep} />
                )}
                {currentStep.type === "video" && (
                  <VideoStepView step={currentStep as VideoStep} />
                )}
                {currentStep.type === "quiz" && (
                  <QuizStepView 
                    step={currentStep as QuizStep}
                    quizPassed={quizPassed}
                    onPassedChange={handleQuizPassedChange}
                  />
                )}
                {currentStep.type === "freeResponse" && (
                  <FreeResponseStepView
                    step={currentStep as FreeResponseStep}
                    stepId={currentStep.id}
                    userId={user?.uid || ""}
                    moduleId={MODULE_ID}
                    moduleTitle={module?.title || ""}
                    response={freeResponsesByStepId[currentStep.id] ?? ""}
                    onChangeResponse={(value) =>
                      handleFreeResponseChange(currentStep.id, value)
                    }
                  />
                )}
                {currentStep.type === "poll" && (
                  <PollStepView
                    step={currentStep as PollStep}
                    stepId={currentStep.id}
                    userId={user?.uid || ""}
                    moduleId={MODULE_ID}
                  />
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
