import multer from "multer";
import path from "path";
import fs from "fs";
import dbConnect from "@/utils/db";
import SubServiceSuccess from "@/models/admin/ServicesModel/success/solutionsuccess";
// const uploadDirectory = "./public/uploads/service/servicesuccess";
// if (!fs.existsSync(uploadDirectory)) {
//   fs.mkdirSync(uploadDirectory, { recursive: true });
// }
const uploadDirectory = path.join(process.cwd(), "uploads/service/servicesuccess"); // Define your upload directory
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
        title,
        description,
        link,
        backgroundColor,
        keyword,
        service,
      } = req.body;

      const fileData = req.file && {
        title,
        filename: req.file.filename,
        description,
        link,
        backgroundColor,
        keyword,
        service,
        path: `/api/uploads/service/servicesuccess/${req.file.filename}`,
      };

      try {
        const updatedFile = await SubServiceSuccess.create(fileData);

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
      const file = await SubServiceSuccess.findById(id);
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
      await SubServiceSuccess.findByIdAndDelete(id);
  
      return res.status(200).json({ message: "File and associated references deleted successfully" });
    } catch (error) {
      console.error("Error deleting file:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "GET") {
    const { id } = req.query;
    console.log("id is here ------> ",id)
    try {
      const files = await SubServiceSuccess.find({service:id});
      return res.status(200).json({ data: files });
    } catch (error) {
      // console.error("Error fetching files:", error);
      return res.status(500).json({ message: "Internal Server Error",error });
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
