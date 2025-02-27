import dbConnect from "@/utils/db";
import Solution from "@/models/admin/solution/solutionMaster";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const { name } = req.body;
      if (!name) {
        return res
          .status(400)
          .json({ success: false, error: "Name is required" });
      }

      const newSolution = await Solution.create({ name });
      res.status(201).json({ success: true, data: newSolution });
    } catch (error) {
      console.error("Error creating solution:", error);
      res
        .status(500)
        .json({ success: false, error: "Server error: " + error.message });
    }
  } else if (req.method === "GET") {
    try {
      const solutions = await Solution.find({});
      res.status(200).json({ success: true, data: solutions });
    } catch (error) {
      console.error("Error fetching solutions:", error);
      res
        .status(500)
        .json({ success: false, error: "Server error: " + error.message });
    }
  } else if (req.method === "PUT") {
    try {
      const { id, name } = req.body;
      if (!id || !name) {
        return res
          .status(400)
          .json({ success: false, error: "ID and Name are required" });
      }

      const updatedSolution = await Solution.findByIdAndUpdate(
        id,
        { name },
        { new: true }
      );
      if (!updatedSolution) {
        return res
          .status(404)
          .json({ success: false, error: "Solution not found" });
      }

      res.status(200).json({ success: true, data: updatedSolution });
    } catch (error) {
      console.error("Error updating solution:", error);
      res
        .status(500)
        .json({ success: false, error: "Server error: " + error.message });
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      if (!id) {
        return res
          .status(400)
          .json({ success: false, error: "ID is required" });
      }

      const deletedSolution = await Solution.findByIdAndDelete(id);
      if (!deletedSolution) {
        return res
          .status(404)
          .json({ success: false, error: "Solution not found" });
      }

      res.status(200).json({ success: true, message: "Solution deleted" });
    } catch (error) {
      console.error("Error deleting solution:", error);
      res
        .status(500)
        .json({ success: false, error: "Server error: " + error.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
