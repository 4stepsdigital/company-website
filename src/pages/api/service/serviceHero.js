import dbConnect from "@/utils/db";
import multer from "multer";
import path from "path";
import fs from "fs";
import ServiceHero from "@/models/admin/ServicesModel/ServiceHero";
import Why4StepService from "@/models/admin/ServicesModel/Why4StepS";
import SubServiceSuccess from "@/models/admin/ServicesModel/success/solutionsuccess";
import ServiceSuccess from "@/models/admin/ServicesModel/success/success";
import SubServiceProduct from "@/models/admin/ServicesModel/Product/IndustrySolution";
import ServiceProduct from "@/models/admin/ServicesModel/Product/InSolution";
import SubServiceServices from "@/models/admin/ServicesModel/Services/IndustrySolution";
import ServiceService from "@/models/admin/ServicesModel/Services/InSolution";
import SubServiceSolution from "@/models/admin/ServicesModel/solution/solutionItem";
import ServiceSolution from "@/models/admin/ServicesModel/solution/solution";
import ServiceFaq from "@/models/admin/ServicesModel/Faq/IndustryFaq";
import ServiceBenefits from "@/models/admin/ServicesModel/Benefits/Benefits";
import ServiceOverviewItem from "@/models/admin/ServicesModel/SolutionOverview/ServiceOverviewItem";
import ServiceOverview from "@/models/admin/ServicesModel/SolutionOverview/ServiceOverview";
const uploadDirectories = {
  heroSection: "./public/uploads/service/serviceHero",
  success: "./public/uploads/service/servicesuccess",
  product: "./public/uploads/service/serviceProducts",
  service: "./public/uploads/service/serviceServices",
  solution: "./public/uploads/service/serviceSolution",
  overview: "./public/uploads/service/serviceOvervies",
};
const uploadDirectory = "./public/uploads/service/serviceHero";
if (!fs.existsSync(uploadDirectory))
  fs.mkdirSync(uploadDirectory, { recursive: true });

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

      const { title, serviceName, description, serviceType } = req.body;
      const filePath = `/uploads/service/serviceHero/${req.file.filename}`;
      // console.log("req body data is here --> ", req.body);
      try {
        const service = await ServiceHero.create({
          title,
          serviceName,
          serviceType,
          description,
          filename: req.file.filename,
          path: filePath,
        });
        res.status(201).json({ data: service });
      } catch (error) {
        res
          .status(500)
          .json({ error: "Database error", details: error.message });
      }
    });
    // not workig the GET METhOD HERE
  } else if (req.method === "GET") {
    try {
      const solution = await ServiceHero.find({})
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
      const data = await ServiceHero.findById(id)
        .populate("Why4StepS benefit faq")
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

      // Delete associated documents and files
      if (data?.Why4StepS)
        await Why4StepService.findByIdAndDelete(data.Why4StepS._id);
      if (data?.success) {
        for (const item of data.success?.successItem || []) {
          deleteFile(path.join(uploadDirectories.success, item.filename));
          await SubServiceSuccess.findByIdAndDelete(item._id);
        }
        await ServiceSuccess.findByIdAndDelete(data.success._id);
      }

      if (data?.product) {
        for (const item of data.product?.productItem || []) {
          deleteFile(path.join(uploadDirectories.product, item.filename));
          await SubServiceProduct.findByIdAndDelete(item._id);
        }
        await ServiceProduct.findByIdAndDelete(data.product._id);
      }
      if (data?.overview) {
        for (const item of data.overview?.overviewItem || []) {
          deleteFile(path.join(uploadDirectories.overview, item.filename));
          await ServiceOverviewItem.findByIdAndDelete(item._id);
        }
        await ServiceOverview.findByIdAndDelete(data.overview._id);
      }

      if (data?.service) {
        for (const item of data.service?.serviceItem || []) {
          deleteFile(path.join(uploadDirectories.service, item.filename));
          await SubServiceServices.findByIdAndDelete(item._id);
        }
        await ServiceService.findByIdAndDelete(data.service._id);
      }

      if (data?.solution) {
        for (const item of data.solution?.solutionItem || []) {
          deleteFile(path.join(uploadDirectories.solution, item.filename));
          await SubServiceSolution.findByIdAndDelete(item._id);
        }
        await ServiceSolution.findByIdAndDelete(data.solution._id);
      }

      if (data?.faq) await ServiceFaq.findByIdAndDelete(data.faq._id);
      if (data?.benefit)
        await ServiceBenefits.findByIdAndDelete(data.benefit._id);

      // Delete main file and document
      deleteFile(path.join(uploadDirectories.heroSection, data.filename));
      await ServiceHero.findByIdAndDelete(id);

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
