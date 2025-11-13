"use client";

import { useState, useEffect } from "react";
import { getPublicModules } from "@/lib/firebase/db-operations";

interface Module {
  id: number;
  title: string;
}

interface SidebarProps {
  selectedModule: number;
  onSelect: (moduleId: number) => void;
}

export default function Sidebar({ selectedModule, onSelect }: SidebarProps) {
  const [modules, setModules] = useState<Module[]>([]);
  const handleModuleClick = (moduleId: number) => {
    onSelect(moduleId);
  };

  useEffect(() => {
    // Fetch modules from the database
    const fetchModules = async () => {
      const modulesData = await getPublicModules();
      // Map to local Module type
      const mappedModules = modulesData.map((mod) => ({
        id: parseInt(mod.id),
        title: mod.title,
      }));
      setModules(mappedModules);
    }
    fetchModules();
  }, []);

  return (
    <div className="hidden md:block w-60 bg-white border-r border-gray-300 h-full overflow-y-auto font-secondary">
      <div className="py-4">
        <nav>
          {modules.map((module, index) => (
            <div key={module.id} className={`${index < modules.length - 1 ? 'border-b border-gray-300' : ''}`}>
              <button
                  onClick={() => handleModuleClick(module.id)}
                  className={`w-full text-left pr-4 px-6 py-5 transition-colors duration-200 ${
                  selectedModule === module.id
                      ? "bg-light-carolina-blue text-black"
                      : "bg-white text-black hover:bg-gray-50"
                  }`}>
                <div className="space-y-2">
                <div className={`text-md leading-relaxed ${
                    selectedModule === module.id
                    ? "text-black font-bold"
                    : "text-black font-normal"
                }`}>
                  Module {module.id}
                      <br />
                  {module.title}
                </div>
                </div>
              </button>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
