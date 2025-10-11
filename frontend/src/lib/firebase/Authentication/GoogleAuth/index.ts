import { FirebaseError } from "firebase/app";
import { generateFirebaseAuthErrorMessage } from "../ErrorHandler";
import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "../../firebaseConfig";

export const signInUserWithGoogleAuth = async () => {
  try {
    const result = await signInWithPopup(auth, googleAuthProvider);
    if (!result || !result.user) {
      throw new Error("No user found");
    }
    const user = result.user;
    alert(`Welcome ${user.displayName}`);
    //Navigate to Page
  } catch (error) {
    if (error instanceof FirebaseError) {
      generateFirebaseAuthErrorMessage(error);
    }
  } finally {
  }
};
