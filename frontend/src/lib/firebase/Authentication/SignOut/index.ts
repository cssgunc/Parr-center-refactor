import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { generateFirebaseAuthErrorMessage } from "../ErrorHandler";
import { FirebaseError } from "firebase/app";

export const signOutUser = async () => {
  if (!auth) {
    console.warn("Cannot sign out: Firebase auth not initialized");
    return;
  }
  try {
    await signOut(auth);
    console.log("You have been signed out");
  } catch (error) {
    if (error instanceof FirebaseError) {
      generateFirebaseAuthErrorMessage(error);
    }
  }
};
