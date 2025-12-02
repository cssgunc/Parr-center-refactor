"use client";
import LoginForm from "@/components/Login/LoginForm";

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic';

export default function Login() {
  return (
    <>
      <LoginForm />
    </>
  );
}
