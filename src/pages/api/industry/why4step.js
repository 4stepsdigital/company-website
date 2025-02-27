import Industry1 from "@/models/admin/Industry/Industry";
import Why4Steps from "@/models/admin/Industry/Why4Steps";
const why4stepApi = async (req, res) => {
  try {
    const { heading, SelectedPartnersData, industry, overviewData } = req.body;
    const saveData = {
      heading,
      overviewData,
      industry,
      partnersData: SelectedPartnersData,
    };

    if (!industry) {
      return res?.status(301).json({ message: "industry id required !!!" });
    }

    const data = await Why4Steps.findOne({ industry });
    let data1;

    if (!data) {
      data1 = await Why4Steps.create(saveData);
      if (!data1) {
        return res.status(301).json({ message: "something went wrong" });
      }
      await Industry1.findOneAndUpdate(
        { _id: industry },
        { $set: { why4step: data1?._id } }
      );
      return res
        .status(201)
        .json({ message: "successfully created data", data1 });
    }

    data1 = await Why4Steps.findOneAndUpdate({ industry }, { $set: saveData });
    if (!data1) {
      return res.status(301).json({ message: "something went wrong" });
    }
    await Industry1.findOneAndUpdate(
      { _id: industry },
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
