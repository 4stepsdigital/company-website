import ServiceFaq from "@/models/admin/ServicesModel/Faq/IndustryFaq";
import ServiceHero from "@/models/admin/ServicesModel/ServiceHero";

const faqsApi = async (req, res) => {
  if (req.method === "POST") {
    const { faq, service } = req.body;
    if (!service) {
      return res.status(400).json({ message: "Industry ID is required!" });
    }
    if (
      !Array.isArray(faq) ||
      !faq.every((item) => typeof item.title === "string")
    ) {
      return res
        .status(400)
        .json({ message: "Invalid items format. Title must be a string." });
    }
    try {
      const existingBenefit = await ServiceFaq.findOne({ service });
      if (!existingBenefit) {
        const newBenefit = await ServiceFaq.create({ faq, service });
        if (!newBenefit) {
          return res
            .status(300)
            .json({ message: "Failed to create benefit data." });
        }
        await ServiceHero.findOneAndUpdate(
          { _id: service },
          { $set: { faq: newBenefit._id } }
        );
        return res.status(201).json({ message: "Data created successfully." });
      }
      const updatedBenefit = await ServiceFaq.findOneAndReplace(
        { service },
        { faq, service }
      );
      if (!updatedBenefit) {
        return res
          .status(300)
          .json({ message: "Failed to update benefit data." });
      }
      await ServiceHero.findOneAndUpdate(
        { _id: service },
        { $set: { faq: updatedBenefit._id } }
      );
      return res.status(200).json({ message: "Data updated successfully." });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  }
};

export default faqsApi;
