'use client';

import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function SignOut() {
    const router = useRouter();

    const handleSignOut = async () => {
        await authClient.signOut(); // Sign out the user
        router.push('/teams'); // Redirect to /teams after signing out
    };

    return (
        <button
            onClick={handleSignOut}
            className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        >
            <LogOut className="h-4 w-4" />
            Sign Out
        </button>
    );
}