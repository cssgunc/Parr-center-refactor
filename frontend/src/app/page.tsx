"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import FooterMUI from "@/components/FooterMUI";
import ModuleContentMUI from "@/components/ModuleContentMUI";
import modulesContent from "@/data/modulesContent";


export default function Home() {
  const [selectedModule, setSelectedModule] = useState<number>(1);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex flex-1">
        <Sidebar selectedModule={selectedModule} onSelect={setSelectedModule} />
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <ModuleContentMUI moduleId={selectedModule} content={modulesContent[selectedModule]} />
          </div>
        </main>
      </div>
      <FooterMUI />
    </div>
  );
}
