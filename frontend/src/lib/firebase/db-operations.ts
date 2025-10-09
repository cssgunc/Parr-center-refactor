import { db } from "./firebaseConfig";
import { collection, doc, getDoc, setDoc, addDoc } from "firebase/firestore";

const usersCollection = collection(db, "users");
const modulesCollection = collection(db, "modules");
const stepsCollection = collection(db, "steps");
const userProgressCollection = collection(db, "progress");

// Module CRUD operations
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

// Step CRUD operations

// User progress operations

// Query helpers (getPublicModules, getUserModules, etc.)
