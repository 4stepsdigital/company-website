import multer from "multer";
import path from "path";
import fs from "fs";
import dbConnect from "@/utils/db";
import SubServiceSolution from "@/models/admin/ServicesModel/solution/solutionItem";
// const uploadDirectory = "./public/uploads/service/serviceSolution";
// if (!fs.existsSync(uploadDirectory)) {
//   fs.mkdirSync(uploadDirectory, { recursive: true });
// }

const uploadDirectory = path.join(process.cwd(), "uploads/service/serviceSolution"); // Define your upload directory
// Ensure upload directory exists
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
        // console.error("Multer error:", err);
        return res.status(500).json({ error: "File upload failedu" });
      } else if (err) {
        // console.error("Unknown error during file upload:", err);
        return res.status(500).json({ error: "File upload failed" });
      }
      const {
        title, link, editorHtmlDescription: editorHtmlDescriptionRaw, service
      } = req.body;

      // console.log("solution solution Item ------> ",solution)
      let editorHtmlDescription;
      try {
        editorHtmlDescription = JSON.parse(editorHtmlDescriptionRaw);
      } catch (error) {
        return res.status(400).json({ error: "Invalid JSON format for editorHtmlDescription" });
      }
     
      const fileData = {
        title,
        link,
        editorHtmlDescription,
        service,
        filename: req.file?.filename || null,
        path: req.file ? `/api/uploads/service/serviceSolution/${req.file.filename}` : null,
      };

      try {
        const updatedFile = await SubServiceSolution.create(fileData);

        if (!updatedFile) {
          return res.status(400).json({ message: "Something went wrong" });
        }
        return res.status(200).json({ data: updatedFile });
      } catch (error) {
        console.error("Error creating file:", error);
        return res.status(500).json({ message: "Internal Server Error", error });
      }
    });
  } else if (req.method === "DELETE") {
    const { id } = req.query;
  
    try {
      // Fetch the file document from the database
      const file = await SubServiceSolution.findById(id);
      if (!file) {
        return res.status(404).json({ error: "File not found" });
      }
  
      // Delete the file from the filesystem
      const filePath = path.join(uploadDirectory, file.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      } else {
        console.warn(`File not found on the server: ${filePath}`);
      }
      // Delete the file document from the database
      await SubServiceSolution.findByIdAndDelete(id);
  
      return res.status(200).json({ message: "File and associated references deleted successfully" });
    } catch (error) {
      console.error("Error deleting file:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "GET") {
    const { id } = req.query;
    try {
      const files = await SubServiceSolution.find({service:id});
      return res.status(200).json({ data: files });
    } catch (error) {
      // console.error("Error fetching files:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST", "GET", "DELETE"]);
    return res
      .status(405)
      .json({ message: `Method ${req.method} Not Allowed`, error });
  }
};

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
