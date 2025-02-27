import ServiceHero from "@/models/admin/ServicesModel/ServiceHero";
import ServiceOverview from "@/models/admin/ServicesModel/SolutionOverview/ServiceOverview";


const successApi = async (req, res) => {
  const { service } = req.query;
  try {
    const { heading,mainEditorHtmlDescription,overviewItem } = req.body;
// console.log("req------------------body------> ",req.body)
    const data = await ServiceOverview.findOne({ service });
    let resData;
    if (!data) {
      resData = await ServiceOverview.create({
        heading:heading,
        mainEditorHtmlDescription:mainEditorHtmlDescription,
        overviewItem,
        service,
      });
      if (!resData) {
        return res.status(300).json({ message: "something went wrong" });
      }
      await ServiceHero.findOneAndUpdate({_id:service},{$set:{overview:resData?._id}})
      return res
        .status(201)
        .json({ message: "solution data saved successfully ", resData });
    }
    resData = await ServiceOverview.findOneAndReplace(
      { service },
      { heading, mainEditorHtmlDescription, overviewItem, service }
    );
    if (!resData) {
      return res.status(300).json({ message: "something went wrong" });
    }
    await ServiceHero.findOneAndUpdate({_id:service},{$set:{overview:resData?._id}})
    return res
      .status(201)
      .json({ message: "solution data updated successfully ", resData });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error",error });
  }
};
export default successApi;
