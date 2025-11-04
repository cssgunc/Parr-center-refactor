"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { Timestamp } from "firebase/firestore";
import { User, UserProgress } from "../../lib/firebase/types";
import { signOut } from "firebase/auth";
import {
  SectionHeader,
  OverallProgressBar,
  ModuleProgressList,
  type ModuleItem,
} from "../../components/progress";
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
  const [modules, setModules] = useState<ModuleItem[]>([]);
  const [progressData, setProgressData] = useState<Record<string, UserProgress>>(
    {}
  );
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

  // ===== Overall progress calculation (weighted by step counts) =====
  const totalCompleted = modules.reduce((sum, mod) => {
    const progress = progressData[mod.id];
    return sum + (progress?.completedStepIds.length || 0);
  }, 0);
  const totalSteps = modules.reduce(
    (sum, mod) => sum + (mod.stepCount || 0),
    0
  );
  const overallPercent =
    totalSteps > 0 ? Math.round((totalCompleted / totalSteps) * 100) : 0;

  const completedModulesCount = modules.filter((m) => {
    const p = progressData[m.id];
    return (p?.completedStepIds.length || 0) >= (m.stepCount || 0);
  }).length;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-2xl w-full">
        {/* HEADER */}
        <SectionHeader
          title="Your Profile"
          subtitle="Your learning journey across Parr Center modules"
        />

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
        <Box>
          <Box component="h2" sx={{ fontSize: "1.5rem", fontWeight: 600, mb: 2 }}>
            Module Progress
          </Box>

          {modules.length > 0 && (
            <OverallProgressBar
              value={overallPercent}
              label="Overall Progress"
              totalCompleted={totalCompleted}
              totalSteps={totalSteps}
              completedModulesCount={completedModulesCount}
              totalModulesCount={modules.length}
            />
          )}

          <ModuleProgressList
            modules={modules}
            progressData={progressData}
            quizzesLeftCalculator={(moduleId, completedSteps, totalSteps) =>
              Math.max(0, totalSteps - completedSteps)
            }
          />
        </Box>

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
