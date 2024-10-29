// middleware.ts
import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { initializeApp, applicationDefault } from "firebase-admin/app";

// Initialize Firebase Admin SDK
const app = initializeApp({
  credential: applicationDefault(),
});

export async function middleware(req) {
  const token = req.cookies.get("token"); // Get the token from cookies (or session)
  const url = req.nextUrl.clone;
  console.log(url);

  if (url.pathname.startsWith("/")) {
    if (!token) {
      url.pathname = "/login"; // Redirect to login if no token found
      url.searchParams.set("redirected", "true");
      return NextResponse.redirect(url);
    }

    try {
      // Verify the token with Firebase
      await getAuth(app).verifyIdToken(token);
      console.log("Token verified, proceeding to the next route.");
      return NextResponse.next(); // Allow access
    } catch (error) {
      url.pathname = "/login"; // Redirect to login if token is invalid
      console.log("Invalid token. Redirecting to login.");
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next(); // Allow access if route doesn't need protection
}

export const config = {
  matcher: ["/:path*"], // Protect all routes
};
