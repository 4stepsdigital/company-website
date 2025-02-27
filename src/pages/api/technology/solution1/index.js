import multer from "multer";
import path from "path";
import fs from "fs";
import dbConnect from "@/utils/db";
import SubTechnologySolution from "@/models/admin/Tecnology/solution1/IndustrySolution";

// Define upload directory
const uploadDirectory = "./public/uploads/technology/technologysolution";
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Multer storage configuration
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

  if (req.method === "POST") {
    upload.single("file")(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(500).json({ error: "File upload failed due to Multer error" });
      } else if (err) {
        return res.status(500).json({ error: "Unknown error during file upload" });
      }

      const { title, link, editorHtmlDescription: editorHtmlDescriptionRaw, technology } = req.body;
      // console.log("req------body----------------> ",req.body)
      // Validate required fields
      if (!title || !technology) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Parse editorHtmlDescription safely
      let editorHtmlDescription;
      try {
        editorHtmlDescription = JSON.parse(editorHtmlDescriptionRaw);
      } catch (error) {
        return res.status(400).json({ error: "Invalid JSON format for editorHtmlDescription" });
      }

      // Prepare file data for saving
      const fileData = {
        title,
        link,
        editorHtmlDescription,
        technology,
        filename: req.file?.filename || null,
        path: req.file ? `/uploads/technology/technologysolution/${req.file.filename}` : null,
      };
      

      try {
        // Save data to the database
        const newFile = await SubTechnologySolution.create(fileData);
        return res.status(200).json({ message: "File uploaded successfully", data: newFile });
      } catch (error) {
        console.error("Error creating file:", error);
        return res.status(500).json({ message: "Internal Server Error", error });
      }
    });
  } else if (req.method === "DELETE") {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "Missing file ID" });
    }

    try {
      const file = await SubTechnologySolution.findById(id);
      if (!file) {
        return res.status(404).json({ error: "File not found" });
      }

      // Delete file from filesystem
      const filePath = path.join(uploadDirectory, file.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      // Delete document from the database
      await SubTechnologySolution.findByIdAndDelete(id);
      return res.status(200).json({ message: "File deleted successfully" });
    } catch (error) {
      console.error("Error deleting file:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "GET") {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "Missing industry ID" });
    }

    try {
      const files = await SubTechnologySolution.find({ technology: id });
      return res.status(200).json({ data: files });
    } catch (error) {
      console.error("Error fetching files:", error);
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
    bodyParser: false, // Disable default body parsing for Multer
  },
};
