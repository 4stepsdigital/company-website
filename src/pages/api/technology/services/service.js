import TechService from "@/models/admin/Tecnology/Services/InSolution";
import TechnologyHero from "@/models/admin/Tecnology/TechnologyHero";
const SolutionApi = async (req, res) => {
  const { technology } = req.query;
  try {
    const { heading, mainEditorHtmlDescription, solutionItem } = req.body;
    const data = await TechService.findOne({ technology });
    let resData;
    if (!data) {
      resData = await TechService.create({
        heading:heading,
        mainEditorHtmlDescription:mainEditorHtmlDescription,
        serviceItem:solutionItem,
        technology,
      });
      if (!resData) {
        return res.status(300).json({ message: "something went wrong" });
      }
      await TechnologyHero.findOneAndUpdate({_id:technology},{$set:{service:resData?._id}})
      return res
        .status(201)
        .json({ message: "solution data saved successfully ", resData });
    }
    resData = await TechService.findOneAndReplace(
      { technology },
      { heading, mainEditorHtmlDescription, serviceItem:solutionItem, technology }
    );
    if (!resData) {
      return res.status(300).json({ message: "something went wrong" });
    }
    await TechnologyHero.findOneAndUpdate({_id:technology},{$set:{service:resData?._id}})
    return res
      .status(201)
      .json({ message: "solution data updated successfully ", resData });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export default SolutionApi;
