import { db } from "./firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  addDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
  writeBatch,
  orderBy,
} from "firebase/firestore";
import { User, Module, Step, UserProgress } from "./types";

// Module CRUD operations

// get module by ID - DOES NOT include steps subcollection
export const getModulebyId = async (moduleId: string): Promise<Module> => {
  const moduleDocRef = doc(db, "modules", moduleId);
  const moduleDoc = await getDoc(moduleDocRef);

  if (moduleDoc.exists()) {
    return { id: moduleDoc.id, ...moduleDoc.data() } as Module;
  } else {
    throw new Error("Module not found");
  }
};

export const createModule = async (
  moduleData: Partial<Module>
): Promise<Module> => {
  const newModule = {
    ...moduleData,
    stepCount: moduleData.stepCount || 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  const moduleDocRef = await addDoc(collection(db, "modules"), newModule);
  return { id: moduleDocRef.id, ...moduleData } as Module;
};

export const updateModule = async (moduleId: string, moduleData: any) => {
  const moduleDocRef = doc(db, "modules", moduleId);
  await setDoc(moduleDocRef, moduleData, { merge: true });
  return { id: moduleId, ...moduleData };
};

export const deleteModule = async (
  moduleId: string,
  deleteSteps: boolean = true
) => {
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
export const getStepById = async (
  moduleId: string,
  stepId: string
): Promise<Step> => {
  const stepDocRef = doc(db, "modules", moduleId, "steps", stepId);
  const stepDoc = await getDoc(stepDocRef);
  if (stepDoc.exists()) {
    return { id: stepDoc.id, ...stepDoc.data() } as Step;
  } else {
    throw new Error("Step not found");
  }
};

// Get steps by module ID
export const getStepByModuleId = async (moduleId: string): Promise<Step[]> => {
  const stepsRef = collection(db, "modules", moduleId, "steps");
  const stepsQuery = query(stepsRef, orderBy("order", "asc"));
  const stepsSnapshot = await getDocs(stepsQuery);
  // stepsSnapshot.forEach((doc) => {
  //   console.log({ id: doc.id, ...doc.data() });
  // });
  return stepsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Step[];
};

export const createStep = async (
  moduleId: string,
  stepData: Partial<Step>
): Promise<Step> => {
  const newStep = {
    ...stepData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  const stepsRef = collection(db, "modules", moduleId, "steps");
  const stepDocRef = await addDoc(stepsRef, newStep);

  // Update Parent Module's step count
  const moduleDocRef = doc(db, "modules", moduleId);
  const moduleDoc = await getDoc(moduleDocRef);
  if (moduleDoc.exists()) {
    const currentCount = moduleDoc.data().stepCount || 0;
    await updateDoc(moduleDocRef, {
      stepCount: currentCount + 1,
      updatedAt: serverTimestamp(),
    });
  }
  return { id: stepDocRef.id, ...stepData } as Step;
};

export const updateStep = async (
  moduleId: string,
  stepId: string,
  stepData: Partial<Step>
) => {
  const stepDocRef = doc(db, "modules", moduleId, "steps", stepId);
  await updateDoc(stepDocRef, {
    ...stepData,
    updatedAt: serverTimestamp(),
  });

  // Update parent module's updatedAt
  const moduleDocRef = doc(db, "modules", moduleId);
  await updateDoc(moduleDocRef, { updatedAt: serverTimestamp() });
};

export const deleteStep = async (moduleId: string, stepId: string) => {
  const stepDocRef = doc(db, "modules", moduleId, "steps", stepId);
  await deleteDoc(stepDocRef);

  // Update parent module's stepCount (decrement)
  const moduleDocRef = doc(db, "modules", moduleId);
  const moduleDoc = await getDoc(moduleDocRef);
  if (moduleDoc.exists()) {
    const currentCount = moduleDoc.data().stepCount || 0;
    await updateDoc(moduleDocRef, {
      stepCount: Math.max(0, currentCount - 1), // Don't go below 0
      updatedAt: serverTimestamp(),
    });
  }
};

// User progress operations

export const startUserProgress = async (userId: string, moduleId: string) => {
  const progressRef = doc(db, "users", userId, "progress", moduleId);

  const progressData = {
    completedStepIds: [],
    lastViewedAt: serverTimestamp(),
    quizScores: {},
    startedAt: serverTimestamp(),
    completedAt: null,
  };

  await setDoc(progressRef, progressData);
  return { id: progressRef.id, ...progressData };
};

export const getUserProgress = async (userId: string, moduleId: string) => {
  const progressRef = doc(db, "users", userId, "progress", moduleId);
  const progressDoc = await getDoc(progressRef);
  if (!progressDoc.exists()) {
    return null;
  }
  return { id: progressDoc.id, ...progressDoc.data() };
};

export const markStepCompleted = async (
  userId: string,
  moduleId: string,
  stepId: string
) => {
  const progressRef = doc(db, "users", userId, "progress", moduleId);
  const progressDoc = await getDoc(progressRef);

  if (progressDoc.exists()) {
    const progressData = progressDoc.data();
    if (!progressData.completedStepIds.includes(stepId)) {
      await updateDoc(progressRef, {
        completedStepIds: [...progressData.completedStepIds, stepId],
        lastViewedAt: serverTimestamp(),
      });
    }
  } else {
    // Create new progress if none exists
    await setDoc(progressRef, {
      completedStepIds: [stepId],
      lastViewedAt: serverTimestamp(),
      quizScores: {},
      startedAt: serverTimestamp(),
      completedAt: null,
    });
  }
};

// export const updateQuizScore = async (userId: string, moduleId: string, stepId: string, score: number) => {};

// export const completeModule = async (userId: string, moduleId: string) => {};

// Query helpers (getPublicModules, getUserModules, etc.)

const getPublicModules = async () => {
  const modulesRef = collection(db, "modules");
  const publicModulesQuery = query(
    modulesRef,
    where("isPublic", "==", true),
    orderBy("createdAt", "desc")
  );
  const publicModulesSnapshot = await getDocs(publicModulesQuery);

  return publicModulesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Module[];
};

const getUserModules = async (userId: string) => {
  const modulesRef = collection(db, "modules");
  const collaboratoryQuery = query(
    modulesRef,
    where("collaborators", "array-contains", userId),
    orderBy("updatedAt", "desc")
  );

  const collaboratorSnapshot = await getDocs(collaboratoryQuery);
  return collaboratorSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Module[];
};
