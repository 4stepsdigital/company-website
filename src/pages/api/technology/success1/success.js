import TechSuccess from "@/models/admin/Tecnology/Success1/InSuccess";
import TechnologyHero from "@/models/admin/Tecnology/TechnologyHero";


const successApi = async (req, res) => {
  const { technology } = req.query;
  try {
    const { heading,mainEditorHtmlDescription,successItem } = req.body;
// console.log("req------------------body------> ",req.body)
    const data = await TechSuccess.findOne({ technology });
    let resData;
    if (!data) {
      resData = await TechSuccess.create({
        heading:heading,
        mainEditorHtmlDescription:mainEditorHtmlDescription,
        successItem:successItem,
        technology,
      });
      if (!resData) {
        return res.status(300).json({ message: "something went wrong" });
      }
      await TechnologyHero.findOneAndUpdate({_id:technology},{$set:{success:resData?._id}})
      return res
        .status(201)
        .json({ message: "solution data saved successfully ", resData });
    }
    resData = await TechSuccess.findOneAndReplace(
      { technology },
      { heading, mainEditorHtmlDescription, successItem, technology }
    );
    if (!resData) {
      return res.status(300).json({ message: "something went wrong" });
    }
    await TechnologyHero.findOneAndUpdate({_id:technology},{$set:{success:resData?._id}})
    return res
      .status(201)
      .json({ message: "solution data updated successfully ", resData });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export default successApi;
