import Testimonial from "@/models/admin/Testimonial/Testimonialmodel";
import dbConnect from "@/utils/db";
import multer from "multer";
import path from "path";
import fs from "fs";

// Define upload directory
const uploadDirectory = path.join(process.cwd(), "uploads/Testimonial");

// Ensure upload directory exists
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

// Function to delete a file
const deleteFile = (filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;

  if (method === "POST") {
    upload.single("image")(req, res, async (err) => {
      if (err) {
        console.error("Multer Error:", err);
        return res.status(500).json({ error: "Error uploading image", details: err.message });
      }

      try {
        const { name, alt, designation, description, company } = req.body;

        if (!req.file) {
          return res.status(400).json({ error: "No file uploaded" });
        }

        const filename = req.file.filename;
        const imagePath = `/api/uploads/Testimonial/${filename}`;

        const newTestimonial = new Testimonial({
          name,
          alt,
          designation,
          description,
          filename,
          company,
          path: imagePath,
        });

        const savedTestimonial = await newTestimonial.save();
        res.status(201).json(savedTestimonial);
      } catch (error) {
        console.error("Error saving testimonial:", error);
        res.status(500).json({ error: "Error saving testimonial", details: error.message });
      }
    });
  } else if (method === "GET") {
    try {
      const testimonials = await Testimonial.find({});
      res.status(200).json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ error: "Error fetching testimonials", details: error.message });
    }
  } else if (method === "PUT") {
    upload.single("image")(req, res, async (err) => {
      if (err) {
        console.error("Multer Error:", err);
        return res.status(500).json({ error: "Error uploading image", details: err.message });
      }

      const { id } = req.query;
      const { name, alt, designation, description, company } = req.body;

      try {
        const existingTestimonial = await Testimonial.findById(id);
        if (!existingTestimonial) {
          return res.status(404).json({ error: "Testimonial not found" });
        }

        const updateData = {
          name,
          alt,
          designation,
          description,
          company,
        };

        if (req.file) {
          const filename = req.file.filename;
          const newImagePath = `/api/uploads/Testimonial/${filename}`;

          // Delete old image file if it exists
          const oldImagePath = path.join(uploadDirectory, existingTestimonial.filename);
          deleteFile(oldImagePath);

          updateData.filename = filename;
          updateData.path = newImagePath;
        }

        const updatedTestimonial = await Testimonial.findByIdAndUpdate(id, updateData, { new: true });

        res.status(200).json(updatedTestimonial);
      } catch (error) {
        console.error("Error updating testimonial:", error);
        res.status(500).json({ error: "Error updating testimonial", details: error.message });
      }
    });
  } else if (method === "DELETE") {
    const { id } = req.query;

    try {
      const deletedTestimonial = await Testimonial.findByIdAndDelete(id);
      if (!deletedTestimonial) {
        return res.status(404).json({ error: "Testimonial not found" });
      }

      // Delete associated image file
      const imagePath = path.join(uploadDirectory, deletedTestimonial.filename);
      deleteFile(imagePath);

      res.status(204).send();
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      res.status(500).json({ error: "Error deleting testimonial", details: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
