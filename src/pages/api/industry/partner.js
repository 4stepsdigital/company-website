import multer from 'multer';
import path from 'path';
import fs from 'fs';
import dbConnect from '@/utils/db'; // Adjust path as per your project structure
import Partner from '@/models/admin/Industry/Partner';
 // Adjust path as per your project structure
const uploadDirectory = './public/uploads/industry/partner'; // Define your upload directory
// Ensure upload directory exists
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

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
  await dbConnect(); // Ensure database connection

  if (req.method === 'POST') {
    upload.single('file')(req, File, async (err) => {
      if (err instanceof multer.MulterError) {
        console.error('Multer error:', err);
        return res.status(500).json({ error: 'File upload failed' });
      } else if (err) {
        console.error('Unknown error during file upload:', err);
        return res.status(500).json({ error: 'File upload failed' });
      }

      const { title, alt } = req.body;
      const fileData = req.file ? {
        title,
        alt,
        filename: req.file.filename,
        path: `/uploads/industry/partner/${req.file.filename}`,
      } : {
        title,
        alt,
      };

      try {
        
          // Create a new entry
          const file = new Partner(fileData);
          await file.save();
          return res.status(200).json({ data: file });
        
      } catch (error) {
        console.error('Error updating or saving file:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    });
  } else if (req.method === 'GET') {
    try {
      const files = await Partner.find({});
      return res.status(200).json({ data: files });
    } catch (error) {
      console.error('Error fetching files:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    // console.log("file image id by selected logo ",path.join(uploadDirectory));
    try {
      const file = await Partner.findById(id);
      if (file) {
        // Delete file from disk
        fs.unlinkSync(path.join(uploadDirectory, file.filename));

        // Delete file from database
        await Partner.findByIdAndDelete(id);
        return res.status(200).json({ message: 'File removed successfully' });
      } else {
        return res.status(404).json({ error: 'File not found' });
      }
    } catch (error) {
      console.error('Error deleting file:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET', 'DELETE']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
};

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Ensure to disable default bodyParser
  },
};
