import TechnologyHero from "@/models/admin/Tecnology/TechnologyHero";
import TechnologyOverview from "@/models/admin/Tecnology/TechnologyOverview/TechnologyOverview";
import dbConnect from "@/utils/db";

const successApi = async (req, res) => {
  await dbConnect()
  const { technology } = req.query;
  try {
    const { heading,mainEditorHtmlDescription,overviewItem } = req.body;
// console.log("req------------------body------> ",req.body)
    const data = await TechnologyOverview.findOne({ technology });
    let resData;
    if (!data) {
      resData = await TechnologyOverview.create({
        heading:heading,
        mainEditorHtmlDescription:mainEditorHtmlDescription,
        overviewItem,
        technology,
      });
      if (!resData) {
        return res.status(300).json({ message: "something went wrong" });
      }
      await TechnologyHero.findOneAndUpdate({_id:technology},{$set:{overview:resData?._id}})
      return res
        .status(201)
        .json({ message: "solution data saved successfully ", resData });
    }
    resData = await TechnologyOverview.findOneAndReplace(
      { technology },
      { heading, mainEditorHtmlDescription, overviewItem, technology }
    );
    if (!resData) {
      return res.status(300).json({ message: "something went wrong" });
    }
    await TechnologyHero.findOneAndUpdate({_id:technology},{$set:{overview:resData?._id}})
    return res
      .status(201)
      .json({ message: "solution data updated successfully ", resData });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error",error });
  }
};
export default successApi;
