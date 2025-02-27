import HomeFaq from "@/models/home/homefaqs";
import dbConnect from "@/utils/db";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const faqs = await HomeFaq.find();
      res.status(200).json({ success: true, data: faqs });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch FAQs" });
    }
  } else if (req.method === "POST") {
    try {
      const { faq } = req.body;
      await HomeFaq.deleteMany(); // Clear existing FAQs before saving new ones
      const newFaqs = await HomeFaq.insertMany(faq);
      res.status(201).json({ success: true, data: newFaqs });
    } catch (error) {
      res.status(400).json({ success: false, message: "Failed to save FAQs" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
