"use client";
import ForgotPasswordForm from "@/components/ForgotPassword/ForgotPasswordForm";

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic';

export default function Login() {
  return (
    <>
      <ForgotPasswordForm />
    </>
  );
}
