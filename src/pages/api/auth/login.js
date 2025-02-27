import bcrypt from 'bcrypt';
import dbConnect from '@/utils/db';
import { generateAccessToken, generateRefreshToken } from '@/utils/generateTokens';
import UserAdmin from '@/models/admin/UserAdmin';
import { serialize } from 'cookie';  // Correct import

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    await dbConnect();

    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const user = await UserAdmin.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Set access token expiry to 20 minutes and refresh token to 7 days
    const accessToken =await generateAccessToken(user?._id);  // Access token should expire in 20 minutes
    const refreshToken =await generateRefreshToken(user?._id);  // Refresh token should expire in 7 days
    // Save refresh token in the database
    user.refreshToken = refreshToken;
    await user.save();

    // Cookie options for local development
    const cookieOptions = {
      httpOnly: true, // Prevents client-side access to the cookie
      sameSite: 'Lax', // You can use 'Lax' or 'Strict' in local testing (depending on your cross-origin needs)
      path: '/', // Ensure cookie is accessible site-wide
    };

    res.setHeader('Set-Cookie', [
      serialize('accessToken', accessToken, {
        ...cookieOptions,
        maxAge: 20 * 60,  // Expiry for 20 minutes (in seconds)
      }),
      serialize('refreshToken', refreshToken, {
        ...cookieOptions,
        maxAge: 60 * 60 * 24 * 7,  // Expiry for 7 days (in seconds)
      }),
    ]);

    return res.status(200).json({ message: 'Login successful', accessToken });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}