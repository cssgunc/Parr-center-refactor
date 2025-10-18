import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase/firebaseConfig";
import { generateFirebaseAuthErrorMessage } from "../ErrorHandler";
import { FirebaseError } from "firebase/app";

/** Sends user email to reset their password
 *
 * @param email  - Email to send reset password link
 */
export const forgotPassword = async (email: string) => {
  try {
    //Send Reset Password Link
    await sendPasswordResetEmail(auth, email);

    //navigate back to Login Page
  } catch (error) {
    if (error instanceof FirebaseError) {
      generateFirebaseAuthErrorMessage(error);
    }
  }
};
