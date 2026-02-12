"use client";

import { Step } from "@/lib/firebase/types";
import VideoEditorModal from "./step-editors/VideoEditorModal";
import QuizEditorModal from "./step-editors/QuizEditorModal";
import FlashcardsEditorModal from "./step-editors/FlashcardsEditorModal";
import FreeResponseEditorModal from "./step-editors/FreeResponseEditorModal";
import AdditionalResourcesEditorModal from "./step-editors/AdditionalResourcesEditorModal";

interface StepEditorModalProps {
  moduleId: string;
  step: Step;
  onClose: () => void;
}

export default function StepEditorModal({
  moduleId,
  step,
  onClose,
}: StepEditorModalProps) {
  const handleBack = () => {
    onClose();
  };

  switch (step.type) {
    case "video":
      return (
        <VideoEditorModal
          moduleId={moduleId}
          step={step}
          onClose={onClose}
          onBack={handleBack}
        />
      );
    case "additionalResources":
      return (
        <AdditionalResourcesEditorModal
          moduleId={moduleId}
          step={step}
          onClose={onClose}
          onBack={handleBack}
        />
      );
    case "quiz":
      return (
        <QuizEditorModal
          moduleId={moduleId}
          step={step}
          onClose={onClose}
          onBack={handleBack}
        />
      );
    case "flashcards":
      return (
        <FlashcardsEditorModal
          moduleId={moduleId}
          step={step}
          onClose={onClose}
          onBack={handleBack}
        />
      );
    case "freeResponse":
      return (
        <FreeResponseEditorModal
          moduleId={moduleId}
          step={step}
          onClose={onClose}
          onBack={handleBack}
        />
      );
    default:
      return null;
  }
}
