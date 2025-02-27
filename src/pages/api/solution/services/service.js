import SolutionService from "@/models/admin/solution/Services/InSolution";
import SolutionHero from "@/models/admin/solution/solutionHero";

const SolutionApi = async (req, res) => {
  const { solution } = req.query;
  try {
    const { heading, mainEditorHtmlDescription, serviceItem } = req.body;
    const data = await SolutionService.findOne({ solution });
    let resData;
    if (!data) {
      resData = await SolutionService.create({
        heading:heading,
        mainEditorHtmlDescription:mainEditorHtmlDescription,
        serviceItem,
        solution,
      });
      if (!resData) {
        return res.status(300).json({ message: "something went wrong" });
      }
      await SolutionHero.findOneAndUpdate({_id:solution},{$set:{service:resData?._id}})
      return res
        .status(201)
        .json({ message: "solution data saved successfully ", resData });
    }
    resData = await SolutionService.findOneAndReplace(
      { solution },
      { heading, mainEditorHtmlDescription, serviceItem, solution }
    );
    if (!resData) {
      return res.status(300).json({ message: "something went wrong" });
    }
    await SolutionHero.findOneAndUpdate({_id:solution},{$set:{service:resData?._id}})
    return res
      .status(201)
      .json({ message: "solution data updated successfully ", resData });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export default SolutionApi;
