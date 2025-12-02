import { db } from "../lib/firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";


export const useGetDocuments = () => {

  const getDoc = async (path: string) => {

    const collectionRef = collection(db!, path)
    const querySnapshot = await getDocs(collectionRef)
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return data;
  }

  return { getDoc }
}