"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Typography, Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";
import { Timestamp } from "firebase/firestore";
import { User, UserProgress } from "../../lib/firebase/types";
import { signOut } from "firebase/auth";
// import { auth } from "../../lib/firebase/firebaseConfig";

//  Mock Data
const mockTimestamp = Timestamp.fromDate(new Date("2024-08-15T12:00:00Z"));

const mockUser: User = {
  id: "mock-user-001",
  email: "wyatt.smith@unc.edu",
  displayname: "Wyatt Smith",
  photoURL: "https://api.dicebear.com/7.x/initials/svg?seed=Wyatt%20Smith",
  createdAt: mockTimestamp,
  lastLoginAt: Timestamp.now(),
};

const mockModules = [
  { id: "mod1", title: "Ethics in Public Life", stepCount: 5 },
  { id: "mod2", title: "Leadership Foundations", stepCount: 7 },
  { id: "mod3", title: "Decision-Making Workshop", stepCount: 4 },
];

const mockProgress: Record<string, UserProgress> = {
  mod1: {
    completedStepIds: ["1", "2", "3", "4"],
    lastViewedAt: mockTimestamp,
    quizScores: {},
    startedAt: mockTimestamp,
    completedAt: null,
  },
  mod2: {
    completedStepIds: ["1", "2"],
    lastViewedAt: mockTimestamp,
    quizScores: {},
    startedAt: mockTimestamp,
    completedAt: null,
  },
  mod3: {
    completedStepIds: ["1", "2", "3", "4"],
    lastViewedAt: mockTimestamp,
    quizScores: {},
    startedAt: mockTimestamp,
    completedAt: mockTimestamp,
  },
};

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [modules, setModules] = useState<
    { id: string; title: string; stepCount: number }[]
  >([]);
  const [progressData, setProgressData] = useState<
    Record<string, UserProgress>
  >({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ======================================
    // 🔹 Simulate data fetching (Mock Phase)
    // ======================================
    // In production, replace this with Firebase Auth listener
    // and Firestore helper calls from lib/firebase/db-operations.
    const timeout = setTimeout(() => {
      setUser(mockUser);
      setModules(mockModules);
      setProgressData(mockProgress);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timeout);
  }, []);

  /* 
===============================================================
💡 FUTURE IMPLEMENTATION (when Firebase is live)
===============================================================
useEffect(() => {
  // 1️⃣ Watch for Auth state (get current user)
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    if (!currentUser) {
      router.push("/signin");
      return;
    }

    // Set the authenticated user
    setUser(currentUser as User);

    // 2️⃣ Fetch available modules
    const fetchedModules = await getPublicModules();

    // 3️⃣ Fetch progress for each module
    //    Uses helper: getUserProgress(userId, moduleId)
    const progressMap: Record<string, UserProgress> = {};
    for (const mod of fetchedModules) {
      const progress = await getUserProgress(currentUser.uid, mod.id);
      if (progress) {
        progressMap[mod.id] = progress;
      }
    }

    // 4️⃣ Store data in state
    setModules(fetchedModules);
    setProgressData(progressMap);
    setLoading(false);
  });

  return () => unsubscribe();
}, [router]);
*/

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f9fafb",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-2xl w-full">
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Your Profile
          </h1>
          <p className="text-gray-600 text-lg">
            Your learning journey across Parr Center modules
          </p>
        </div>

        {/* USER INFO */}
        {user && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8">
            <div className="flex items-center mb-4">
              <img
                src={user.photoURL}
                alt={user.displayname}
                className="w-16 h-16 rounded-full mr-4 border border-gray-300"
              />
              <div className="text-left">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {user.displayname}
                </h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>

            <div className="text-left space-y-2 text-sm">
              <p>
                <span className="font-medium text-gray-700">User ID:</span>{" "}
                {user.id}
              </p>
              <p>
                <span className="font-medium text-gray-700">Joined:</span>{" "}
                {user.createdAt.toDate().toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium text-gray-700">Last Active:</span>{" "}
                {user.lastLoginAt.toDate().toLocaleString()}
              </p>
            </div>
          </div>
        )}

        {/* MODULE PROGRESS */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Module Progress
          </h2>

          {modules.length === 0 ? (
            <p className="text-gray-500 text-center">No modules started yet.</p>
          ) : (
            <div className="space-y-6">
              {modules.map((mod) => {
                const progress = progressData[mod.id];
                const completedSteps = progress?.completedStepIds.length || 0;
                const totalSteps = mod.stepCount || 1;
                const percent = Math.round((completedSteps / totalSteps) * 100);

                return (
                  <div key={mod.id} className="text-left">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-800 font-medium">
                        {mod.title}
                      </span>
                      <span className="text-sm text-gray-500">{percent}%</span>
                    </div>
                    <LinearProgress
                      variant="determinate"
                      value={percent}
                      sx={{
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: "#e5e7eb",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor:
                            percent === 100 ? "#2563eb" : "#60a5fa",
                        },
                      }}
                    />
                    {progress?.completedAt && (
                      <p className="text-xs text-green-600 mt-1">
                        Completed on{" "}
                        {progress.completedAt.toDate().toLocaleDateString()}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* FOOTER BUTTONS */}
        <div className="text-center mt-10">
          <button
            onClick={() => router.push("/")}
            className="bg-carolina-blue hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 mr-4"
          >
            ← Back to Home
          </button>

          <button
            // onClick={() =>
            //   signOut(auth)
            //     .then(() => {
            //       console.log("✅ User signed out");
            //       router.push("/signin");
            //     })
            //     .catch((error) => {
            //       console.error("❌ Error signing out:", error);
            //     })
            // }
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
