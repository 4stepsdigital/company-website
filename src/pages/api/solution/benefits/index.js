import SolutionBenefits from "@/models/admin/solution/Benefits/Benefits";
import SolutionHero from "@/models/admin/solution/solutionHero";
const benefitsApi = async (req, res) => {
    if (req.method === "POST") {
      const { heading, description, items, solution } = req.body;
//   console.log("req.body--------------------> ",req.body)
      if (!solution) {
        return res.status(400).json({ message: "Industry ID is required!" });
      }
      if (!Array.isArray(items) || !items.every(item => typeof item.title === "string")) {
        return res.status(400).json({ message: "Invalid items format. Title must be a string." });
      }
      try {
        const existingBenefit = await SolutionBenefits.findOne({ solution });

        if (!existingBenefit) {
          const newBenefit = await SolutionBenefits.create({ heading, description, items, solution });
          if (!newBenefit) {
            return res.status(300).json({ message: "Failed to create benefit data." });
          }
          await SolutionHero.findOneAndUpdate({ _id: solution }, { $set: { benefit: newBenefit._id } });
          return res.status(201).json({ message: "Data created successfully." });
        }
  
        const updatedBenefit = await SolutionBenefits.findOneAndReplace(
          {solution},
          { heading, description, items, solution }
        );
        if (!updatedBenefit) {
          return res.status(300).json({ message: "Failed to update benefit data." });
        }
        await SolutionHero.findOneAndUpdate({ _id: solution }, { $set: { benefit: updatedBenefit._id } });
        return res.status(200).json({ message: "Data updated successfully." });
      } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
      }
    }
  };
  
  export default benefitsApi;
  