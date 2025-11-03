"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/lib/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { Fahkwang } from "next/font/google";

//Interface stores userData
interface UserProfile {
  firstName: string;
  lastName?: string;
  phoneNumber?: string;
  isAdmin: boolean;
  createdAt: string;
  lastActive: string;
}

interface AuthContextType {
  user: any;
  userProfile: UserProfile | null;
  isAdmin: boolean;
  loading: boolean;
}

//Holds authenciation context for loggedin User
const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  isAdmin: false,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, loading] = useAuthState(auth);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  //Fetch user profile when loggedin user changes
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const profileData = userDoc.data() as UserProfile;
            setUserProfile(profileData);
          } else {
            setUserProfile(null);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setUserProfile(null);
        }
      } else {
        setUserProfile(null);
      }
      setProfileLoading(false);
    };

    if (!loading) {
      fetchUserProfile();
    }
  }, [user]);

  const isAdmin = userProfile?.isAdmin ?? false;
  const isLoading = loading || profileLoading;

  return (
    <AuthContext.Provider
      value={{ user, userProfile, isAdmin, loading: isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context == undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
