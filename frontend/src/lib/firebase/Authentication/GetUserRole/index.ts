import { db } from "@/lib/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

//Get the user role for specific user uuid
export async function getUserRole(uid: string) {
  try {
    //Edit based on layout of user storage in backend
    const document = doc(db, "users", uid);
    const snapshot = await getDoc(document);
    if (!snapshot.exists) {
      return false;
    }

    // TODO: Change type to Profile type once is created
    const data = snapshot.data() || {};
    return data?.isAdmin;
  } catch (error) {
    return false;
  }
}
