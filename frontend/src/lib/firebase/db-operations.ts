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
} from "firebase/firestore";

const usersCollection = collection(db, "users");
const modulesCollection = collection(db, "modules");
const stepsCollection = collection(db, "steps");
const userProgressCollection = collection(db, "progress");

// Module CRUD operations

// Get module by ID - DOES NOT include steps subcollection
const getModulebyId = async (moduleId: string) => {
  const moduleDocRef = doc(modulesCollection, moduleId);
  const moduleDoc = await getDoc(moduleDocRef);
  if (moduleDoc.exists()) {
    return { id: moduleDoc.id, ...moduleDoc.data() };
  } else {
    throw new Error("Module not found");
  }
};

const createModule = async (moduleData: any) => {
  const moduleDocRef = await addDoc(modulesCollection, moduleData);
  return { id: moduleDocRef.id, ...moduleData };
};

const updateModule = async (moduleId: string, moduleData: any) => {
  const moduleDocRef = doc(modulesCollection, moduleId);
  await setDoc(moduleDocRef, moduleData, { merge: true });
  return { id: moduleId, ...moduleData };
};

const deleteModule = async (moduleId: string) => {
  const moduleDocRef = doc(modulesCollection, moduleId);
  await deleteDoc(moduleDocRef);
  // TODO: Does not delete subcollections (steps), need to consider how to implement that.
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

// Query helpers (getPublicModules, getUserModules, etc.)
