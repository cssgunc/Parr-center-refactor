import { FirebaseError } from "firebase/app";
import { generateFirebaseAuthErrorMessage } from "../ErrorHandler";
import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "../../firebaseConfig";
import { toast } from "sonner";
import { createUser, userSignupCheck } from "../../db-operations";

/** Signs user in with Google
 *
 */
export const signInUserWithGoogleAuth = async () => {
  try {
    const result = await signInWithPopup(auth!, googleAuthProvider!);
    if (!result || !result.user) {
      throw new Error("No user found");
    }
    if (result.user.uid && await userSignupCheck(result.user.uid) == false) {
      await createUser({
        id: result.user.uid,
        email: result.user.email || "",
        displayName: result.user.displayName || "",
        photoURL: result.user.photoURL || "",
      });
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
