import Industry1 from "@/models/admin/Industry/Industry";
import IndustryOverview from "@/models/admin/Industry/IndustryOverview/IndustryOverview";
import dbConnect from "@/utils/db";

const successApi = async (req, res) => {
  await dbConnect();
  const { industry } = req.query;
  try {
    const { heading, mainEditorHtmlDescription, overviewItem } = req.body;
    // console.log("req------------------body------> ",req.body)
    const data = await IndustryOverview.findOne({ industry });
    let resData;
    if (!data) {
      resData = await IndustryOverview.create({
        heading: heading,
        mainEditorHtmlDescription: mainEditorHtmlDescription,
        overviewItem,
        industry,
      });
      if (!resData) {
        return res.status(300).json({ message: "something went wrong" });
      }
      await Industry1.findOneAndUpdate(
        { _id: industry },
        { $set: { overview: resData?._id } }
      );
      return res
        .status(201)
        .json({ message: "solution data saved successfully ", resData });
    }
    resData = await IndustryOverview.findOneAndReplace(
      { industry },
      { heading, mainEditorHtmlDescription, overviewItem, industry }
    );
    if (!resData) {
      return res.status(300).json({ message: "something went wrong" });
    }
    await Industry1.findOneAndUpdate(
      { _id: industry },
      { $set: { overview: resData?._id } }
    );
    return res
      .status(201)
      .json({ message: "solution data updated successfully ", resData });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};
export default successApi;
