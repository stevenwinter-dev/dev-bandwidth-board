'use client';

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <button
        onClick={() => signIn("github")}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Sign in with GitHub
      </button>
    </div>
  );
}