
import SolutionHero from "@/models/admin/solution/solutionHero";
import SolutionOverview from "@/models/admin/solution/SolutionOverview/SolutionOverview";
import dbConnect from "@/utils/db";
const successApi = async (req, res) => {
  await dbConnect()
  const { solution } = req.query;
  try {
    const { heading,mainEditorHtmlDescription,overviewItem } = req.body;
// console.log("req------------------body------> ",req.body)
    const data = await SolutionOverview.findOne({ solution });
    let resData;
    if (!data) {
      resData = await SolutionOverview.create({
        heading:heading,
        mainEditorHtmlDescription:mainEditorHtmlDescription,
        overviewItem,
        solution,
      });
      if (!resData) {
        return res.status(300).json({ message: "something went wrong" });
      }
      await SolutionHero.findOneAndUpdate({_id:solution},{$set:{overview:resData?._id}})
      return res
        .status(201)
        .json({ message: "solution data saved successfully ", resData });
    }
    resData = await SolutionOverview.findOneAndReplace(
      { solution },
      { heading, mainEditorHtmlDescription, overviewItem, solution }
    );
    if (!resData) {
      return res.status(300).json({ message: "something went wrong" });
    }
    await SolutionHero.findOneAndUpdate({_id:solution},{$set:{overview:resData?._id}})
    return res
      .status(201)
      .json({ message: "solution data updated successfully ", resData });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error",error });
  }
};
export default successApi;
