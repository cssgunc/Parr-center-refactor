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

/**
 *Register's user accounts in firebase auth
 *
 * @param name - User's Name
 * @param email - User's Email
 * @param password - User's Password
 */
export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    console.log(name);
    console.log(email);
    console.log(password);

    //Create User
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log(user);

    //Send verifcation email to the user
    await sendEmailVerification(user);
    alert(`A verifcation email has been sent to your email address ${name}`);
  } catch (error) {
    if (error instanceof FirebaseError) {
      generateFirebaseAuthErrorMessage(error);
    }
  } finally {
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
      alert("Please verify your email to login");
      return;
    }

    console.log(email, password);
  } catch (error) {
    if (error instanceof FirebaseError) {
      generateFirebaseAuthErrorMessage(error);
    }
  } finally {
  }
};

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
