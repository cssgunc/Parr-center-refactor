"use client";

import AuthGate from "@/components/AuthGate";
import ModulesPage from "@/components/ModulesPage";
import { useState } from "react";
import UserManagement from "@/components/UserManagement";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"modules" | "users">("modules");
  return (
    <div className="min-h-screen bg-gray-50 border rounded-xl border-gray-200">
      <AuthGate requireAdmin>
        {
          // ===== ADMIN VIEW =====
          // This is the admin dashboard where users can manage modules and feature
          <div>
            {/* Admin Dashboard Header */}
            <div className="bg-white border-b rounded-t-xl border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                {/* Page title */}
                <h1 className="text-2xl font-bold text-gray-900">
                  Admin Dashboard
                </h1>

                {/* Tabs for user mangement view and modules view*/}
                <div className="flex gap-6">
                  <button
                    onClick={() => setActiveTab("modules")}
                    className={`pb-3 font-medium text-sm transition-colors duration-200 border-b-2 ${
                      activeTab === "modules"
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Modules
                  </button>
                  <button
                    onClick={() => setActiveTab("users")}
                    className={`pb-3 font-medium text-md transition-colors duration-200 border-b-2 ${
                      activeTab === "users"
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Users
                  </button>
                </div>
              </div>
            </div>

            {/*
                MODULES PAGE COMPONENT
                This is where all the module management functionality lives.
                It handles displaying, creating, editing, and deleting modules and features.
              */}
            {activeTab === "modules" ? <ModulesPage /> : <UserManagement />}
          </div>
        }
      </AuthGate>
    </div>
  );
}
