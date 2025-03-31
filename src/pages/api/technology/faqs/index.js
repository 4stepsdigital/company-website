import TechFaq from "@/models/admin/Tecnology/Faq/IndustryFaq";
import TechnologyHero from "@/models/admin/Tecnology/TechnologyHero";
import dbConnect from "@/utils/db";

const faqsApi = async (req, res) => {
  await dbConnect()
    if (req.method === "POST") {
      const { faq ,technology } = req.body;
      if (!technology) {
        return res.status(400).json({ message: "Industry ID is required!" });
      }
  
      if (!Array.isArray(faq) || !faq.every(item => typeof item.title === "string")) {
        return res.status(400).json({ message: "Invalid items format. Title must be a string." });
      }
  
      try {
        const existingBenefit = await TechFaq.findOne({ technology });
  
        if (!existingBenefit) {
          const newBenefit = await TechFaq.create({ faq, technology });
          if (!newBenefit) {
            return res.status(300).json({ message: "Failed to create benefit data." });
          }
          await TechnologyHero.findOneAndUpdate({ _id: technology }, { $set: { faq: newBenefit._id } });
          return res.status(201).json({ message: "Data created successfully." });
        }
  
        const updatedBenefit = await TechFaq.findOneAndReplace(
          { technology },
          { faq, technology }
        );
        if (!updatedBenefit) {
          return res.status(300).json({ message: "Failed to update benefit data." });
        }
        await TechnologyHero.findOneAndUpdate({ _id: technology }, { $set: { faq: updatedBenefit._id } });
        return res.status(200).json({ message: "Data updated successfully." });
      } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
      }
    }
  };
  
  export default faqsApi;
  