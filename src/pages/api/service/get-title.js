import dbConnect from "@/utils/db";
import ServiceHero from "@/models/admin/ServicesModel/ServiceHero";

export default async function handler(req, res) {
  await dbConnect(); // Ensure DB is connected

  if (req.method === "GET") {
    try {
      // Fetch only the 'title' field from the SolutionHero collection
      const titles = await ServiceHero.find({}, { title: 1, _id: 0 });

      if (!titles || titles.length === 0) {
        return res.status(404).json({ error: "No titles found" });
      }

      // Respond with the titles
      res.status(200).json(titles);
    } catch (error) {
      console.error("Error fetching titles:", error.message);
      res.status(500).json({
        error: "Database error",
        details: error.message,
      });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
