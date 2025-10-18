import {
  createUserWithEmailAndPassword,
  reauthenticateWithCredential,
  sendEmailVerification,
  signInWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";
import { auth } from "@/lib/firebase/firebaseConfig";
import { EmailAuthProvider } from "firebase/auth/web-extension";
import { generateFirebaseAuthErrorMessage } from "../ErrorHandler";
import { FirebaseError } from "firebase/app";
import { toast } from "sonner";

/**
 *Register's user accounts in firebase auth
 *
 * @param name - User's Name
 * @param email - User's Email
 * @param password - User's Password
 *
 * @throws Firebase error if instanceOf firebase error
 */
export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    //Create User
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    //Send verifcation email to the user
    await sendEmailVerification(user);
    toast.success(
      `A verifcation email has been sent to your email address ${name}`
    );
  } catch (error) {
    if (error instanceof FirebaseError) {
      generateFirebaseAuthErrorMessage(error);
    }
    throw error;
  }
};

/**
 *Signs user into their accounts using their email and password
 *
 * @param email - User's Email
 * @param password - User's Password
 * @returns -  Returns on unverified email
 */
export const loginUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    //Login User
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    if (user.emailVerified === false) {
      toast.error("Please verify your email to login");
      return;
    }
  } catch (error) {
    if (error instanceof FirebaseError) {
      generateFirebaseAuthErrorMessage(error);
    }
  }
};

/**Updates user's password
 *
 * @param currentPassword - User's current password
 * @param newPassword - User's new password
 * @returns - null
 */
export const updateUserPassword = async (
  currentPassword: string,
  newPassword: string
) => {
  try {
    //Check valid user
    const user = auth.currentUser;
    if (!user) {
      return;
    }

    //check if old password input is valid
    if (!currentPassword || currentPassword === "") {
      alert("Please enter your current password");
      return;
    }
    //check if new password input is valid
    if (!newPassword || newPassword === "") {
      alert("Please enter your new password");
      return;
    }

    //validate old password
    const authCredential = EmailAuthProvider.credential(
      user.email as string,
      currentPassword
    );

    //Reauthenticate user
    await reauthenticateWithCredential(user, authCredential);
    //update password
    await updatePassword(user, newPassword);
    alert("Password Updated Sucessfully");

    //Navigation
  } catch (error) {
    if (error instanceof FirebaseError) {
      generateFirebaseAuthErrorMessage(error);
    }
  }
};
