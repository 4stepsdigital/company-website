import * as jose from 'jose';
import { parse } from "cookie";
import dbConnect from "@/utils/db";
import UserAdmin from '@/models/admin/UserAdmin';

export default async function handler(req, res) {
  await dbConnect();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Parse cookies
    const cookieHeader = req.headers.cookie || "";
    const cookies = parse(cookieHeader);
    const refreshToken = cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ error: "Refresh token missing" });
    }

    // Verify refresh token
    const secret = new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET);
    const { payload } = await jose.jwtVerify(refreshToken, secret);

    // Find user in database
    const user = await UserAdmin.findOne({ _id: payload?.id });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Remove refresh token from database
    user.refreshToken = undefined;
    user.refreshTokenExpiry = undefined;
    await user.save(); // Await to ensure database update is completed

    console.log("User Logged Out successfully:", payload);

    // Clear both refreshToken and accessToken from browser
    res.setHeader("Set-Cookie", [
      "refreshToken=; HttpOnly; Secure; Path=/; Max-Age=0;",
      "accessToken=; HttpOnly; Secure; Path=/; Max-Age=0;"
    ]);

    return res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(401).json({ error: "Invalid or expired refresh token" });
  }
}
