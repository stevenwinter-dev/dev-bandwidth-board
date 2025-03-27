import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <main className="ml-64 pt-12 p-6 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Welcome message with user data */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">{!session ? "Not Authenticated" : session.user.name}'s Dashboard</h1>
        </div>

        {/* Status Update Section */}
        <section className="bg-stone-900 rounded-xl p-6 shadow-sm border border-stone-800">
          <h2 className="text-xl font-semibold text-white mb-4">Update Your Availability</h2>
        </section>

        {/* Current Bandwidth Widget */}
        <section className="bg-stone-900 rounded-xl p-6 shadow-sm border border-stone-800">
          <h2 className="text-xl font-semibold text-white mb-4">My Current Status</h2>
          <div className="text-stone-300 space-y-2">
            <p>Welcome back, <span className="text-blue-400"></span>!</p>
            <p>Your recent availability will appear here.</p>
          </div>
        </section>

      </div>
    </main>
  );
}