import { db } from "./firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { User, Module, Step, UserProgress } from "./types";

// Module CRUD operations

// get module by ID - DOES NOT include steps subcollection
const getModulebyId = async (moduleId: string): Promise<Module> => {
  const moduleDocRef = doc(db, "modules", moduleId);
  const moduleDoc = await getDoc(moduleDocRef);

  if (moduleDoc.exists()) {
    return { id: moduleDoc.id, ...moduleDoc.data() } as Module;
  } else {
    throw new Error("Module not found");
  }
};

const createModule = async (moduleData: Partial<Module>): Promise<Module> => {
  const newModule = {
    ...moduleData,
    stepCount: moduleData.stepCount || 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  const moduleDocRef = await addDoc(collection(db, "modules"), newModule);
  return { id: moduleDocRef.id, ...moduleData } as Module;
};

const updateModule = async (moduleId: string, moduleData: any) => {
  const moduleDocRef = doc(db, "modules", moduleId);
  await setDoc(moduleDocRef, moduleData, { merge: true });
  return { id: moduleId, ...moduleData };
};

const deleteModule = async (moduleId: string, deleteSteps: boolean = true) => {
  const moduleDocRef = doc(db, "modules", moduleId);
  if (deleteSteps) {
    const stepsRef = collection(db, "modules", moduleId, "steps");
    const stepsSnapshot = await getDocs(stepsRef);

    // Use batch write to delete all steps efficiently
    const batch = writeBatch(db);
    stepsSnapshot.docs.forEach((stepDoc) => {
      batch.delete(stepDoc.ref);
    });
    await batch.commit();
  }
  await deleteDoc(moduleDocRef);
};

// Step CRUD operations
const getStepById = async (stepId: string) => {
  const stepDocRef = doc(stepsCollection, stepId);
  const stepDoc = await getDoc(stepDocRef);
  if (stepDoc.exists()) {
    return { id: stepDoc.id, ...stepDoc.data() };
  } else {
    throw new Error("Step not found");
  }
};

// Get steps by module ID
const getStepByModuleId = async (moduleId: string) => {
  const stepsQuery = query(stepsCollection, where("moduleId", "==", moduleId));
  const stepsSnapshot = await getDocs(stepsQuery);
  stepsSnapshot.forEach((doc) => {
    console.log({ id: doc.id, ...doc.data() });
  });
  return stepsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const createStep = async (stepData: any) => {
  const stepDocRef = await addDoc(stepsCollection, stepData);
  return { id: stepDocRef.id, ...stepData };
};

const updateStep = async (stepId: string, stepData: any) => {
  const stepDocRef = doc(stepsCollection, stepId);
  await setDoc(stepDocRef, stepData, { merge: true });
  return { id: stepId, ...stepData };
};

const deleteStep = async (stepId: string) => {
  const stepDocRef = doc(stepsCollection, stepId);
  await deleteDoc(stepDocRef);
};

// User progress operations

const startUserProgress = async (userId: string, moduleId: string) => {
  const progressRef = doc(db, `users/${userId}/progress/${moduleId}`);

  const progressData = {
    completedStepIds: [],
    lastViewedAt: new Date(),
    quizScores: {},
    startedAt: new Date(),
    completedAt: null,
  };

  await setDoc(progressRef, progressData);
  return { id: progressRef.id, ...progressData };
};

const getUserProgress = async (userId: string, moduleId: string) => {
  const progressRef = doc(db, `users/${userId}/progress/${moduleId}`);
  return await getDoc(progressRef);
};

const updateUserProgress = async (
  userId: string,
  moduleId: string,
  completedStepId: string
) => {
  const progressRef = doc(db, `users/${userId}/progress/${moduleId}`);
  const progressDoc = await getDoc(progressRef);

  if (progressDoc.exists()) {
    const progressData = progressDoc.data();
    const updatedStepIds = [
      ...(progressData.completeStepIds || []),
      completedStepId,
    ];
    await setDoc(
      progressRef,
      { completeStepIds: updatedStepIds },
      { merge: true }
    );
  } else {
    await setDoc(progressRef, { completeStepIds: [completedStepId] });
  }
};

// Query helpers (getPublicModules, getUserModules, etc.)

const getPublicModules = async () => {
  const publicModulesQuery = query(
    modulesCollection,
    where("isPublic", "==", true)
  );
  const publicModulesSnapshot = await getDocs(publicModulesQuery);

  return publicModulesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

const getUserModules = async (userId: string) => {};
