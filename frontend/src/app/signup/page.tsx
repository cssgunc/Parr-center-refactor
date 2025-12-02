"use client";
import SignUpForm from "@/components/Signup/SignupForm";

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic';

export default function Signup() {
  return (
    <>
      <SignUpForm />
    </>
  );
}
