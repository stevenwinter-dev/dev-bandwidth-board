'use client';

import { Settings, LogIn } from 'lucide-react';
import Link from 'next/link';

export function Header() {

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
      </div>
    </header>
  );
}