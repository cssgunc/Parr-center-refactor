import { FirebaseError } from "firebase/app";

//https://firebase.google.com/docs/auth/admin/errors
/**
 *
 * @param error - Error thrown by Firebase
 */
export const generateFirebaseAuthErrorMessage = (error: FirebaseError) => {
  let message: string;

  switch (error?.code) {
    case "auth/claims-too-large":
      message = "Custom claims payload exceeds the 1000-byte limit.";
      break;
    case "auth/email-already-exists":
      message = "That email is already in use.";
      break;
    case "auth/id-token-expired":
      message = "Your session has expired. Please sign in again.";
      break;
    case "auth/id-token-revoked":
      message = "Your session was revoked. Please sign in again.";
      break;
    case "auth/insufficient-permission":
      message = "Insufficient permission to access this auth resource.";
      break;
    case "auth/internal-error":
      message = "Auth server encountered an unexpected error. Try again.";
      break;
    case "auth/invalid-argument":
      message = "Invalid argument provided to an Auth method.";
      break;
    case "auth/invalid-claims":
      message = "Provided custom claims are invalid.";
      break;
    case "auth/invalid-continue-uri":
      message = "Continue URL must be a valid URL.";
      break;
    case "auth/invalid-creation-time":
      message = "Creation time must be a valid UTC date string.";
      break;
    case "auth/invalid-credential":
      message = "Invalid credentials";
      break;
    case "auth/invalid-disabled-field":
      message = 'The "disabled" user property must be a boolean.';
      break;
    case "auth/invalid-display-name":
      message = "Display name must be a non-empty string.";
      break;
    case "auth/invalid-dynamic-link-domain":
      message = "Dynamic link domain is not configured or authorized.";
      break;
    case "auth/invalid-email":
      message = "Email must be a valid address.";
      break;
    case "auth/invalid-email-verified":
      message = 'The "emailVerified" property must be a boolean.';
      break;
    case "auth/invalid-hash-algorithm":
      message = "Unsupported hash algorithm.";
      break;
    case "auth/invalid-hash-block-size":
      message = "Hash block size must be a valid number.";
      break;
    case "auth/invalid-hash-derived-key-length":
      message = "Hash derived key length must be a valid number.";
      break;
    case "auth/invalid-hash-key":
      message = "Hash key must be a valid byte buffer.";
      break;
    case "auth/invalid-hash-memory-cost":
      message = "Hash memory cost must be a valid number.";
      break;
    case "auth/invalid-hash-parallelization":
      message = "Hash parallelization must be a valid number.";
      break;
    case "auth/invalid-hash-rounds":
      message = "Hash rounds must be a valid number.";
      break;
    case "auth/invalid-hash-salt-separator":
      message = "Hash salt separator must be a valid byte buffer.";
      break;
    case "auth/invalid-id-token":
      message = "Provided ID token is not a valid Firebase ID token.";
      break;
    case "auth/invalid-last-sign-in-time":
      message = "Last sign-in time must be a valid UTC date string.";
      break;
    case "auth/invalid-page-token":
      message = "Next page token must be a valid non-empty string.";
      break;
    case "auth/invalid-password":
      message = "Password must be at least 6 characters.";
      break;
    case "auth/invalid-password-hash":
      message = "Password hash must be a valid byte buffer.";
      break;
    case "auth/invalid-password-salt":
      message = "Password salt must be a valid byte buffer.";
      break;
    case "auth/invalid-phone-number":
      message = "Phone number must be E.164 format (e.g. +15551234567).";
      break;
    case "auth/invalid-photo-url":
      message = "Photo URL must be a valid URL string.";
      break;
    case "auth/invalid-provider-data":
      message = "providerData must be an array of UserInfo objects.";
      break;
    case "auth/invalid-provider-id":
      message = "providerId must be a supported provider identifier.";
      break;
    case "auth/invalid-oauth-responsetype":
      message = "Exactly one OAuth responseType must be set to true.";
      break;
    case "auth/invalid-session-cookie-duration":
      message = "Session cookie duration must be 5 minutes to 2 weeks (ms).";
      break;
    case "auth/invalid-uid":
      message = "UID must be a non-empty string up to 128 characters.";
      break;
    case "auth/invalid-user-import":
      message = "User record to import is invalid.";
      break;
    case "auth/maximum-user-count-exceeded":
      message = "Maximum number of users to import exceeded.";
      break;
    case "auth/missing-android-pkg-name":
      message =
        "Android package name is required if the app must be installed.";
      break;
    case "auth/missing-continue-uri":
      message = "A valid continue URL is required.";
      break;
    case "auth/missing-hash-algorithm":
      message = "Importing password hashes requires a hash algorithm.";
      break;
    case "auth/missing-ios-bundle-id":
      message = "iOS bundle ID is required.";
      break;
    case "auth/missing-uid":
      message = "A UID is required for this operation.";
      break;
    case "auth/missing-oauth-client-secret":
      message = "OIDC code flow requires an OAuth client secret.";
      break;
    case "auth/operation-not-allowed":
      message = "This sign-in provider is disabled for the project.";
      break;
    case "auth/phone-number-already-exists":
      message = "That phone number is already in use.";
      break;
    case "auth/project-not-found":
      message = "No Firebase project found for the provided credentials.";
      break;
    case "auth/reserved-claims":
      message = "One or more custom claims are reserved (e.g., sub, iss, exp).";
      break;
    case "auth/session-cookie-expired":
      message = "Session cookie has expired.";
      break;
    case "auth/session-cookie-revoked":
      message = "Session cookie has been revoked.";
      break;
    case "auth/too-many-requests":
      message = "Too many requests. Please slow down and try again.";
      break;
    case "auth/uid-already-exists":
      message = "That UID is already in use.";
      break;
    case "auth/unauthorized-continue-uri":
      message = "Continue URL domain is not whitelisted in Firebase Console.";
      break;
    case "auth/user-disabled":
      message = "This user account has been disabled by an administrator.";
      break;
    case "auth/user-not-found":
      message = "No user found for the provided identifier.";
      break;
    default:
      message = "An unexpected authentication error occurred.";
  }
  throw new Error(message);
};
