"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import ModuleContentMUI from "@/components/ModuleContentMUI";
import AuthGate from "@/components/AuthGate";
import { auth } from "../../lib/firebase/firebaseConfig";

export default function StudentPage() {
  /**
   * SELECTED MODULE STATE
   *
   * Tracks which module is currently selected in the student portal
   */
  const [selectedModule, setSelectedModule] = useState<string>("");
  const [index, setIndex] = useState<number>(0);
  const userId = auth.currentUser ? auth.currentUser.uid : "";

  return (
    <div className="min-h-screen">
      <AuthGate>
        {
          // ===== STUDENT PORTAL VIEW =====
          // This is the student-facing learning portal with module content
          //ProtectedRoute route will redirect to /login if user is not authenticated
          <div className="min-h-screen flex flex-col">
            {/* Back to Home Button */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
              {/* <button
                onClick={() => setCurrentView("home")}
                className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                ← Back to Home
              </button> */}
            </div>

            <div className="flex flex-1">
              <Sidebar
                selectedModule={selectedModule}
                onSelect={setSelectedModule}
                onSelectIndex={setIndex}
              />
              <main className="flex-1 overflow-auto">
                <div className="p-6">
                  <ModuleContentMUI
                    moduleId={selectedModule}
                    index={index}
                    userId={userId}
                  />
                </div>
              </main>
            </div>
          </div>
        }
      </AuthGate>
    </div>
  );
}
