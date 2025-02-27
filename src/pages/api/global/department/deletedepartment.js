// src/pages/api/admin/webinar/departments/deletedepartment.js

import Depatment from "@/models/admin/global/department";
import dbConnect from "@/utils/db";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "DELETE") {
    try {
      const { id } = req.body;
      await Depatment.findByIdAndDelete(id);
      return res.status(204).json({});
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
