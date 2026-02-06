"use client";
import { useState, useEffect, useMemo } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "@/lib/firebase/firebaseConfig";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import MasterPasswordWindow from "./MasterPasswordWindow";
import {
  Search,
  X,
  ShieldCheck,
  Users,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

//Data of users to be displayed
interface UserData {
  id: string;
  email: string;
  displayName: string;
  isAdmin: boolean;
}

export default function UserManagement() {
  const [user] = useAuth();
  const [users, setUsers] = useState<UserData[]>([]); //Holds Users
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); //search query state
  const [currentPage, setCurrentPage] = useState(1);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const USERS_PER_PAGE = 9;
  const currentUserId = user?.uid;

  //Get's all users from the firebase
  const loadUsers = async () => {
    try {
      setLoading(true);
      const snapshot = await getDocs(collection(db!, "users"));
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
      const docRef = doc(db!, "users", user.id);
      await updateDoc(docRef, {
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

  // Open password modal
  const handleToggleClick = (userToToggle: UserData) => {
    setSelectedUser(userToToggle);
    setShowPasswordModal(true);
  };

  // Verify password and toggle admin
  const handlePasswordSubmit = async (passwordInput: string) => {
    try {
      // Fetch master password from Firebase config/settings document
      const configRef = doc(db!, "config", "settings");

      const configSnap = await getDoc(configRef);
      console.log(configSnap);
      if (!configSnap.exists()) {
        toast.error("Master password not configured");
        return;
      }
      const masterPassword = configSnap.data()?.masterPassword;
      if (!masterPassword) {
        toast.error("Master password not found");
        return;
      }

      // Verify password
      if (passwordInput !== masterPassword) {
        toast.error("Incorrect password");
        return;
      }

      // Password correct, toggle admin
      if (selectedUser) {
        await toggleAdmin(selectedUser);
        setShowPasswordModal(false);
        setSelectedUser(null);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to verify password");
    }
  };

  // Cancel password modal
  const handlePasswordCancel = () => {
    setShowPasswordModal(false);
    setSelectedUser(null);
  };

  //Filter users based on search query
  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) {
      return users;
    }
    const query = searchQuery.toLowerCase();
    return users.filter(
      (user) =>
        user.email.toLowerCase().includes(query) ||
        user.displayName.toLowerCase().includes(query)
    );
  }, [users, searchQuery]);

  //Filters the queried users based on which page is the current page
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    const endIndex = startIndex + USERS_PER_PAGE;
    return filteredUsers.slice(startIndex, endIndex);
  }, [filteredUsers, currentPage]);
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE); //Total number of pages with given users

  //Get's the visible page numbers at the bottom of the UI, based on where the current page is
  const getVisiblePages = () => {
    const maxVisible = 5;
    const pages: number[] = [];

    if (totalPages <= maxVisible) {
      // Show all pages if total is 5 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (currentPage <= 3) {
      // Near the start: show 1, 2, 3, 4, 5
      for (let i = 1; i <= maxVisible; i++) {
        pages.push(i);
      }
    } else if (currentPage >= totalPages - 2) {
      // Near the end: show last 5 pages
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // In the middle: show current page ± 2
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  //On search querey change, the page resets back to page 1
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

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
    <div className="min-h-screen bg-gray-50 rounded-b-xl p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header*/}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            User Management
          </h1>
          <p className="text-gray-600">Manage user roles and permissions</p>
          <p className="text-xs text-gray-400 mt-1">
            Logged in as: {user?.email || user?.uid}
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6 max-w-md">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or email..."
              className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />

            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600"
              >
                <X className="h-5 w-5 text-gray-400" />
              </button>
            )}
          </div>

          <p className="mt-2 text-sm text-gray-600">
            Showing {paginatedUsers.length} of {filteredUsers.length} users
            {searchQuery && ` (filtered from ${users.length} total)`}
          </p>
        </div>

        {/* User Cards */}
        {filteredUsers.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Users className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No users found
            </h3>
            <p className="text-gray-500">
              {searchQuery
                ? `No users match "${searchQuery}"`
                : "Users will appear here once they sign up"}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedUsers.map((user) => (
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
                        {user.isAdmin ? (
                          <ShieldCheck className="w-4 h-4 mr-1" />
                        ) : (
                          <User className="w-4 h-4 mr-1" />
                        )}
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
                      onClick={() => handleToggleClick(user)}
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {getVisiblePages().map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === pageNum
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
        {/* Password Popup Window */}
        <MasterPasswordWindow
          isOpen={showPasswordModal}
          userEmail={selectedUser?.email || ""}
          isRemovingAdmin={selectedUser?.isAdmin || false}
          onConfirm={handlePasswordSubmit}
          onCancel={handlePasswordCancel}
        />
      </div>
    </div>
  );
}
