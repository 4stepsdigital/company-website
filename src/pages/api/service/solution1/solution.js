import ServiceHero from "@/models/admin/ServicesModel/ServiceHero";
import ServiceSolution from "@/models/admin/ServicesModel/solution/solution";
const successApi = async (req, res) => {
  const { service } = req.query;
  try {
    const { heading,mainEditorHtmlDescription,solutionItem } = req.body;
// console.log("req------------------body------> ",req.body)
    const data = await ServiceSolution.findOne({ service });
    let resData;
    if (!data) {
      resData = await ServiceSolution.create({
        heading:heading,
        mainEditorHtmlDescription:mainEditorHtmlDescription,
        solutionItem,
        service,
      });
      if (!resData) {
        return res.status(300).json({ message: "something went wrong" });
      }
      await ServiceHero.findOneAndUpdate({_id:service},{$set:{solution:resData?._id}})
      return res
        .status(201)
        .json({ message: "solution data saved successfully ", resData });
    }
    resData = await ServiceSolution.findOneAndReplace(
      { service },
      { heading, mainEditorHtmlDescription, solutionItem, service }
    );
    if (!resData) {
      return res.status(300).json({ message: "something went wrong" });
    }
    await ServiceHero.findOneAndUpdate({_id:service},{$set:{solution:resData?._id}})
    return res
      .status(201)
      .json({ message: "solution data updated successfully ", resData });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error",error });
  }
};
export default successApi;
