import Industry from "@/models/admin/Industry/Industry";
import dbConnect from "@/utils/db";

const apiRoute = async (req, res) => {
    await dbConnect();
    const {industryName}=req.query;
    if(!industryName){
      return res.status(300).json({message:"Industry Name is required !!!"})
    }
 
 if (req.method === "GET") {
    try {
      const files = await Industry.findOne({industryName}).populate('why4step benefit faq').populate({
        path: 'solution', 
        populate: {
          path: 'solutionItem', 
        },
      }).populate({ path: "success", populate: { path: "successItem" } }).populate({
        path: 'product', 
        populate: {
          path: 'productItem', 
        },
      }).populate({
        path: 'service', 
        populate: {
          path: 'serviceItem', 
        },
      }).populate({
        path: 'overview', 
        populate: {
          path: 'overviewItem', 
        },
      });
      if(!files){
        return res.status(400).json({message:"Industry is not found"})
      }
      return res.status(200).json({ data: files });
    } catch (error) {
      console.error("Error fetching data:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST", "GET", "DELETE"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
};

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
