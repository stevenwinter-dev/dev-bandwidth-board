'use server'

import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export const signIn = async () => {
    const response = await auth.api.signInEmail({
        body: {
            email: "test@test.com",
            password: "password",
        },
    });

    console.log("Sign-in response:", response);

    if (response.token) {
        // Redirect to /dashboard after successful sign-in
        return { success: true, redirectUrl: "/dashboard" };
    }

    throw new Error("Sign-in failed");
}

export const signUp = async () => {
    await auth.api.signUpEmail({
        body: {
            email: "test@test.com",
            password: "password",
            name: "Steven Test"
        }
    })
}