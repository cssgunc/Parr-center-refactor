"use client";

import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase/firebaseConfig";
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
} from "@/lib/firebase/types";
import FlashcardStep from "./FlashcardsStepView";
import VideoStepView from "./VideoStepView";
import FreeResponseStepView from "./FreeResponseStepView";
import QuizStepView from "./QuizStepView";

export default function ModuleTestPage() {
  const [user, authLoading] = useAuthState(auth);
  const [module, setModule] = useState<Module | null>(null);
  const [steps, setSteps] = useState<Step[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const MODULE_ID = "testmodule1";

  useEffect(() => {
    const fetchModuleData = async () => {
      if (!user) return;

      setLoading(true);
      setError(null);

      try {
        console.log("Fetching module:", MODULE_ID);
        const moduleData = await getModuleById(MODULE_ID);
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

  const currentStep = steps[currentStepIndex];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {module.title}
          </h1>
          <p className="text-gray-600">{module.description}</p>
          <p className="text-sm text-gray-400 mt-2">
            Module ID: {module.id} | Steps: {steps.length}
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
              <p className="text-xs text-gray-400 capitalize">
                {currentStep?.type || "unknown"}
              </p>
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
                  <QuizStepView step={currentStep as QuizStep} />
                )}
                {currentStep.type === "freeResponse" && (
                  <FreeResponseStepView
                    step={currentStep as FreeResponseStep}
                  />
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Debug Info */}
      <div className="max-w-7xl mx-auto p-6">
        <details className="bg-gray-100 rounded-lg p-4">
          <summary className="cursor-pointer font-semibold text-gray-700">
            Debug: Module & Steps Data
          </summary>
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Module:</h3>
              <pre className="p-4 bg-white rounded text-sm overflow-auto">
                {JSON.stringify(module, null, 2)}
              </pre>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Steps:</h3>
              <pre className="p-4 bg-white rounded text-sm overflow-auto">
                {JSON.stringify(steps, null, 2)}
              </pre>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}
