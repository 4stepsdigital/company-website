import SolutionFaq from "@/models/admin/solution/Faq/IndustryFaq";
import SolutionHero from "@/models/admin/solution/solutionHero";
import dbConnect from "@/utils/db";
const faqsApi = async (req, res) => {
  await dbConnect()
    if (req.method === "POST") {
      const { faq ,solution } = req.body;
      if (!solution) {
        return res.status(400).json({ message: "Industry ID is required!" });
      }
      if (!Array.isArray(faq) || !faq.every(item => typeof item.title === "string")) {
        return res.status(400).json({ message: "Invalid items format. Title must be a string." });
      }
      try {
        const existingBenefit = await SolutionFaq.findOne({ solution });
        if (!existingBenefit) {
          const newBenefit = await SolutionFaq.create({ faq, solution });
          if (!newBenefit) {
            return res.status(300).json({ message: "Failed to create benefit data." });
          }
          await SolutionHero.findOneAndUpdate({ _id: solution }, { $set: { faq: newBenefit._id } });
          return res.status(201).json({ message: "Data created successfully." });
        }
        const updatedBenefit = await SolutionFaq.findOneAndReplace(
          { solution },
          { faq, solution }
        );
        if (!updatedBenefit) {
          return res.status(300).json({ message: "Failed to update benefit data." });
        }
        await SolutionHero.findOneAndUpdate({ _id: solution }, { $set: { faq: updatedBenefit._id } });
        return res.status(200).json({ message: "Data updated successfully." });
      } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
      }
    }
  };
  
  export default faqsApi;
  