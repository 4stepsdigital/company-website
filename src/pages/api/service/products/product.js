import ServiceProduct from "@/models/admin/ServicesModel/Product/InSolution";
import ServiceHero from "@/models/admin/ServicesModel/ServiceHero";
import dbConnect from "@/utils/db";

const SolutionApi = async (req, res) => {
  await dbConnect()
  const { service } = req.query;
  try {
    const { heading, mainEditorHtmlDescription, productItem } = req.body;
    const data = await ServiceProduct.findOne({ service });
    let resData;
    if (!data) {
      resData = await ServiceProduct.create({
        heading: heading,
        mainEditorHtmlDescription: mainEditorHtmlDescription,
        productItem,
        service,
      });
      if (!resData) {
        return res.status(300).json({ message: "something went wrong" });
      }
      await ServiceHero.findOneAndUpdate(
        { _id: service },
        { $set: { product: resData?._id } }
      );
      return res
        .status(201)
        .json({ message: "solution data saved successfully ", resData });
    }
    resData = await ServiceProduct.findOneAndReplace(
      { service },
      { heading, mainEditorHtmlDescription, productItem, service }
    );
    if (!resData) {
      return res.status(300).json({ message: "something went wrong" });
    }
    await ServiceHero.findOneAndUpdate(
      { _id: service },
      { $set: { product: resData?._id } }
    );
    return res
      .status(201)
      .json({ message: "solution data updated successfully ", resData });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error",error });
  }
};
export default SolutionApi;
