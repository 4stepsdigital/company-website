import multer from "multer";
import path from "path";
import fs from "fs";
import dbConnect from "@/utils/db";
import SubServiceSuccess from "@/models/admin/ServicesModel/success/solutionsuccess";
const uploadDirectory = "./public/uploads/service/servicesuccess";
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
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: "id is required !!!" });
  }

  if (req.method === "PUT") {
    upload.single("file")(req, res, async (err) => {
      if (err instanceof multer.MulterError || err) {
        return res.status(500).json({ error: "File upload failed", details: err });
      }

      const {
        title,
        description,
        link,
        backgroundColor,
        keyword,
        service,
      } = req.body;

      try {
        const existingData = await SubServiceSuccess.findById(id);
        if (!existingData) {
          return res.status(404).json({ message: "Data not found for the given id" });
        }

        let fileData = {};
        if (req.file) {
          // Remove the old file if a new one is uploaded
          if (existingData.filename) {
            const oldFilePath = path.join(uploadDirectory, existingData.filename);
            if (fs.existsSync(oldFilePath)) {
              fs.unlinkSync(oldFilePath);
            }
          }

          fileData = {
            filename: req.file.filename,
            path: `/uploads/service/servicesuccess/${req.file.filename}`,
          };
        }

        const updatedData = {
          title,
          description,
          link,
          backgroundColor,
          keyword,
          service,
          ...fileData,
        };

        const updatedFile = await SubServiceSuccess.findByIdAndUpdate(id, updatedData, { new: true });

        return res.status(200).json({ message: "Data updated successfully", data: updatedFile });
      } catch (error) {
        console.error("Error updating file:", error);
        return res.status(500).json({ message: "Internal Server Error", error });
      }
    });
  } else {
    res.setHeader("Allow", ["PUT"]);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
};

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
