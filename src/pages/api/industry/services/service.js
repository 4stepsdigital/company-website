import Industry1 from "@/models/admin/Industry/Industry";
import InService from "@/models/admin/Industry/Services/InSolution";
import dbConnect from "@/utils/db";
const SolutionApi = async (req, res) => {
  await dbConnect()
  const { industry } = req.query;
  try {
    const { heading, mainEditorHtmlDescription, solutionItem } = req.body;
    const data = await InService.findOne({ industry });
    let resData;
    if (!data) {
      resData = await InService.create({
        heading:heading,
        mainEditorHtmlDescription:mainEditorHtmlDescription,
        serviceItem:solutionItem,
        industry,
      });
      if (!resData) {
        return res.status(300).json({ message: "something went wrong" });
      }
      await Industry1.findOneAndUpdate({_id:industry},{$set:{service:resData?._id}})
      return res
        .status(201)
        .json({ message: "solution data saved successfully ", resData });
    }
    resData = await InService.findOneAndReplace(
      { industry },
      { heading, mainEditorHtmlDescription, serviceItem:solutionItem, industry }
    );
    if (!resData) {
      return res.status(300).json({ message: "something went wrong" });
    }
    await Industry1.findOneAndUpdate({_id:industry},{$set:{service:resData?._id}})
    return res
      .status(201)
      .json({ message: "solution data updated successfully ", resData });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export default SolutionApi;
