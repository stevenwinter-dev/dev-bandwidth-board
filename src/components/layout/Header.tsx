'use client';

import { LogIn } from 'lucide-react';
import Link from 'next/link';
import SignOut from '../SignOut';
import { useEffect, useState } from 'react';

export default function Header() {
  const [session, setSession] = useState(null);

  // Fetch the session on the client side
  useEffect(() => {
    async function fetchSession() {
      try {
        const response = await fetch('/api/auth/session'); // Use the existing session endpoint
        const data = await response.json();
        setSession(data.session); // Assuming the session is returned as `data.session`
      } catch (error) {
        console.error("Failed to fetch session:", error);
      }
    }

    fetchSession();
  }, []);

  const handleSignIn = async () => {
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
      });
      const data = await response.json();

      if (data.success) {
        window.location.href = data.redirectUrl; // Redirect to /dashboard
      } else {
        console.error("Sign-in failed:", data.error);
      }
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  return (
    <header className="fixed top-0 z-50 w-full bg-slate-950">
      <div className="flex h-12 items-center justify-between px-8">
        {/* Left side - Logo & Title */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-emerald-700 to-purple-950 text-xs font-medium text-white">
            BW
          </div>
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Bandwidth Board
          </span>
        </Link>

        {/* Right side - Conditional Rendering for Sign In/Sign Out */}
        <div className="flex items-center gap-3">
          {!session ? (
            <button
              onClick={handleSignIn}
              className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <LogIn className="h-4 w-4" />
              Sign In
            </button>
          ) : (
            <SignOut />
          )}
        </div>
      </div>
    </header>
  );
}