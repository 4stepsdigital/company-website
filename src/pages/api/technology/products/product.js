import TechProduct from "@/models/admin/Tecnology/Product/InSolution";
import TechnologyHero from "@/models/admin/Tecnology/TechnologyHero";
import dbConnect from "@/utils/db";
const SolutionApi = async (req, res) => {
  await dbConnect()
  const { technology } = req.query;
  try {
    const { heading, mainEditorHtmlDescription, solutionItem } = req.body;
    const data = await TechProduct.findOne({ technology });
    let resData;
    if (!data) {
      resData = await TechProduct.create({
        heading:heading,
        mainEditorHtmlDescription:mainEditorHtmlDescription,
        productItem:solutionItem,
        technology,
      });
      if (!resData) {
        return res.status(300).json({ message: "something went wrong" });
      }
      await TechnologyHero.findOneAndUpdate({_id:technology},{$set:{product:resData?._id}})
      return res
        .status(201)
        .json({ message: "solution data saved successfully ", resData });
    }
    resData = await TechProduct.findOneAndReplace(
      { technology },
      { heading, mainEditorHtmlDescription, productItem:solutionItem, technology }
    );
    if (!resData) {
      return res.status(300).json({ message: "something went wrong" });
    }
    await TechnologyHero.findOneAndUpdate({_id:technology},{$set:{product:resData?._id}})
    return res
      .status(201)
      .json({ message: "solution data updated successfully ", resData });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export default SolutionApi;
