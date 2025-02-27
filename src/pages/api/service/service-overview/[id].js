import multer from "multer";
import path from "path";
import fs from "fs";
import dbConnect from "@/utils/db";

import mongoose from "mongoose";
import ServiceOverviewItem from "@/models/admin/ServicesModel/SolutionOverview/ServiceOverviewItem";

const uploadDirectory = "./public/uploads/service/serviceOvervies";

// Ensure the upload directory exists
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Configure Multer storage
const storage = multer.diskStorage({
  destination: uploadDirectory,
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = `${file.fieldname}-${Date.now()}${ext}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

const apiRoute = async (req, res) => {
  await dbConnect();

  if (req.method !== "PUT") {
    res.setHeader("Allow", ["PUT"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const { id } = req.query;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid or missing ID" });
  }

  upload.single("file")(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ error: "File upload failed due to Multer error" });
    } else if (err) {
      return res.status(500).json({ error: "Unknown error during file upload" });
    }

    const { title, editorHtmlDescription: editorHtmlDescriptionRaw, service } = req.body;

    let editorHtmlDescription;
    try {
      editorHtmlDescription = JSON.parse(editorHtmlDescriptionRaw);
    } catch (error) {
      console.error("Invalid JSON format for editorHtmlDescription:", error);
      return res.status(400).json({ error: "Invalid JSON format for editorHtmlDescription" });
    }

    try {
      const file = await ServiceOverviewItem.findById(id);
      if (!file) {
        return res.status(404).json({ error: "File not found" });
      }

      const newFileName = req.file?.filename || file.filename;
      const newFilePath = req.file ? `/uploads/service/serviceOvervies/${req.file.filename}` : file?.path;

      // DELETE OLD IMAGE IF A NEW IMAGE IS UPLOADED
      if (req.file && file?.filename) {
        const oldFilePath = path.join(uploadDirectory, file.filename);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }

      // Update document in the database
      const updatedFile = await ServiceOverviewItem.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            title,
            editorHtmlDescription,
            service,
            filename: newFileName,
            path: newFilePath,
          },
        },
        { new: true }
      );

      return res.status(200).json({ message: "File uploaded successfully", data: updatedFile });
    } catch (error) {
      console.error("Error updating file:", error);
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  });
};

export default apiRoute;

// Disable default body parsing for Multer
export const config = {
  api: {
    bodyParser: false,
  },
};
