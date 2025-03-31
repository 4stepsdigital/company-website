import TechnologyHero from "@/models/admin/Tecnology/TechnologyHero";
import Why4StepsTech from "@/models/admin/Tecnology/Why4StepsTech";
import dbConnect from "@/utils/db";

const why4stepApi = async (req, res) => {
  await dbConnect()
  try {
    const { heading, SelectedPartnersData, technology, overviewData } = req.body;
    const saveData = {
      heading,
      overviewData,
      technology,
      partnersData: SelectedPartnersData,
    };

    if (!technology) {
      return res?.status(301).json({ message: "technology id required !!!" });
    }

    const data = await Why4StepsTech.findOne({ technology });
    let data1;

    if (!data) {
      data1 = await Why4StepsTech.create(saveData);
      if (!data1) {
        return res.status(301).json({ message: "something went wrong" });
      }
      await TechnologyHero.findOneAndUpdate(
        { _id: technology },
        { $set: { why4step: data1?._id } }
      );
      return res
        .status(201)
        .json({ message: "successfully created data", data1 });
    }

    data1 = await Why4StepsTech.findOneAndUpdate({ technology }, { $set: saveData });
    if (!data1) {
      return res.status(301).json({ message: "something went wrong" });
    }
    await TechnologyHero.findOneAndUpdate(
      { _id: technology },
      { $set: { why4step: data1?._id } }
    );
    return res
      .status(201)
      .json({ message: "successfully created data", data1 });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};
export default why4stepApi;
