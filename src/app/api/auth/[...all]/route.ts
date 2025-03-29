import { auth } from "@/lib/auth"; // Path to your auth file
import { toNextJsHandler } from "better-auth/next-js";
import { getServerSession } from "@/lib/getServerSession";
import { signIn } from "@/server/users"; // Import the signIn function
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const url = new URL(request.url);

  // Handle /api/auth/signin
  if (url.pathname === "/api/auth/signin") {
    try {
      const result = await signIn(); // Call the signIn function
      return NextResponse.json(result); // Return the result (e.g., success and redirectUrl)
    } catch (error) {
      console.error("Sign-in failed:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }

  // Fallback to the default POST handler for other routes
  return toNextJsHandler(auth).POST(request);
}

export async function GET(request: Request) {
  const url = new URL(request.url);

  // Handle /api/auth/session separately
  if (url.pathname === "/api/auth/session") {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ session: null });
    }

    return NextResponse.json({ session });
  }

  // Fallback to the default GET handler for other routes
  return toNextJsHandler(auth).GET(request);
}