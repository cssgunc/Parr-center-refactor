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
          <div
            className="min-h-screen flex flex-col"
            style={{
              background: "linear-gradient(to bottom, white 0%, white 1%, #abd8ff 100%)",
            }}
          >
            <div className="flex flex-1">
              <Sidebar
                selectedModule={selectedModule}
                onSelect={setSelectedModule}
                onSelectIndex={setIndex}
              />
              <main className="flex-1 overflow-auto">
                <div className="">
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
