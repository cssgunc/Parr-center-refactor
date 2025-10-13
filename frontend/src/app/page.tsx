"use client";

import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <h1 className="font-primary text-2xl font-bold text-gray-900">Main Content Area</h1>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
