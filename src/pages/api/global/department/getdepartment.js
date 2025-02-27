// src/pages/api/admin/webinar/departments/getdepartment.js
import dbConnect from "@/utils/db";
import Depatment from "@/models/admin/global/department";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const departments = await Depatment.find({});
      return res.status(200).json(departments);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
