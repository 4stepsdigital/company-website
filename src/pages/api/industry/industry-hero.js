import multer from "multer";
import path from "path";
import fs from "fs";
import dbConnect from "@/utils/db";
import Industry from "@/models/admin/Industry/Industry";
import Why4Steps from "@/models/admin/Industry/Why4Steps";
import Success from "@/models/admin/Industry/Success";
import SubIndustryProduct from "@/models/admin/Industry/Product/IndustrySolution";
import InProduct from "@/models/admin/Industry/Product/InSolution";
import SubIndustryServices from "@/models/admin/Industry/Services/IndustrySolution";
import InService from "@/models/admin/Industry/Services/InSolution";
import SubIndustrySolution from "@/models/admin/Industry/IndustrySolution";
import InSolution from "@/models/admin/Industry/InSolution";
import IndustryFaq from "@/models/admin/Industry/Faq/IndustryFaq";
import Benefits from "@/models/admin/Industry/Benefits/Benefits";
import InSuccess from "@/models/admin/Industry/InSuccess";

// Define upload directories
const uploadDirectories = {
  heroSection: "./public/uploads/industry/herosection",
  success: "./public/uploads/industry/industrysuccess",
  product: "./public/uploads/industry/industryProducts",
  service: "./public/uploads/industry/industryServices",
  solution: "./public/uploads/industry/industrysolution",
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

      const { title,industryName, description, contentsummary } = req.body;

      const fileData = req.file && {
        title,
        filename: req.file.filename,
        description,
        industryName,
        contentsummary,
        path: `/uploads/industry/herosection/${req.file.filename}`,
      };

      try {
        const updatedFile = await Industry.create(fileData);
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
      const data = await Industry.findById(id)
        .populate("why4step benefit faq")
        .populate({ path: "solution", populate: { path: "solutionItem" } })
        .populate({ path: "success", populate: { path: "successItem" } })
        .populate({ path: "product", populate: { path: "productItem" } })
        .populate({ path: "service", populate: { path: "serviceItem" } });

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
      if (data?.why4step) await Why4Steps.findByIdAndDelete(data.why4step._id);

      // if (data?.success) {
      //   for (const item of data?.success) {
      //     deleteFile(path.join(uploadDirectories.success, item.filename));
      //     await Success.findByIdAndDelete(item._id);
      //   }
      // }
      if (data?.success) {
        for (const item of data.success?.successItem || []) {
          deleteFile(path.join(uploadDirectories.success, item.filename));
          await Success.findByIdAndDelete(item._id);
        }
        await InSuccess.findByIdAndDelete(data.success._id);
      }

      if (data?.product) {
        for (const item of data.product?.productItem || []) {
          deleteFile(path.join(uploadDirectories.product, item.filename));
          await SubIndustryProduct.findByIdAndDelete(item._id);
        }
        await InProduct.findByIdAndDelete(data.product._id);
      }

      if (data?.service) {
        for (const item of data.service?.serviceItem || []) {
          deleteFile(path.join(uploadDirectories.service, item.filename));
          await SubIndustryServices.findByIdAndDelete(item._id);
        }
        await InService.findByIdAndDelete(data.service._id);
      }

      if (data?.solution) {
        for (const item of data.solution?.solutionItem || []) {
          deleteFile(path.join(uploadDirectories.solution, item.filename));
          await SubIndustrySolution.findByIdAndDelete(item._id);
        }
        await InSolution.findByIdAndDelete(data.solution._id);
      }

      if (data?.faq) await IndustryFaq.findByIdAndDelete(data.faq._id);
      if (data?.benefit) await Benefits.findByIdAndDelete(data.benefit._id);

      // Delete main file and document
      deleteFile(path.join(uploadDirectories.heroSection, data.filename));
      await Industry.findByIdAndDelete(id);

      return res.status(200).json({ message: "Industry deleted successfully" });
    } catch (error) {
      console.error("Error during deletion:", error);
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  } else if (req.method === "GET") {
    try {
      const files = await Industry.find({});
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
