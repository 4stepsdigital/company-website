import SolutionProduct from "@/models/admin/solution/Product/InSolution";
import SolutionHero from "@/models/admin/solution/solutionHero";


const SolutionApi = async (req, res) => {
  const { solution } = req.query;
  try {
    const { heading, mainEditorHtmlDescription, productItem } = req.body;
    const data = await SolutionProduct.findOne({ solution });
    let resData;
    if (!data) {
      resData = await SolutionProduct.create({
        heading:heading,
        mainEditorHtmlDescription:mainEditorHtmlDescription,
        productItem,
        solution,
      });
      if (!resData) {
        return res.status(300).json({ message: "something went wrong" });
      }
      await SolutionHero.findOneAndUpdate({_id:solution},{$set:{product:resData?._id}})
      return res
        .status(201)
        .json({ message: "solution data saved successfully ", resData });
    }
    resData = await SolutionProduct.findOneAndReplace(
      { solution },
      { heading, mainEditorHtmlDescription,productItem,solution }
    );
    if (!resData) {
      return res.status(300).json({ message: "something went wrong" });
    }
    await SolutionHero.findOneAndUpdate({_id:solution},{$set:{product:resData?._id}})
    return res
      .status(201)
      .json({ message: "solution data updated successfully ", resData });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export default SolutionApi;
