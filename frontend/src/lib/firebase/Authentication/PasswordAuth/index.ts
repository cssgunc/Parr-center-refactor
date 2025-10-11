import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase/firebaseConfig";
import { generateFirebaseAuthErrorMessage } from "../ErrorHandler";
import { FirebaseError } from "firebase/app";

export const forgotPassword = async (email: string) => {
  try {
    //Check if email exists
    if (email === "") {
      alert("Please enter in your email address");
      return;
    }

    //Send Reset Password Link
    await sendPasswordResetEmail(auth, email);

    //navigate back to Login Page
  } catch (error) {
    if (error instanceof FirebaseError) {
      generateFirebaseAuthErrorMessage(error);
    }
  } finally {
  }
};
