import IndustryFaq from "@/models/admin/Industry/Faq/IndustryFaq";
import Industry1 from "@/models/admin/Industry/Industry";

const faqsApi = async (req, res) => {
    if (req.method === "POST") {
      const { faq ,industry } = req.body;
      if (!industry) {
        return res.status(400).json({ message: "Industry ID is required!" });
      }
  
      if (!Array.isArray(faq) || !faq.every(item => typeof item.title === "string")) {
        return res.status(400).json({ message: "Invalid items format. Title must be a string." });
      }
  
      try {
        const existingBenefit = await IndustryFaq.findOne({ industry });
  
        if (!existingBenefit) {
          const newBenefit = await IndustryFaq.create({ faq, industry });
          if (!newBenefit) {
            return res.status(300).json({ message: "Failed to create benefit data." });
          }
          await Industry1.findOneAndUpdate({ _id: industry }, { $set: { faq: newBenefit._id } });
          return res.status(201).json({ message: "Data created successfully." });
        }
  
        const updatedBenefit = await IndustryFaq.findOneAndReplace(
          { industry },
          { faq, industry }
        );
        if (!updatedBenefit) {
          return res.status(300).json({ message: "Failed to update benefit data." });
        }
        await Industry1.findOneAndUpdate({ _id: industry }, { $set: { faq: updatedBenefit._id } });
        return res.status(200).json({ message: "Data updated successfully." });
      } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
      }
    }
  };
  
  export default faqsApi;
  