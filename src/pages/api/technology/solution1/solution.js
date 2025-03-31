import TechSolution from "@/models/admin/Tecnology/solution1/InSolution";
import TechnologyHero from "@/models/admin/Tecnology/TechnologyHero";
import dbConnect from "@/utils/db";

const SolutionApi = async (req, res) => {
  await dbConnect()
  const { technology } = req.query;
  try {
    const { heading,mainEditorHtmlDescription,solutionItem } = req.body;
// console.log("req------------------body------> ",req.body)
    const data = await TechSolution.findOne({ technology });
    let resData;
    if (!data) {
      resData = await TechSolution.create({
        heading:heading,
        mainEditorHtmlDescription:mainEditorHtmlDescription,
        solutionItem:solutionItem,
        technology,
      });
      if (!resData) {
        return res.status(300).json({ message: "something went wrong" });
      }
      await TechnologyHero.findOneAndUpdate({_id:technology},{$set:{solution:resData?._id}})
      return res
        .status(201)
        .json({ message: "solution data saved successfully ", resData });
    }
    resData = await TechSolution.findOneAndReplace(
      { technology },
      { heading, mainEditorHtmlDescription, solutionItem, technology }
    );
    if (!resData) {
      return res.status(300).json({ message: "something went wrong" });
    }
    await TechnologyHero.findOneAndUpdate({_id:technology},{$set:{solution:resData?._id}})
    return res
      .status(201)
      .json({ message: "solution data updated successfully ", resData });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export default SolutionApi;
