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
            className="min-h-screen flex flex-col relative overflow-hidden"
            style={{
              background: "linear-gradient(to bottom, white 0%, white 15%, rgba(255, 255, 255, 0.95) 20%, rgba(255, 255, 255, 0.8) 30%, rgba(255, 255, 255, 0.5) 50%, #abd8ff 100%)",
            }}
          >
            {/* Background pattern with natural fade at edges - more visible */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(171, 216, 255, 0.7) 2px, transparent 0)`,
                backgroundSize: "30px 30px",
                maskImage: "radial-gradient(ellipse 100% 100% at center, black 40%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0.4) 65%, rgba(0, 0, 0, 0.1) 80%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(ellipse 100% 100% at center, black 40%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0.4) 65%, rgba(0, 0, 0, 0.1) 80%, transparent 100%)",
              }}
            />
            {/* More visible background accent shapes */}
            <div className="absolute top-20 right-10 w-96 h-96 bg-blue-300 rounded-full opacity-35 blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
            <div className="absolute bottom-20 left-10 w-80 h-80 bg-blue-400 rounded-full opacity-30 blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-blue-200 rounded-full opacity-25 blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }}></div>
            
            <div className="flex flex-1 relative z-10 pt-6 pl-6">
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
