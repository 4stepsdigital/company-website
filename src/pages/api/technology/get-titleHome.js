import dbConnect from "@/utils/db";
import TechnologyHero from "@/models/admin/Tecnology/TechnologyHero";

export default async function handler(req, res) {
  await dbConnect(); // Ensure DB is connected

  if (req.method === "GET") {
    try {
      // Fetch only the 'title' field from the SolutionHero collection
      const titles = await TechnologyHero.find(
        {},
        { title: 1, description: 1, path: 1, _id: 0 }
      );
      //   console.log("Fetched titles:", titles); // Log the titles for debugging

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
