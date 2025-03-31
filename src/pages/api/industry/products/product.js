import Industry1 from "@/models/admin/Industry/Industry";
import InProduct from "@/models/admin/Industry/Product/InSolution";
import dbConnect from "@/utils/db";


const SolutionApi = async (req, res) => {
  await dbConnect()
  const { industry } = req.query;
  try {
    const { heading, mainEditorHtmlDescription, solutionItem } = req.body;
// console.log("req------------------body------> ",req.body)
    const data = await InProduct.findOne({ industry });
    let resData;
    if (!data) {
      resData = await InProduct.create({
        heading:heading,
        mainEditorHtmlDescription:mainEditorHtmlDescription,
        productItem:solutionItem,
        industry,
      });
      if (!resData) {
        return res.status(300).json({ message: "something went wrong" });
      }
      await Industry1.findOneAndUpdate({_id:industry},{$set:{product:resData?._id}})
      return res
        .status(201)
        .json({ message: "solution data saved successfully ", resData });
    }
    resData = await InProduct.findOneAndReplace(
      { industry },
      { heading, mainEditorHtmlDescription, productItem:solutionItem, industry }
    );
    if (!resData) {
      return res.status(300).json({ message: "something went wrong" });
    }
    await Industry1.findOneAndUpdate({_id:industry},{$set:{product:resData?._id}})
    return res
      .status(201)
      .json({ message: "solution data updated successfully ", resData });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export default SolutionApi;
