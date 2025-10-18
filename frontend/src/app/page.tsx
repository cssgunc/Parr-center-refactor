"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import ModuleContent from "@/components/ModuleContent";
import modulesContent from "@/data/modulesContent";

export default function Home() {
  const [selectedModule, setSelectedModule] = useState<number>(1);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex flex-1">
        <Sidebar selectedModule={selectedModule} onSelect={setSelectedModule} />
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <ModuleContent
              moduleId={selectedModule}
              content={modulesContent[selectedModule]}
            />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
