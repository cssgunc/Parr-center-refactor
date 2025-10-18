import { FirebaseError } from "firebase/app";
import { generateFirebaseAuthErrorMessage } from "../ErrorHandler";
import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "../../firebaseConfig";
import { toast } from "sonner";

/** Signs user in with Google
 *
 */
export const signInUserWithGoogleAuth = async () => {
  try {
    const result = await signInWithPopup(auth, googleAuthProvider);
    if (!result || !result.user) {
      throw new Error("No user found");
    }
    const user = result.user;
    toast.success(`Welcome ${user.displayName}`);
    //Navigate to Page
  } catch (error) {
    if (error instanceof FirebaseError) {
      generateFirebaseAuthErrorMessage(error);
    }
  } finally {
  }
};
