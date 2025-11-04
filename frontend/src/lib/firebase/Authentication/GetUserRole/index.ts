import { dbAdmin } from "@/lib/firebase/adminConfig";

//Get the user role for specific user uuid
export async function getUserRole(uid: string) {
  try {
    //Edit based on layout of user storage in backend
    const doc = await dbAdmin.doc(`users/${uid}`).get();
    if (!doc.exists) {
      return false;
    }

    // TODO: Change type to Profile type once is created
    const data = doc.data() || {};
    return data?.isAdmin;
  } catch (error) {
    return false;
  }
}
