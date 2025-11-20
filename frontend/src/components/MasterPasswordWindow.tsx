import { useState } from "react";

interface MasterPasswordModalProps {
  isOpen: boolean;
  userEmail: string;
  isRemovingAdmin: boolean;
  onConfirm: (password: string) => void;
  onCancel: () => void;
}

export default function MasterPasswordWindow({
  isOpen,
  userEmail,
  isRemovingAdmin,
  onConfirm,
  onCancel,
}: MasterPasswordModalProps) {
  const [password, setPassword] = useState("");

  if (!isOpen) {
    return null;
  }

  const handleSubmit = () => {
    onConfirm(password);
    setPassword("");
  };

  const handleCancel = () => {
    setPassword("");
    onCancel();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Enter Administrator Password
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          You are about to{" "}
          {isRemovingAdmin ? "remove admin from" : "make admin"}{" "}
          <span className="font-semibold">{userEmail}</span>
        </p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            } else if (e.key === "Escape") {
              handleCancel();
            }
          }}
          placeholder="Enter master password"
          className="block w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          autoFocus
        />

        <div className="flex gap-3">
          <button
            onClick={handleCancel}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
