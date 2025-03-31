import ServiceHero from "@/models/admin/ServicesModel/ServiceHero";
import ServiceSuccess from "@/models/admin/ServicesModel/success/success";
import dbConnect from "@/utils/db";

const successApi = async (req, res) => {
  await dbConnect()
  const { service } = req.query;
  try {
    const { heading, mainEditorHtmlDescription, successItem } = req.body;
    // console.log("req------------------body------> ",req.body)
    const data = await ServiceSuccess.findOne({ service });
    let resData;
    if (!data) {
      resData = await ServiceSuccess.create({
        heading: heading,
        mainEditorHtmlDescription: mainEditorHtmlDescription,
        successItem,
        service,
      });
      if (!resData) {
        return res.status(300).json({ message: "something went wrong" });
      }
      await ServiceHero.findOneAndUpdate(
        { _id: service },
        { $set: { success: resData?._id } }
      );
      return res
        .status(201)
        .json({ message: "solution data saved successfully ", resData });
    }
    resData = await ServiceSuccess.findOneAndReplace(
      { service },
      { heading, mainEditorHtmlDescription, successItem, service }
    );
    if (!resData) {
      return res.status(300).json({ message: "something went wrong" });
    }
    await ServiceHero.findOneAndUpdate(
      { _id: service },
      { $set: { success: resData?._id } }
    );
    return res
      .status(201)
      .json({ message: "solution data updated successfully ", resData });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};
export default successApi;
