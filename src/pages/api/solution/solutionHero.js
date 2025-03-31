import dbConnect from "@/utils/db";
import multer from "multer";
import path from "path";
import fs from "fs";
import SolutionHero from "@/models/admin/solution/solutionHero";
import Why4StepSolution from "@/models/admin/solution/Why4StepS";
import SolutionSuccessItem from "@/models/admin/solution/success/solutionsuccess";
import SolutionSuccess from "@/models/admin/solution/success/success";
import SubSolutionProduct from "@/models/admin/solution/Product/IndustrySolution";
import SolutionProduct from "@/models/admin/solution/Product/InSolution";
import SubSolutionServices from "@/models/admin/solution/Services/IndustrySolution";
import SolutionService from "@/models/admin/solution/Services/InSolution";
import SolutionSolutionItem from "@/models/admin/solution/solution/solutionItem";
import SolutionSolution from "@/models/admin/solution/solution/solution";
import SolutionBenefits from "@/models/admin/solution/Benefits/Benefits";
import SolutionFaq from "@/models/admin/solution/Faq/IndustryFaq";
import SolutionOverviewItem from "@/models/admin/solution/SolutionOverview/SolutionOverviewItem";
import SolutionOverview from "@/models/admin/solution/SolutionOverview/SolutionOverview";
// const uploadDirectories = {
//   heroSection: "./public/uploads/solution/solutionHero",
//   success: "./public/uploads/solution/industrysuccess",
//   product: "./public/uploads/solution/SolutionProducts",
//   service: "./public/uploads/solution/SolutionServices",
//   solution: "./public/uploads/solution/SolutionSolution",
//   overview: "./public/uploads/solution/SolutionOverview",
// };

// const uploadDirectory = "./public/uploads/solution/solutionHero";
// if (!fs.existsSync(uploadDirectory))
//   fs.mkdirSync(uploadDirectory, { recursive: true });
const uploadDirectories = {
  heroSection: path.join(process.cwd(), "uploads/solution/solutionHero"),
  success: path.join(process.cwd(), "uploads/solution/industrysuccess"),
  product: path.join(process.cwd(), "uploads/solution/SolutionProducts"),
  service: path.join(process.cwd(), "uploads/solution/SolutionServices"),
  solution: path.join(process.cwd(), "uploads/solution/SolutionSolution"),
  overview: path.join(process.cwd(), "uploads/solution/SolutionOverview"),
};
Object.values(uploadDirectories).forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});
const uploadDirectory = path.join(process.cwd(), "uploads/solution/solutionHero"); // Define your upload directory
// Ensure upload directory exists
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDirectory),
  filename: (req, file, cb) => cb(null, file.originalname),
});

const upload = multer({ storage });

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    upload.single("file")(req, res, async (err) => {
      if (err)
        return res.status(500).json({ error: "Upload failed", details: err });

      const { title, solutionName, description, solutionType } = req.body;
      const filePath = `/api/uploads/solution/solutionHero/${req.file.filename}`;
      // console.log("req body data is here --> ", req.body);
      try {
        const solution = await SolutionHero.create({
          title,
          solutionName,
          solutionType,
          description,
          filename: req.file.filename,
          path: filePath,
        });
        res.status(201).json({ data: solution });
      } catch (error) {
        res
          .status(500)
          .json({ error: "Database error", details: error.message });
      }
    });
    // not workig the GET METhOD HERE
  } else if (req.method === "GET") {
    try {
      const solution = await SolutionHero.find({})
        .populate("Why4StepS benefit faq")
        .populate({ path: "success", populate: { path: "successItem" } })
        .populate("Why4StepS")
        .populate({ path: "solution", populate: { path: "solutionItem" } })
        .populate({ path: "product", populate: { path: "productItem" } })
        .populate({ path: "service", populate: { path: "serviceItem" } });
      if (!solution) {
        return res.status(404).json({ error: "Solution not found" });
      }
      res.status(200).json(solution);
    } catch (error) {
      res.status(500).json({ error: "Database error", details: error.message });
    }
  } else if (req.method === "DELETE") {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "ID is required!" });
    }

    try {
      const data = await SolutionHero.findById(id)
        .populate("Why4StepS benefit faq")
        .populate({ path: "solution", populate: { path: "solutionItem" } })
        .populate({ path: "success", populate: { path: "successItem" } })
        .populate({ path: "product", populate: { path: "productItem" } })
        .populate({ path: "service", populate: { path: "serviceItem" } })
        .populate({ path: "overview", populate: { path: "overviewItem" } });
      if (!data) {
        return res.status(404).json({ message: "Item not found!" });
      }

      // Helper function to delete files
      const deleteFile = (filePath) => {
        if (filePath && fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      };

      // Delete associated documents and files
      if (data?.Why4StepS)
        await Why4StepSolution.findByIdAndDelete(data.Why4StepS._id);

      // if (data?.success) {
      //   for (const item of data?.success) {
      //     deleteFile(path.join(uploadDirectories.success, item.filename));
      //     await Success.findByIdAndDelete(item._id);
      //   }
      // }
      if (data?.success) {
        for (const item of data.success?.successItem || []) {
          deleteFile(path.join(uploadDirectories.success, item.filename));
          await SolutionSuccessItem.findByIdAndDelete(item._id);
        }
        await SolutionSuccess.findByIdAndDelete(data.success._id);
      }
      if (data?.overview) {
        for (const item of data.overview?.overviewItem || []) {
          deleteFile(path.join(uploadDirectories.overview, item.filename));
          await SolutionOverviewItem.findByIdAndDelete(item._id);
        }
        await SolutionOverview.findByIdAndDelete(data.overview._id);
      }

      if (data?.product) {
        for (const item of data.product?.productItem || []) {
          deleteFile(path.join(uploadDirectories.product, item.filename));
          await SubSolutionProduct.findByIdAndDelete(item._id);
        }
        await SolutionProduct.findByIdAndDelete(data.product._id);
      }

      if (data?.service) {
        for (const item of data.service?.serviceItem || []) {
          deleteFile(path.join(uploadDirectories.service, item.filename));
          await SubSolutionServices.findByIdAndDelete(item._id);
        }
        await SolutionService.findByIdAndDelete(data.service._id);
      }

      if (data?.solution) {
        for (const item of data.solution?.solutionItem || []) {
          deleteFile(path.join(uploadDirectories.solution, item.filename));
          await SolutionSolutionItem.findByIdAndDelete(item._id);
        }
        await SolutionSolution.findByIdAndDelete(data.solution._id);
      }

      if (data?.faq) await SolutionFaq.findByIdAndDelete(data.faq._id);
      if (data?.benefit)
        await SolutionBenefits.findByIdAndDelete(data.benefit._id);

      // Delete main file and document
      deleteFile(path.join(uploadDirectories.heroSection, data.filename));
      await SolutionHero.findByIdAndDelete(id);

      return res.status(200).json({ message: "Industry deleted successfully" });
    } catch (error) {
      console.error("Error during deletion:", error);
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  } else {
    res.setHeader("Allow", ["POST", "DELETE", "GET"]);
    res.status(405).json({ error: "Method not allowed" });
  }
}

export const config = { api: { bodyParser: false } };
