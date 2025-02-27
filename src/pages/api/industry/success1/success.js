import Industry1 from "@/models/admin/Industry/Industry";
import InSuccess from "@/models/admin/Industry/InSuccess";

const successApi = async (req, res) => {
  const { industry } = req.query;
  try {
    const { heading,mainEditorHtmlDescription,successItem } = req.body;
// console.log("req------------------body------> ",req.body)
    const data = await InSuccess.findOne({ industry });
    let resData;
    if (!data) {
      resData = await InSuccess.create({
        heading:heading,
        mainEditorHtmlDescription:mainEditorHtmlDescription,
        successItem:successItem,
        industry,
      });
      if (!resData) {
        return res.status(300).json({ message: "something went wrong" });
      }
      await Industry1.findOneAndUpdate({_id:industry},{$set:{success:resData?._id}})
      return res
        .status(201)
        .json({ message: "solution data saved successfully ", resData });
    }
    resData = await InSuccess.findOneAndReplace(
      { industry },
      { heading, mainEditorHtmlDescription, successItem, industry }
    );
    if (!resData) {
      return res.status(300).json({ message: "something went wrong" });
    }
    await Industry1.findOneAndUpdate({_id:industry},{$set:{success:resData?._id}})
    return res
      .status(201)
      .json({ message: "solution data updated successfully ", resData });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export default successApi;
