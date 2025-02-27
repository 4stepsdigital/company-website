import TechBenefits from "@/models/admin/Tecnology/Benefits/Benefits";
import TechnologyHero from "@/models/admin/Tecnology/TechnologyHero";

const benefitsApi = async (req, res) => {
    if (req.method === "POST") {
      const { heading, description, items, technology } = req.body;
//   console.log("req.body--------------------> ",req.body)
      if (!technology) {
        return res.status(400).json({ message: "Industry ID is required!" });
      }
  
      if (!Array.isArray(items) || !items.every(item => typeof item.title === "string")) {
        return res.status(400).json({ message: "Invalid items format. Title must be a string." });
      }
  
      try {
        const existingBenefit = await TechBenefits.findOne({ technology });
  
        if (!existingBenefit) {
          const newBenefit = await TechBenefits.create({ heading, description, items, technology });
          if (!newBenefit) {
            return res.status(300).json({ message: "Failed to create benefit data." });
          }
          await TechnologyHero.findOneAndUpdate({ _id: technology }, { $set: { benefit: newBenefit._id } });
          return res.status(201).json({ message: "Data created successfully." });
        }
  
        const updatedBenefit = await TechBenefits.findOneAndReplace(
          { technology },
          { heading, description, items, technology }
        );
        if (!updatedBenefit) {
          return res.status(300).json({ message: "Failed to update benefit data." });
        }
        await TechnologyHero.findOneAndUpdate({ _id: technology }, { $set: { benefit: updatedBenefit._id } });
        return res.status(200).json({ message: "Data updated successfully." });
      } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
      }
    }
  };
  
  export default benefitsApi;
  