import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase/firebaseConfig";

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
    console.log(error);
  } finally {
  }
};
