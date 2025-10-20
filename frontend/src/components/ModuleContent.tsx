import React from "react";

interface ModuleContentProps {
  moduleId: number;
  content?: { title: string; subtitle?: string; overview: string; };
}

export default function ModuleContent({ moduleId, content }: ModuleContentProps) {
  if (!content) {
    return (
      <div>
        <h1 className="font-primary text-3xl font-bold text-gray-900">Module {moduleId}</h1>
        <p className="mt-4 text-gray-700">No content available for this module yet.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col m-[8vw]">
      <h1 className="font-primary text-4xl font-bold text-secondary-maroon mb-2">Welcome to Module {moduleId}</h1>
      <h2 className="font-primary text-4xl font-bold text-secondary-maroon mb-4">{content.title}</h2>
      <p className="font-secondary text-secondary-light-maroon text-xl mb-4">{content.subtitle}</p>

      <div className="flex gap-4 mb-16">
        <button className="py-2 px-1 rounded-2xl bg-primary-athletics-navy font-secondary font-bold text-white text-xl">Start Module</button>
        <button className="py-2 px-4 rounded-2xl bg-primary-athletics-navy font-secondary text-white text-md">View Journal</button>
      </div>

      <div className="mb-16 font-secondary">
        <h3 className="font-semibold text-lg">Current Progress</h3>
        <div className="flex items-center mt-2 ml-[10vw]">
          {/* simple 4-step indicator */}
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center font-bold justify-center">{step}</button>
              {step < 4 && <div className="w-16 h-px bg-gray-200" />}
            </div>
          ))}
        </div>
      </div>

      <div className="font-secondary">
        <h3 className="font-semibold text-lg mb-2">Module Overview</h3>
        <p className="text-black leading-relaxed ml-[5vw]">{content.overview}</p>
      </div>
    </div>
  );
}
