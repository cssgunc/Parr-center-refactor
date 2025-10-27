"use client";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { loginUserWithEmailAndPassword } from "@/lib/firebase/Authentication/EmailAuth";
import { signInUserWithGoogleAuth } from "@/lib/firebase/Authentication/GoogleAuth";
import { FirebaseError } from "firebase/app";
import { generateFirebaseAuthErrorMessage } from "@/lib/firebase/Authentication/ErrorHandler/index";

import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorField, setErrorField] = useState<
    "email" | "password" | "firebase" | null
  >(null);

  const handleSubmit = async () => {
    if (!email.trim()) {
      setError("Please enter your email.");
      setErrorField("email");
      return;
    }
    if (!password.trim()) {
      setError("Please enter your password.");
      setErrorField("password");
      return;
    }

    setLoading(true);
    try {
      await loginUserWithEmailAndPassword(email, password);

      //navigate to home page on sucess
      toast.success("Sucessful Login");
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        const message = error.message.toLowerCase();
        setError(error.message);
        if (message.includes("email") || message.includes("user")) {
          setErrorField("email");
        } else if (
          message.includes("password") ||
          message.includes("credential")
        ) {
          setErrorField("password");
        } else {
          setErrorField("password");
        }
      } else {
        setError("Login failed. Please try again.");
        setErrorField("password");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.push("/");
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInUserWithGoogleAuth();
      router.push("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        const { message, field } = generateFirebaseAuthErrorMessage(error);
        setError(message);
        setErrorField(field);
      } else {
        setError("Couldn't sign in. Please try again.");
        setErrorField(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    router.push("/forgotpassword");
  };

  const handleSignUp = () => {
    router.push("/signup");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <button
          type="button"
          onClick={handleBack}
          className="mb-8 w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-slate-700 transition-colors"
          aria-label="Go back"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-4xl font-serif font-bold text-center mb-12 text-gray-900">
            Log In
          </h1>

          <div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-lg font-medium text-gray-900 mb-2"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyPress}
                className={`w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  error && errorField == "email"
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {errorField === "email" && error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
              )}
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="password"
                  className="block text-lg font-medium text-gray-900"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-blue-500 hover:text-blue-600 text-sm italic"
                >
                  Forgot your password?
                </button>
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyPress}
                className={`w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent  ${
                  error &&
                  (errorField === "password" || errorField === "firebase")
                    ? "border-red-500"
                    : "border-gray-300"
                } `}
              />
              {errorField === "password" && error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
              )}
            </div>

            <div className="mb-8">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-5 h-5 border-2 border-gray-400 rounded cursor-pointer"
                />
                <span className="ml-3 text-gray-900">Remember me</span>
              </label>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="w-full max-w-[200px] mx-auto block bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-full disabled:opacity-50 transition-colors text-lg"
            >
              Submit
            </button>
          </div>

          <div className="text-center mt-6">
            <span className="text-gray-600 italic">
              Don't have an account?{" "}
            </span>
            <button
              type="button"
              onClick={handleSignUp}
              className="text-blue-500 hover:text-blue-600 italic"
            >
              Sign Up
            </button>
          </div>
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">or</span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 font-medium text-base hover:bg-gray-200 transition-colors disabled:opacity-50 shadow-sm"
            >
              <FcGoogle size={25} />
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
