// import { verifyAdmin } from "@/middlewares/verifyAdmin";
// export default verifyAdmin(async function handler(req, res) {
//   res.json({ message: 'Admin API accessed successfully' });
// });

import dbConnect from "@/utils/db";

// src/middlewares/verifyAdmin.js
export const verifyAdmin = (handler) => async (req, res) => {
 await dbConnect()
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  return handler(req, res);
};
