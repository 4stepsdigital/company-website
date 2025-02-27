import ServiceBenefits from "@/models/admin/ServicesModel/Benefits/Benefits";
import ServiceHero from "@/models/admin/ServicesModel/ServiceHero";
const benefitsApi = async (req, res) => {
  if (req.method === "POST") {
    const { heading, description, items, service } = req.body;
    //   console.log("req.body--------------------> ",req.body)
    if (!service) {
      return res.status(400).json({ message: "Industry ID is required!" });
    }
    if (
      !Array.isArray(items) ||
      !items.every((item) => typeof item.title === "string")
    ) {
      return res
        .status(400)
        .json({ message: "Invalid items format. Title must be a string." });
    }
    try {
      const existingBenefit = await ServiceBenefits.findOne({ service });

      if (!existingBenefit) {
        const newBenefit = await ServiceBenefits.create({
          heading,
          description,
          items,
          service,
        });
        if (!newBenefit) {
          return res
            .status(300)
            .json({ message: "Failed to create benefit data." });
        }
        await ServiceHero.findOneAndUpdate(
          { _id: service },
          { $set: { benefit: newBenefit._id } }
        );
        return res.status(201).json({ message: "Data created successfully." });
      }

      const updatedBenefit = await ServiceBenefits.findOneAndReplace(
        { service },
        { heading, description, items, service }
      );
      if (!updatedBenefit) {
        return res
          .status(300)
          .json({ message: "Failed to update benefit data." });
      }
      await ServiceHero.findOneAndUpdate(
        { _id: service },
        { $set: { benefit: updatedBenefit._id } }
      );
      return res.status(200).json({ message: "Data updated successfully." });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  }
};

export default benefitsApi;
