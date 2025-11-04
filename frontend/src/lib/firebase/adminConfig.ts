/**
 * Firebase admin confugration for creating sessions during login
 * DO NOT USE IN "use client"
 */
import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FB_PROJECT_ID!,
      clientEmail: process.env.FB_CLIENT_EMAIL!,
      privateKey: process.env.FB_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    }),
  });
}

export const authAdmin = getAuth();
export const dbAdmin = getFirestore();
