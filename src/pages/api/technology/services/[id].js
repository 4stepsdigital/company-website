import multer from "multer";
import path from "path";
import fs from "fs";
import dbConnect from "@/utils/db";
import SubTechnologyServices from "@/models/admin/Tecnology/Services/IndustrySolution";
// Define upload directory
const uploadDirectory = "./public/uploads/technology/technologyServices";
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

  if (req.method === "PUT") {
    const {id}=req.query;
    if(!id){
        return res.status(301).json({message:"something went wrong"});
    }    
    upload.single("file")(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(500).json({ error: "File upload failed due to Multer error" });
      } else if (err) {
        return res.status(500).json({ error: "Unknown error during file upload" });
      }

      const { title, link,subTitle, editorHtmlDescription: editorHtmlDescriptionRaw, technology } = req.body;

      let editorHtmlDescription;
      try {
        editorHtmlDescription = JSON.parse(editorHtmlDescriptionRaw);
      } catch (error) {
        return res.status(400).json({ error: "Invalid JSON format for editorHtmlDescription" });
      }

      // Prepare file data for saving
      try{
      const file = await SubTechnologyServices.findById(id);
      if (!file) {
        return res.status(404).json({ error: "File not found" });
      }
      const fileData = {
        title,
        link,
        editorHtmlDescription,
        subTitle,
        technology,
        filename: req.file?.filename || null,
        path: req.file ? `/uploads/technology/technologyServices/${req.file.filename}` : file?.path,
      };
        if(req.file){
            const filePath = path.join(uploadDirectory, file.filename);
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }
        }
        const newFile = await SubTechnologyServices.findOneAndUpdate({_id:id},{$set:fileData});
        return res.status(200).json({ message: "File uploaded successfully", data: newFile });
      } catch (error) {
        console.error("Error creating file:", error);
        return res.status(500).json({ message: "Internal Server Error", error });
      }
    });
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
