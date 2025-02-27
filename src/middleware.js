import { NextResponse } from "next/server";
import { parse } from "cookie";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "./utils/generateTokens";
export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const method = req.method;
  const cookieHeader = req.headers.get("cookie") || "";
  const cookies = parse(cookieHeader);
  const accessToken = cookies.accessToken;
  const refreshToken = cookies.refreshToken;

  //exclude only login api 

  if (pathname === "/api/auth/login" && method === "POST") {
    return NextResponse.next();
  }

  // If on login page and already authenticated, redirect to admin dashboard
  if (pathname === "/admin/login") {
    if (refreshToken) {
      try {
        const refreshPayload = await verifyRefreshToken(refreshToken); // Verify once

        if (!refreshPayload) {
          return NextResponse.redirect(new URL("/admin/login", req.url));
        }

        const newAccessToken = await generateAccessToken(refreshPayload.id);
        const newRefreshToken = await generateRefreshToken(refreshPayload.id);
        const response = NextResponse.redirect(new URL("/admin", req.url));

        response.cookies.set("accessToken", newAccessToken, {
          httpOnly: true,
          sameSite: "Lax",
          path: "/",
          maxAge: 20 * 60, // 20 minutes
        });

        response.cookies.set("refreshToken", newRefreshToken, {
          httpOnly: true,
          sameSite: "Lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        return response;
      } catch (error) {
        console.error("Token verification failed:", error);
        const response = NextResponse.next();
        response.cookies.delete("accessToken");
        response.cookies.delete("refreshToken");
        return response;
      }
    }
    return NextResponse.next();
  }

  // For GET requests that aren't admin routes, allow without authentication

  if (method === "GET"&&pathname.startsWith('/api')) {
    return NextResponse.next();
  }
  if (method === "POST"&&pathname.startsWith('/api/zoho')) {
    return NextResponse.next();
  }
  //handle routes that start with /admin route

 // If trying to access /admin
 if (pathname.startsWith("/admin")) {
  try {
    // ✅ If access token is valid, allow access (no need to refresh)
    if (accessToken && (await verifyAccessToken(accessToken))) {
      return NextResponse.next();
    }

    // ✅ If access token is expired but refresh token is valid, generate new tokens
    if (refreshToken) {
      const refreshPayload = await verifyRefreshToken(refreshToken);
      if (!refreshPayload) {
        throw new Error("Invalid refresh token");
      }

      // Generate new tokens
      const newAccessToken = await generateAccessToken(refreshPayload.id);
      const newRefreshToken = await generateRefreshToken(refreshPayload.id);
      const response = NextResponse.next(); // Allow access to admin

      // Set new cookies
      response.cookies.set("accessToken", newAccessToken, {
        httpOnly: true,
        sameSite: "Lax",
        path: "/",
        maxAge: 20 * 60, // 20 minutes
      });

      response.cookies.set("refreshToken", newRefreshToken, {
        httpOnly: true,
        sameSite: "Lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    }
  } catch (error) {
    console.error("Authentication error:", error);
  }

  return NextResponse.redirect(new URL("/admin/login", req.url));
}

  //handle routes that starts with /api

   // ✅ Protect API routes (PUT, POST, DELETE)
   if (["PUT", "POST", "DELETE"].includes(method) && pathname.startsWith('/api')) {
    try {
      if (accessToken && (await verifyAccessToken(accessToken))) {
        return NextResponse.next();
      }

      if (refreshToken) {
        const refreshPayload = await verifyRefreshToken(refreshToken);
        if (!refreshPayload) {
          throw new Error("Invalid refresh token");
        }

        const newAccessToken = await generateAccessToken(refreshPayload.id);
        const newRefreshToken = await generateRefreshToken(refreshPayload.id);
        const response = NextResponse.next();

        response.cookies.set("accessToken", newAccessToken, {
          httpOnly: true,
          sameSite: "Lax",
          path: "/",
          maxAge: 20 * 60,
        });
        response.cookies.set("refreshToken", newRefreshToken, {
          httpOnly: true,
          sameSite: "Lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        return response;
      }
    } catch (error) {
      console.error("API Authentication error:", error);
    }

    return NextResponse.json({ message: "Unauthorized: Please log in" }, { status: 401 });
  }


  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/admin/:path*"],
};
