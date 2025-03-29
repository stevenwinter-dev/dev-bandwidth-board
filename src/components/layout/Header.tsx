import { Settings, LogIn, LogOut } from 'lucide-react';
import Link from 'next/link';
import SignOut from '../SignOut';
import { signIn, signUp } from '@/server/users';
import { getServerSession } from '@/lib/getServerSession';

export async function Header() {
  const session = await getServerSession();

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
        {/* Conditional Rendering for Sign In/Sign Up */}
        {!session ? (
          <>
            <button 
              onClick={signIn} 
              className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <LogIn className="h-4 w-4" />
              Sign In
            </button>
            <button 
              onClick={signUp} 
              className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <LogIn className="h-4 w-4" />
              Sign Up
            </button>
          </>
        ) : (
         <SignOut />
        )}
      </div>
    </header>
  );
}