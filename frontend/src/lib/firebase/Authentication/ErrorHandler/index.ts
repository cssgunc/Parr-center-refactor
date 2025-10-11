import { FirebaseError } from "firebase/app";

//https://firebase.google.com/docs/auth/admin/errors

export const generateFirebaseAuthErrorMessage = (error: FirebaseError) => {
  switch (error?.code) {
    case "auth/claims-too-large":
      return "Custom claims payload exceeds the 1000-byte limit.";
    case "auth/email-already-exists":
      return "That email is already in use.";
    case "auth/id-token-expired":
      return "Your session has expired. Please sign in again.";
    case "auth/id-token-revoked":
      return "Your session was revoked. Please sign in again.";
    case "auth/insufficient-permission":
      return "Insufficient permission to access this auth resource.";
    case "auth/internal-error":
      return "Auth server encountered an unexpected error. Try again.";
    case "auth/invalid-argument":
      return "Invalid argument provided to an Auth method.";
    case "auth/invalid-claims":
      return "Provided custom claims are invalid.";
    case "auth/invalid-continue-uri":
      return "Continue URL must be a valid URL.";
    case "auth/invalid-creation-time":
      return "Creation time must be a valid UTC date string.";
    case "auth/invalid-credential":
      return "Admin SDK credential is not valid for this action.";
    case "auth/invalid-disabled-field":
      return 'The "disabled" user property must be a boolean.';
    case "auth/invalid-display-name":
      return "Display name must be a non-empty string.";
    case "auth/invalid-dynamic-link-domain":
      return "Dynamic link domain is not configured or authorized.";
    case "auth/invalid-email":
      return "Email must be a valid address.";
    case "auth/invalid-email-verified":
      return 'The "emailVerified" property must be a boolean.';
    case "auth/invalid-hash-algorithm":
      return "Unsupported hash algorithm.";
    case "auth/invalid-hash-block-size":
      return "Hash block size must be a valid number.";
    case "auth/invalid-hash-derived-key-length":
      return "Hash derived key length must be a valid number.";
    case "auth/invalid-hash-key":
      return "Hash key must be a valid byte buffer.";
    case "auth/invalid-hash-memory-cost":
      return "Hash memory cost must be a valid number.";
    case "auth/invalid-hash-parallelization":
      return "Hash parallelization must be a valid number.";
    case "auth/invalid-hash-rounds":
      return "Hash rounds must be a valid number.";
    case "auth/invalid-hash-salt-separator":
      return "Hash salt separator must be a valid byte buffer.";
    case "auth/invalid-id-token":
      return "Provided ID token is not a valid Firebase ID token.";
    case "auth/invalid-last-sign-in-time":
      return "Last sign-in time must be a valid UTC date string.";
    case "auth/invalid-page-token":
      return "Next page token must be a valid non-empty string.";
    case "auth/invalid-password":
      return "Password must be at least 6 characters.";
    case "auth/invalid-password-hash":
      return "Password hash must be a valid byte buffer.";
    case "auth/invalid-password-salt":
      return "Password salt must be a valid byte buffer.";
    case "auth/invalid-phone-number":
      return "Phone number must be E.164 format (e.g. +15551234567).";
    case "auth/invalid-photo-url":
      return "Photo URL must be a valid URL string.";
    case "auth/invalid-provider-data":
      return "providerData must be an array of UserInfo objects.";
    case "auth/invalid-provider-id":
      return "providerId must be a supported provider identifier.";
    case "auth/invalid-oauth-responsetype":
      return "Exactly one OAuth responseType must be set to true.";
    case "auth/invalid-session-cookie-duration":
      return "Session cookie duration must be 5 minutes to 2 weeks (ms).";
    case "auth/invalid-uid":
      return "UID must be a non-empty string up to 128 characters.";
    case "auth/invalid-user-import":
      return "User record to import is invalid.";
    case "auth/maximum-user-count-exceeded":
      return "Maximum number of users to import exceeded.";
    case "auth/missing-android-pkg-name":
      return "Android package name is required if the app must be installed.";
    case "auth/missing-continue-uri":
      return "A valid continue URL is required.";
    case "auth/missing-hash-algorithm":
      return "Importing password hashes requires a hash algorithm.";
    case "auth/missing-ios-bundle-id":
      return "iOS bundle ID is required.";
    case "auth/missing-uid":
      return "A UID is required for this operation.";
    case "auth/missing-oauth-client-secret":
      return "OIDC code flow requires an OAuth client secret.";
    case "auth/operation-not-allowed":
      return "This sign-in provider is disabled for the project.";
    case "auth/phone-number-already-exists":
      return "That phone number is already in use.";
    case "auth/project-not-found":
      return "No Firebase project found for the provided credentials.";
    case "auth/reserved-claims":
      return "One or more custom claims are reserved (e.g., sub, iss, exp).";
    case "auth/session-cookie-expired":
      return "Session cookie has expired.";
    case "auth/session-cookie-revoked":
      return "Session cookie has been revoked.";
    case "auth/too-many-requests":
      return "Too many requests. Please slow down and try again.";
    case "auth/uid-already-exists":
      return "That UID is already in use.";
    case "auth/unauthorized-continue-uri":
      return "Continue URL domain is not whitelisted in Firebase Console.";
    case "auth/user-disabled":
      return "This user account has been disabled by an administrator.";
    case "auth/user-not-found":
      return "No user found for the provided identifier.";
    default:
      return "An unexpected authentication error occurred.";
  }
};
