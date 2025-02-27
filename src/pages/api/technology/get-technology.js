import TechnologyHero from "@/models/admin/Tecnology/TechnologyHero";
import dbConnect from "@/utils/db";
const apiRoute = async (req, res) => {
  await dbConnect();
  const { technologyType } = req.query;
  console.log("solution type is here -----> ", technologyType);
  if (!technologyType) {
    return res.status(300).json({ message: "Industry Name is required !!!" });
  }

  try {
    const files = await TechnologyHero.find({
      technologyType,
    })
      .populate("why4step benefit faq")
      .populate({
        path: "solution",
        populate: {
          path: "solutionItem",
        },
      })
      .populate({ path: "success", populate: { path: "successItem" } })
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
    if (!files) {
      return res.status(400).json({ message: "Industry is not found" });
    }
    return res.status(200).json({ data: files });
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
