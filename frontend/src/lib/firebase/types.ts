import { Timestamp } from "firebase/firestore";

// User

export interface User {
  id: string;
  email: string;
  displayname: string;
  photoURL?: string;
  createdAt: Timestamp;
  lastLoginAt: Timestamp;
}

export interface UserProgress {
  completedStepIds: string[];
  lastViewedAt: Timestamp;
  quizScores: { [stepId: string]: number };
  startedAt: Timestamp;
  completedAt: Timestamp | null;
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
  createdAt: Timestamp;
  updatedAt: Timestamp;
  stepCount: number;
  publishedVersion?: number;
  thumbnailUrl?: string;
}

// Step
export interface Step {
  id: string;
  type: string; // "video" | "quiz" | "flashcards" | "freeResponse" | any future type
  title: string;
  order: number;
  estimatedMinutes?: number;
  isOptional: boolean;
  createdBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  // Any type specific data goes here as arbitrary fields
  [key: string]: any;
}
