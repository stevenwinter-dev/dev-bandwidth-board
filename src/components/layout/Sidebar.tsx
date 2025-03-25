'use client';

import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Home, Users, PieChart, Calendar, FileText, LogIn, LogOut } from 'lucide-react';

export function Sidebar() {
  const { data: session } = useSession();

  return (
    <nav className="fixed left-0 top-0 z-40 h-screen w-64 bg-slate-950 pt-12">
      <div className="flex flex-col space-y-1 p-4">
        <Link 
          href="/dashboard" 
          className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <Home className="h-4 w-4" />
          Dashboard
        </Link>
        
        <Link 
          href="/teams" 
          className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <Users className="h-4 w-4" />
          Teams
        </Link>
        
        <Link 
          href="/analytics" 
          className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <PieChart className="h-4 w-4" />
          Analytics
        </Link>
        
        <Link 
          href="/calendar" 
          className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <Calendar className="h-4 w-4" />
          Calendar
        </Link>
        
        <Link 
          href="/reports" 
          className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <FileText className="h-4 w-4" />
          Reports
        </Link>

        {/* Sign In/Sign Out Button */}
        {session ? (
          <button
            onClick={() => signOut()}
            className="flex cursor-pointer items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
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
    </nav>
  );
}