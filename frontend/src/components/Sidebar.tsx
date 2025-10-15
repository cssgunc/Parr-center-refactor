"use client";

import { useState } from "react";

interface Module {
  id: number;
  title: string;
}

const mockModules: Module[] = [
  {
    id: 1,
    title: "Interstellar Rescue Ethical Dilemma",
  },
  {
    id: 2,
    title: "nlasnlno jxzciojoq nuvo dovij mdkljfen",
  },
  {
    id: 3,
    title: "nlasnlno jxzciojoq nuvo dovij mdkljfen",
  },
  {
    id: 4,
    title: "nlasnlno jxzciojoq nuvo dovij mdkljfen",
  },
  {
    id: 5,
    title: "nlasnlno jxzciojoq nuvo dovij mdkljfen",
  },
  {
    id: 6,
    title: "nlasnlno jxzciojoq nuvo dovij mdkljfen",
  },
  {
    id: 7,
    title: "nlasnlno jxzciojoq nuvo dovij mdkljfen",
  },
  {
    id: 8,
    title: "nlasnlno jxzciojoq nuvo dovij mdkljfen",
  }
];

interface SidebarProps {
  selectedModule: number;
  onSelect: (moduleId: number) => void;
}

export default function Sidebar({ selectedModule, onSelect }: SidebarProps) {
  const handleModuleClick = (moduleId: number) => {
    onSelect(moduleId);
  };

  return (
    <div className="hidden md:block w-60 bg-white border-r border-gray-300 h-full overflow-y-auto font-secondary">
      <div className="py-4">
        <nav>
          {mockModules.map((module, index) => (
            <div key={module.id} className={`${index < mockModules.length - 1 ? 'border-b border-gray-300' : ''}`}>
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
