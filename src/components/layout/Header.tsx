'use client';

import { useSession, signIn } from "next-auth/react";
import { Settings, LogIn } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  const { data: session } = useSession();
  const user = session?.user;
  const userInitials = user?.name ? user.name.split(' ').map(n => n[0]).join('') : null; // Extract initials or use null

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

        {/* Right side - Controls */}
        <div className="flex items-center gap-3 px-8">
            {user && (
                <button className="rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200 cursor-pointer">
                    <Settings className="h-4 w-4" />
                </button>
            )}
            
          {userInitials ? (
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-xs font-medium text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
              {userInitials}
            </div>
          ) : (
            <button
              onClick={() => signIn("github")}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <LogIn className="h-4 w-4" />
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}