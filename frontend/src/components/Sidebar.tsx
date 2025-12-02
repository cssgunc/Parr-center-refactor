"use client";

import { useState, useEffect } from "react";
import { getPublicModules } from "@/lib/firebase/db-operations";

interface Module {
  id: string;
  title: string;
  order: number;
}

interface SidebarProps {
  selectedModule: string;
  onSelect: (moduleId: string) => void;
  onSelectIndex: (index: number) => void;
}

export default function Sidebar({ selectedModule, onSelect, onSelectIndex }: SidebarProps) {
  const [modules, setModules] = useState<Module[]>([]);

  const handleModuleClick = (moduleId: string) => {
    onSelect(moduleId);
    onSelectIndex(modules.findIndex(mod => mod.id === moduleId));
  };

  useEffect(() => {
    const fetchModules = async () => {
      const modulesData = await getPublicModules();
      const mappedModules = modulesData
        .map(mod => ({
          id: mod.id,
          title: mod.title,
          order: mod.order || 999 // Default high order for modules without order
        }))
        .sort((a, b) => a.order - b.order); // Sort by order ascending
      setModules(mappedModules);
    };
    fetchModules();
  }, []);

  useEffect(() => {
    if (modules.length > 0 && !selectedModule) {
      onSelect(modules[0].id);
      onSelectIndex(0);
    }
  }, [modules]);

  return (
    <div className="hidden md:block w-60 bg-white border border-gray-300 h-full overflow-y-auto font-secondary rounded-l-xl">
      <div>
        <nav>
          {modules.map((module, index) => (
            <div key={module.id} className={`${index < modules.length - 1 ? "border-b border-gray-300" : ""}`}>
              <button
                onClick={() => handleModuleClick(module.id)}
                className={`w-full text-left pr-4 px-6 py-5 transition-colors duration-200 ${
                  selectedModule === module.id
                    ? "bg-light-carolina-blue text-black"
                    : "bg-white text-black hover:bg-gray-50"
                }`}
              >
                <div className="space-y-2">
                  <div
                    className={`text-md leading-relaxed ${
                      selectedModule === module.id ? "text-black font-bold" : "text-black font-normal"
                    }`}
                  >
                    Module {index + 1}
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