import TechnologyHero from "@/models/admin/Tecnology/TechnologyHero";
import dbConnect from "@/utils/db";

const apiRoute = async (req, res) => {
  await dbConnect();
  const { title } = req.query;
  // console.log("Received title:---------------->>", title);
  if (!title) {
    return res.status(400).json({ message: "Title is required!!!" });
  }
  try {
    const file = await TechnologyHero.findOne({ title })
      .populate("why4step benefit faq")
      .populate({
        path: "solution",
        populate: {
          path: "solutionItem",
        },
      })
      .populate({
        path: "success",
        populate: {
          path: "successItem",
        },
      })
      .populate({
        path: "product",
        populate: {
          path: "productItem",
        },
      })
      .populate({
        path: "service",
        populate: {
          path: "serviceItem",
        },
      })
      .populate({
        path: "overview",
        populate: {
          path: "overviewItem",
        },
      });

    if (!file) {
      return res.status(404).json({ message: "Technology is not found" });
    }
    return res.status(200).json({ data: file });
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export default apiRoute;
export const config = {
  api: {
    bodyParser: false,
  },
};
