import multer from "multer";
import path from "path";
import fs from "fs";
import dbConnect from "@/utils/db";
import TechnologyHero from "@/models/admin/Tecnology/TechnologyHero";
import Why4StepsTech from "@/models/admin/Tecnology/Why4StepsTech";
import SuccessSubItem from "@/models/admin/Tecnology/Success1/Success";
import TechSuccess from "@/models/admin/Tecnology/Success1/InSuccess";
import SubTechnologyProduct from "@/models/admin/Tecnology/Product/IndustrySolution";
import TechProduct from "@/models/admin/Tecnology/Product/InSolution";
import SubTechnologyServices from "@/models/admin/Tecnology/Services/IndustrySolution";
import TechService from "@/models/admin/Tecnology/Services/InSolution";
import SubTechnologySolution from "@/models/admin/Tecnology/solution1/IndustrySolution";
import TechSolution from "@/models/admin/Tecnology/solution1/InSolution";
import TechFaq from "@/models/admin/Tecnology/Faq/IndustryFaq";
import TechBenefits from "@/models/admin/Tecnology/Benefits/Benefits";
import TechnologyOverviewItem from "@/models/admin/Tecnology/TechnologyOverview/TechnologyOverviewItem";
import TechnologyOverview from "@/models/admin/Tecnology/TechnologyOverview/TechnologyOverview";

// Define upload directories
const uploadDirectories = {
  heroSection: "./public/uploads/technology/herosection",
  success: "./public/uploads/technology/technologysuccess",
  product: "./public/uploads/technology/technologyProducts",
  service: "./public/uploads/technology/technologyServices",
  solution: "./public/uploads/technology/technologysolution",
  overview: "./public/uploads/technology/technologysolution",
};

// Ensure upload directories exist
Object.values(uploadDirectories).forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Multer configuration
const storage = multer.diskStorage({
  destination: uploadDirectories.heroSection,
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = `${file.fieldname}-${Date.now()}${ext}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

const apiRoute = async (req, res) => {
  await dbConnect();

  if (req.method === "POST") {
    upload.single("file")(req, res, async (err) => {
      if (err instanceof multer.MulterError || err) {
        console.error("File upload error:", err);
        return res.status(500).json({ error: "File upload failed" });
      }

      const { title,technologyName, description,technologyType, contentsummary } = req.body;

      const fileData = req.file && {
        title,
        filename: req.file.filename,
        description,
        technologyName,
        technologyType,
        contentsummary,
        path: `/uploads/technology/herosection/${req.file.filename}`,
      };

      try {
        const updatedFile = await TechnologyHero.create(fileData);
        return res.status(200).json({ data: updatedFile });
      } catch (error) {
        console.error("Error saving file data:", error);
        return res.status(500).json({ message: "Internal Server Error", error });
      }
    });
  } else if (req.method === "DELETE") {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "ID is required!" });
    }

    try {
      const data = await TechnologyHero.findById(id)
        .populate("why4step benefit faq technologyType")
        .populate({ path: "solution", populate: { path: "solutionItem" } })
        .populate({ path: "success", populate: { path: "successItem" } })
        .populate({ path: "product", populate: { path: "productItem" } })
        .populate({ path: "service", populate: { path: "serviceItem" } })
        .populate({
          path: "overview",
          populate: {
            path: "overviewItem",
          },
        });

      if (!data) {
        return res.status(404).json({ message: "Item not found!" });
      }

      // Helper function to delete files
      const deleteFile = (filePath) => {
        if (filePath && fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      };
      if (data?.why4step) await Why4StepsTech.findByIdAndDelete(data.why4step._id);
      if (data?.success) {
        for (const item of data.success?.successItem || []) {
          deleteFile(path.join(uploadDirectories.success, item.filename));
          await SuccessSubItem.findByIdAndDelete(item._id);
        }
        await TechSuccess.findByIdAndDelete(data.success._id);
      }

      if (data?.product) {
        for (const item of data.product?.productItem || []) {
          deleteFile(path.join(uploadDirectories.product, item.filename));
          await SubTechnologyProduct.findByIdAndDelete(item._id);
        }
        await TechProduct.findByIdAndDelete(data.product._id);
      }
      if (data?.overview) {
        for (const item of data.overview?.overviewItem || []) {
          deleteFile(path.join(uploadDirectories.overview, item.filename));
          await TechnologyOverviewItem.findByIdAndDelete(item._id);
        }
        await TechnologyOverview.findByIdAndDelete(data.overview._id);
      }

      if (data?.service) {
        for (const item of data.service?.serviceItem || []) {
          deleteFile(path.join(uploadDirectories.service, item.filename));
          await SubTechnologyServices.findByIdAndDelete(item._id);
        }
        await TechService.findByIdAndDelete(data.service._id);
      }

      if (data?.solution) {
        for (const item of data.solution?.solutionItem || []) {
          deleteFile(path.join(uploadDirectories.solution, item.filename));
          await SubTechnologySolution.findByIdAndDelete(item._id);
        }
        await TechSolution.findByIdAndDelete(data.solution._id);
      }

      if (data?.faq) await TechFaq.findByIdAndDelete(data.faq._id);
      if (data?.benefit) await TechBenefits.findByIdAndDelete(data.benefit._id);

      // Delete main file and document
      deleteFile(path.join(uploadDirectories.heroSection, data.filename));
      await TechnologyHero.findByIdAndDelete(id);

      return res.status(200).json({ message: "Industry deleted successfully" });
    } catch (error) {
      console.error("Error during deletion:", error);
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  } else if (req.method === "GET") {
    try {
      const files = await TechnologyHero.find({});
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
