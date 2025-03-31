import SolutionSolution from "@/models/admin/solution/solution/solution";
import SolutionHero from "@/models/admin/solution/solutionHero";
import dbConnect from "@/utils/db";
const successApi = async (req, res) => {
  await dbConnect()
  const { solution } = req.query;
  try {
    const { heading,mainEditorHtmlDescription,solutionItem } = req.body;
// console.log("req------------------body------> ",req.body)
    const data = await SolutionSolution.findOne({ solution });
    let resData;
    if (!data) {
      resData = await SolutionSolution.create({
        heading:heading,
        mainEditorHtmlDescription:mainEditorHtmlDescription,
        solutionItem,
        solution,
      });
      if (!resData) {
        return res.status(300).json({ message: "something went wrong" });
      }
      await SolutionHero.findOneAndUpdate({_id:solution},{$set:{solution:resData?._id}})
      return res
        .status(201)
        .json({ message: "solution data saved successfully ", resData });
    }
    resData = await SolutionSolution.findOneAndReplace(
      { solution },
      { heading, mainEditorHtmlDescription, solutionItem, solution }
    );
    if (!resData) {
      return res.status(300).json({ message: "something went wrong" });
    }
    await SolutionHero.findOneAndUpdate({_id:solution},{$set:{solution:resData?._id}})
    return res
      .status(201)
      .json({ message: "solution data updated successfully ", resData });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error",error });
  }
};
export default successApi;
