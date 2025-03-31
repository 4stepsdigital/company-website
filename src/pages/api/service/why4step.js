import ServiceHero from "@/models/admin/ServicesModel/ServiceHero";
import Why4StepService from "@/models/admin/ServicesModel/Why4StepS";
import dbConnect from "@/utils/db";


const why4stepApi = async (req, res) => {
  await dbConnect()
  try {
    const { heading, SelectedPartnersData, service, overviewData } = req.body;
    const saveData = {
      heading,
      overviewData,
      service,
      partnersData: SelectedPartnersData,
    };

    if (!service) {
      return res.status(400).json({ message: "solution ID is required!" });
    }

    const data = await Why4StepService.findOne({ service });
    let updatedData;

    if (!data) {
      updatedData = await Why4StepService.create(saveData);
      if (!updatedData) {
        return res.status(500).json({ message: "Something went wrong!" });
      }
      await ServiceHero.findOneAndUpdate(
        { _id: service },
        { $set: { Why4StepS: updatedData._id } }
      );
      return res.status(201).json({
        message: "Successfully created data",
        data: updatedData,
      });
    }

    updatedData = await Why4StepService.findOneAndUpdate(
      { service },
      { $set: saveData },
      { new: true } // Return the updated document
    );
    if (!updatedData) {
      return res.status(500).json({ message: "Something went wrong!" });
    }
    await ServiceHero.findOneAndUpdate(
      { _id: service },
      { $set: { Why4StepS: updatedData._id } }
    );
    return res.status(200).json({
      message: "Successfully updated data",
      data: updatedData,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export default why4stepApi;
