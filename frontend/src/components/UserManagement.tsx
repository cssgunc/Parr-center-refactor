"use client";
import { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db, auth } from "@/lib/firebase/firebaseConfig";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "sonner";

//Data of users to be displayed
interface UserData {
  id: string;
  email: string;
  displayName: string;
  isAdmin: boolean;
}

export default function UserManagement() {
  const [user] = useAuthState(auth);
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  const currentUserId = user?.uid;

  //Get's all users from the firebase
  const loadUsers = async () => {
    try {
      setLoading(true);
      const snapshot = await getDocs(collection(db, "users"));
      const usersData: UserData[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        email: doc.data().email || "",
        displayName: doc.data().displayName || "",
        isAdmin: doc.data().isAdmin || false,
      }));
      setUsers(usersData);
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  //Toggles user's isAdmin status
  const toggleAdmin = async (user: UserData) => {
    try {
      const docRef = doc(db, "users", user.id);

      const resp = await updateDoc(docRef, {
        isAdmin: !user.isAdmin,
      });

      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id ? { ...u, isAdmin: !user.isAdmin } : u
        )
      );

      toast.success(`${user.email} updated successfully`);
    } catch (error) {
      toast.error("Failed to update user");
    }
  };

  //Load Users on mount
  useEffect(() => {
    loadUsers();
  }, []);

  //Loading Circle
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f9fafb",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            User Management
          </h1>
          <p className="text-gray-600">Manage user roles and permissions</p>
          <p className="text-xs text-gray-400 mt-1">
            Logged in as: {user?.email || user?.uid}
          </p>
        </div>

        {users.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No users yet
            </h3>
            <p className="text-gray-500">
              Users will appear here once they sign up
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {user.displayName || "No name"}
                  </h3>
                  <p className="text-gray-600 text-sm">{user.email}</p>
                </div>

                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        user.isAdmin
                          ? "bg-purple-100 text-purple-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {user.isAdmin ? (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        ) : (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        )}
                      </svg>
                      {user.isAdmin ? "Admin" : "Student"}
                    </span>
                  </div>
                  {user.id === currentUserId && (
                    <div className="text-xs text-blue-600 font-medium">
                      (You)
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => toggleAdmin(user)}
                    disabled={user.id === currentUserId}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      user.id === currentUserId
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : user.isAdmin
                        ? "bg-blue-100 hover:bg-blue-200 text-black-700"
                        : "bg-emerald-100 hover:bg-emerald-200 text-black-700"
                    }`}
                  >
                    {user.isAdmin ? "Remove Admin" : "Make Admin"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
