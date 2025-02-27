import Industry1 from "@/models/admin/Industry/Industry";
import InSolution from "@/models/admin/Industry/InSolution";

const SolutionApi = async (req, res) => {
  const { industry } = req.query;
  try {
    const { heading,mainEditorHtmlDescription,solutionItem } = req.body;
// console.log("req------------------body------> ",req.body)
    const data = await InSolution.findOne({ industry });
    let resData;
    if (!data) {
      resData = await InSolution.create({
        heading:heading,
        mainEditorHtmlDescription:mainEditorHtmlDescription,
        solutionItem:solutionItem,
        industry,
      });
      if (!resData) {
        return res.status(300).json({ message: "something went wrong" });
      }
      await Industry1.findOneAndUpdate({_id:industry},{$set:{solution:resData?._id}})
      return res
        .status(201)
        .json({ message: "solution data saved successfully ", resData });
    }
    resData = await InSolution.findOneAndReplace(
      { industry },
      { heading, mainEditorHtmlDescription, solutionItem, industry }
    );
    if (!resData) {
      return res.status(300).json({ message: "something went wrong" });
    }
    await Industry1.findOneAndUpdate({_id:industry},{$set:{solution:resData?._id}})
    return res
      .status(201)
      .json({ message: "solution data updated successfully ", resData });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export default SolutionApi;
