import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import StatusForm from "@/components/StatusForm";

export default async function Dashboard() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="ml-64 pt-12 p-6 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Welcome message with user data */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">My Dashboard</h1>
          <div className="flex items-center gap-3">
            {user.image && (
              <img
                src={user.image}
                alt={user.name || "User"}
                className="w-10 h-10 rounded-full"
              />
            )}
            <span className="text-white">{user.name || user.email}</span>
          </div>
        </div>

        {/* Status Update Section */}
        <section className="bg-stone-900 rounded-xl p-6 shadow-sm border border-stone-800">
          <h2 className="text-xl font-semibold text-white mb-4">Update Your Availability</h2>
          <StatusForm />
        </section>

        {/* Current Bandwidth Widget */}
        <section className="bg-stone-900 rounded-xl p-6 shadow-sm border border-stone-800">
          <h2 className="text-xl font-semibold text-white mb-4">My Current Status</h2>
          <div className="text-stone-300 space-y-2">
            <p>Welcome back, <span className="text-blue-400">{user.name}</span>!</p>
            <p>Your recent availability will appear here.</p>
          </div>
        </section>

        {/* Debug: Show full user data (optional) */}
        <details className="bg-stone-900 rounded-xl p-4 text-stone-300">
          <summary className="cursor-pointer">User Session Data</summary>
          <pre className="mt-2 overflow-x-auto">
            {JSON.stringify(user, null, 2)}
          </pre>
        </details>
      </div>
    </main>
  );
}