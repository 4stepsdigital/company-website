import Benefits from "@/models/admin/Industry/Benefits/Benefits";
import Industry1 from "@/models/admin/Industry/Industry";

const benefitsApi = async (req, res) => {
    if (req.method === "POST") {
      const { heading, description, items, industry } = req.body;
//   console.log("req.body--------------------> ",req.body)
      if (!industry) {
        return res.status(400).json({ message: "Industry ID is required!" });
      }
  
      if (!Array.isArray(items) || !items.every(item => typeof item.title === "string")) {
        return res.status(400).json({ message: "Invalid items format. Title must be a string." });
      }
  
      try {
        const existingBenefit = await Benefits.findOne({ industry });
  
        if (!existingBenefit) {
          const newBenefit = await Benefits.create({ heading, description, items, industry });
          if (!newBenefit) {
            return res.status(300).json({ message: "Failed to create benefit data." });
          }
          await Industry1.findOneAndUpdate({ _id: industry }, { $set: { benefit: newBenefit._id } });
          return res.status(201).json({ message: "Data created successfully." });
        }
  
        const updatedBenefit = await Benefits.findOneAndReplace(
          { industry },
          { heading, description, items, industry }
        );
        if (!updatedBenefit) {
          return res.status(300).json({ message: "Failed to update benefit data." });
        }
        await Industry1.findOneAndUpdate({ _id: industry }, { $set: { benefit: updatedBenefit._id } });
        return res.status(200).json({ message: "Data updated successfully." });
      } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
      }
    }
  };
  
  export default benefitsApi;
  