import { Timestamp } from "firebase/firestore";


// User

export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: Timestamp | Date;
  lastLoginAt: Timestamp | Date;
  isAdmin: boolean;
}

export interface UserProgress {
  completedStepIds: string[];
  lastViewedAt: Timestamp;
  quizScores: { [stepId: string]: number };
  startedAt: Timestamp | Date;
  completedAt: Timestamp | Date | null;
}

// Module
export interface Module {
  id: string;
  title: string;
  description: string;
  createdBy: string; // userId
  collaborators?: string[]; // userIds
  isPublic: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  stepCount: number;
  publishedVersion?: number;
  thumbnailUrl?: string;
}

// Step type payloads
export interface VideoPayload {
  youtubeUrl: string;
  thumbnailUrl?: string;
  durationSec?: number;
}

export interface QuizQuestion {
  prompt: string;
  choices: string[];
  correctIndex: number;
  explanation?: string;
}

export interface QuizPayload {
  shuffle: boolean;
  questions: QuizQuestion[];
  passingScore: number; // 0-100
}

export interface Flashcard {
  front: string;
  back: string;
}

export interface FlashcardsPayload {
  title?: string;
  cards: Flashcard[];
  studyMode?: "spaced" | "random";
}

export interface FreeResponsePayload {
  prompt: string;
  sampleAnswer?: string;
  maxLength?: number;
}

// Base Step Interface
export interface StepBase {
  id: string;
  type: StepType;
  title: string;
  order: number;
  estimatedMinutes?: number;
  isOptional: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export type StepType = "video" | "quiz" | "flashcards" | "freeResponse";

// Subcollection name mapping
export const STEP_COLLECTIONS = {
  video: "videos",
  quiz: "quizzes",
  flashcards: "flashcards",
  freeResponse: "freeResponses",
} as const;

export type StepCollectionName = typeof STEP_COLLECTIONS[StepType];

// Specific Step Interfaces

export interface VideoStep extends StepBase {
  type: "video";
  video: VideoPayload;
}

export interface QuizStep extends StepBase {
  type: "quiz";
  quiz: QuizPayload;
}

export interface FlashcardsStep extends StepBase {
  type: "flashcards";
  flashcards: FlashcardsPayload;
}

export interface FreeResponseStep extends StepBase {
  type: "freeResponse";
  freeResponse: FreeResponsePayload;
}

// Step type used throughout the app
export type Step = VideoStep | QuizStep | FlashcardsStep | FreeResponseStep;
