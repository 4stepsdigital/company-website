import ServiceHero from "@/models/admin/ServicesModel/ServiceHero";
import ServiceService from "@/models/admin/ServicesModel/Services/InSolution";

const SolutionApi = async (req, res) => {
  const { service } = req.query;
  // console.log("this is service page-----> ",service)
  try {
    const { heading, mainEditorHtmlDescription, serviceItem } = req.body;
    const data = await ServiceService.findOne({ service });
    let resData;
    if (!data) {
      resData = await ServiceService.create({
        heading: heading,
        mainEditorHtmlDescription: mainEditorHtmlDescription,
        serviceItem,
        service,
      });
      if (!resData) {
        return res.status(300).json({ message: "something went wrong" });
      }
      await ServiceHero.findOneAndUpdate(
        { _id: service },
        { $set: { service: resData?._id } }
      );
      return res
        .status(201)
        .json({ message: "solution data saved successfully ", resData });
    }
    resData = await ServiceService.findOneAndReplace(
      { service },
      { heading, mainEditorHtmlDescription, serviceItem, service }
    );
    if (!resData) {
      return res.status(300).json({ message: "something went wrong" });
    }
    await ServiceHero.findOneAndUpdate(
      { _id: service },
      { $set: { service: resData?._id } }
    );
    return res
      .status(201)
      .json({ message: "service data updated successfully ", resData });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error",error });
  }
};
export default SolutionApi;
